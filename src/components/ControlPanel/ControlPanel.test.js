import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ControlPanel from "./ControlPanel";

describe("ControlPanel component", () => {
  it("renders all filter options correctly", () => {
    const filters = {
      position: "",
      birthDateOrder: "",
      archived: false,
      name: "",
    };
    const handleFilterChange = jest.fn();

    const { getByText, getByLabelText } = render(
      <BrowserRouter>
        <ControlPanel
          filters={filters}
          handleFilterChange={handleFilterChange}
        />
      </BrowserRouter>
    );

    expect(getByText("Position:")).toBeInTheDocument();
    expect(getByText("Date of birth:")).toBeInTheDocument();
    expect(getByText("In Archive")).toBeInTheDocument();
    expect(getByText("Name:")).toBeInTheDocument();
    expect(getByLabelText("Position:")).toHaveValue("");
    expect(getByLabelText("Date of birth:")).toHaveValue("");
    expect(getByLabelText("In Archive")).not.toBeChecked();
    expect(getByLabelText("Name:")).toHaveValue("");
  });
});
