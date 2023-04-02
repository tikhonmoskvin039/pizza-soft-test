import { renderHook, act } from "@testing-library/react";
import { useInput } from "./useInput";

describe("useInput", () => {
  it("should return initial value", () => {
    const initialValue = "John";
    const { result } = renderHook(() => useInput(initialValue, {}));
    expect(result.current.value).toEqual(initialValue);
  });

  it("should update value on change", () => {
    const { result } = renderHook(() => useInput("", {}));
    act(() => {
      result.current.onChange({ target: { value: "John" } });
    });
    expect(result.current.value).toEqual("John");
  });

  it("should return input as valid if it is not required", () => {
    const validations = { isEmail: true };
    const { result } = renderHook(() => useInput("", validations));
    expect(result.current.inputValid).toBeTruthy();
  });
});
