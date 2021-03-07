export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  if(rules.isWholeNum){
    isValid = value > 0
  }

  return isValid;
};

export const timeFormatConvert = (str) => {
  const date = new Date(str);
  let hours = date.getHours();
  let min = date.getMinutes();
  const suffix = hours >= 12 ? "pm" : "am";
  hours = hours > 12 ? hours - 12 : hours;
  hours = hours === "00" ? 12 : hours;
  min = min <= 9 ? "0" + min : min;
  return `${hours}:${min}${suffix}`;
};
