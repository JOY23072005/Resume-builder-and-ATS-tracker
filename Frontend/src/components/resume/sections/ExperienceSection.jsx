import { X } from "lucide-react";

export default function ExperienceSection({
  resumeData,
  setResumeData,
}) {

  const experience =
    resumeData.experience || [];

  const addExperience = () => {

    setResumeData({
      ...resumeData,

      experience: [
        ...experience,

        {
          company: "",
          position: "",
          points: [""],
          startDate: "",
          endDate: "",
        },
      ],
    });

  };

  const updateExperience = (
    index,
    field,
    value
  ) => {

    const updated = [
      ...experience,
    ];

    updated[index][field] =
      value;

    setResumeData({
      ...resumeData,

      experience: updated,
    });

  };

  const removeExperience = (
    index
  ) => {

    setResumeData({
      ...resumeData,

      experience:
        experience.filter(
          (_, i) =>
            i !== index
        ),
    });

  };

  const addPoint = (expIndex) => {

    const updated = [...experience];

    updated[expIndex].points.push("");

    setResumeData({
      ...resumeData,
      experience: updated,
    });

  };

  const updatePoint = (
    expIndex,
    pointIndex,
    value
  ) => {

    const updated = [...experience];

    updated[expIndex].points[pointIndex] =
      value;

    setResumeData({
      ...resumeData,
      experience: updated,
    });

  };

  const removePoint = (
    expIndex,
    pointIndex
  ) => {

    const updated = [...experience];

    updated[expIndex].points =
      updated[expIndex].points.filter(
        (_, i) => i !== pointIndex
      );

    setResumeData({
      ...resumeData,
      experience: updated,
    });

  };

  return (
    <div className="space-y-6">

      {experience.map(
        (exp, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 space-y-3"
          >
            <input
              className="border p-2 w-full rounded"
              placeholder="Company"
              value={exp.company}
              onChange={(e) =>
                updateExperience(
                  index,
                  "company",
                  e.target.value
                )
              }
            />

            <input
              className="border p-2 w-full rounded"
              placeholder="Position"
              value={exp.position}
              onChange={(e) =>
                updateExperience(
                  index,
                  "position",
                  e.target.value
                )
              }
            />
            <div className="space-y-2">

              {exp.points.map((point, pointIndex) => (

                <div
                  key={pointIndex}
                  className="flex gap-2"
                >

                  <input
                    className="border p-2 w-full rounded"
                    placeholder={`Point ${pointIndex + 1}`}
                    value={point}
                    onChange={(e) =>
                      updatePoint(
                        index,
                        pointIndex,
                        e.target.value
                      )
                    }
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removePoint(
                        index,
                        pointIndex
                      )
                    }
                  >
                    <X size={20} className="text-red-500 hover:bg-red-500/10"/>
                  </button>

                </div>

              ))}

              <button
                type="button"
                className="text-primary px-4 py-2 rounded-xl hover:bg-primary/10"
                onClick={() => addPoint(index)}
              >
                + Add Point
              </button>

            </div>
            <button
              className="text-red-500 rounded-md p-2 hover:bg-red-500/10 block pt-1"
              onClick={() =>
                removeExperience(
                  index
                )
              }
            >
              Remove
            </button>

          </div>
        )
      )}

      <button
        className="bg-primary text-white px-4 py-2 rounded-xl"
        onClick={addExperience}
      >
        + Add Experience
      </button>

    </div>
  );
}