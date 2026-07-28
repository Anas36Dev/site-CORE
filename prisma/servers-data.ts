// Serveurs hôtes (« qui nous ont accueillis ») — source de vérité : export DB
// (backup_site_vitrine_28-07-2026.sql). Régénéré le 2026-07-28.
// Logos dans public/images/serveurs/.

export type ServerRow = {
  slug: string | null;
  name: string;
  logoUrl: string | null;
  founders: string | null;
  playersRange: string | null;
  discordUrl: string | null;
  fivemUrl: string | null;
  isClosed: boolean;
  order: number;
};

export const SERVERS: ServerRow[] = [
  { slug: "arialife-v2", name: "AriaLife V2", logoUrl: "/images/serveurs/arialife-v2.png", founders: "FaFa Ceek", playersRange: "100-150", discordUrl: null, fivemUrl: null, isClosed: false, order: 0 },
  { slug: "ultraze", name: "Ultraze", logoUrl: "/images/serveurs/ultraze.png", founders: "SHINOZA", playersRange: "50-120", discordUrl: "http://discord.gg/ultraze", fivemUrl: "cfx.re/join/k5qovv", isClosed: false, order: 1 },
  { slug: "legacyworld", name: "LegacyWorld", logoUrl: "/images/serveurs/legacyworld.png", founders: "killA", playersRange: "150-200", discordUrl: "http://discord.gg/legacyworldrp", fivemUrl: "cfx.re/join/vq3j45e", isClosed: false, order: 2 },
  { slug: "nolimit", name: "NoLimit", logoUrl: "/images/serveurs/nolimit.png", founders: "Enos", playersRange: "10-15", discordUrl: "https://discord.gg/nolimit-rp", fivemUrl: "cfx.re/join/rjb8g8", isClosed: false, order: 3 },
  { slug: "frame", name: "FRAME", logoUrl: "/images/serveurs/frame.png", founders: "PrinceToZ, CL_Vito, FRENCH & Edmondio", playersRange: "90-150", discordUrl: "https://discord.gg/framerp", fivemUrl: "cfx.re/join/q9kqdv", isClosed: false, order: 4 },
  { slug: "hurricane", name: "Hurricane", logoUrl: "/images/serveurs/hurricane.png", founders: "Medja", playersRange: "250-400", discordUrl: "http://discord.gg/hurricanewrld", fivemUrl: "cfx.re/join/xjellr", isClosed: false, order: 5 },
  { slug: "arkane", name: "Arkane", logoUrl: "/images/serveurs/arkane.png", founders: "Kabylonien", playersRange: "150-250", discordUrl: null, fivemUrl: null, isClosed: true, order: 6 },
  { slug: "onlyrp", name: "OnlyRP", logoUrl: "/images/serveurs/onlyrp.png", founders: null, playersRange: "20-60", discordUrl: null, fivemUrl: null, isClosed: true, order: 7 },
  { slug: "ultraroleplay", name: "UltraRoleplay", logoUrl: "/images/serveurs/ultraroleplay.png", founders: "Alex Vitrox", playersRange: "120-200", discordUrl: "http://discord.gg/ultraroleplay", fivemUrl: "cfx.re/join/89o54v", isClosed: false, order: 8 },
  { slug: "projet-x", name: "Projet X", logoUrl: null, founders: "SLT_Romset & Boudaah", playersRange: "80-120", discordUrl: null, fivemUrl: null, isClosed: true, order: 9 },
  { slug: "new-hill-s-v2", name: "New Hill's V2", logoUrl: null, founders: null, playersRange: "80-120", discordUrl: null, fivemUrl: null, isClosed: true, order: 10 },
  { slug: "origin-rp", name: "Origin RP", logoUrl: "/images/serveurs/originrp.gif", founders: "Ekali, Zoom & Uni", playersRange: null, discordUrl: null, fivemUrl: null, isClosed: true, order: 11 },
  { slug: "greentown", name: "GreenTown", logoUrl: "/images/serveurs/greentown.jpg", founders: "FirMe & Facoo", playersRange: "120-150", discordUrl: null, fivemUrl: null, isClosed: true, order: 12 },
  { slug: "wise", name: "Wise", logoUrl: "/images/serveurs/wise.png", founders: null, playersRange: "350-600", discordUrl: "http://discord.gg/wisefa", fivemUrl: "cfx.re/join/zxz9q9", isClosed: false, order: 13 },
  { slug: "viceland", name: "ViceLand", logoUrl: "/images/serveurs/viceland.png", founders: null, playersRange: "80-150", discordUrl: "http://discord.gg/viceland", fivemUrl: "cfx.re/join/69pa4j", isClosed: false, order: 14 },
  { slug: "sunlight", name: "SunLight", logoUrl: null, founders: null, playersRange: null, discordUrl: null, fivemUrl: null, isClosed: true, order: 15 },
  { slug: "american-dream", name: "American Dream", logoUrl: "/images/serveurs/americandream.png", founders: "Tom Los & MATADOR", playersRange: "25-50", discordUrl: null, fivemUrl: null, isClosed: true, order: 16 },
  { slug: "ami-rp", name: "AMI RP", logoUrl: "/images/serveurs/amirp.png", founders: "AidenShow, LaSalle & P2", playersRange: "80-120", discordUrl: null, fivemUrl: null, isClosed: true, order: 17 },
  { slug: "anesya", name: "Anesya", logoUrl: "/images/serveurs/anesya.png", founders: "Reykito & Emma", playersRange: "80-100", discordUrl: null, fivemUrl: null, isClosed: true, order: 18 },
  { slug: "metarp-whitelist", name: "MetaRP Whitelist", logoUrl: "/images/serveurs/metarp.jpg", founders: "TeufeurS", playersRange: "120-170", discordUrl: null, fivemUrl: null, isClosed: true, order: 19 },
  { slug: "slife", name: "SLife", logoUrl: "/images/serveurs/slife.png", founders: "Tom Los & MATADOR", playersRange: null, discordUrl: null, fivemUrl: null, isClosed: true, order: 20 },
  { slug: "aria-life-v1", name: "Aria Life V1", logoUrl: "/images/serveurs/arialife-v2.png", founders: "Ceek", playersRange: "80-120", discordUrl: null, fivemUrl: null, isClosed: true, order: 21 },
  { slug: "initiale", name: "Initiale", logoUrl: null, founders: "Jokair", playersRange: "50-80", discordUrl: null, fivemUrl: null, isClosed: true, order: 22 },
  { slug: "ifive", name: "iFive", logoUrl: null, founders: "Yumuri & Sayzeh", playersRange: "80-150", discordUrl: null, fivemUrl: null, isClosed: true, order: 23 },
  { slug: "northpoint", name: "NorthPoint", logoUrl: "/images/serveurs/northpoint.png", founders: "Anas, LDR & Okana_", playersRange: "15-30", discordUrl: null, fivemUrl: null, isClosed: true, order: 24 },
  { slug: "rewind", name: "Rewind", logoUrl: "/images/serveurs/rewind.png", founders: "Anas & Le Saint Reaper", playersRange: "20-40", discordUrl: null, fivemUrl: null, isClosed: true, order: 25 },
  { slug: "san-andreas-stories", name: "San Andreas Stories", logoUrl: "/images/serveurs/sanandreasstories.png", founders: null, playersRange: "120-180", discordUrl: null, fivemUrl: null, isClosed: true, order: 26 },
  { slug: "steelfive", name: "SteelFive", logoUrl: "/images/serveurs/steelfive.png", founders: null, playersRange: null, discordUrl: null, fivemUrl: null, isClosed: true, order: 27 },
  { slug: "flashland", name: "FlashLand", logoUrl: "/images/serveurs/flashland.png", founders: "iProMx & Farees", playersRange: "120-150", discordUrl: "http://discord.gg/flashlandlife", fivemUrl: null, isClosed: false, order: 28 },
  { slug: "glife", name: "GLife", logoUrl: "/images/serveurs/glife.png", founders: "pichotm", playersRange: "200-500", discordUrl: "https://discord.gg/gtalife", fivemUrl: "cfx.re/join/qrpm7v", isClosed: false, order: 29 },
  { slug: "offline", name: "Offline", logoUrl: "/images/serveurs/offline.png", founders: "Jass", playersRange: "50-100", discordUrl: "http://discord.gg/offline", fivemUrl: "cfx.re/join/aqdpak", isClosed: false, order: 30 },
  { slug: "stark", name: "Stark", logoUrl: "/images/serveurs/stark.png", founders: null, playersRange: "70-150", discordUrl: "http://discord.gg/starkfa", fivemUrl: "cfx.re/join/j4r57g4", isClosed: false, order: 31 },
  { slug: "storylife-fa", name: "StoryLife FA", logoUrl: "/images/serveurs/storylife-fa.png", founders: null, playersRange: "150-300", discordUrl: "http://discord.gg/storylifefa", fivemUrl: "cfx.re/join/zaaaxy", isClosed: false, order: 32 },
  { slug: "storylife-wl", name: "StoryLife WL", logoUrl: "/images/serveurs/storylife-wl.png", founders: null, playersRange: "250-400", discordUrl: "http://discord.gg/storylife", fivemUrl: "cfx.re/join/aaex7k", isClosed: false, order: 33 },
  { slug: "redstart", name: "RedStart", logoUrl: "/images/serveurs/redstart.png", founders: "LenyM", playersRange: "50-150", discordUrl: "http://discord.gg/redstartrp", fivemUrl: "cfx.re/join/lyybyv", isClosed: false, order: 34 },
  { slug: "noface", name: "NoFace", logoUrl: "/images/serveurs/noface.png", founders: "Tobias & BLAZX", playersRange: "100-200", discordUrl: "http://discord.gg/nofacedrop", fivemUrl: "cfx.re/join/jjmjbl", isClosed: false, order: 35 },
  { slug: "dekay", name: "Dekay", logoUrl: "/images/serveurs/dekay.png", founders: "Trioxxy & Soso", playersRange: null, discordUrl: "https://discord.gg/RtcDqjTA6b", fivemUrl: null, isClosed: false, order: 36 },
];
