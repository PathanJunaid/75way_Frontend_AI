import { Route, Routes } from "react-router-dom";

import AuthanticatedLayout from "./layouts/Authanticated";
import BasicLayout from "./layouts/Basic";
// import Home from "./pages/homepage";
import Login from "./pages/login";
// import Profile from "./pages/profile";
import Register from "./pages/register";
import DashboardPage from "./pages/DashboardPage.tsx";
import ViewBudgetPage from "./pages/ViewBudgetPage.tsx";
import Budgetpage from "./pages/Budgetpage.tsx";
import TransactionFormPage from "./pages/TransactionFormPage.tsx";
import TransactionsPage from "./pages/TransactionsPage.tsx";
import BudgetFormPage from "./pages/BudgetFormPage.tsx";
import AnalysisPage from "./pages/AnalysisPage.tsx";
import OnErrorPage from "./pages/OnErrorPage.tsx";
import PredictionPage from "./pages/PredictionPage.tsx";

function App() {
  return (
    <Routes>
      <Route element={<AuthanticatedLayout />}>
        <Route path="/" element={<DashboardPage/>} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        {/* <Route path="/dashboard" element={<DashboardPage/>}/> */}
        <Route path="/budget" element={<Budgetpage/>}/>
        <Route path="/budget/:id" element={<ViewBudgetPage/>}/>
        <Route path='/newbudget' element={<BudgetFormPage /> } />
        {/* filter  by categories  */}
        <Route path='/transactions' element={<TransactionsPage />}/>
        <Route path="/newtransaction" element={<TransactionFormPage />} />
        {/*budget analysis of transaction per categories in chart  */}
        <Route path='/analysis' element={<AnalysisPage/>} />
        <Route path='/predict' element={<PredictionPage/>} />
        <Route path="*" element={<OnErrorPage />} />
      </Route>
      <Route element={<BasicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
