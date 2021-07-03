import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Collection } from './collection';
import { CreateCollectionBody } from './create-collection-body';
import { environment } from '../../../../environments/environment';
import { FilterQueryParams } from '../../../shared/shared/filter-query-params';
import { Pagination } from '../../../shared/shared/pagination';
import { UpdateCollectionBody } from './update-collection-body';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private readonly baseCollectionApiUrl = `${environment.baseApiUrl}/collections`;

  constructor(private httpClient: HttpClient) {}

  getList(
    filterQueryParams: FilterQueryParams
  ): Observable<Pagination<Collection>> {
    return this.httpClient.get<Pagination<Collection>>(
      this.baseCollectionApiUrl,
      {
        params: { ...filterQueryParams },
      }
    );
  }

  getDetail(id: string): Observable<Collection> {
    return this.httpClient.get<Collection>(
      `${this.baseCollectionApiUrl}/${id}`
    );
  }

  create(body: CreateCollectionBody): Observable<Collection> {
    return this.httpClient.post<Collection>(this.baseCollectionApiUrl, body);
  }

  update(id: string, body: UpdateCollectionBody): Observable<Collection> {
    return this.httpClient.post<Collection>(
      `${this.baseCollectionApiUrl}/${id}`,
      body
    );
  }

  delete(id: string): Observable<Collection> {
    return this.httpClient.delete<Collection>(
      `${this.baseCollectionApiUrl}/${id}`
    );
  }
}
