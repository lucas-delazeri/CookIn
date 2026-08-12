package com.example.login_auth_api.dto;

import java.util.List;

public record RecipeRequestDto(
        String title,
        String description,
        String imageUrl,
        String category,
        List<String> ingredients,
        List<String> steps) {
}
