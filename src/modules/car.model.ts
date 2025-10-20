export interface Car {
  name: string;
  mpg: string;
  cylinders: string;
  displacement: string;
  horsepower: string;
  weight: string;
  acceleration: string;
  model_year: string;
  origin: string;
}

export interface CarFilter {
  acceleration?: string;
  cylinders?: string;
  displacement?: string;
  horsepower?: string;
  model_year?: string;
  mpg?: string;
  name?: string;
  origin?: string;
  weight?: string;
}