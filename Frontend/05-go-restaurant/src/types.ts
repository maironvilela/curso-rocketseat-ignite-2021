
export interface Food {
  id?: number;
  name: string;
  description: string;
  price: number;
  image: string;
  available?: boolean;

}

export interface FoodEdit extends Food {
  available?: boolean;
}