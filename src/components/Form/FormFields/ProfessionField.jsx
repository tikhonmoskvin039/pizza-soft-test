import React from "react";

const ProfessionField = ({
  employee,
  profession: { isDirty, isEmpty, value, onChange, onBlur },
}) => {
  const professionOptions = [
    { value: "", text: "Chose a profession", disabled: true },
    { value: "cook", text: "Cook" },
    { value: "driver", text: "Driver" },
    { value: "waiter", text: "Waiter" },
  ];

  return (
    <div className="form_group">
      {isDirty && isEmpty ? (
        <small className="field-error">Select is required. Chose option.</small>
      ) : (
        <small>&nbsp;</small>
      )}
      <div className="select">
        <select
          value={employee ? (value ? value : employee.role) : value}
          onChange={onChange}
          onBlur={onBlur}
          name="role"
        >
          {professionOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.text}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProfessionField;
