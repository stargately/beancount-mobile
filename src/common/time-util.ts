export const getFormatDate = (date: Date) => {
  const year: number = date.getFullYear();
  const month: any =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day: any = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const formatDate = `${year}-${month}-${day}`;
  return formatDate;
};
