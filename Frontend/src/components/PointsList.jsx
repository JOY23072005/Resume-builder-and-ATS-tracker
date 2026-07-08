import React from "react";
import { X } from "lucide-react";

export default function PointsList({ points, itemIndex, updatePoint, removePoint, addPoint }) {
  return (
    <div className="space-y-2">
      {(points || []).map((point, idx) => (
        <div key={idx} className="flex gap-2">
          <input
            className="border p-2 w-full rounded"
            placeholder={`Point ${idx + 1}`}
            value={point || ""}
            onChange={(e) => updatePoint(itemIndex, idx, e.target.value)}
          />
          <button type="button" onClick={() => removePoint(itemIndex, idx)}>
            <X size={20} className="text-red-500 hover:cursor-pointer hover:bg-red-500/10 rounded p-0.5" />
          </button>
        </div>
      ))}
      <button
        type="button"
        className="text-primary px-4 py-2 rounded-xl hover:bg-primary/10 text-sm font-medium"
        onClick={() => addPoint(itemIndex)}
      >
        + Add Point
      </button>
    </div>
  );
}