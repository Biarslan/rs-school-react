export interface IAPIResponse {
  info: {
    count: number | null;
    pages: number | null;
    next: string | null;
    prev: string | null;
  };
  results: ICharacter[];
}
