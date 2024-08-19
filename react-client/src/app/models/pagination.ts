export interface MetaData {
  curPage: number;
  totalPage: number;
  pageSize: number;
  totalCount: number;
}

export class PaginatedReponse<T> {
  items: T;
  metaData: MetaData;

  constructor(items: T, metaData: MetaData) {
    this.items = items;
    this.metaData = metaData;
  }
}
