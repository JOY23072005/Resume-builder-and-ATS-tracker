export default function BasicsSection({
  resumeData,
  setResumeData,
}) {

  const basics = resumeData.basics || {};

  const links = basics.links || [];

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

  const addLink = () => {

    updateField("links", [
      ...links,
      {
        label: "",
        url: "",
      },
    ]);

  };

  const updateLink = (
    index,
    field,
    value
  ) => {

    const updated = [...links];

    updated[index][field] = value;

    updateField("links", updated);

  };

  const removeLink = (index) => {

    updateField(
      "links",
      links.filter((_, i) => i !== index)
    );

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

      <div className="space-y-3">

        <h3 className="font-medium">
          Links
        </h3>

        {links.map((link, index) => (

          <div
            key={index}
            className="grid grid-cols-2 gap-3"
          >

            <input
              className="border p-3 rounded-xl"
              placeholder="LinkedIn / GitHub / Portfolio"
              value={link.label}
              onChange={(e)=>
                updateLink(
                  index,
                  "label",
                  e.target.value
                )
              }
            />

            <div className="flex gap-2">

              <input
                className="border p-3 rounded-xl flex-1"
                placeholder="https://..."
                value={link.url}
                onChange={(e)=>
                  updateLink(
                    index,
                    "url",
                    e.target.value
                  )
                }
              />

              <button
                type="button"
                className="text-red-500"
                onClick={() =>
                  removeLink(index)
                }
              >
                ✕
              </button>

            </div>

          </div>

        ))}

        <button
          type="button"
          className="text-primary"
          onClick={addLink}
        >
          + Add Link
        </button>

      </div>

      <textarea
        className="border p-3 w-full rounded-xl overflow-hidden"
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