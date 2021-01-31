import React from "react";

const DifficultyComponent = ({ children, value, fields, setFields }) => {
  const { diff } = fields;
  const { setDiff } = setFields;
  return (
    <div className="text-center py-3">
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="radio"
          className="form-radio text-indigo-600"
          name="radio-colors"
          value="value"
          checked={value === diff}
          onChange={(e) => setDiff(value)}
        />
        <span className="ml-2">{children}</span>
      </label>
    </div>
  );
};

export default DifficultyComponent;
