package com.example.login_auth_api.controllers;

import com.example.login_auth_api.domain.recipe.Recipe;
import com.example.login_auth_api.domain.user.User;
import com.example.login_auth_api.dto.RecipeRequestDto;
import com.example.login_auth_api.dto.RecipeResponseDto;
import com.example.login_auth_api.repositories.RecipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recipes")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class RecipeController {
    private final RecipeRepository recipeRepository;

    @GetMapping
    public ResponseEntity<List<RecipeResponseDto>> getAll(
            @RequestParam(required = false) String category
    ) {
        List<Recipe> recipes = category != null
                ? recipeRepository.findByCategory(category)
                : recipeRepository.findAll();
        List<RecipeResponseDto> response = recipes.stream()
                .map(RecipeResponseDto::new)
                .toList();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return recipeRepository.findById(id)
                .map(recipe -> ResponseEntity.ok(new RecipeResponseDto(recipe)))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/my")
    public ResponseEntity<List<RecipeResponseDto>> getMyRecipes() {
        User currentUser = getAuthenticatedUser();
        List<RecipeResponseDto> response = recipeRepository.findByAuthor(currentUser)
                .stream()
                .map(RecipeResponseDto::new)
                .toList();
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<RecipeResponseDto> create(@RequestBody RecipeRequestDto body) {
        User currentUser = getAuthenticatedUser();
        Recipe recipe = new Recipe();
        recipe.setTitle(body.title());
        recipe.setDescription(body.description());
        recipe.setImageUrl(body.imageUrl());
        recipe.setCategory(body.category());
        recipe.setIngredients(body.ingredients());
        recipe.setSteps(body.steps());
        recipe.setAuthor(currentUser);
        recipeRepository.save(recipe);
        return ResponseEntity.status(HttpStatus.CREATED).body(new RecipeResponseDto(recipe));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        User currentUser = getAuthenticatedUser();
        Recipe recipe = recipeRepository.findById(id).orElse(null);
        if (recipe == null) {
            return ResponseEntity.notFound().build();
        }
        if (!recipe.getAuthor().getId().equals(currentUser.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Você só pode excluir suas próprias receitas!");
        }
        recipeRepository.delete(recipe);
        return ResponseEntity.noContent().build();
    }

    private User getAuthenticatedUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
