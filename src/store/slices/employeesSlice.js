import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dateTransformToJSON } from "../../utils/utils";

export const fetchEmployeesApi = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    const response = await fetch("http://localhost:4000/employees");
    return response.json();
  }
);

export const addEmployeeApi = createAsyncThunk(
  "employees/addEmployee",
  async (employee) => {
    const response = await fetch("http://localhost:4000/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    });
    return response.json();
  }
);

export const editEmployeeApi = createAsyncThunk(
  "employees/editEmployee",
  async (employee) => {
    const response = await fetch(
      `http://localhost:4000/employees/${employee.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      }
    );
    return response.json();
  }
);

const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    data: [],
    currentEmployee: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setCurrent: (state, action) => {
      const target = state.data.find((e) => e.id === Number(action.payload));
      state.currentEmployee = target;
    },
    cleanUpCurrent: (state, action) => {
      state.currentEmployee = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeesApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployeesApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchEmployeesApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addEmployeeApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addEmployeeApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.push(action.payload);
      })
      .addCase(addEmployeeApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editEmployeeApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editEmployeeApi.fulfilled, (state, action) => {
        const { id } = action.payload;
        const existingItemIndex = state.data.findIndex((e) => e.id === id);
        state.data.splice(existingItemIndex, 1, action.payload);
        state.currentEmployee = null;
        state.status = "succeeded";
      })
      .addCase(editEmployeeApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const handleAddOrUpdateEmployee = (
  e,
  employee,
  setShowPopUp,
  dispatch
) => {
  e.preventDefault();
  if (employee) {
    const employeeData = {
      id: employee.id,
      name: e.target.name.value,
      isArchive: e.target.isArchive.checked,
      birthday: dateTransformToJSON(e.target.birthday.value),
      phone: e.target.phone.value,
      role: e.target.role.value,
    };
    dispatch(editEmployeeApi(employeeData));
  } else {
    const employeeData = {
      name: e.target.name.value,
      isArchive: e.target.isArchive.checked,
      birthday: dateTransformToJSON(e.target.birthday.value),
      phone: e.target.phone.value,
      role: e.target.role.value,
    };
    dispatch(addEmployeeApi(employeeData));
  }
  setShowPopUp(true);
};

export const { setCurrent, cleanUpCurrent } = employeesSlice.actions;

export default employeesSlice.reducer;
