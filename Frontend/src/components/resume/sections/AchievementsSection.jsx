export default function AchievementsSection({
  resumeData,
  setResumeData,
}) {
  // Safe initialization fallback if achievements doesn't exist yet
  const achievements = resumeData.achievements || [];

  const addAchievement = () => {
    setResumeData({
      ...resumeData,
      achievements: [
        ...achievements,
        {
          title: "",
        },
      ],
    });
  };

  const updateAchievement = (index, field, value) => {
    // Clean, immutable update mapping over the items
    const updated = achievements.map((ach, i) =>
      i === index ? { ...ach, [field]: value } : ach
    );

    setResumeData({
      ...resumeData,
      achievements: updated,
    });
  };

  const removeAchievement = (index) => {
    setResumeData({
      ...resumeData,
      achievements: achievements.filter(
        (_, i) => i !== index
      ),
    });
  };

  return (
    <div className="space-y-6">
      
      {achievements.map((ach, index) => (
        <div
          key={index}
          className="border rounded-xl p-4 space-y-3 relative group text-foreground"
        >
          <input
            className="border p-2 w-full rounded"
            placeholder="Achievement Title (e.g., Hackathon Winner, Open Source Contributor)"
            value={ach.title}
            onChange={(e) =>
              updateAchievement(
                index,
                "title",
                e.target.value
              )
            }
          />

          <button
            className="text-red-500 rounded-md p-2 hover:bg-red-500/10 block pt-1"
            onClick={() => removeAchievement(index)}
          >
            Remove
          </button>
        </div>
      ))}

      <button
        className="bg-primary text-white px-4 py-2 rounded-xl transition hover:opacity-90"
        onClick={addAchievement}
      >
        + Add Achievement
      </button>

    </div>
  );
}