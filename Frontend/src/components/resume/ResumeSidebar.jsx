export default function ResumeSidebar({
  activeSection,
  setActiveSection,
}) {
  const sections = [
    "basics",
    "education",
    "experience",
    "projects",
    "skills",
    "achievements",
  ];

  return (
    <div className="bg-card border rounded-2xl p-4">

      {sections.map((section) => (
        <button
          key={section}
          className={`w-full text-left p-3 rounded-xl mb-2 ${
            activeSection === section
              ? "bg-primary text-white"
              : ""
          }`}
          onClick={() =>
            setActiveSection(section)
          }
        >
          {section}
        </button>
      ))}
    </div>
  );
}