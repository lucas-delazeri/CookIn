package com.example.login_auth_api.dto;

import com.example.login_auth_api.domain.recipe.Recipe;

import java.time.LocalDateTime;
import java.util.List;

public record RecipeResponseDto(
        Long id,
        String title,
        String description,
        String imageUrl,
        String category,
        List<String> ingredients,
        List<String> steps,
        String authorName,
        LocalDateTime createdAt
) {
    public RecipeResponseDto(Recipe recipe) {
        this(
                recipe.getId(),
                recipe.getTitle(),
                recipe.getDescription(),
                recipe.getImageUrl(),
                recipe.getCategory(),
                recipe.getIngredients(),
                recipe.getSteps(),
                recipe.getAuthor().getName(),
                recipe.getCreatedAt()
        );
    }
}
