import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreateRecipeBody } from './create-recipe-body';
import { environment } from '../../../../environments/environment';
import { Recipe } from './recipe';
import { UpdateRecipeBody } from './update-recipe-body';

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

  create(
    id: string,
    body: CreateRecipeBody,
    coverImage: File
  ): Observable<Recipe> {
    const formData = RecipeService.getCreateOrUpdateFormData(body, coverImage);
    return this.httpClient.post<Recipe>(
      `${this.baseRecipeApiUrl}/${id}`,
      formData
    );
  }

  update(
    id: string,
    body: UpdateRecipeBody,
    coverImage: File | string | null
  ): Observable<Recipe> {
    const formData = RecipeService.getCreateOrUpdateFormData(body, coverImage);
    return this.httpClient.put<Recipe>(
      `${this.baseRecipeApiUrl}/${id}`,
      formData
    );
  }

  delete(id: string): Observable<Recipe> {
    return this.httpClient.delete<Recipe>(`${this.baseRecipeApiUrl}/${id}`);
  }

  private static getCreateOrUpdateFormData(
    body: CreateRecipeBody | UpdateRecipeBody,
    coverImage: File | string | null
  ): FormData {
    const formData = new FormData();
    if (coverImage instanceof File) {
      formData.set('coverImage', coverImage);
    } else if (coverImage) {
      body.coverImage = coverImage;
    }
    formData.set('data', JSON.stringify(body));
    return formData;
  }
}
