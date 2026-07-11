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

export const classicTemplate = (data = {}) => {
  const {
    density = "comfortable",
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

  const layout =
  layoutPresets[density] ??
  layoutPresets.comfortable;

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
    --divider:${layout.dividerColor};
    --link:${layout.linkColor};
    --bg:${layout.backgroundColor};

  }

  *{
    box-sizing:border-box;
    -webkit-print-color-adjust:exact;
    print-color-adjust:exact;
  }

  body{

    margin:0;

    padding:${layout.bodyPadding};

    background:var(--bg);

    color:var(--text);

    font-family:${layout.fontFamily};

    font-size:${layout.fontSize};

    line-height:${layout.lineHeight};

  }

  h1{

    margin:0 0 4px 0;

    font-size:${layout.nameSize};

    letter-spacing:0.5px;

  }

  .contact{

    margin-bottom:5px;

    font-size:${layout.contactSize};

    color:var(--link);

  }

  .contact a{

    color:var(--link);

    text-decoration:none;

  }

  .divider{

    color:var(--divider);

  }

  .summary{

    margin:0 0 ${layout.summaryGap} 0;

  }

  section{

    margin-bottom:${layout.sectionGap};

    page-break-inside:avoid;

    break-inside:avoid;

  }

  h2{

    margin:0 0 ${layout.headingGap} 0;

    padding-bottom:1px;

    font-size:${layout.headingSize};

    text-transform:uppercase;

    letter-spacing:1px;

    color:var(--accent);

    border-bottom:1px solid var(--accent);

    page-break-after:avoid;

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

    font-weight:bold;

  }

  .entry-date{

    white-space:nowrap;

    font-size:${layout.secondaryTextSize};

    color:var(--muted);

  }

  .entry-sub{

    margin:0 0 2px 0;

    font-style:italic;

    font-size:${layout.secondaryTextSize};

    color:var(--muted);

  }

  p{

    margin:0;

  }

  ul{

    margin:${layout.listMargin};

    padding:0;

  }

  li{

    margin-bottom:${layout.bulletGap};

  }

  .skills-line{

    margin:0;

  }

  a{

    text-decoration:none;

  }

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