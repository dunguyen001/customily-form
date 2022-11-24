import { useState } from "react";
import { useRef } from "react";

export const OptionContainer = ({
  option,
  handleSelectOption,
  handleChangeText,
}) => {
  // console.log(option);
  return option.is_show ? (
    <div
      // style={{ display: option.is_show ? "block" : "none" }}
      className="border border-2 p-2"
    >
      {option.type === "Text Input" ? (
        <OptionTextInput handleChangeText={handleChangeText} option={option} />
      ) : null}
      {option.type === "Dropdown" ? (
        <OptionDropdown
          handleSelectOption={handleSelectOption}
          option={option}
        />
      ) : null}
      {option.type === "Swatch" ? (
        <OptionSwatch handleSelectOption={handleSelectOption} option={option} />
      ) : null}
    </div>
  ) : null;
};

export const OptionTextInput = ({ option, handleChangeText }) => {
  const inputRef = useRef();

  return (
    <div>
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {option.label} ({option.max_length})
      </label>
      <input onChange={() => handleChangeText(option.id, inputRef.current.value)} id={option.id} ref={inputRef} placeholder={option.placeholder} />
    </div>
  );
};

export const OptionSwatch = ({ option, handleSelectOption }) => {
  return (
    <div>
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {option.label}
      </label>
      <div className="flex flex-wrap">
        {option.values.map((v, index) => {
          return (
            <div
              className="p-1 border boder-1 border-black m-1"
              onClick={() => handleSelectOption(option.id, v.id)}
              key={index}
              style={{ width: 60, height: 60, backgroundColor: v.bg_color }}
            >
              {v.thumb_image ? <img src={v.thumb_image} /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const OptionDropdown = ({ option, handleSelectOption }) => {
  const [valueId, setValueId] = useState(
    option.values[0] ? option.values[0].id : 0
  );
  return (
    <div>
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {option.label}
      </label>
      <select
        onChange={(e) => {
          // console.log(e.target.value, option.id)
          setValueId(e.target.value);
          handleSelectOption(option.id, Number(e.target.value));
        }}
        id="countries"
        value={valueId}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {option.values.map((v, index) => {
          return (
            <option key={index} value={v.id}>
              {v.value}
            </option>
          );
        })}
      </select>
    </div>
  );
};
