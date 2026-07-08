import React from "react";
import { useSortable } from "@dnd-kit/react/sortable";
import { GripVertical } from "lucide-react";

export default function SortableCardShell({ id, index, label, className = "border", children }) {
  const { ref, handleRef, isDragging } = useSortable({ id, index });

  return (
    <div
      ref={ref}
      style={{ zIndex: isDragging ? 10 : 1 }}
      className={`${className} rounded-xl p-4 space-y-3 relative bg-card text-foreground ${
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
        <span className="text-xs text-muted-foreground font-medium">{label}</span>
      </div>
      {children}
    </div>
  );
}