import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getResumeById,
  updateResume,
  exportToPdf,
} from "../services/resume.service";

import ResumeSidebar from "../components/resume/ResumeSidebar";

import BasicsSection from "../components/resume/sections/BasicsSection";
import EducationSection from "../components/resume/sections/EducationSection";
import ExperienceSection from "../components/resume/sections/ExperienceSection";
import ProjectSection from "../components/resume/sections/ProjectSection";
import SkillSection from "../components/resume/sections/SkillSection";

import ResumePreview from "../components/resume/ResumePreview";
import AchievementsSection from "../components/resume/sections/AchievementsSection";
import useJobPolling from "../hooks/useJobPolling";

export default function ResumeEditor() {

  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [resumeData, setResumeData] = useState(null);
  const { startPolling } = useJobPolling();

  const [activeSection, setActiveSection] =
    useState("basics");

  useEffect(() => {
    loadResume();
  }, []);

  const loadResume = async () => {

    const res = await getResumeById(id,token);
    setResumeData(res.data.resume);

  };

  const handleExport = async () => {

    const res = await exportToPdf(id);

    if (!res) return;

    startPolling(res.data.jobId);

  };

  if (!resumeData)
    return <h1>Loading...</h1>;

  return (
    <div className="grid grid-cols-12 gap-6 p-6">

      {/* Sidebar */}
      <div className="col-span-12 md:col-span-6 lg:col-span-2">
        <ResumeSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>

      {/* Form */}
      <div className="col-span-12 md:col-span-6 lg:col-span-4">

        {activeSection === "basics" && (
          <BasicsSection
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        )}

        {activeSection === "education" && (
          <EducationSection
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        )}

        {activeSection === "experience" && (
          <ExperienceSection
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        )}

        {activeSection === "projects" && (
          <ProjectSection
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        )}

        {activeSection === "skills" && (
          <SkillSection
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        )}

        {activeSection === "achievements" && (
          <AchievementsSection
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        )}

        <button
          className="mt-6 bg-primary text-white px-4 py-2 rounded-xl"
          onClick={() =>{
            
            // console.log(JSON.stringify(resumeData, null, 2));
            updateResume(id, resumeData)
            }
          }
        >
          Save Resume
        </button>
        <button
          className="mt-6 ml-4 bg-primary text-white px-4 py-2 rounded-xl"
          onClick={handleExport}
        >
          Export To PDF
        </button>
      </div>

      {/* Preview */}
      <div className="col-span-12 lg:col-span-6">
        <ResumePreview
          data={resumeData}
        />
      </div>
    </div>
  );
}