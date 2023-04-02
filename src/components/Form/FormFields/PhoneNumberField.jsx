import React from "react";
import ReactInputMask from "react-input-mask";

const PhoneNumberField = ({ employee, phoneNumber }) => {
  return (
    <div className="form_group">
      {phoneNumber.isDirty && phoneNumber.phoneNumberError ? (
        <small className="field-error">
          Length must be 11 digits! Can starts only with "7"
        </small>
      ) : (
        <small>&nbsp;</small>
      )}
      <ReactInputMask
        mask={employee?.phone || phoneNumber.value ? "+99999999999" : null}
        maskChar={null}
        defaultValue={employee?.phone}
        onChange={(e) => phoneNumber.onChange(e)}
        onBlur={(e) => phoneNumber.onBlur(e)}
        className="form_input"
        name="phone"
        placeholder="Enter a phone number"
      />
    </div>
  );
};

export default PhoneNumberField;
