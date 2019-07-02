import React from "react";
import "./style.scss";

const Dropdown = props => {
  const handleChange = event => {
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };
  return (
    <div className={props.className}>
      <label htmlFor="">
      {props.children}
        <select name={props.name} onChange={handleChange}>
          {props.selectors.map((option, index) => {
            return <option key={option.id} value={option.id}>{option.title}</option>;
          })}
        </select>
      </label>
    </div>
  );
};

export default Dropdown;
