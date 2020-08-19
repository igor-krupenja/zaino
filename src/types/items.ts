import { OptionTypeBase } from 'react-select';

export type Item = {
  id: string;
  name: string;
  category: Category;
  quantity: number;
  packQuantity: number;
  weight: number;
  // as Date is not serializable and should not be stored in Redux store state,
  // opting to use ISO format UTC string - they are also directly comparable when sorting
  addedAt: string;
  labels?: string[];
  notes?: string;
};

export enum Category {
  backpacks = 'Backpacks',
  tents = 'Tents',
}

export enum ItemSortOption {
  added = 'Recently added',
  name = 'Name',
  weight = 'Weight',
}