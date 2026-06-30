import { X } from "lucide-react";
import { useState } from "react";

export default function SkillSection({
  resumeData,
  setResumeData,
}) {

  const [skill, setSkill] =
    useState("");

  const addSkill = () => {

    if (!skill.trim()) return;

    setResumeData({
      ...resumeData,

      skills: [
        ...resumeData.skills,
        skill,
      ],
    });

    setSkill("");

  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addSkill()
    }
  };

  const removeSkill = (
    index
  ) => {

    setResumeData({
      ...resumeData,

      skills:
        resumeData.skills.filter(
          (_, i) =>
            i !== index
        ),
    });

  };

  return (
    <div>

      <div className="flex gap-3">

        <input
          className="border p-2 rounded flex-1"
          value={skill}
          placeholder="React"
          onKeyDown={handleKeyDown}
          onChange={(e) =>{
            if(e.target.value.at(-1)===','){
              return addSkill()
            }
            setSkill(
              e.target.value
            )
            }
            }
        />

        <button
          className="bg-primary text-white px-4 rounded"
          onClick={addSkill}
        >
          Add
        </button>

      </div>

      <div className="flex flex-wrap gap-3 mt-6">

        {resumeData.skills.map(
          (skill, index) => (
            <div
              key={index}
              className="px-4 py-2 bg-primary text-white rounded-full"
            >
              {skill}

              <button
                className="ml-2 hover:cursor-pointer"
                onClick={() =>
                  removeSkill(
                    index
                  )
                }
              >
                <X size={12}/>
              </button>

            </div>
          )
        )}

      </div>

    </div>
  );
}