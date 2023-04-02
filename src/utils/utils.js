export const dateTransform = (date) => {
  if (!date) return "";
  let dateStr = date;
  let parts = dateStr.split(".");
  let formattedDate = parts[2] + "-" + parts[1] + "-" + parts[0];
  return formattedDate;
};

export const dateTransformToJSON = (date) => {
  if (!date) return "";
  let dateStr = date;
  let parts = dateStr.replaceAll("-", ".").split(".");
  let formattedDate = parts[2] + "." + parts[1] + "." + parts[0];
  return formattedDate;
};




