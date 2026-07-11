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
    section_order = [
      {
        "id": "experience",
        "visible": true
      },
      {
        "id": "projects",
        "visible": true
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
  // console.log(data.section_order);

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
  @page {
    size: A4;
    margin: 8mm 10mm;
  }
  * { box-sizing: border-box; }
  body {
    font-family: Calibri, Arial, Helvetica, sans-serif;
    color: #1a1a1a;
    font-size:10pt;
    line-height: 1.22;
    margin: 0;
  }
  h1 {
    font-size: 22pt;
    margin: 0 0 4px 0;
    letter-spacing: 0.5px;
  }
  .contact {
    font-size: 9pt;
    color: #333;
    margin-bottom: 5px;
  }
  .contact a { color: #333; text-decoration: none; }
  .divider { color: #999; }
  .summary { margin: 0 0 6px 0; }
  section { 
    margin-bottom: 8px; 
    page-break-inside: avoid;
  }
  h2 {
    font-size: 12.5pt;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-bottom: 1px solid #1a1a1a;
    padding-bottom: 1px;
    margin: 0 0 4px 0;
  }
  .entry { 
    page-break-inside: avoid;
    break-inside: avoid;
    margin-bottom: 4px;
  }
  .entry-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 12px;
  }
  .entry-title { font-weight: bold; }
  .entry-date { font-size: 10pt; color: #444; white-space: nowrap; }
  .entry-sub { margin: 0 0 2px 0; font-style: italic; font-size: 10pt; color: #333; }
  ul { margin: 1px 0 0 15px; padding: 0; }
  li { margin-bottom: 0; }
  .skills-line { margin: 0; }
</style>
</head>
<body>

  <h1>${escapeHtml(basics.name)}</h1>
  <div class="contact">${renderContactLinks(basics)}</div>

  ${basics.summary ? `<p class="summary">${escapeHtml(basics.summary)}</p>` : ""}

  ${section_order
  .filter((section) => section.visible)
  .map((section) => sectionMap[section.id] || "")
  .join("")}

</body>
</html>
  `;
};

export default classicTemplate;