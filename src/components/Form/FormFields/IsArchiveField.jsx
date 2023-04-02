import React from "react";

const IsArchiveField = ({ employee, isArchive }) => {
  console.log("isArchiveINPUT", isArchive.inputValid);

  return (
    <div className="form_group">
      <label className="form_label">Is archive ?</label>
      <input
        type="checkbox"
        defaultChecked={employee?.isArchive}
        onChange={(e) => isArchive.onChange(e)}
        className="form_input"
        name="isArchive"
      />
    </div>
  );
};

export default IsArchiveField;
