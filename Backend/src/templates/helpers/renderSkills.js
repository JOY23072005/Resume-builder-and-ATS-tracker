import { escapeHtml } from "./escapeHtml.js";

export const renderSkills = (skills = [], variant = "inline") => {
  if (!skills.length) return "";

  if (variant === "chips") {
    return `
      <div class="skills-chips">
        ${skills
          .filter(Boolean)
          .map((skill) => `<span class="chip">${escapeHtml(skill)}</span>`)
          .join("")}
      </div>
    `;
  }

  return `<p class="skills-line">${skills.filter(Boolean).map(escapeHtml).join(", ")}</p>`;
};