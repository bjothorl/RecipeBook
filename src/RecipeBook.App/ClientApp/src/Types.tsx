export interface Ingredient {
  recipeId: string;
  ordinalPosition: number;
  unit: string;
  quantity: number | null;
  ingredient: string;
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
  createdDate: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
}
