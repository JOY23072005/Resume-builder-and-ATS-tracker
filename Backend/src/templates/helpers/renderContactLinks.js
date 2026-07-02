import { escapeHtml } from "./escapeHtml.js";
import { parseLink } from "./parseLink.js";

export const renderContactLinks = (basics = {}) => {
  const items = [];

  if (basics.email) {
    items.push(
      `<a href="mailto:${escapeHtml(basics.email)}">${escapeHtml(basics.email)}</a>`
    );
  }

  if (basics.phone) {
    items.push(escapeHtml(basics.phone));
  }

  if (basics.linkedin) {
    const { label, href } = parseLink(basics.linkedin);
    items.push(`<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`);
  }

  if (basics.github) {
    const { label, href } = parseLink(basics.github);
    items.push(`<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`);
  }

  return items.join(`<span class="divider"> | </span>`);
};