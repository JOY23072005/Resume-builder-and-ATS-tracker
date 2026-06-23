export default function ProjectSection({
  resumeData,
  setResumeData,
}) {

  const projects =
    resumeData.projects || [];

  const addProject = () => {

    setResumeData({
      ...resumeData,

      projects: [
        ...projects,

        {
          title: "",
          description: "",
          techStack: "",
        },
      ],
    });

  };

  const updateProject = (
    index,
    field,
    value
  ) => {

    const updated = [
      ...projects,
    ];

    updated[index][field] =
      value;

    setResumeData({
      ...resumeData,

      projects: updated,
    });

  };

  return (
    <div className="space-y-6">

      {projects.map(
        (project, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 space-y-3"
          >

            <input
              className="border p-2 w-full rounded"
              placeholder="Project Title"
              value={
                project.title
              }
              onChange={(e) =>
                updateProject(
                  index,
                  "title",
                  e.target.value
                )
              }
            />

            <input
              className="border p-2 w-full rounded"
              placeholder="Tech Stack"
              value={
                project.techStack
              }
              onChange={(e) =>
                updateProject(
                  index,
                  "techStack",
                  e.target.value
                )
              }
            />

            <textarea
              className="border p-2 w-full rounded"
              rows="4"
              placeholder="Description"
              value={
                project.description
              }
              onChange={(e) =>
                updateProject(
                  index,
                  "description",
                  e.target.value
                )
              }
            />

          </div>
        )
      )}

      <button
        className="bg-primary text-white px-4 py-2 rounded-xl"
        onClick={addProject}
      >
        + Add Project
      </button>

    </div>
  );
}