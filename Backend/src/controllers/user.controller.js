import { pool } from "../config/db.js";

export const getCurrentUser = async (
  req,
  res
) => {
  try {
    const result = await pool.query(
      `
      SELECT
        id,
        name,
        email,
        avatar_url,
        created_at
      FROM users
      WHERE id = $1
      `,
      [req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};