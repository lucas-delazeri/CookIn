import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recipe-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recipe-create.component.html',
  styleUrl: './recipe-create.component.scss'
})
export class RecipeCreateComponent {
  recipeForm: FormGroup;
  categories: string[] = ['Cakes', 'Candies', 'Stakes', 'Soups', 'Drinks'];

  constructor(
    private router: Router,
    private recipeService: RecipeService,
    private toastService: ToastrService
  ) {
    this.recipeForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required]),
      imageUrl: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      ingredients: new FormArray([new FormControl('', Validators.required)]),
      steps: new FormArray([new FormControl('', Validators.required)]),
    });
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get steps() {
    return this.recipeForm.get('steps') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(new FormControl('', Validators.required));
  }

  removeIngredient(index: number) {
    if (this.ingredients.length > 1) {
      this.ingredients.removeAt(index);
    }
  }

  addStep() {
    this.steps.push(new FormControl('', Validators.required));
  }

  removeStep(index: number) {
    if (this.steps.length > 1) {
      this.steps.removeAt(index);
    }
  }

  submit() {
    if (this.recipeForm.invalid) {
      this.toastService.warning("Preencha todos os campos corretamente.");
      return;
    }

    this.recipeService.create(this.recipeForm.value).subscribe({
      next: (recipe) => {
        this.toastService.success("Receita criada com sucesso!");
        this.router.navigateByUrl(`/user`);
      },
      error: (err) => {
        const mensagem = err.error?.message || "Erro ao criar receita!";
        this.toastService.error(mensagem);
      }
    });
  }

  cancel() {
    this.router.navigateByUrl("/user");
  }
}