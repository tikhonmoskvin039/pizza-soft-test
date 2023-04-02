import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DateOfBirthField from "./DateOfBirthField";

describe("DateOfBirthField component", () => {
  test("displays age error message if employee is less than 18 years old", () => {
    const employee = { birthday: "2006-01-01" };
    const dateOfBirth = {
      isDirty: true,
      is18YearsOldError: true,
      onChange: jest.fn(),
      onBlur: jest.fn(),
    };
    const { getByText } = render(
      <DateOfBirthField employee={employee} dateOfBirth={dateOfBirth} />
    );
    const errorMessage = getByText("Age less than 18 years old!");
    expect(errorMessage).toBeInTheDocument();
  });

  test("calls onChange and onBlur functions when input value changes", () => {
    const onChangeMock = jest.fn();
    const onBlurMock = jest.fn();
    const dateOfBirth = {
      isDirty: true,
      is18YearsOldError: false,
      onChange: onChangeMock,
      onBlur: onBlurMock,
    };
    const { getByPlaceholderText } = render(
      <DateOfBirthField dateOfBirth={dateOfBirth} />
    );
    const inputField = getByPlaceholderText("Enter year of birth");
    fireEvent.change(inputField, { target: { value: "1990-01-01" } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    fireEvent.blur(inputField);
    expect(onBlurMock).toHaveBeenCalledTimes(1);
  });
});
