import React from "react";
import { useNavigate } from "react-router-dom";

const EmployeeItem = ({ employee }) => {
  const navigate = useNavigate();
  return (
    <div
      className="employee-card"
      onClick={() => navigate(`/employee/${employee.id}`)}
    >
      <div className="employee-card__name">{employee.name}</div>
      <hr />
      <div className="employee-card__position">Role: "{employee.role}"</div>
      <div className="employee-card__phone">{employee.phone}</div>
      <div className="employee-card__phone">Birthday: {employee.birthday}</div>
      {employee.isArchive ? (
        <div className="employee-card__status">In archive</div>
      ) : null}
    </div>
  );
};

export default EmployeeItem;
