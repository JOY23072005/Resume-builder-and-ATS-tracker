import React from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortableSection } from "../../../hooks/useSortableSection";
import SortableCardShell from "../../SortableCardShell";

export default function AchievementsSection({ resumeData, setResumeData }) {
  const { items: achievements, handleDragEnd, addItem, updateItem, removeItem } =
    useSortableSection(resumeData, setResumeData, "achievements", "ach");

  const addAchievement = () => addItem({ id: crypto.randomUUID(), title: "" });

  return (
    <div className="space-y-6">
      <DragDropProvider onDragEnd={handleDragEnd}>
        <div className="space-y-4">
          {achievements.map((ach, index) => (
            <SortableCardShell key={ach.id} id={ach.id} index={index} label={`Achievement #${index + 1}`}>
              <input
                className="border p-2 w-full rounded"
                placeholder="Achievement Title (e.g., Hackathon Winner, Open Source Contributor)"
                value={ach.title || ""}
                onChange={(e) => updateItem(index, "title", e.target.value)}
              />
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

      <button type="button" className="bg-primary text-white px-4 py-2 rounded-xl transition hover:opacity-90 font-medium" onClick={addAchievement}>
        + Add Achievement
      </button>
    </div>
  );
}