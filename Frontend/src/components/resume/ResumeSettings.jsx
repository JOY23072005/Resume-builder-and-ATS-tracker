
import TemplateSelector from "./TemplateSelector";

export default function ResumeSettings({
  resumeData,
  setResumeData,
  onExport,
  onSave,
  saved,
}) {

  const updateSetting = (
    field,
    value
  ) => {

    setResumeData({
      ...resumeData,
      [field]: value,
    });

  };

  return (

    <div className="mt-8 border rounded-xl p-5 space-y-6">

      <h2 className="text-lg font-semibold">
        Resume Settings
      </h2>

      {/* Template */}

      <TemplateSelector
        resumeData={resumeData}
        setResumeData={setResumeData}
      />

      {/* Density */}

      <div>

        <p className="font-medium mb-2">
          Density
        </p>

        <div className="flex gap-4">

          {[
            "compact",
            "comfortable",
            "spacious",
          ].map((density) => (

            <label
              key={density}
              className="flex items-center gap-2"
            >

              <input
                type="radio"
                checked={
                  resumeData.density === density
                }
                onChange={() =>
                  updateSetting(
                    "density",
                    density
                  )
                }
              />

              {density.charAt(0).toUpperCase() +
                density.slice(1)}

            </label>

          ))}

        </div>

      </div>

      {/* Buttons */}

      <div className="flex items-center gap-4 pt-2">

        <button
          className="bg-primary text-white px-4 py-2 rounded-xl"
          onClick={onSave}
        >
          Save Resume
        </button>

        <button
          className="bg-primary text-white px-4 py-2 rounded-xl"
          onClick={onExport}
        >
          Export PDF
        </button>

        <span className="text-sm text-muted-foreground">

          {saved}

        </span>

      </div>

    </div>

  );

}