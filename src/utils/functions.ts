export const phoneMask = (value: string) => {
  const numbers = value.replace(/\D/g, "");
  const masked = numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  return masked;
};
