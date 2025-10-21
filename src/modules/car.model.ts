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
[key: string]: any;    
  name?: string;
  year?: number;
  cylinders?: number;
  origin?: string;
  hpMin?: number;
  hpMax?: number;
  dipMin?: number;
  dipMax?: number;
  mpgMin?: number;
  mpgMax?: number;
  weightMin?: number;
  weightMax?: number;
  accMin?: number;
  accMax?: number;
}




export const EQ_KEYS:string[] = [
  'name', 
  'make', 
  'origin', 
  'year', 
  'cylinders'
  ];


export interface RangeConfig {
  min: string;
  max: string;
  field: string;
}


export const CAR_RANGES: RangeConfig[] = [
  { min: 'hpMin',     max: 'hpMax',     field: 'hp' },
  { min: 'mpgMin',    max: 'mpgMax',    field: 'mpg' },
  { min: 'weightMin', max: 'weightMax', field: 'weight' },
  { min: 'accMin',    max: 'accMax',    field: 'acceleration' },
  { min: 'dipMin',    max: 'dipMax',    field: 'displacement' },
];

