export const parseLink = (url = "") => {
  if (!url) return "";

  return /^https?:\/\//i.test(url)
    ? url
    : `https://${url}`;
};