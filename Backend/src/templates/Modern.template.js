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

export const modernTemplate = (data = {}) => {
  const {
    basics = {},
    education = [],
    experience = [],
    projects = [],
    skills = [],
    achievements = [],
  } = data;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${escapeHtml(basics.name || "Resume")}</title>
<style>
  :root {
    --accent: #2563eb;
    --text: #1f2430;
    --muted: #5b6472;
  }
  * { box-sizing: border-box; }
  body {
    font-family: "Calibri", "Arial", "Helvetica Neue", sans-serif;
    color: var(--text);
    font-size: 10.5pt;
    line-height: 1.45;
    margin: 0;
    padding: 0;
  }
  .header {
    padding: 20px 24px;
    border-bottom: 3px solid var(--accent);
  }
  h1 { font-size: 24pt; margin: 0 0 4px 0; color: var(--text); }
  .role { font-size: 11pt; color: var(--accent); font-weight: 600; margin: 0 0 8px 0; }
  .summary { margin: 0; }
  .layout {
    display: grid;
    grid-template-columns: 220px 1fr;
  }
  aside {
    padding: 20px 24px 30px 32px;
    background: #f5f7fb;
  }
  main { padding: 20px 42px 30px 28px; }
  section { margin-bottom: 16px; }
  h2 {
    font-size: 11pt;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--accent);
    margin: 0 0 8px 0;
  }
  aside h2 { font-size: 10pt; }
  .contact { font-size: 9.5pt; color: var(--muted); overflow-wrap: anywhere; word-break: break-word;}
  .contact a { color: var(--muted); text-decoration: none; }
  aside .contact { display: flex; flex-direction: column; gap: 4px; }
  aside .divider { display: none; }
  .entry { margin-bottom: 12px; }
  .entry-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 10px;
  }
  .entry-title { font-weight: 700; }
  .entry-date { font-size: 9pt; color: var(--muted); white-space: nowrap; }
  .entry-sub { margin: 2px 0 4px 0; font-style: italic; font-size: 9.5pt; color: var(--muted); }
  ul { margin: 4px 0 0 16px; padding: 0; }
  li { margin-bottom: 3px; }
  .skills-chips { display: flex; flex-wrap: wrap; gap: 6px; }
  .chip {
    background: #fff;
    border: 1px solid #dbe1ea;
    border-radius: 4px;
    padding: 3px 8px;
    font-size: 9pt;
    color: var(--text);
  }
</style>
</head>
<body>

  <div class="header">
    <h1>${escapeHtml(basics.name)}</h1>
    ${experience[0]?.position ? `<p class="role">${escapeHtml(experience[0].position)}</p>` : ""}
    ${basics.summary ? `<p class="summary">${escapeHtml(basics.summary)}</p>` : ""}
  </div>

  <div class="layout">
    <aside>
      ${renderSection("Contact", `<div class="contact">${renderContactLinks(basics)}</div>`)}
      ${renderSection("Skills", renderSkills(skills, "chips"))}
      ${renderSection("Education", renderEducation(education))}
    </aside>
    <main>
      ${renderSection("Experience", renderExperience(experience))}
      ${renderSection("Projects", renderProjects(projects))}
      ${renderSection("Achievements", renderAchievements(achievements))}
    </main>
  </div>

</body>
</html>
  `;
};

export default modernTemplate;