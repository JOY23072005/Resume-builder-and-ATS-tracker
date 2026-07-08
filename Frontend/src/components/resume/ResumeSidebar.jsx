import React from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable, isSortable } from "@dnd-kit/react/sortable";
import { GripVertical, Eye, EyeOff } from "lucide-react";

const DEFAULT_ORDER = [
  { id: "experience", visible: true },
  { id: "projects", visible: true },
  { id: "education", visible: true },
  { id: "skills", visible: true },
  { id: "achievements", visible: true },
];

function SortableSidebarTab({
  id,
  index,
  visible,
  activeSection,
  setActiveSection,
  toggleVisibility,
}) {
  // useSortable in @dnd-kit/react doesn't return `styles`/`transform` —
  // positioning during drag is handled internally via `ref`.
  const { ref, handleRef, isDragging } = useSortable({ id, index });

  const displayLabel = id.charAt(0).toUpperCase() + id.slice(1);
  const isActive = activeSection === id;

  return (
    <div
      ref={ref}
      style={{ zIndex: isDragging ? 30 : 1 }}
      className={`group cursor-pointer flex justify-between w-full rounded-xl mb-2 transition-all duration-200 ${
        isActive
          ? "bg-primary text-white shadow-md shadow-primary/20"
          : "text-foreground hover:bg-primary/20"
      } ${!visible && !isActive ? "opacity-40" : ""} ${
        isDragging ? "opacity-60 shadow-xl" : ""
      }`}
      onClick={() => setActiveSection(id)}
    >
      <button
        type="button"
        className={`text-left pl-3 pt-3 pb-3 font-medium rounded-xl select-none text-sm transition-all ${
          !visible ? "line-through opacity-70" : ""
        }`}
      >
        {displayLabel}
      </button>

      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-inherit pl-2 rounded-xl">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleVisibility(id);
          }}
          className="p-1.5 rounded-lg transition-colors hover:bg-primary/20 text-muted-foreground hover:text-foreground"
          title={visible ? "Hide Section" : "Show Section"}
        >
          {visible ? <Eye size={15} /> : <EyeOff size={15} />}
        </button>

        <div
          ref={handleRef}
          className="p-1.5 rounded-lg transition-colors hover:bg-primary/20 text-muted-foreground hover:text-foreground"
        >
          <GripVertical size={15} />
        </div>
      </div>
    </div>
  );
}

export default function ResumeSidebar({
  activeSection,
  setActiveSection,
  resumeData,
  setResumeData,
}) {
  const sectionOrder = resumeData?.section_order || DEFAULT_ORDER;

  const handleDragEnd = (event) => {
    if (event.canceled) return;

    const { source } = event.operation;
    if (!isSortable(source)) return;

    // Correct path: initialIndex/index live directly on `source`, not `source.sortable`.
    const { initialIndex, index } = source;
    if (initialIndex === index) return;

    setResumeData((prev) => {
      const current = prev?.section_order || DEFAULT_ORDER;
      const updated = [...current];
      const [moved] = updated.splice(initialIndex, 1);
      updated.splice(index, 0, moved);
      return { ...prev, section_order: updated };
    });
  };

  const toggleVisibility = (id) => {
    setResumeData((prev) => {
      const current = prev?.section_order || DEFAULT_ORDER;
      return {
        ...prev,
        section_order: current.map((sec) =>
          sec.id === id ? { ...sec, visible: !sec.visible } : sec
        ),
      };
    });
  };

  return (
    <div className="bg-card border rounded-2xl p-4 w-full">
      <button
        type="button"
        className={`w-full text-left p-3 font-medium rounded-xl text-sm transition-all mb-2 ${
          activeSection === "basics"
            ? "bg-primary text-white shadow-md shadow-primary/20"
            : "text-foreground hover:bg-primary/20"
        }`}
        onClick={() => setActiveSection("basics")}
      >
        Basics
      </button>

      <DragDropProvider onDragEnd={handleDragEnd}>
        <div className="w-full">
          {sectionOrder.map((section, index) => (
            <SortableSidebarTab
              key={section.id}
              id={section.id}
              index={index}
              visible={section.visible}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              toggleVisibility={toggleVisibility}
            />
          ))}
        </div>
      </DragDropProvider>
    </div>
  );
}