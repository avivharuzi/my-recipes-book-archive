import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Collection } from './collection';
import { CreateCollectionBody } from './create-collection-body';
import { environment } from '../../../../environments/environment';
import { UpdateCollectionBody } from './update-collection-body';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private readonly baseCollectionApiUrl = `${environment.baseApiUrl}/collections`;

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Collection[]> {
    return this.httpClient.get<Collection[]>(this.baseCollectionApiUrl);
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
