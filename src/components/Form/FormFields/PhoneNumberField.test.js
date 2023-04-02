import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PhoneNumberField from "./PhoneNumberField";

describe("PhoneNumberField", () => {
  const employee = {
    phone: "1234567890",
  };
  const mockOnChange = jest.fn();
  const mockOnBlur = jest.fn();
  const phoneNumber = {
    onChange: mockOnChange,
    onBlur: mockOnBlur,
    isDirty: true,
    phoneNumberError: false,
  };

  it("renders the phone number input with the placeholder", () => {
    const { getByPlaceholderText } = render(
      <PhoneNumberField employee={employee} phoneNumber={phoneNumber} />
    );
    const inputElement = getByPlaceholderText("Enter a phone number");
    expect(inputElement).toBeInTheDocument();
  });

  it("calls onChange callback when the phone number input value changes", () => {
    const { getByPlaceholderText } = render(
      <PhoneNumberField employee={employee} phoneNumber={phoneNumber} />
    );
    const inputElement = getByPlaceholderText("Enter a phone number");
    fireEvent.change(inputElement, { target: { value: "123" } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("calls onBlur callback when the phone number input loses focus", () => {
    const { getByPlaceholderText } = render(
      <PhoneNumberField employee={employee} phoneNumber={phoneNumber} />
    );
    const inputElement = getByPlaceholderText("Enter a phone number");
    fireEvent.blur(inputElement);
    expect(mockOnBlur).toHaveBeenCalledTimes(1);
  });

  it("renders the phone number error message when the phone number is invalid", () => {
    const invalidPhoneNumber = {
      ...phoneNumber,
      isDirty: true,
      phoneNumberError: true,
    };
    const { getByText } = render(
      <PhoneNumberField employee={employee} phoneNumber={invalidPhoneNumber} />
    );
    const errorMessageElement = getByText(
      'Only digits, from 7 to 12 digits! Can starts with "7"'
    );
    expect(errorMessageElement).toBeInTheDocument();
  });

  it("does not render the phone number error message when the phone number is valid", () => {
    const validPhoneNumber = {
      ...phoneNumber,
      isDirty: true,
      phoneNumberError: false,
    };
    const { queryByText } = render(
      <PhoneNumberField employee={employee} phoneNumber={validPhoneNumber} />
    );
    const errorMessageElement = queryByText(
      'Only digits, from 7 to 12 digits! Can starts with "7"'
    );
    expect(errorMessageElement).toBeNull();
  });
});
