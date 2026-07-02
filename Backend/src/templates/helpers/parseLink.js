/**
 * Parses either a plain URL/handle string or a markdown-style link
 * like "[www.linkedin.com/in/joydeephans](https://www.linkedin.com/in/joydeephans)"
 * and returns a clean { label, href } pair.
 */
export const parseLink = (text = "") => {
  if (!text) return { label: "", href: "" };

  const raw = String(text).trim();

  const markdownMatch = raw.match(/^\[(.*?)\]\((.*?)\)$/);
  if (markdownMatch) {
    const [, label, href] = markdownMatch;
    return { label: label.trim(), href: href.trim() };
  }

  const href = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  return { label: raw, href };
};