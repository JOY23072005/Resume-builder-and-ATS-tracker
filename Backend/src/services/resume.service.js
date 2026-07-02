import { pool } from "../config/db.js";

export const getResumeById = async (
  id,
  userId
) => {

  // console.log({
  //   resumeId: id,
  //   userId
  // });

  const result = await pool.query(
    `
    SELECT

      r.id,
      r.title,
      r.template,

      rd.basics,
      rd.education,
      rd.experience,
      rd.projects,
      rd.skills,
      rd.achievements

    FROM resumes r

    JOIN resume_data rd
    ON r.id = rd.resume_id

    WHERE r.id = $1
    AND r.user_id = $2
    `,
    [id, userId]
  );

  // console.log("after queery")

  return result.rows[0] || null;

};