import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly baseRecipeApiUrl = `${environment.baseApiUrl}/recipes`;

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>(this.baseRecipeApiUrl);
  }

  getDetail(id: string): Observable<Recipe> {
    return this.httpClient.get<Recipe>(`${this.baseRecipeApiUrl}/${id}`);
  }

  create(id: string, formData: FormData): Observable<Recipe> {
    return this.httpClient.post<Recipe>(
      `${this.baseRecipeApiUrl}/${id}`,
      formData
    );
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
