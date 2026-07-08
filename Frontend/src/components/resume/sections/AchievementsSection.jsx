import React from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable, isSortable } from "@dnd-kit/react/sortable";
import { GripVertical } from "lucide-react";

function SortableAchievementCard({
  id,
  ach,
  index,
  updateAchievement,
  removeAchievement,
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
          Achievement #{index + 1}
        </span>
      </div>

      <input
        className="border p-2 w-full rounded"
        placeholder="Achievement Title (e.g., Hackathon Winner, Open Source Contributor)"
        value={ach.title || ""}
        onChange={(e) => updateAchievement(index, "title", e.target.value)}
      />

      <button
        type="button"
        className="text-red-500 rounded-md p-2 hover:bg-red-500/10 block pt-1 text-sm font-medium transition-colors"
        onClick={() => removeAchievement(index)}
      >
        Remove
      </button>
    </div>
  );
}

export default function AchievementsSection({ resumeData, setResumeData }) {

  const achievements = (resumeData.achievements || []).map((ach, index) => ({
    ...ach,
    id: ach.id || `ach-${index}-${Date.now()}`,
  }));

  const handleDragEnd = ({ canceled, operation }) => {
    if (canceled) return;

    const { source } = operation;
    if (!isSortable(source)) return;

    const { initialIndex, index: newIndex } = source.sortable;
    if (initialIndex === newIndex) return;

    const updatedList = [...achievements];
    const [movedItem] = updatedList.splice(initialIndex, 1);
    updatedList.splice(newIndex, 0, movedItem);

    setResumeData({
      ...resumeData,
      achievements: updatedList,
    });
  };

  const addAchievement = () => {
    setResumeData({
      ...resumeData,
      achievements: [
        ...achievements,
        {
          id: crypto.randomUUID(),
          title: "",
        },
      ],
    });
  };

  const updateAchievement = (index, field, value) => {
    const updated = achievements.map((ach, i) =>
      i === index ? { ...ach, [field]: value } : ach
    );

    setResumeData({
      ...resumeData,
      achievements: updated,
    });
  };

  const removeAchievement = (index) => {
    setResumeData({
      ...resumeData,
      achievements: achievements.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      {/* 4. Wrap list inside the DragDropProvider */}
      <DragDropProvider onDragEnd={handleDragEnd}>
        <div className="space-y-4">
          {achievements.map((ach, index) => (
            <SortableAchievementCard
              key={ach.id}
              id={ach.id}
              ach={ach}
              index={index}
              updateAchievement={updateAchievement}
              removeAchievement={removeAchievement}
            />
          ))}
        </div>
      </DragDropProvider>

      <button
        type="button"
        className="bg-primary text-white px-4 py-2 rounded-xl transition hover:opacity-90 font-medium"
        onClick={addAchievement}
      >
        + Add Achievement
      </button>
    </div>
  );
}