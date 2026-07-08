import React from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable, isSortable } from "@dnd-kit/react/sortable";
import { X, GripVertical } from "lucide-react";

function SortableProjectCard({
  id,
  project,
  index,
  updateProject,
  removeProject,
  addPoint,
  updatePoint,
  removePoint,
}) {
  const { ref, handleRef, styles, isDragging } = useSortable({ id, index });

  return (
    <div
      ref={ref}
      style={{
        ...styles,
        zIndex: isDragging ? 10 : 1,
      }}
      className="border rounded-xl p-4 space-y-3 relative bg-card text-foreground"
    >
      {/* Drag Handle Top Bar */}
      <div className="flex items-center gap-2 border-b pb-2 mb-2">
        <div
          ref={handleRef}
          className="cursor-grab active:cursor-grabbing p-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <GripVertical size={18} />
        </div>
        <span className="text-xs text-muted-foreground font-medium">
          Project #{index + 1}
        </span>
      </div>

      <input
        className="border p-2 w-full rounded"
        placeholder="Project Title"
        value={project.title || ""}
        onChange={(e) => updateProject(index, "title", e.target.value)}
      />

      <input
        className="border p-2 w-full rounded"
        placeholder="Tech Stack"
        value={project.techStack || ""}
        onChange={(e) => updateProject(index, "techStack", e.target.value)}
      />

      {/* Description Bullet Points */}
      <div className="space-y-2">
        {(project.points || []).map((point, idx) => (
          <div key={idx} className="flex gap-2">
            <input
              placeholder="Point"
              type="text"
              className="border p-2 w-full rounded"
              value={point || ""}
              onChange={(e) => updatePoint(index, idx, e.target.value)}
            />
            <button type="button" onClick={() => removePoint(index, idx)}>
              <X size={20} className="text-red-500 hover:cursor-pointer hover:bg-red-500/10 rounded p-0.5" />
            </button>
          </div>
        ))}
        
        <button
          type="button"
          className="text-primary px-4 py-2 rounded-xl hover:bg-primary/10 text-sm font-medium"
          onClick={() => addPoint(index)}
        >
          + Add Point
        </button>
      </div>

      <button
        type="button"
        onClick={() => removeProject(index)}
        className="text-red-500 rounded-md p-2 hover:bg-red-500/10 block pt-1 text-sm font-medium"
      >
        Remove
      </button>
    </div>
  );
}

export default function ProjectSection({ resumeData, setResumeData }) {

  const projects = (resumeData.projects || []).map((project, index) => ({
    ...project,
    id: project.id || `proj-${index}-${Date.now()}`,
  }));

  const handleDragEnd = ({ canceled, operation }) => {
    if (canceled) return;

    const { source } = operation;
    if (!isSortable(source)) return;

    const { initialIndex, index: newIndex } = source.sortable;
    if (initialIndex === newIndex) return;

    const updatedList = [...projects];
    const [movedItem] = updatedList.splice(initialIndex, 1);
    updatedList.splice(newIndex, 0, movedItem);

    setResumeData({
      ...resumeData,
      projects: updatedList,
    });
  };

  const addProject = () => {
    setResumeData({
      ...resumeData,
      projects: [
        ...projects,
        {
          id: crypto.randomUUID(),
          title: "",
          points: [""],
          techStack: "",
        },
      ],
    });
  };

  const updateProject = (index, field, value) => {
  
    const updated = projects.map((proj, i) =>
      i === index ? { ...proj, [field]: value } : proj
    );

    setResumeData({
      ...resumeData,
      projects: updated,
    });
  };

  const removeProject = (projectIdx) => {
    setResumeData({
      ...resumeData,
      projects: projects.filter((_, i) => i !== projectIdx),
    });
  };

  const addPoint = (projectIdx) => {
    const updated = projects.map((proj, i) =>
      i === projectIdx ? { ...proj, points: [...(proj.points || []), ""] } : proj
    );

    setResumeData({
      ...resumeData,
      projects: updated,
    });
  };

  const updatePoint = (projectIdx, pointIdx, value) => {
    const updated = projects.map((proj, i) => {
      if (i === projectIdx) {
        const nextPoints = [...(proj.points || [])];
        nextPoints[pointIdx] = value;
        return { ...proj, points: nextPoints };
      }
      return proj;
    });

    setResumeData({
      ...resumeData,
      projects: updated,
    });
  };

  const removePoint = (projectIdx, pointIdx) => {
    const updated = projects.map((proj, i) => {
      if (i === projectIdx) {
        return {
          ...proj,
          points: (proj.points || []).filter((_, pIdx) => pIdx !== pointIdx),
        };
      }
      return proj;
    });

    setResumeData({
      ...resumeData,
      projects: updated,
    });
  };

  return (
    <div className="space-y-6">
      {/* 4. Wrap the loop in your DragDropProvider */}
      <DragDropProvider onDragEnd={handleDragEnd}>
        <div className="space-y-4">
          {projects.map((project, index) => (
            <SortableProjectCard
              key={project.id}
              id={project.id}
              project={project}
              index={index}
              updateProject={updateProject}
              removeProject={removeProject}
              addPoint={addPoint}
              updatePoint={updatePoint}
              removePoint={removePoint}
            />
          ))}
        </div>
      </DragDropProvider>

      <button
        type="button"
        className="bg-primary text-white px-4 py-2 rounded-xl font-medium"
        onClick={addProject}
      >
        + Add Project
      </button>
    </div>
  );
}