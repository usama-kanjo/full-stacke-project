const targets = {
  neon: process.env.DATABASE_URL_NEON,
  server: process.env.DATABASE_URL_SERVER,
  laptop: process.env.DATABASE_URL_LAPTOP,
} as const;

export type DbTarget = keyof typeof targets;

function resolveDatabaseUrl(): string {
  const target = (process.env.DB_TARGET ?? "neon") as DbTarget;
  const url = targets[target] ?? process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      `Veritabani URL bulunamadi. DB_TARGET=${target} icin DATABASE_URL_${target.toUpperCase()} tanimli degil.`,
    );
  }
  return url;
}

export const databaseUrl = resolveDatabaseUrl();
