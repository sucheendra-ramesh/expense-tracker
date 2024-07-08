import { RevenueExpenseCategoryType } from "./RevenueExpenseCategoryType";

export type RevenueExpenseType = {
  amount: number;
  category: RevenueExpenseCategoryType;
  type: string;
  date_time: string;
  description: string;
};
