import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Recipe } from '../../types/recipe.type';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  username: string = "";
  recipes: Recipe[] = [];
  categories: string[] = ['Todas', 'Bolos', 'Doces', 'Carnes', 'Sopas', 'Drinks'];
  activeCategory: string = 'Todas';
  searchText: string = '';
  allRecipes: Recipe[] = [];

  constructor(
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.username = sessionStorage.getItem("username") || "Usuário";
    this.loadRecipes();
  }

  loadRecipes() {
    this.recipeService.getMyRecipes().subscribe({
      next: (data: Recipe[]) => {
        this.allRecipes = data;
        this.applyFilters();
      },
      error: () => {
        this.allRecipes = [];
        this.recipes = [];
      }
    });
  }

  applyFilters() {
    const text = this.searchText.trim().toLowerCase();
    this.recipes = this.allRecipes.filter(recipe => {
      const matchesTitle = recipe.title.toLowerCase().includes(text);
      const matchesCategory = this.activeCategory === 'Todas'
        || recipe.category === this.activeCategory;
      return matchesTitle && matchesCategory;
    });
  }

  selectCategory(category: string) {
    this.activeCategory = category;

    if (category === 'Todas') {
      this.loadRecipes();
      return;
    }

    this.recipeService.getMyRecipes().subscribe({
      next: (data: any) => {
        this.recipes = data.filter((recipe: any) => recipe.category === category);
      },
      error: () => this.recipes = []
    });
  }

  getInitials(name: string): string {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    const first = parts[0]?.[0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  }

  openRecipe(id: number) {
    this.router.navigateByUrl(`/recipe/${id}`);
  }

  onSearch(value: string) {
    this.searchText = value;
    this.applyFilters();
  }

  createRecipe() {
    this.router.navigateByUrl("/recipe/create");
  }

  logout() {
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("username");
    this.router.navigateByUrl("/login");
  }
}