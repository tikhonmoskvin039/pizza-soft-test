import { useState, useEffect } from "react";

export const useEmployeeFilter = (employees) => {
  const [filters, setFilters] = useState(
    JSON.parse(localStorage.getItem("employeeFilters")) || {
      position: "",
      archived: false,
      name: "",
      birthDate: "",
      birthDateOrder: "",
    }
  );

  const [filteredEmployees, setFilteredEmployees] = useState(employees || []);

  useEffect(() => {
    localStorage.setItem("employeeFilters", JSON.stringify(filters));

    const filtered = employees.filter((employee) => {
      const { position, archived, name, birthDate } = filters;
      if (position && employee.role !== position) return false;
      if (archived && !employee.isArchive) return false;
      if (name && !employee.name.toLowerCase().includes(name.toLowerCase()))
        return false;
      if (birthDate && employee.birthDate !== birthDate) return false;
      return true;
    });

    let sorted = filtered.slice();

    if (filters.birthDateOrder === "asc") {
      sorted = sorted.sort(
        (a, b) =>
          new Date(a.birthday.split(".").reverse().join("-")).getTime() -
          new Date(b.birthday.split(".").reverse().join("-")).getTime()
      );
    } else if (filters.birthDateOrder === "desc") {
      sorted = sorted.sort(
        (a, b) =>
          new Date(b.birthday.split(".").reverse().join("-")).getTime() -
          new Date(a.birthday.split(".").reverse().join("-")).getTime()
      );
    }

    setFilteredEmployees(sorted);
  }, [employees, filters]);

  const handleFilterChange = (event) => {
    const { name, value, checked } = event.target;
    const updatedFilters = {
      ...filters,
      [name]: name === "archived" ? checked : value,
    };
    setFilters(updatedFilters);
  };

  return { filteredEmployees, handleFilterChange, filters };
};