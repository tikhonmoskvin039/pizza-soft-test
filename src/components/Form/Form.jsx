import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useInput } from "../../hooks/useInput";
import {
  setCurrent,
  cleanUpCurrent,
  handleAddOrUpdateEmployee,
} from "../../store/slices/employeesSlice";
import PopUp from "../PopUp/PopUp";
import DateOfBirthField from "./FormFields/DateOfBirthField";
import IsArchiveField from "./FormFields/IsArchiveField";
import NameField from "./FormFields/NameField";
import PhoneNumberField from "./FormFields/PhoneNumberField";
import ProfessionField from "./FormFields/ProfessionField";

const Form = ({ employee }) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const name = useInput(employee?.name, {
    isEmpty: false,
    minLength: 2,
  });
  const isArchive = useInput(!employee?.isArchive, {
    isEmpty: false,
  });
  const dateOfBirth = useInput(employee?.birthday, {
    isEmpty: false,
    minLength: 8,
    is18YearsOld: true,
  });
  const phoneNumber = useInput(employee?.phone, {
    isEmpty: false,
    isPhoneNumber: true,
  });
  const profession = useInput(employee?.role, { isEmpty: false });

  const handleCloseModal = () => {
    setShowPopUp(false);
  };

  useEffect(() => {
    dispatch(setCurrent(id));

    return () => {
      dispatch(cleanUpCurrent());
    };
  }, [id, dispatch]);


  return (
    <div>
      <form
        className="form"
        onSubmit={(e) =>
          handleAddOrUpdateEmployee(e, employee, setShowPopUp, dispatch)
        }
      >
        <h2>{employee ? "Update employee" : "Add new employee"}</h2>
        <NameField employee={employee} name={name} />
        <IsArchiveField employee={employee} isArchive={isArchive} />
        <DateOfBirthField employee={employee} dateOfBirth={dateOfBirth} />
        <PhoneNumberField employee={employee} phoneNumber={phoneNumber} />
        <ProfessionField employee={employee} profession={profession} />
        {employee ? (
          <button
            disabled={
              !name.inputValid &&
              !dateOfBirth.inputValid &&
              !phoneNumber.inputValid &&
              !profession.inputValid
            }
            type="submit"
            className="btn btn_green"
          >
            Update
          </button>
        ) : (
          <button
            disabled={
              !name.inputValid ||
              !dateOfBirth.inputValid ||
              !phoneNumber.inputValid ||
              !profession.inputValid
            }
            type="submit"
            className="btn btn_green"
          >
            Create
          </button>
        )}
      </form>
      <Link to={"/"}>Back</Link>
      <PopUp
        isOpen={showPopUp}
        onClose={handleCloseModal}
        variant={employee === undefined ? "red" : "green"}
        children={
          employee === undefined
            ? "Done. You add a new employee"
            : "Employee was edited successfully"
        }
      />
    </div>
  );
};

export default Form;
