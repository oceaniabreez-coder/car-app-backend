export interface Car {
  name: string;
  mpg: number;
  cylinders: number;
  displacement: number;
  horsepower: number;
  weight: number;
  acceleration: number;
  model_year: number;
  origin: string;
}

export interface CarFilter {
  acceleration?: number;
  cylinders?: number;
  displacement?: number;
  horsepower?: number;
  model_year?: number;
  mpg?: number;
  name?: string;
  origin?: string;
  weight?: number;
}