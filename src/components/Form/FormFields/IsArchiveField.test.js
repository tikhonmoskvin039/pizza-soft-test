import React from "react";
import { render, fireEvent } from "@testing-library/react";
import IsArchiveField from "./IsArchiveField";

describe("IsArchiveField component", () => {
  test("renders checkbox input field", () => {
    const { getByRole } = render(<IsArchiveField />);
    const inputField = getByRole("checkbox");
    expect(inputField).toBeInTheDocument();
  });

  test("displays checkbox as checked if employee is archived", () => {
    const employee = { isArchive: true };
    const { getByRole } = render(<IsArchiveField employee={employee} />);
    const inputField = getByRole("checkbox");
    expect(inputField.checked).toBe(true);
  });

  test("displays checkbox as unchecked if employee is not archived", () => {
    const employee = { isArchive: false };
    const { getByRole } = render(<IsArchiveField employee={employee} />);
    const inputField = getByRole("checkbox");
    expect(inputField.checked).toBe(false);
  });
});
