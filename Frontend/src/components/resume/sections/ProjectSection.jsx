import { X } from "lucide-react";

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
          points: [""],
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

  const removeProject = (
    projectIdx
  )=>{
    const updated = projects.filter((project,i)=>i!=projectIdx)

    setResumeData({
      ...resumeData,
      projects: updated,
    })
  }

  const addPoint = (
    projectIdx,
  )=>{
    const updated = [
      ...projects
    ]
    updated[projectIdx].points.push("");
    setResumeData({
      ...resumeData,
      projects:updated,
    })
  }

  const updatePoint = (
    projectIdx,
    pointIdx,
    value
  ) => {

    const updated = [...projects];

    updated[projectIdx].points[pointIdx] =
      value;

    setResumeData({
      ...resumeData,
      projects: updated,
    });

  };

  const removePoint = (
    projectIdx,
    pointIdx
  )=>{
    const updated = [...projects];
    updated[projectIdx].points =
      updated[projectIdx].points.filter(
        (_, i) => i !== pointIdx
      );

    setResumeData({
      ...resumeData,
      projects:updated,
    })
  }

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
            <div className="space-y-2">
            {project.points.map((point,idx)=>(
              <div key={idx} className="flex gap-2">
                <input
                  placeholder="Point"
                  type="text"
                  className="border p-2 w-full rounded"
                  value={point}
                  onChange={(e) =>
                    updatePoint(
                      index,
                      idx,
                      e.target.value
                    )
                  }
                />
                <button onClick={()=>removePoint(index,idx)}>
                  <X size={20} className="text-red-500 hover:cursor-pointer hover:bg-red-500/10"/>
                </button>
              </div>
            ))}
            <button
              type="button"
              className="text-primary px-4 py-2 rounded-xl hover:bg-primary/10"
              onClick={()=>addPoint(index)}
            >
              + Add Point
            </button>
            </div>
            <button
              type="button"
              onClick={()=>removeProject(index)} 
              className="text-red-500 rounded-md p-2 hover:bg-red-500/10 block pt-1">
              Remove
            </button>
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