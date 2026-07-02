export const formatDate = (date) => {

  if (!date) return "Present";

  const d = new Date(date);

  if (isNaN(d)) return date;

  return d.toLocaleDateString(
    "en-US",
    {
      month: "short",
      year: "numeric",
    }
  );

};