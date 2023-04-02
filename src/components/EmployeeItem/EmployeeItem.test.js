import React from "react";
import { render } from "@testing-library/react";
import EmployeeItem from "./EmployeeItem";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("EmployeeItem component", () => {
  const employee = {
    id: "1",
    name: "John Doe",
    role: "developer",
    phone: "123-456-7890",
    birthday: "1990-01-01",
    isArchive: false,
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render employee information correctly", () => {
    const { getByText } = render(<EmployeeItem employee={employee} />);
    expect(getByText(employee.name)).toBeInTheDocument();
    expect(getByText(`Role: "${employee.role}"`)).toBeInTheDocument();
    expect(getByText(employee.phone)).toBeInTheDocument();
    expect(getByText(`Birthday: ${employee.birthday}`)).toBeInTheDocument();
  });

  it("should not show 'In archive' status if employee is not archived", () => {
    const { queryByText } = render(<EmployeeItem employee={employee} />);
    expect(queryByText("In archive")).toBeNull();
  });

  it("should show 'In archive' status if employee is archived", () => {
    const archivedEmployee = { ...employee, isArchive: true };
    const { getByText } = render(<EmployeeItem employee={archivedEmployee} />);
    expect(getByText("In archive")).toBeInTheDocument();
  });
});
