import { escapeHtml } from "./helpers/escapeHtml.js";
import { renderSection } from "./helpers/renderSection.js";
import { renderContactLinks } from "./helpers/renderContactLinks.js";
import { renderSkills } from "./helpers/renderSkills.js";
import {
  renderExperience,
  renderEducation,
  renderProjects,
  renderAchievements,
} from "./helpers/renderEntries.js";

export const classicTemplate = (data = {}) => {
  const {
    basics = {},
    education = [],
    experience = [],
    projects = [],
    skills = [],
    achievements = [],
    sectionOrder = [
      {
        "id": "experience",
        "visible": true
      },
      {
        "id": "projects",
        "visible": false
      },
      {
        "id": "education",
        "visible": true
      },
      {
        "id" : "skills",
        "visible": true
      },
      {
        "id" : "achievements",
        "visible": true
      },
    ],
  } = data;

  const sectionMap = {
    experience: renderSection(
      "Experience",
      renderExperience(experience)
    ),

    projects: renderSection(
      "Projects",
      renderProjects(projects)
    ),

    education: renderSection(
      "Education",
      renderEducation(education)
    ),

    skills: renderSection(
      "Skills",
      renderSkills(skills, "inline")
    ),

    achievements: renderSection(
      "Achievements",
      renderAchievements(achievements)
    ),
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${escapeHtml(basics.name || "Resume")}</title>
<style>
  * { box-sizing: border-box; }
  body {
    font-family: "Georgia", "Times New Roman", serif;
    color: #1a1a1a;
    font-size: 11pt;
    line-height: 1.45;
    margin: 0;
    padding: 20px 24px;
  }
  h1 {
    font-size: 22pt;
    margin: 0 0 4px 0;
    letter-spacing: 0.5px;
  }
  .contact {
    font-size: 10pt;
    color: #333;
    margin-bottom: 14px;
  }
  .contact a { color: #333; text-decoration: none; }
  .divider { color: #999; }
  .summary { margin: 0 0 14px 0; }
  section { margin-bottom: 14px; }
  h2 {
    font-size: 12.5pt;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-bottom: 1px solid #1a1a1a;
    padding-bottom: 2px;
    margin: 0 0 8px 0;
  }
  .entry { margin-bottom: 10px; }
  .entry-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 12px;
  }
  .entry-title { font-weight: bold; }
  .entry-date { font-size: 10pt; color: #444; white-space: nowrap; }
  .entry-sub { margin: 2px 0 4px 0; font-style: italic; font-size: 10pt; color: #333; }
  ul { margin: 4px 0 0 18px; padding: 0; }
  li { margin-bottom: 2px; }
  .skills-line { margin: 0; }
</style>
</head>
<body>

  <h1>${escapeHtml(basics.name)}</h1>
  <div class="contact">${renderContactLinks(basics)}</div>

  ${basics.summary ? `<p class="summary">${escapeHtml(basics.summary)}</p>` : ""}

  ${sectionOrder
  .filter((section) => section.visible)
  .map((section) => sectionMap[section.id] || "")
  .join("")}

</body>
</html>
  `;
};

export default classicTemplate;