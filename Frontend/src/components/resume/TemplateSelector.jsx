export default function TemplateSelector({
  resumeData,
  setResumeData,
}) {

  const templates = [
    {
      id: "classic",
      name: "Classic",
      description: "Traditional ATS-friendly layout",
    },
    {
      id: "modern",
      name: "Modern",
      description: "Two-column modern layout",
    },
  ];

  return (
    <div className="mb-6">

      <h3 className="text-lg font-semibold mb-3">
        Resume Template
      </h3>

      <div className="grid grid-cols-2 gap-4">

        {templates.map((template) => (

          <button
            key={template.id}
            type="button"
            onClick={() => {
                setResumeData({
                    ...resumeData,
                    template: template.id,
                })
              }
            }
            className={`
              border rounded-xl p-4 text-left
              transition-all
              ${
                resumeData.template === template.id
                  ? "border-primary bg-primary/10"
                  : "border-gray-300 hover:border-primary"
              }
            `}
          >

            <h4 className="font-semibold">
              {template.name}
            </h4>

            <p className="text-sm text-gray-500 mt-1">
              {template.description}
            </p>

          </button>

        ))}

      </div>

    </div>
  );
}