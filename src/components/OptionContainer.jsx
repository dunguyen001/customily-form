export const OptionContainer = ({ option }) => {
  console.log(option)
  return (
    <div>
      {option.type === "Dropdown" ? <OptionDropdown option={option} /> : null}
      {/* {option.type} {option.label} */}
    </div>
  );
};

export const OptionDropdown = ({ option }) => {
  return (
    <>
      <label
        for="countries"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Select an option
      </label>
      <select
        id="countries"
        defaultValue={option.label}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {option.values.map((v, index) => {
          return (
            <option key={index} value={v.id}>
              {v.value}
            </option>
          );
        })}
      </select>
    </>
  );
};
