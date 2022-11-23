import _ from "lodash";
import { useEffect } from "react";
import { useState } from "react";
import { OptionContainer } from "./OptionContainer";

export const FormContainer = ({ options }) => {
  const [mainOptions, setMainOptons] = useState(
    _.orderBy(options.filter((v) => !v.hide_visually), (a) => a.sort_id, "asc")
  );
  const [dropdowns, setDropdowns] = useState([]);
  console.log(options);

  useEffect(() => {
    // const _options = _s

    loadDropdownOptions();
  }, []);

  const loadDropdownOptions = () => {
    const selectOptions = mainOptions;
    setDropdowns(selectOptions.filter((v) => v.type === "Dropdown"));
  };
  return (
    <div className="flex flex-row">
      <div id="preview">preview</div>
      <div id="form" className="flex flex-col px-2 py-2">
        {mainOptions.map((option, index) => <OptionContainer key={index} option={option}/>)}
      </div>
    </div>
  );
};
