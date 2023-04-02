import React from "react";
import { dateTransform } from "../../../utils/utils";

const DateOfBirthField = ({ employee, dateOfBirth }) => {
  return (
    <div className="form_group">
      {dateOfBirth.is18YearsOldError ? (
        <small className="field-error">Age less than 18 years old!</small>
      ) : (
        <small>&nbsp;</small>
      )}
      {employee ? null : (
        <>
          {dateOfBirth.minLengthError && dateOfBirth.isDirty ? (
            <small className="field-error">Field is required!</small>
          ) : (
            <small>&nbsp;</small>
          )}
        </>
      )}

      <input
        type="date"
        defaultValue={dateTransform(employee?.birthday)}
        onChange={(e) => dateOfBirth.onChange(e)}
        onBlur={(e) => dateOfBirth.onBlur(e)}
        className="form_input"
        name="birthday"
        placeholder="Enter year of birth"
      />
    </div>
  );
};

export default DateOfBirthField;
