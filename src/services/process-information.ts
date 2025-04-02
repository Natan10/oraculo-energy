export interface IInformationProcessor<T> {
  process: (content: string[]) => Promise<T[]>;
}
