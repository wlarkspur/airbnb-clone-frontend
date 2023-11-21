export const formatDate = (date: Date | null) => {
  if (date) {
    return `${date?.getFullYear()}-${
      (date?.getMonth() ?? 0) + 1
    }-${date?.getDate()}`;
  }
};
