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
import { layoutPresets } from "./layoutPresets.js";

export const modernTemplate = (data = {}) => {

  const {
    density = "comfortable",
    basics = {},
    education = [],
    experience = [],
    projects = [],
    skills = [],
    achievements = [],
    section_order = [
      { id: "experience", visible: true },
      { id: "projects", visible: true },
      { id: "education", visible: true },
      { id: "skills", visible: true },
      { id: "achievements", visible: true },
    ],
  } = data;

  const layout =
    layoutPresets[density] ??
    layoutPresets.comfortable;

  const asideMap = {

    skills: renderSection(
      "Skills",
      renderSkills(skills, "chips")
    ),

    education: renderSection(
      "Education",
      renderEducation(education)
    ),

  };

  const mainMap = {

    experience: renderSection(
      "Experience",
      renderExperience(experience)
    ),

    projects: renderSection(
      "Projects",
      renderProjects(projects)
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

<meta charset="UTF-8"/>

<title>${escapeHtml(basics.name || "Resume")}</title>

<style>

  @page{

    size:A4;

    margin:
      ${layout.pageMargin.top}
      ${layout.pageMargin.right}
      ${layout.pageMargin.bottom}
      ${layout.pageMargin.left};

  }

  :root{

    --accent:${layout.accentColor};
    --text:${layout.textColor};
    --muted:${layout.mutedColor};
    --bg:${layout.backgroundColor};
    --link:${layout.linkColor};
    --border:${layout.borderColor};

  }

  *{

    box-sizing:border-box;

    -webkit-print-color-adjust:exact;

    print-color-adjust:exact;

  }

  body{

    margin:0;

    padding:${layout.bodyPadding};

    font-family:${layout.fontFamily};

    font-size:${layout.fontSize};

    line-height:${layout.lineHeight};

    color:var(--text);

    background:var(--bg);

  }

  .header{

    padding:18px 24px;

    border-bottom:3px solid var(--accent);

  }

  h1{

    margin:0 0 4px;

    font-size:${layout.nameSize};

  }

  .role{

    margin:0 0 6px;

    color:var(--accent);

    font-size:${layout.headingSize};

    font-weight:600;

  }

  .summary{

    margin:0;

  }

  .layout{

    display:grid;

    grid-template-columns:220px 1fr;

  }

  aside{

    background:#f5f7fb;

    padding:18px 20px;

  }

  main{

    padding:18px 24px;

  }

  section{

    margin-bottom:${layout.sectionGap};

    page-break-inside:avoid;

    break-inside:avoid;

  }

  h2{

    margin:0 0 ${layout.headingGap};

    font-size:${layout.headingSize};

    color:var(--accent);

    text-transform:uppercase;

    letter-spacing:.6px;

  }

  aside h2{

    font-size:${layout.contactSize};

  }

  .contact{

    font-size:${layout.contactSize};

    color:var(--muted);

    overflow-wrap:anywhere;

    word-break:break-word;

  }

  .contact a{

    color:var(--muted);

    text-decoration:none;

  }

  aside .contact{

    display:flex;

    flex-direction:column;

    gap:4px;

  }

  aside .divider{

    display:none;

  }

  .entry{

    margin-bottom:${layout.entryGap};

    page-break-inside:avoid;

    break-inside:avoid;

  }

  .entry-header{

    display:flex;

    justify-content:space-between;

    align-items:baseline;

    gap:12px;

  }

  .entry-title{

    font-weight:700;

  }

  .entry-date{

    font-size:${layout.dateSize};

    color:var(--muted);

    white-space:nowrap;

  }

  .entry-sub{

    margin:0 0 2px;

    font-style:italic;

    font-size:${layout.dateSize};

    color:var(--muted);

  }

  ul{

    margin:${layout.listMargin};

    padding:0;

  }

  li{

    margin-bottom:${layout.bulletGap};

  }

  .skills-chips{

    display:flex;

    flex-wrap:wrap;

    gap:6px;

  }

  .chip{

    background:#fff;

    border:1px solid var(--border);

    border-radius:4px;

    padding:3px 8px;

    font-size:${layout.contactSize};

    color:var(--text);

  }

</style>

</head>

<body>

  <div class="header">

    <h1>${escapeHtml(basics.name)}</h1>

    ${experience[0]?.position
    ? `<p class="role">${escapeHtml(experience[0].position)}</p>`
    : ""}

    ${basics.summary
    ? `<p class="summary">${escapeHtml(basics.summary)}</p>`
    : ""}

  </div>

  <div class="layout">

    <aside>

    ${renderSection(
      "Contact",
      `<div class="contact">${renderContactLinks(basics)}</div>`
    )}

    ${section_order
      .filter(
        s =>
          s.visible &&
          asideMap[s.id]
      )
      .map(
        s => asideMap[s.id]
      )
      .join("")}

    </aside>

    <main>

    ${section_order
      .filter(
        s =>
          s.visible &&
          mainMap[s.id]
      )
      .map(
        s => mainMap[s.id]
      )
      .join("")}

    </main>

  </div>

</body>

</html>

`;

};

export default modernTemplate;