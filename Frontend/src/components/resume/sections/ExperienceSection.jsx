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
          description: "",
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

            <textarea
              className="border p-2 w-full rounded"
              rows="4"
              placeholder="Description"
              value={
                exp.description
              }
              onChange={(e) =>
                updateExperience(
                  index,
                  "description",
                  e.target.value
                )
              }
            />

            <button
              className="text-red-500"
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