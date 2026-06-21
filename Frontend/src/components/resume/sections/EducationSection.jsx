export default function EducationSection({
  resumeData,
  setResumeData,
}) {
  const education = resumeData.education;

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...education,
        {
          college: "",
          degree: "",
          cgpa: "",
          startDate: "",
          endDate: "",
        },
      ],
    });
  };

  const updateEducation = (
    index,
    field,
    value
  ) => {
    const updated = [...education];

    updated[index][field] = value;

    setResumeData({
      ...resumeData,
      education: updated,
    });
  };

  const removeEducation = (index) => {
    setResumeData({
      ...resumeData,
      education: education.filter(
        (_, i) => i !== index
      ),
    });
  };

  return (
    <div className="space-y-6">

      {education.map((edu, index) => (
        <div
          key={index}
          className="border rounded-xl p-4 space-y-3"
        >
          <input
            className="border p-2 w-full rounded"
            placeholder="College"
            value={edu.college}
            onChange={(e) =>
              updateEducation(
                index,
                "college",
                e.target.value
              )
            }
          />

          <input
            className="border p-2 w-full rounded"
            placeholder="Degree"
            value={edu.degree}
            onChange={(e) =>
              updateEducation(
                index,
                "degree",
                e.target.value
              )
            }
          />

          <input
            className="border p-2 w-full rounded"
            placeholder="CGPA"
            value={edu.cgpa}
            onChange={(e) =>
              updateEducation(
                index,
                "cgpa",
                e.target.value
              )
            }
          />

          <button
            className="text-red-500"
            onClick={() =>
              removeEducation(index)
            }
          >
            Remove
          </button>
        </div>
      ))}

      <button
        className="bg-primary text-white px-4 py-2 rounded-xl"
        onClick={addEducation}
      >
        + Add Education
      </button>

    </div>
  );
}