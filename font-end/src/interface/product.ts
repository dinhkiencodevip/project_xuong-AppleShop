import { Category } from "./category";

export interface Products {
  _id?: string;
  title: string;
  price: number;
  quantity: number;
  images: string;
  description: string;
  categoryId?: Category;
}
