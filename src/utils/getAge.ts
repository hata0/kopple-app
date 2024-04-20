export const getAge = (birthday: Date) => {
  const today = new Date();
  const thisYearBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());
  const difference = today.getFullYear() - birthday.getFullYear();

  return today < thisYearBirthday ? difference - 1 : difference;
};
