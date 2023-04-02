import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route } from "react-router-dom";
import configureStore from "redux-mock-store";
import Form from "./Form";

const mockStore = configureStore([]);

describe("Form component", () => {
  let store;
  let employee;
  let params;

  beforeEach(() => {
    employee = {
      id: 1,
      name: "John Doe",
      birthday: "1990-01-01",
      phone: "123-456-7890",
      role: "Developer",
      isArchive: false,
    };
    params = { id: "1" };
    store = mockStore({
      employees: {
        current: employee,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders Add new employee if no employee prop passed", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <Form />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Add new employee/i)).toBeInTheDocument();
  });

  it("renders Update employee if employee prop passed", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <Form employee={employee} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Update employee/i)).toBeInTheDocument();
  });
});
