import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ProfessionField from "./ProfessionField";

describe("ProfessionField", () => {
  test("renders select element with correct default value for existing employee", () => {
    const employee = {
      name: "John Doe",
      role: "cook",
    };
    const { getByRole } = render(
      <ProfessionField employee={employee} profession={{}} />
    );
    const selectElement = getByRole("combobox");
    expect(selectElement).toHaveValue("cook");
  });

  test("displays error message when profession is empty and isDirty is true", () => {
    const profession = {
      isDirty: true,
      isEmpty: true,
    };
    const { getByText } = render(
      <ProfessionField employee={{}} profession={profession} />
    );
    const errorMessage = getByText(/select is required/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test("does not display error message when profession is not empty and isDirty is true", () => {
    const profession = {
      isDirty: true,
      isEmpty: false,
    };
    const { queryByText } = render(
      <ProfessionField employee={{}} profession={profession} />
    );
    const errorMessage = queryByText(/select is required/i);
    expect(errorMessage).not.toBeInTheDocument();
  });
});
