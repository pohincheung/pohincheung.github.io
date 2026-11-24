type PostMetadata = { data: { date: Date; pinned?: boolean } };

export function comparePosts(a: PostMetadata, b: PostMetadata): number {
  return Number(Boolean(b.data.pinned)) - Number(Boolean(a.data.pinned))
    || b.data.date.valueOf() - a.data.date.valueOf();
}
