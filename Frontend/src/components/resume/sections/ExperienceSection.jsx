import React from "react";
import { X, GripVertical } from "lucide-react";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable, isSortable } from "@dnd-kit/react/sortable";


// --- Sub-component for individual Sortable Experience Card ---
function SortableExperienceCard({
  id,
  exp,
  index,
  updateExperience,
  removeExperience,
  addPoint,
  updatePoint,
  removePoint,
}) {
  const { ref, handleRef, styles, isDragging } = useSortable({ 
    id, 
    index 
  });

  return (
    <div
      ref={ref}
      style={{
        ...styles,
        zIndex: isDragging ? 10 : 1,
      }}
      className="border border-border rounded-xl p-4 space-y-3 relative bg-card text-foreground"
    >
      {/* Drag Handle Top Bar */}
      <div className="flex items-center gap-2 border-b border-border pb-2 mb-2">
        <div
          ref={handleRef}
          className="cursor-grab active:cursor-grabbing p-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <GripVertical size={18} />
        </div>
        <span className="text-xs text-muted-foreground font-medium">Experience #{index + 1}</span>
      </div>

      <input
        className="border border-border bg-transparent p-2 w-full rounded text-foreground focus:outline-none focus:border-primary"
        placeholder="Company"
        value={exp.company || ""}
        onChange={(e) => updateExperience(index, "company", e.target.value)}
      />

      <input
        className="border border-border bg-transparent p-2 w-full rounded text-foreground focus:outline-none focus:border-primary"
        placeholder="Position"
        value={exp.position || ""}
        onChange={(e) => updateExperience(index, "position", e.target.value)}
      />

      <div className="space-y-2">
        {(exp.points || []).map((point, pointIndex) => (
          <div key={pointIndex} className="flex gap-2">
            <input
              className="border border-border bg-transparent p-2 w-full rounded text-foreground focus:outline-none focus:border-primary"
              placeholder={`Point ${pointIndex + 1}`}
              value={point || ""}
              onChange={(e) => updatePoint(index, pointIndex, e.target.value)}
            />

            <button
              type="button"
              className="p-2 text-red-500 hover:bg-red-500/10 rounded transition-colors"
              onClick={() => removePoint(index, pointIndex)}
            >
              <X size={20} />
            </button>
          </div>
        ))}

        <button
          type="button"
          className="text-primary px-4 py-2 rounded-xl hover:bg-primary/10 text-sm font-medium transition-colors"
          onClick={() => addPoint(index)}
        >
          + Add Point
        </button>
      </div>

      <button
        type="button"
        className="text-red-500 rounded-md p-2 hover:bg-red-500/10 block pt-1 text-sm font-medium transition-colors"
        onClick={() => removeExperience(index)}
      >
        Remove
      </button>
    </div>
  );
}

// --- Main Experience Section Component ---
export default function ExperienceSection({ resumeData, setResumeData }) {
  const experience = (resumeData.experience || []).map((exp, index) => ({
    ...exp,
    id: exp.id || `exp-${index}-${exp.company || "item"}-${Date.now()}`,
  }));

  const handleDragEnd = ({ canceled, operation }) => {
    if (canceled) return;

    const { source } = operation;
    if (!isSortable(source)) return;

    const { initialIndex, index: newIndex } = source.sortable;
    if (initialIndex === newIndex) return;

    const updatedList = [...experience];
    const [movedItem] = updatedList.splice(initialIndex, 1);
    updatedList.splice(newIndex, 0, movedItem);

    setResumeData({
      ...resumeData,
      experience: updatedList,
    });
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...experience,
        {
          id: crypto.randomUUID(),
          company: "",
          position: "",
          points: [""],
          startDate: "",
          endDate: "",
        },
      ],
    });
  };

  const updateExperience = (index, field, value) => {
    const updated = experience.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    setResumeData({ ...resumeData, experience: updated });
  };

  const removeExperience = (index) => {
    setResumeData({
      ...resumeData,
      experience: experience.filter((_, i) => i !== index),
    });
  };

  const addPoint = (expIndex) => {
    const updated = experience.map((exp, i) =>
      i === expIndex ? { ...exp, points: [...(exp.points || []), ""] } : exp
    );
    setResumeData({ ...resumeData, experience: updated });
  };

  const updatePoint = (expIndex, pointIndex, value) => {
    const updated = experience.map((exp, i) => {
      if (i === expIndex) {
        const nextPoints = [...(exp.points || [])];
        nextPoints[pointIndex] = value;
        return { ...exp, points: nextPoints };
      }
      return exp;
    });
    setResumeData({ ...resumeData, experience: updated });
  };

  const removePoint = (expIndex, pointIndex) => {
    const updated = experience.map((exp, i) => {
      if (i === expIndex) {
        return {
          ...exp,
          points: (exp.points || []).filter((_, pIdx) => pIdx !== pointIndex),
        };
      }
      return exp;
    });
    setResumeData({ ...resumeData, experience: updated });
  };

  return (
    <div className="space-y-6">
      <DragDropProvider onDragEnd={handleDragEnd}>
        <div className="space-y-4">
          {experience.map((exp, index) => (
            <SortableExperienceCard
              key={exp.id}
              id={exp.id}
              exp={exp}
              index={index}
              updateExperience={updateExperience}
              removeExperience={removeExperience}
              addPoint={addPoint}
              updatePoint={updatePoint}
              removePoint={removePoint}
            />
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