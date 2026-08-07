import recapsData from "@/data/recaps.json";

export interface Recap {
  week: number;
  title: string;
  body: string;
}

export function getAllRecaps(): Recap[] {
  return [...(recapsData as Recap[])].sort((a, b) => b.week - a.week);
}

export function getLatestRecap(): Recap | null {
  const all = getAllRecaps();
  return all[0] ?? null;
}
