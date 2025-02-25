import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { budgetData } from "./TempData/budgetData.ts";
import { transactionData } from "./TempData/transactionData.ts";

interface Budget {
  id: string;
  name: string;
  description: string;
  amount: number;
  amountLeft: number;
  startDate: string;
  endDate: string;
}

interface Transaction {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  budgetId: string;
}

interface BudgetState {
  budgets: Budget[];
  transactions: Transaction[];
  walletAmount: number
}

const initialState: BudgetState = {
  budgets: budgetData,
  transactions: transactionData,
  walletAmount: 10000
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    addBudget: (state, action: PayloadAction<Budget>) => {
      state.budgets.push(action.payload);
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      const { budgetId, amount } = action.payload;

      // Find the budget associated with the transaction
      const budgetIndex = state.budgets.findIndex((b) => b.id === budgetId);

      if (budgetIndex !== -1) {
        // Ensure the budget has enough remaining funds
        if (state.budgets[budgetIndex].amountLeft >= amount) {
          // Add the transaction
          state.transactions.push(action.payload);

          // Update the budget immutably
          state.budgets[budgetIndex] = {
            ...state.budgets[budgetIndex],
            amountLeft: state.budgets[budgetIndex].amountLeft - amount,
          };
        } else {
          console.warn("Not enough budget left for this transaction.");
        }
      }
    },

  },
});

export const { addBudget, addTransaction } = budgetSlice.actions;
export default budgetSlice.reducer;
