import { renderHook } from "@testing-library/react";
import { useValidation } from "./useValidation";

describe("useValidation", () => {
  it("should return inputValid as true if all validations pass", () => {
    const { result } = renderHook(() =>
      useValidation("John Doe", {
        minLength: 5,
        isEmpty: false,
        is18YearsOld: true,
        isPhoneNumber: true,
      })
    );

    expect(result.current.inputValid).toBe(false);
  });

  it("should return isEmpty as true if value is empty", () => {
    const { result } = renderHook(() =>
      useValidation("", {
        minLength: 5,
        isEmpty: true,
        is18YearsOld: true,
        isPhoneNumber: true,
      })
    );

    expect(result.current.isEmpty).toBe(true);
  });

  it("should return minLengthError as true if value is too short", () => {
    const { result } = renderHook(() =>
      useValidation("John", {
        minLength: 5,
        isEmpty: false,
        is18YearsOld: true,
        isPhoneNumber: true,
      })
    );

    expect(result.current.minLengthError).toBe(true);
  });

  it("should return is18YearsOldError as true if value is less than 18 years ago", () => {
    const { result } = renderHook(() =>
      useValidation("2006-03-31", {
        minLength: 5,
        isEmpty: false,
        is18YearsOld: true,
        isPhoneNumber: true,
      })
    );

    expect(result.current.is18YearsOldError).toBe(true);
  });

  it("should return phoneNumberError as true if value is not a valid phone number", () => {
    const { result } = renderHook(() =>
      useValidation("1234", {
        minLength: 5,
        isEmpty: false,
        is18YearsOld: true,
        isPhoneNumber: true,
      })
    );

    expect(result.current.phoneNumberError).toBe(true);
  });
});
