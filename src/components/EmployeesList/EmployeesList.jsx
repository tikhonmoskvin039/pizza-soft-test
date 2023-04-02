import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useEmployeeFilter } from "../../hooks/useEmployeeFilter";
import { fetchEmployeesApi } from "../../store/slices/employeesSlice";
import ControlPanel from "../ControlPanel/ControlPanel";
import EmployeeItem from "../EmployeeItem/EmployeeItem";
import Spinner from "../Spinner/Spinner";

const EmployeesList = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const employees = useSelector((store) => store?.employees?.data);

  const { filteredEmployees, handleFilterChange, filters } =
    useEmployeeFilter(employees);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchEmployeesApi());
    const myTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(myTimeout);
  }, [dispatch]);

  return (
    <div className="employees-list">
      <ControlPanel filters={filters} handleFilterChange={handleFilterChange} />
      {loading ? (
        <Spinner />
      ) : (
        <div className="employees-list__cards">
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <EmployeeItem key={employee.id} employee={employee} />
            ))
          ) : (
            <div className="centered">No employees found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeesList;
