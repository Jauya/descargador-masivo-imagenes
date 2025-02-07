export const getFormattedNumber = (number: number) =>
  new Intl.NumberFormat("en", { notation: "compact" }).format(number);

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
