import _, { set } from "lodash";
import { useEffect } from "react";
import { useState } from "react";
import { shouldShowOption } from "../helpers";
import { OptionContainer } from "./OptionContainer";

export const FormContainer = ({ options, productConfig }) => {
  const [mainOptions, setMainOptions] = useState([]);

  useEffect(() => {
    loadPreview();
    loadInitOptions();
  }, []);

  const loadPreview = () => {
    // console.log(productConfig)
    engraver.init("preview-canvas");
    engraver.setProduct(productConfig.initial_product_id).then(async (v) => {
      console.log("Loaded preview!!");
      // await engraver.setPresetImage(8, 3);
      // await engraver.setPresetImage(9, 2);
    });
  };

  const loadInitOptions = () => {
    const sortOptions = _.orderBy(
      options.filter((v) => !v.hide_visually),
      (a) => a.sort_id,
      "asc"
    );
    const repairOptions = sortOptions.map((option) => {
      if (shouldShowOption(option)) {
        option.is_show = true;
      }
      return option;
    });
    setMainOptions(repairOptions);
  };

  const handleSelectOption = (optionId, valueId) => {
    const option = mainOptions.find((v) => v.id === optionId);
    if (!option) return;
    const valueOption = option.values.find((v) => v.id === valueId);

    const subOptionIds = getSubOptions(option.id, valueOption.id);
    setShowOptionByIds(option.id, subOptionIds);

    option.functions.map(async (v) => {
      if (v.type === "image") {
        await engraver.setPresetImage(Number(v.image_id), Number(valueOption.image_id));
      }
    });
  };

  const handleChangeText = (optionId, textValue) => {
    const option = mainOptions.find((v) => v.id === optionId);
    if (!option) return;
    option.functions.map(async (v) => {
      if (v.type === "text") {
        await engraver.setText(Number(v.text_id), textValue);
      }
    });
  }

  const getSubOptions = (parentOptionId, parentValueId) => {
    let subOptionIds = [];
    for (let option of mainOptions) {
      const isSubOption = option.conditions.find(
        (v) =>
          v.watch_option === parentOptionId && v.desired_value === parentValueId
      );
      if (isSubOption) {
        subOptionIds.push(option.id);
      }
    }
    return subOptionIds;
  };

  const setShowOptionByIds = (parentOptionId, ids = []) => {
    const cloneOptions = _.cloneDeep(mainOptions);

    const currentSubOptions = cloneOptions.filter(
      (v) =>
        v.is_show === true &&
        v.conditions.find((e) => e.watch_option === parentOptionId)
    );
    for (let subOption of currentSubOptions) {
      const optionIdx = mainOptions.findIndex((v) => v.id === subOption.id);
      if (optionIdx > -1) {
        cloneOptions[optionIdx] = {
          ...cloneOptions[optionIdx],
          is_show: false,
        };
      }
    }

    for (let id of ids) {
      const optionIdx = mainOptions.findIndex((v) => v.id === id);

      if (optionIdx > -1) {
        if (cloneOptions[optionIdx].is_show) {
          cloneOptions[optionIdx] = {
            ...cloneOptions[optionIdx],
            is_show: false,
          };
        } else {
          cloneOptions[optionIdx] = {
            ...cloneOptions[optionIdx],
            is_show: true,
          };
        }
      }
    }

    setMainOptions(cloneOptions);
  };

  return (
    <div className="flex flex-row">
      <div id="preview">
        <div id="container">
          <canvas id="preview-canvas" />
        </div>
      </div>
      <div id="form" className="flex flex-col px-2 py-2">
        {mainOptions.map((option, index) => (
          <OptionContainer
            key={index}
            option={option}
            handleSelectOption={handleSelectOption}
            handleChangeText={handleChangeText}
          />
        ))}
      </div>
    </div>
  );
};
