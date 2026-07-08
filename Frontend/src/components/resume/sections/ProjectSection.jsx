import React from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortableSection } from "../../../hooks/useSortableSection";
import SortableCardShell from "../../SortableCardShell";
import PointsList from "../../PointsList";

export default function ProjectSection({ resumeData, setResumeData }) {
  const { items: projects, handleDragEnd, addItem, updateItem, removeItem, addPoint, updatePoint, removePoint } =
    useSortableSection(resumeData, setResumeData, "projects", "proj");

  const addProject = () => addItem({ id: crypto.randomUUID(), title: "", points: [""], techStack: "" });

  return (
    <div className="space-y-6">
      <DragDropProvider onDragEnd={handleDragEnd}>
        <div className="space-y-4">
          {projects.map((project, index) => (
            <SortableCardShell key={project.id} id={project.id} index={index} label={`Project #${index + 1}`}>
              <input
                className="border p-2 w-full rounded"
                placeholder="Project Title"
                value={project.title || ""}
                onChange={(e) => updateItem(index, "title", e.target.value)}
              />
              <input
                className="border p-2 w-full rounded"
                placeholder="Tech Stack"
                value={project.techStack || ""}
                onChange={(e) => updateItem(index, "techStack", e.target.value)}
              />
              <PointsList points={project.points} itemIndex={index} updatePoint={updatePoint} removePoint={removePoint} addPoint={addPoint} />
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-red-500 rounded-md p-2 hover:bg-red-500/10 block pt-1 text-sm font-medium"
              >
                Remove
              </button>
            </SortableCardShell>
          ))}
        </div>
      </DragDropProvider>

      <button type="button" className="bg-primary text-white px-4 py-2 rounded-xl font-medium" onClick={addProject}>
        + Add Project
      </button>
    </div>
  );
}