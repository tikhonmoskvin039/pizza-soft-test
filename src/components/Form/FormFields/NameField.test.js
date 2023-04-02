import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NameField from "./NameField";

describe("NameField component", () => {
  test("calls onChange function when input value changes", () => {
    const onChangeMock = jest.fn();
    const name = { onChange: onChangeMock };
    const { getByPlaceholderText } = render(<NameField name={name} />);
    const inputField = getByPlaceholderText("Enter name");
    fireEvent.change(inputField, { target: { value: "John" } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  test("calls onBlur function when input loses focus", () => {
    const onBlurMock = jest.fn();
    const name = { onBlur: onBlurMock };
    const { getByPlaceholderText } = render(<NameField name={name} />);
    const inputField = getByPlaceholderText("Enter name");
    fireEvent.blur(inputField);
    expect(onBlurMock).toHaveBeenCalledTimes(1);
  });

  test("displays default value if name value is not empty", () => {
    const name = { value: "John Doe" };
    const { getByPlaceholderText } = render(<NameField name={name} />);
    const inputField = getByPlaceholderText("Enter name");
    expect(inputField.value).toBe("John Doe");
  });

  test("displays error message if name is required and min length is not met", () => {
    const name = { minLengthError: true, isDirty: true };
    const { getByText } = render(<NameField name={name} />);
    const errorMessage = getByText(
      "Field is required. Min length is 2 symbols!"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("does not display error message if name is not required", () => {
    const name = { minLengthError: false, isDirty: false };
    const { queryByText } = render(<NameField name={name} />);
    const errorMessage = queryByText(
      "Field is required. Min length is 2 symbols!"
    );
    expect(errorMessage).not.toBeInTheDocument();
  });
});
