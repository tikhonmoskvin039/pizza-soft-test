import { renderHook, act } from "@testing-library/react";
import { useEmployeeFilter } from "./useEmployeeFilter";

describe("useEmployeeFilter", () => {
  const employees = [
    {
      name: "Alice",
      role: "Developer",
      isArchive: false,
      birthDate: "1995-10-11",
    },
    { name: "Bob", role: "Designer", isArchive: true, birthDate: "1987-05-02" },
    {
      name: "Charlie",
      role: "Developer",
      isArchive: false,
      birthDate: "1990-08-21",
    },
    {
      name: "David",
      role: "Manager",
      isArchive: false,
      birthDate: "1985-12-30",
    },
  ];

  it("should filter employees by position", () => {
    const { result } = renderHook(() => useEmployeeFilter(employees));

    act(() => {
      result.current.handleFilterChange({
        target: { name: "position", value: "Developer" },
      });
    });

    expect(result.current.filteredEmployees).toEqual([
      {
        name: "Alice",
        role: "Developer",
        isArchive: false,
        birthDate: "1995-10-11",
      },
      {
        name: "Charlie",
        role: "Developer",
        isArchive: false,
        birthDate: "1990-08-21",
      },
    ]);
  });

 
  it("should filter employees by birth date", () => {
    const { result } = renderHook(() => useEmployeeFilter(employees));

    act(() => {
      result.current.handleFilterChange({
        target: { name: "birthDate", value: "1990-08-21" },
      });
    });

    expect(result.current.filteredEmployees).toEqual([
      {
        name: "Charlie",
        role: "Developer",
        isArchive: false,
        birthDate: "1990-08-21",
      },
    ]);
  });
});
