export default function ClassicTemplate({
  data,
}) {
  const basics = data.basics;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">
          {basics.name}
        </h1>
        <p className="text-sm mt-2">
          {basics.email}
          {basics.phone && ` • ${basics.phone}`}
        </p>
        <p className="text-sm">
          {basics.linkedin}
          {basics.github && ` • ${basics.github}`}
        </p>
      </div>

      {/* Summary */}
      {basics.summary && (
        <section>
          <h2 className="font-bold text-xl border-b mb-2">
            Summary
          </h2>
          <p>{basics.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <section>
          <h2 className="font-bold text-xl border-b mb-2">
            Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <h3 className="font-semibold">
                  {exp.position}
                </h3>
                <p className="text-sm opacity-70">
                  {exp.company}
                </p>
                <p className="mt-1">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <section>
          <h2 className="font-bold text-xl border-b mb-2">
            Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map((project, index) => (
              <div key={index}>
                <h3 className="font-semibold">
                  {project.title}
                </h3>
                <p className="text-sm text-primary">
                  {project.techStack}
                </p>
                <p className="mt-1">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <section>
          <h2 className="font-bold text-xl border-b mb-2">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full border text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Achievements Section */}
      {data.achievements?.length > 0 && (
        <section>
          <h2 className="font-bold text-xl border-b mb-2">
            Achievements
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            {data.achievements.map((ach, index) => (
              <li key={index} className="text-sm text-foreground">
                <strong className="font-semibold">
                  {ach.title}
                </strong>
                {ach.description && `: ${ach.description}`}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <section>
          <h2 className="font-bold text-xl border-b mb-2">
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index}>
                <h3 className="font-semibold">
                  {edu.degree}
                </h3>
                <p className="text-sm opacity-70">
                  {edu.college}
                </p>
                {edu.cgpa && (
                  <p className="text-sm">
                    CGPA : {edu.cgpa}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}