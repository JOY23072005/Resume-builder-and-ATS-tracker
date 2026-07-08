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
      {/* Drag Handle Bar */}
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

      <input
        className="border p-2 w-full rounded"
        placeholder="CGPA"
        value={edu.cgpa || ""}
        onChange={(e) => updateEducation(index, "cgpa", e.target.value)}
      />

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
  
  const education = (resumeData.education || []).map((edu, index) => ({
    ...edu,
    id: edu.id || `edu-${index}-${edu.college || "item"}-${Date.now()}`,
  }));

  const handleDragEnd = ({ canceled, operation }) => {
    if (canceled) return;

    const { source } = operation;
    if (!isSortable(source)) return;

    const { initialIndex, index: newIndex } = source.sortable;
    if (initialIndex === newIndex) return;

    const updatedList = [...education];
    const [movedItem] = updatedList.splice(initialIndex, 1);
    updatedList.splice(newIndex, 0, movedItem);

    setResumeData({
      ...resumeData,
      education: updatedList,
    });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...education,
        {
          
          id: crypto.randomUUID(), 
          college: "",
          degree: "",
          cgpa: "",
          startDate: "",
          endDate: "",
        },
      ],
    });
  };

  const updateEducation = (index, field, value) => {
    const updated = education.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );

    setResumeData({
      ...resumeData,
      education: updated,
    });
  };

  const removeEducation = (index) => {
    setResumeData({
      ...resumeData,
      education: education.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      {/* Wrap list in the Provider */}
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