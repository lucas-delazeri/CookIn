export interface Recipe {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    category: string;
    ingredients: string[];
    steps: string[];
    authorName: string;
    createdAt: string;
}

export interface RecipeRequest {
    title: string;
    description: string;
    imageUrl: string;
    category: string;
    ingredients: string[];
    steps: string[];
}