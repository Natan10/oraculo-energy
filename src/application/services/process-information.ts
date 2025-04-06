export interface IInformationProcessor<T> {
  process: ({ bucket, key }: { bucket?: string; key?: string }) => Promise<T[]>;
}
