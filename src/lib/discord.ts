// Helpers OAuth2 Discord (serveur uniquement).

const AUTHORIZE = "https://discord.com/oauth2/authorize";
const TOKEN = "https://discord.com/api/oauth2/token";
const ME = "https://discord.com/api/users/@me";

export type DiscordUser = {
  id: string;
  username: string;
  global_name: string | null;
  avatar: string | null;
};

export function isDiscordConfigured(): boolean {
  return Boolean(
    process.env.DISCORD_CLIENT_ID &&
      process.env.DISCORD_CLIENT_SECRET &&
      process.env.DISCORD_REDIRECT_URI,
  );
}

export function buildAuthorizeUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID ?? "",
    response_type: "code",
    redirect_uri: process.env.DISCORD_REDIRECT_URI ?? "",
    scope: "identify",
    state,
    prompt: "consent",
  });
  return `${AUTHORIZE}?${params.toString()}`;
}

export async function exchangeCode(code: string): Promise<{ access_token: string }> {
  const body = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID ?? "",
    client_secret: process.env.DISCORD_CLIENT_SECRET ?? "",
    grant_type: "authorization_code",
    code,
    redirect_uri: process.env.DISCORD_REDIRECT_URI ?? "",
  });
  const res = await fetch(TOKEN, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) {
    throw new Error(`Discord token exchange failed: ${res.status}`);
  }
  return res.json();
}

export async function fetchDiscordUser(accessToken: string): Promise<DiscordUser> {
  const res = await fetch(ME, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) {
    throw new Error(`Discord user fetch failed: ${res.status}`);
  }
  return res.json();
}

/**
 * Récupère un utilisateur Discord par son ID via l'API bot (token requis).
 * Permet d'associer la photo/nom d'un membre sans qu'il se connecte.
 * Renvoie null si le token n'est pas configuré ou en cas d'échec.
 */
export async function fetchDiscordUserById(id: string): Promise<DiscordUser | null> {
  const token = process.env.DISCORD_BOT_TOKEN;
  if (!token || !id) return null;
  try {
    const res = await fetch(`https://discord.com/api/v10/users/${id}`, {
      headers: { Authorization: `Bot ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as DiscordUser;
  } catch {
    return null;
  }
}

export function discordAvatarUrl(id: string, avatar: string | null): string | null {
  if (!avatar) return null;
  // Les avatars animés ont un hash préfixé « a_ » → format .gif.
  const ext = avatar.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${id}/${avatar}.${ext}?size=256`;
}
