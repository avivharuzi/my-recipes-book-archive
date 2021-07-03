export interface Pagination<T> {
  documents: T[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: number | null;
  page: number;
  perPage: number;
  previousPage: number | null;
  totalDocuments: number;
  totalPages: number;
}
