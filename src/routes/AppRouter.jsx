import React from "react";
import { Route, Routes } from "react-router-dom";
import EmployeePage from "../pages/EmployeePage";
import Main from "../pages/Main";

const AppRouter = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Main />} />
      <Route path="/employee?/:id?" element={<EmployeePage />} />
      <Route path="/addEmployee?" element={<EmployeePage />} />
      <Route path="*" element={<Main />} />
    </Routes>
  );
};

export default AppRouter;
