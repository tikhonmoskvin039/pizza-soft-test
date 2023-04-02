import React from "react";
import { useSelector } from "react-redux";
import Form from "../components/Form/Form";

const EmployeePage = () => {
  const employee = useSelector((store) => store?.employees?.currentEmployee);
  return (
    <>
      <Form employee={employee} />
    </>
  );
};

export default EmployeePage;
