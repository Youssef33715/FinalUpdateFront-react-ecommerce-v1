// Small presentation helpers for the Customer Account pages.
// They only format real values coming from the API.
export const formatDate = (value) => {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("ar-EG-u-nu-latn", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatMoney = (value) => {
  const n = Number(value);
  if (value === undefined || value === null || value === "" || isNaN(n)) return "—";
  return `${n.toLocaleString("en-US")} جنيه`;
};
