import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../types/recipe.type';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss'
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | null = null;
  loading: boolean = true;
  isAuthor: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.recipeService.getById(id).subscribe({
      next: (data) => {
        this.recipe = data;
        this.loading = false;

        const username = sessionStorage.getItem("username");
        this.isAuthor = username === data.authorName;
      },
      error: () => {
        this.toastService.error("Receita não encontrada!");
        this.router.navigateByUrl("/user");
      }
    });
  }

  deleteRecipe() {
    if (!this.recipe) return;
    if (!confirm("Tem certeza que deseja excluir esta receita?")) return;

    this.recipeService.delete(this.recipe.id).subscribe({
      next: () => {
        this.toastService.success("Receita excluída com sucesso!");
        this.router.navigateByUrl("/user");
      },
      error: () => {
        this.toastService.error("Erro ao excluir receita!");
      }
    });
  }

  goBack() {
    this.router.navigateByUrl("/user");
  }
}