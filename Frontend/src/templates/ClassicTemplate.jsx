import React, { useEffect } from "react";

export default function ClassicTemplate({ data }) {
  const basics = data.basics || {};

  useEffect(()=>{
    console.log(data.education[0])
  },[])

  const defaultOrder = [
    { id: "experience", visible: true },
    { id: "projects", visible: true },
    { id: "education", visible: true },
    { id: "skills", visible: true },
    { id: "achievements", visible: true },
  ];

  const sectionOrder = data.section_order || defaultOrder;

  const sectionRegistry = {
    experience: data.experience?.length > 0 && (
      <section>
        <h2 className="font-bold text-xl border-b mb-2">Experience</h2>
        <div className="space-y-4">
          {data.experience.map((exp, index) => (
            <div key={index}>
              {/* Flex wrapper to separate position on left and date on right */}
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold">{exp.position}</h3>
                {(exp.startDate || exp.endDate) && (
                  <span className="text-sm opacity-80 shrink-0 ml-4">
                    {exp.startDate} {exp.startDate && exp.endDate && "–"} {exp.endDate}
                  </span>
                )}
              </div>
              <p className="text-sm opacity-70">{exp.company}</p>
              <ul className="list-disc pl-5 space-y-2">
                {exp.points.map((point, index) => (
                  <li key={index} className="text-sm text-foreground">
                    <strong className="font-semibold">{point}</strong>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    ),

    projects: data.projects?.length > 0 && (
      <section>
        <h2 className="font-bold text-xl border-b mb-2">Projects</h2>
        <div className="space-y-4">
          {data.projects.map((project, index) => (
            <div key={index}>
              {/* Flex wrapper for Project Title and Project Dates */}
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold">{project.title}</h3>
                {(project.startDate || project.endDate) && (
                  <span className="text-sm opacity-80 shrink-0 ml-4">
                    {project.startDate} {project.startDate && project.endDate && "–"} {project.endDate}
                  </span>
                )}
              </div>
              <p className="text-sm text-primary">{project.techStack}</p>
              <ul className="list-disc pl-5 space-y-2">
                {project.points.map((point, index) => (
                  <li key={index} className="text-sm text-foreground">
                    <strong className="font-semibold">{point}</strong>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    ),

    skills: data.skills?.length > 0 && (
      <section>
        <h2 className="font-bold text-xl border-b mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, index) => (
            <span key={index} className="px-3 py-1 rounded-full border text-sm">
              {skill}
            </span>
          ))}
        </div>
      </section>
    ),

    achievements: data.achievements?.length > 0 && (
      <section>
        <h2 className="font-bold text-xl border-b mb-2">Achievements</h2>
        <ul className="list-disc pl-5 space-y-2">
          {data.achievements.map((ach, index) => (
            <li key={index} className="text-sm text-foreground">
              <strong className="font-semibold">{ach.title}</strong>
            </li>
          ))}
        </ul>
      </section>
    ),

    education: data.education?.length > 0 && (
      <section>
        <h2 className="font-bold text-xl border-b mb-2">Education</h2>
        <div className="space-y-4">
          {data.education.map((edu, index) => (
            <div key={index}>
              {/* Flex wrapper for Degree details and School Timeline Dates */}
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold">{edu.degree}</h3>
                {(edu.startDate || edu.endDate) && (
                  <span className="text-sm opacity-80 shrink-0 ml-4">
                    {edu.startDate} {edu.startDate && edu.endDate && "–"} {edu.endDate}
                  </span>
                )}
              </div>
              <p className="text-sm flex opacity-70">{edu.college}</p>
              {edu.score && <p className="text-sm">{edu.scoreType + ' : ' +edu.score}</p>}
            </div>
          ))}
        </div>
      </section>
    ),
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div>
        <h1 className="text-4xl font-bold">{basics.name}</h1>
        <p className="text-sm mt-2">
          {basics.email}
          {basics.phone && ` • ${basics.phone}`}
        </p>
        <p className="text-sm">
          {basics.linkedin}
          {basics.github && ` • ${basics.github}`}
        </p>
      </div>

      {basics.summary && (
        <section>
          <h2 className="font-bold text-xl border-b mb-2">Summary</h2>
          <p>{basics.summary}</p>
        </section>
      )}

      {/* Render layout sequence */}
      {sectionOrder
        .filter((sec) => sec.visible && sectionRegistry[sec.id])
        .map((sec) => (
          <React.Fragment key={sec.id}>
            {sectionRegistry[sec.id]}
          </React.Fragment>
        ))}
    </div>
  );
}