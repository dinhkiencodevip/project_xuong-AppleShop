import { Category } from "./category";

export interface Products {
  _id?: string | undefined;
  title: string;
  price: number;
  images: string;
  description: string;
  categoryId?: Category;
}
