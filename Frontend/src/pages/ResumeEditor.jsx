import { useEffect, useState,useRef } from "react";
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
import ResumeSettings from "../components/resume/ResumeSettings";

export default function ResumeEditor() {

  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [resumeData, setResumeData] = useState(null);
  const [saved,setSaved] = useState("");
  const { startPolling } = useJobPolling();

  const [activeSection, setActiveSection] = useState("basics");

  const firstLoad = useRef(true);
  
  useEffect(() => {
    loadResume();
  }, []);

  useEffect(() => {

    if (!resumeData)
      return;

    if (firstLoad.current) {

      firstLoad.current = false;

      return;

    }

    setSaved("Saving...");

    const timer = setTimeout(async () => {

      await updateResume(id, resumeData);

      setSaved("Saved");

    }, 2000);

    return () => clearTimeout(timer);

  }, [resumeData]);

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
          resumeData={resumeData}
          setResumeData={setResumeData}
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
        <ResumeSettings
          resumeData={resumeData}
          setResumeData={setResumeData}
          onExport={handleExport}
          onSave={() => updateResume(id, resumeData)}
          saved={saved}
        />
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