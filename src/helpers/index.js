export const shouldShowOption = (option) => {
  return !option.conditions || (option.conditions && !option.conditions.length);
};
