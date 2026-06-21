import { useEffect, useState } from "react";
import {
  createResume,
  getAllResumes,
  deleteResume,
} from "../services/resume.service";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    const res = await getAllResumes(token);

    setResumes(res.data.resumes);
  };

  const handleCreate = async () => {
    const res = await createResume({},token);
    navigate(`/resume/${res.data.resume.id}`);
  };

  const handleDelete = async (id) => {
    await deleteResume(id,token);

    fetchResumes();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">

      <div className="flex flex-col gap-4 justify-between mb-6">

        <h1 className="text-3xl font-bold">
          My Resumes
        </h1>

        <button
          onClick={handleCreate}
          className="bg-primary text-white px-4 py-2 rounded-xl"
        >
          + New Resume
        </button>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {resumes.map((resume) => (
          <div
            key={resume.id}
            className="border border-border rounded-2xl p-5 bg-card"
          >
            <h2 className="font-semibold text-xl">
              {resume.title}
            </h2>

            <p className="text-sm opacity-70 mt-2">
              {resume.template}
            </p>

            <div className="flex gap-3 mt-4">

              <button
                onClick={() =>
                  navigate(`/resume/${resume.id}`)
                }
                className="bg-primary text-white px-4 py-2 rounded-lg"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  handleDelete(resume.id)
                }
                className="border px-4 py-2 rounded-lg"
              >
                Delete
              </button>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}