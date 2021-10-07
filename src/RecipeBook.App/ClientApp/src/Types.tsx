export interface Ingredient {
  recipeId: string;
  ordinalPosition: number;
  unit: string | undefined;
  quantity: number | undefined;
  ingredient: string | undefined;
}

export interface Instruction {
  recipeId: string;
  ordinalPosition: number;
  instruction: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  logo: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
}

export interface User {
  id: string;
  username: string;
  password: string;
  token: string;
}
