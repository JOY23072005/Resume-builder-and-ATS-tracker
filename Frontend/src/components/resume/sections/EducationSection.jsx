import React from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable, isSortable } from "@dnd-kit/react/sortable";
import { GripVertical } from "lucide-react";

function SortableEducationCard({
  id,
  edu,
  index,
  updateEducation,
  removeEducation,
}) {
  const { ref, handleRef, isDragging } = useSortable({ id, index });

  return (
    <div
      ref={ref}
      style={{ zIndex: isDragging ? 10 : 1 }}
      className={`border rounded-xl p-4 space-y-3 relative bg-card text-foreground ${
        isDragging ? "opacity-60 shadow-xl" : ""
      }`}
    >
      <div className="flex items-center gap-2 border-b pb-2 mb-2">
        <div
          ref={handleRef}
          className="cursor-grab active:cursor-grabbing p-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <GripVertical size={18} />
        </div>
        <span className="text-xs text-muted-foreground font-medium">
          Education #{index + 1}
        </span>
      </div>

      <input
        className="border p-2 w-full rounded"
        placeholder="College"
        value={edu.college || ""}
        onChange={(e) => updateEducation(index, "college", e.target.value)}
      />

      <input
        className="border p-2 w-full rounded"
        placeholder="Degree"
        value={edu.degree || ""}
        onChange={(e) => updateEducation(index, "degree", e.target.value)}
      />

      <div className="grid grid-cols-2 gap-3">

        <select
          className="border p-2 rounded"
          value={edu.scoreType || "CGPA"}
          onChange={(e) =>
            updateEducation(
              index,
              "scoreType",
              e.target.value
            )
          }
        >
          <option className="bg-background text-foreground" value="CGPA">CGPA</option>
          <option className="bg-background text-foreground" value="Percentage">Percentage</option>
          <option className="bg-background text-foreground" value="GPA">GPA</option>
          <option className="bg-background text-foreground" value="CPI">CPI</option>
        </select>

        <input
          className="border p-2 rounded"
          placeholder="Score"
          value={edu.score || ""}
          onChange={(e) =>
            updateEducation(
              index,
              "score",
              e.target.value
            )
          }
        />

      </div>

      <button
        type="button"
        className="text-red-500 text-sm font-medium"
        onClick={() => removeEducation(index)}
      >
        Remove
      </button>
    </div>
  );
}

export default function EducationSection({ resumeData, setResumeData }) {
  // Backfill missing ids ONCE into real state, instead of regenerating
  // a new id every render. Do this as a normalize-on-write, not on-read.
  const education = resumeData.education || [];

  const handleDragEnd = ({ canceled, operation }) => {
    if (canceled) return;

    const { source } = operation;
    if (!isSortable(source)) return;

    const { initialIndex, index } = source;
    if (initialIndex === index) return;

    setResumeData((prev) => {
      const current = prev.education || [];
      const updated = [...current];
      const [moved] = updated.splice(initialIndex, 1);
      updated.splice(index, 0, moved);
      return { ...prev, education: updated };
    });
  };

  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...(prev.education || []),
        {
          id: crypto.randomUUID(),
          college: "",
          degree: "",
          scoreType: "CGPA",
          score: "",
          startDate: "",
          endDate: "",
        },
      ],
    }));
  };

  const updateEducation = (index, field, value) => {
    setResumeData((prev) => {
      const current = prev.education || [];
      return {
        ...prev,
        education: current.map((edu, i) =>
          i === index ? { ...edu, [field]: value } : edu
        ),
      };
    });
  };

  const removeEducation = (index) => {
    setResumeData((prev) => {
      const current = prev.education || [];
      return {
        ...prev,
        education: current.filter((_, i) => i !== index),
      };
    });
  };

  return (
    <div className="space-y-6">
      <DragDropProvider onDragEnd={handleDragEnd}>
        <div className="space-y-4">
          {education.map((edu, index) => (
            <SortableEducationCard
              key={edu.id}
              id={edu.id}
              edu={edu}
              index={index}
              updateEducation={updateEducation}
              removeEducation={removeEducation}
            />
          ))}
        </div>
      </DragDropProvider>

      <button
        type="button"
        className="bg-primary text-white px-4 py-2 rounded-xl"
        onClick={addEducation}
      >
        + Add Education
      </button>
    </div>
  );
}