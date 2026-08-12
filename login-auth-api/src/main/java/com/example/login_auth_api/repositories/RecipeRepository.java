package com.example.login_auth_api.repositories;

import com.example.login_auth_api.domain.recipe.Recipe;
import com.example.login_auth_api.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findByCategory(String category);
    List<Recipe> findByAuthor(User author);
}
