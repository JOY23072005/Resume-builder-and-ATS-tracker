export default function BasicsSection({
  resumeData,
  setResumeData,
}) {

  const basics = resumeData.basics || {};

  const updateField = (
    field,
    value
  ) => {

    setResumeData({
      ...resumeData,

      basics: {
        ...basics,

        [field]: value,
      },
    });

  };

  return (
    <div className="space-y-4">

      <input
        className="border p-3 w-full rounded-xl"
        placeholder="Name"
        value={basics.name || ""}
        onChange={(e) =>
          updateField(
            "name",
            e.target.value
          )
        }
      />

      <input
        className="border p-3 w-full rounded-xl"
        placeholder="Email"
        value={basics.email || ""}
        onChange={(e) =>
          updateField(
            "email",
            e.target.value
          )
        }
      />

      <input
        className="border p-3 w-full rounded-xl"
        placeholder="Phone"
        value={basics.phone || ""}
        onChange={(e) =>
          updateField(
            "phone",
            e.target.value
          )
        }
      />

      <input
        className="border p-3 w-full rounded-xl"
        placeholder="LinkedIn"
        value={basics.linkedin || ""}
        onChange={(e) =>
          updateField(
            "linkedin",
            e.target.value
          )
        }
      />

      <input
        className="border p-3 w-full rounded-xl"
        placeholder="Github"
        value={basics.github || ""}
        onChange={(e) =>
          updateField(
            "github",
            e.target.value
          )
        }
      />

      <textarea
        className="border p-3 w-full rounded-xl"
        rows="5"
        placeholder="Summary"
        value={basics.summary || ""}
        onChange={(e) =>
          updateField(
            "summary",
            e.target.value
          )
        }
      />

    </div>
  );
}