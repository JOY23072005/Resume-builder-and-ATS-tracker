import { useMemo } from "react";
import { isSortable } from "@dnd-kit/react/sortable";

// Stable ids without regenerating on every render (Date.now() per render
// breaks dnd-kit's identity tracking mid-drag).
function withStableIds(items, prefix) {
  return items.map((item, index) =>
    item.id ? item : { ...item, id: `${prefix}-${index}` }
  );
}

export function useSortableSection(resumeData, setResumeData, key, idPrefix) {
  const items = useMemo(
    () => withStableIds(resumeData[key] || [], idPrefix),
    [resumeData[key], idPrefix]
  );

  const handleDragEnd = ({ canceled, operation }) => {
    if (canceled) return;
    const { source } = operation;
    if (!isSortable(source)) return;

    const { initialIndex, index } = source; // not source.sortable
    if (initialIndex === index) return;

    setResumeData((prev) => {
      const current = withStableIds(prev[key] || [], idPrefix);
      const updated = [...current];
      const [moved] = updated.splice(initialIndex, 1);
      updated.splice(index, 0, moved);
      return { ...prev, [key]: updated };
    });
  };

  const addItem = (newItem) =>
    setResumeData((prev) => ({ ...prev, [key]: [...(prev[key] || []), newItem] }));

  const updateItem = (index, field, value) =>
    setResumeData((prev) => ({
      ...prev,
      [key]: (prev[key] || []).map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));

  const removeItem = (index) =>
    setResumeData((prev) => ({
      ...prev,
      [key]: (prev[key] || []).filter((_, i) => i !== index),
    }));

  const addPoint = (itemIndex) =>
    setResumeData((prev) => ({
      ...prev,
      [key]: (prev[key] || []).map((item, i) =>
        i === itemIndex ? { ...item, points: [...(item.points || []), ""] } : item
      ),
    }));

  const updatePoint = (itemIndex, pointIndex, value) =>
    setResumeData((prev) => ({
      ...prev,
      [key]: (prev[key] || []).map((item, i) => {
        if (i !== itemIndex) return item;
        const nextPoints = [...(item.points || [])];
        nextPoints[pointIndex] = value;
        return { ...item, points: nextPoints };
      }),
    }));

  const removePoint = (itemIndex, pointIndex) =>
    setResumeData((prev) => ({
      ...prev,
      [key]: (prev[key] || []).map((item, i) =>
        i === itemIndex
          ? { ...item, points: (item.points || []).filter((_, p) => p !== pointIndex) }
          : item
      ),
    }));

  return { items, handleDragEnd, addItem, updateItem, removeItem, addPoint, updatePoint, removePoint };
}