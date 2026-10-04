export function publishable(data: { draft: boolean; published: string }, today: string): boolean { return !data.draft && data.published <= today; }
export function sortPublished<T extends { id: string; data: { published: string } }>(entries: T[]): T[] {
  return [...entries].sort((a, b) => b.data.published.localeCompare(a.data.published) || a.id.localeCompare(b.id));
}
