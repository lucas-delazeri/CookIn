import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe, RecipeRequest } from '../types/recipe.type';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl: string = "http://localhost:8080/recipes";

  constructor(private httpClient: HttpClient) {}

  getAll(category?: string) {
    const url = category ? `${this.apiUrl}?category=${category}` : this.apiUrl;
    return this.httpClient.get<Recipe[]>(url);
  }

  getById(id: number) {
    return this.httpClient.get<Recipe>(`${this.apiUrl}/${id}`);
  }

  getMyRecipes() {
    return this.httpClient.get<Recipe[]>(`${this.apiUrl}/my`);
  }

  create(recipe: RecipeRequest) {
    return this.httpClient.post<Recipe>(this.apiUrl, recipe);
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}