import React from 'react'

const NameField = ({ employee, name }) => {
  return (
    <div className="form_group">
      {name.minLengthError && name.isDirty ? (
        <small className="field-error">
          Field is required. Min length is 2 symbols!
        </small>
      ) : (
        <small>&nbsp;</small>
      )}
      <input
        defaultValue={name?.value ? name?.value : employee?.name}
        onChange={(e) => name.onChange(e)}
        onBlur={(e) => name.onBlur(e)}
        className="form_input"
        name="name"
        placeholder="Enter name"
      />
    </div>
  );
};

export default NameField
