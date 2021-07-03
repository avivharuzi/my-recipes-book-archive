import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { FilterQueryParams } from '../../../shared/shared/filter-query-params';
import { Pagination } from '../../../shared/shared/pagination';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly baseRecipeApiUrl = `${environment.baseApiUrl}/recipes`;

  constructor(private httpClient: HttpClient) {}

  getList(
    filterQueryParams: FilterQueryParams = {}
  ): Observable<Pagination<Recipe>> {
    return this.httpClient.get<Pagination<Recipe>>(this.baseRecipeApiUrl, {
      params: { ...filterQueryParams },
    });
  }

  getDetail(id: string): Observable<Recipe> {
    return this.httpClient.get<Recipe>(`${this.baseRecipeApiUrl}/${id}`);
  }

  create(formData: FormData): Observable<Recipe> {
    return this.httpClient.post<Recipe>(this.baseRecipeApiUrl, formData);
  }

  update(id: string, formData: FormData): Observable<Recipe> {
    return this.httpClient.put<Recipe>(
      `${this.baseRecipeApiUrl}/${id}`,
      formData
    );
  }

  delete(id: string): Observable<Recipe> {
    return this.httpClient.delete<Recipe>(`${this.baseRecipeApiUrl}/${id}`);
  }
}
