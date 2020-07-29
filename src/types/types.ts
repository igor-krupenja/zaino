export type Item = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  quantityInPack: number;
  labels?: string[];
  weight: number;
  size?: string;
  notes?: string;
};

export type Label = {
  id: string;
  name: string;
  color: string;
};