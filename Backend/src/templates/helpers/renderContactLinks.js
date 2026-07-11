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
    items.push(
      `<a href="tel:${escapeHtml(basics.phone)}">${escapeHtml(basics.phone)}</a>`
    );
  }

  (basics.links || []).forEach((link) => {
    if (!link.url) return;

    items.push(
      `<a href="${escapeHtml(parseLink(link.url))}">
        ${escapeHtml(link.label)}
      </a>`
    );
  });

  return items.join(`<span class="divider"> | </span>`);
};