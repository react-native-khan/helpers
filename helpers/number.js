export const currency = (num, prefix = "Rp") => {
  return `${prefix}. ${
    !isNaN(num)
      ? Number(num)
          .toFixed(0)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
      : 0
  }`;
};
