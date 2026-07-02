import { escapeHtml } from "./escapeHtml.js";

export const renderBulletPoints = (
  points = []
) => {

  if (!points.length) return "";

  return `
    <ul>
      ${points
        .filter(Boolean)
        .map(
          point => `
          <li>
            ${escapeHtml(point)}
          </li>
        `
        )
        .join("")}
    </ul>
  `;

};