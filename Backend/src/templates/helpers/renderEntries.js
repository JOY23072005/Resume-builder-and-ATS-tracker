import { escapeHtml } from "./escapeHtml.js";
import { formatDate } from "./formatDate.js";
import { renderBulletPoints } from "./renderBulletPoints.js";

export const renderExperience = (experience = []) => {
  if (!experience.length) return "";

  return experience
    .map(
      (exp) => `
        <div class="entry">
          <div class="entry-header">
            <span class="entry-title">${escapeHtml(exp.position)}${
              exp.company ? ` — ${escapeHtml(exp.company)}` : ""
            }</span>
            ${
              exp.startDate || exp.endDate
                ? `<span class="entry-date">${formatDate(exp.startDate)} - ${exp.endDate ? formatDate(exp.endDate) : "Present"}</span>`
                : ""
            }
          </div>
          ${renderBulletPoints(exp.points)}
        </div>
      `
    )
    .join("");
};

export const renderEducation = (education = []) => {
  if (!education.length) return "";

  return education
    .map(
      (edu) => `
        <div class="entry">
          <div class="entry-header">
            <span class="entry-title">${escapeHtml(edu.degree)}${
              edu.college ? ` — ${escapeHtml(edu.college)}` : ""
            }</span>
            ${
              edu.startDate || edu.endDate
                ? `<span class="entry-date">${formatDate(edu.startDate)} - ${edu.endDate?formatDate(edu.endDate) : "Present"}</span>`
                : ""
            }
          </div>
          ${edu.cgpa ? `<p class="entry-sub">CGPA: ${escapeHtml(edu.cgpa)}</p>` : ""}
        </div>
      `
    )
    .join("");
};

export const renderProjects = (projects = []) => {
  if (!projects.length) return "";

  return projects
    .map(
      (proj) => `
        <div class="entry">
          <div class="entry-header">
            <span class="entry-title">${escapeHtml(proj.title)}</span>
            ${
              proj.startDate || proj.endDate
                ? `<span class="entry-date">${formatDate(proj.startDate)} - ${proj.endDate?formatDate(proj.endDate) : "Present"}</span>`
                : ""
            }
          </div>
          ${proj.techStack ? `<p class="entry-sub">${escapeHtml(proj.techStack)}</p>` : ""}
          ${renderBulletPoints(proj.points)}
        </div>
      `
    )
    .join("");
};

export const renderAchievements = (achievements = []) => {
  if (!achievements.length) return "";

  return `
    <ul>
      ${achievements
        .filter((a) => a && a.title)
        .map((a) => `<li>${escapeHtml(a.title)}</li>`)
        .join("")}
    </ul>
  `;
};