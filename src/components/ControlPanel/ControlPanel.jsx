import React from "react";
import { useNavigate } from "react-router-dom";

const ControlPanel = ({ filters, handleFilterChange }) => {
  const navigate = useNavigate();

  return (
    <div className="employees-list__filters">
      <label className="employees-list__filter">
        Position:
        <select
          name="position"
          value={filters.position}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="cook">Cook</option>
          <option value="waiter">Waiter</option>
          <option value="driver">Driver</option>
        </select>
      </label>
      <label className="employees-list__filter">
        Date of birth:
        <select
          name="birthDateOrder"
          value={filters.birthDateOrder}
          onChange={handleFilterChange}
        >
          <option value="">-</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
      <label className="employees-list__filter">
        <input
          type="checkbox"
          name="archived"
          checked={filters.archived}
          onChange={handleFilterChange}
        />
        In Archive
      </label>
      <button onClick={() => navigate("/addEmployee")} className="btn btn_blue">
        Add new employee
      </button>
      <label className="employees-list__filter">
        Name:
        <input
          placeholder="Start typing name..."
          type="text"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
        />
      </label>
    </div>
  );
};

export default ControlPanel;
