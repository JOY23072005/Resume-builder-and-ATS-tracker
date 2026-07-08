import React from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortableSection } from "../../../hooks/useSortableSection";
import SortableCardShell from "../../SortableCardShell";
import PointsList from "../../PointsList";

export default function ExperienceSection({ resumeData, setResumeData }) {
  const { items: experience, handleDragEnd, addItem, updateItem, removeItem, addPoint, updatePoint, removePoint } =
    useSortableSection(resumeData, setResumeData, "experience", "exp");

  const addExperience = () =>
    addItem({ id: crypto.randomUUID(), company: "", position: "", points: [""], startDate: "", endDate: "" });

  return (
    <div className="space-y-6">
      <DragDropProvider onDragEnd={handleDragEnd}>
        <div className="space-y-4">
          {experience.map((exp, index) => (
            <SortableCardShell
              key={exp.id}
              id={exp.id}
              index={index}
              label={`Experience #${index + 1}`}
              className="border border-border"
            >
              <input
                className="border border-border bg-transparent p-2 w-full rounded text-foreground focus:outline-none focus:border-primary"
                placeholder="Company"
                value={exp.company || ""}
                onChange={(e) => updateItem(index, "company", e.target.value)}
              />
              <input
                className="border border-border bg-transparent p-2 w-full rounded text-foreground focus:outline-none focus:border-primary"
                placeholder="Position"
                value={exp.position || ""}
                onChange={(e) => updateItem(index, "position", e.target.value)}
              />
              <PointsList points={exp.points} itemIndex={index} updatePoint={updatePoint} removePoint={removePoint} addPoint={addPoint} />
              <button
                type="button"
                className="text-red-500 rounded-md p-2 hover:bg-red-500/10 block pt-1 text-sm font-medium transition-colors"
                onClick={() => removeItem(index)}
              >
                Remove
              </button>
            </SortableCardShell>
          ))}
        </div>
      </DragDropProvider>

      <button
        type="button"
        className="bg-primary text-white px-4 py-2 rounded-xl transition-all hover:bg-primary/90 font-medium"
        onClick={addExperience}
      >
        + Add Experience
      </button>
    </div>
  );
}