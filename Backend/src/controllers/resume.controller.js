import { pool } from "../config/db.js";
import slugify from "slugify";

export const createResume = async (
  req,
  res
) => {
  try {

    const userId = req.userId;

    let { title } = req.body;

    if (!title) {
    const countResult = await pool.query(
        `
        SELECT COUNT(*) AS total
        FROM resumes
        WHERE user_id = $1
        `,
        [userId]
    );

    title = `Resume ${Number(countResult.rows[0].total) + 1}`;
    }

    const slug = slugify(title, {
    lower: true,
    strict: true,
    }) + "-" + Date.now();
   
    const resumeResult =
      await pool.query(
        `
        INSERT INTO resumes
        (
          user_id,
          title,
          slug
        )
        VALUES
        (
          $1,
          $2,
          $3
        )
        RETURNING *
        `,
        [
          userId,
          title,
          slug
        ]
      );

    const resume =
      resumeResult.rows[0];

    await pool.query(
      `
      INSERT INTO resume_data
      (
        resume_id
      )
      VALUES
      (
        $1
      )
      `,
      [resume.id]
    );

    return res.status(201).json({
      success: true,
      resume,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to create resume",
    });

  }
};

export const getAllResumes = async (
  req,
  res
) => {

  try {

    const userId = req.userId;

    const result =
      await pool.query(
        `
        SELECT
          id,
          title,
          template,
          updated_at
        FROM resumes
        WHERE user_id=$1
        ORDER BY updated_at DESC
        `,
        [userId]
      );

    return res.json({
      success: true,
      resumes: result.rows,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch resumes",
    });

  }
};

export const getResumeById = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const userId = req.userId;

    const result =
      await pool.query(
        `
        SELECT

          r.id,
          r.title,
          r.template,

          rd.basics,
          rd.education,
          rd.experience,
          rd.projects,
          rd.skills

        FROM resumes r

        JOIN resume_data rd

        ON r.id=rd.resume_id

        WHERE r.id=$1
        AND r.user_id=$2
        `,
        [id, userId]
      );

    if (!result.rows.length) {

      return res.status(404).json({
        success: false,
        message:
          "Resume not found",
      });

    }

    return res.json({
      success: true,
      resume: result.rows[0],
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch resume",
    });

  }
};

export const updateResume = async (
  req,
  res
) => {

  const client =
    await pool.connect();

  // console.log(req.body);
  
  try {

    const { id } = req.params;

    const {
      title,
      basics = {},
      education = [],
      experience = [],
      projects = [],
      skills = [],
      achievements = [],
    } = req.body;
  
    await client.query(
      "BEGIN"
    );

    await client.query(
      `
      UPDATE resumes

      SET
        title=$1,
        updated_at=NOW()

      WHERE id=$2
      `,
      [title, id]
    );

    await client.query(
      `
      UPDATE resume_data

      SET

      basics=$1,

      education=$2,

      experience=$3,

      projects=$4,

      skills=$5

      WHERE resume_id=$6
      `,
      [
        JSON.stringify(basics),
        JSON.stringify(education),
        JSON.stringify(experience),
        JSON.stringify(projects),
        JSON.stringify(skills),
        id
      ]
    );

    await client.query(
      "COMMIT"
    );

    return res.json({
      success: true,
      message:
        "Resume updated successfully",
    });

  } catch (error) {

    await client.query(
      "ROLLBACK"
    );

    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to update resume",
    });

  } finally {

    client.release();

  }
};

export const deleteResume = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    await pool.query(
      `
      DELETE FROM resumes
      WHERE id=$1
      `,
      [id]
    );

    return res.json({
      success: true,
      message:
        "Resume deleted successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to delete resume",
    });

  }
};

export const togglePublicResume =
  async (req, res) => {

    try {

      const { id } = req.params;

      const {
        is_public,
      } = req.body;

      await pool.query(
        `
        UPDATE resumes

        SET
        is_public=$1

        WHERE id=$2
        `,
        [
          is_public,
          id,
        ]
      );

      return res.json({
        success: true,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to update visibility",
      });

    }
  };

  export const getPublicResume =
  async (req, res) => {

    try {

      const { slug } =
        req.params;

      const result =
        await pool.query(
          `
          SELECT

          r.title,

          rd.basics,
          rd.education,
          rd.experience,
          rd.projects,
          rd.skills

          FROM resumes r

          JOIN resume_data rd

          ON r.id=rd.resume_id

          WHERE r.slug=$1
          AND r.is_public=true
          `,
          [slug]
        );

      if (
        !result.rows.length
      ) {

        return res.status(404).json({
          success: false,
        });

      }

      return res.json({
        success: true,
        resume:
          result.rows[0],
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
      });

    }
  };