import React from "react";

const CustomFileUpload = props => {
  const handleFileChange = event => {
    if (props.onChange) {
      props.onChange(event);
    }
  };

  return (
    <div className="custom-file mb-3">
      <input
        type="file"
        className="custom-file-input"
        id="customFile2"
        onChange={handleFileChange}
      />
      <label className="custom-file-label" htmlFor="customFile2">
        Choose file...
      </label>
    </div>
  );
};

export default CustomFileUpload;
