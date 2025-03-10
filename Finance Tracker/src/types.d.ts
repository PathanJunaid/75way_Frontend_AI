declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

interface User {
  _id: string;
  name: string;
  email: string;
  active: boolean;
  role: "USER" | "ADMIN";
}

interface ApiResponse<T> {
  data: T;
  message: string;
  sucess: boolean
}

interface Group {
  _id: string;
  name: string;
  active: boolean;
  privacy: "PUBLIC" | "PRIVATE";
  admins?: User[];
  members?: User[];
}

interface PredictedSpending {
  [month: string]: {
    amount: number;
    increase_percentage: number;
  };
}

interface CategoryWiseSpending {
  [category: string]: {
    [month: string]: number;
  };
}

interface SpendingData {
  predicted_spending: PredictedSpending;
  category_wise?: CategoryWiseSpending;
}

