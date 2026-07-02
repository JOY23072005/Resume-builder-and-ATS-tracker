import bcrypt from "bcryptjs";
import { pool } from "../config/db.js";
import { generateToken } from "../utils/jwt.js";
import { client } from "../utils/google.js";
import { generateOtp } from "../utils/otp.js";
import { sendEmail } from "../utils/sendEmail.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const passwordHash = await bcrypt.hash(
      password,
      10
    );

    const result = await pool.query(
      `
      INSERT INTO users
      (name, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, name, email
      `,
      [name, email, passwordHash]
    );

    const user = result.rows[0];

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error("Signup Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const sendVerificationOtp = async (
  req,
  res
) => {
  try {
    const { email } = req.body;

    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (!userResult.rows.length) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user = userResult.rows[0];

    const otp = generateOtp();

    await pool.query(
      `
      INSERT INTO otp_codes
      (user_id, otp, purpose, expires_at)
      VALUES (
        $1,
        $2,
        'email_verification',
        NOW() + INTERVAL '10 minutes'
      )
      `,
      [user.id, otp]
    );

    await sendEmail(
      email,
      "Email Verification",
      `<h2>Your OTP is ${otp}</h2>`
    );

    res.json({
      success: true,
      message: "OTP sent",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const verifyEmailOtp = async (
  req,
  res
) => {
  try {
    const { email, otp } = req.body;

    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (!userResult.rows.length) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user = userResult.rows[0];

    const otpResult = await pool.query(
      `
      SELECT *
      FROM otp_codes
      WHERE user_id = $1
      AND otp = $2
      AND purpose = 'email_verification'
      AND expires_at > NOW()
      ORDER BY created_at DESC
      LIMIT 1
      `,
      [user.id, otp]
    );

    if (!otpResult.rows.length) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    await pool.query(
      `
      UPDATE users
      SET
      is_verified = true,
      verified_at = NOW()
      WHERE id = $1
      `,
      [user.id]
    );

    await pool.query(
      `
      DELETE FROM otp_codes
      WHERE user_id = $1
      AND purpose = 'email_verification'
      `,
      [user.id]
    );
    
    res.json({
      success: true,
      message: "Email verified",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const result = await pool.query(
      `
      SELECT *
      FROM users
      WHERE email = $1
      `,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const user = result.rows[0];

    if (!user.is_verified) {
        return res.status(403).json({
            success: false,
            message:
            "Please verify your email first",
        });
    }

    if(!user.password_hash){
      return res.status(403).json({
            success: false,
            message:
            "Please login via google OAUTH",
        });
    }

    const isPasswordValid =
      await bcrypt.compare(
        password,
        user.password_hash
      );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    generateToken(user.id,res);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      // token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const forgotPassword = async (
  req,
  res
) => {
  try {
    const { email } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user = result.rows[0];

    const otp = generateOtp();

    await pool.query(
      `
      INSERT INTO otp_codes
      (user_id, otp, purpose, expires_at)
      VALUES (
        $1,
        $2,
        'password_reset',
        NOW() + INTERVAL '10 minutes'
      )
      `,
      [user.id, otp]
    );

    await sendEmail(
      email,
      "Password Reset",
      `<h2>Your reset OTP is ${otp}</h2>`
    );

    res.json({
      success: true,
      message: "OTP sent",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const verifyResetOtp = async (
  req,
  res
) => {
  const { email, otp } = req.body;

  const user = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (!user.rows.length) {
    return res.status(404).json({
      success: false,
    });
  }

  const result = await pool.query(
    `
    SELECT *
    FROM otp_codes
    WHERE user_id = $1
    AND otp = $2
    AND purpose = 'password_reset'
    AND expires_at > NOW()
    `,
    [user.rows[0].id, otp]
  );

  if (!result.rows.length) {
    return res.status(400).json({
      success: false,
      message: "Invalid OTP",
    });
  }

  await pool.query(
    `
    UPDATE otp_codes
    SET verified = true
    WHERE id = $1
    `,
    [result.rows[0].id]
  );

  res.json({
    success: true,
  });
};

export const resetPassword = async (
  req,
  res
) => {
  try {
    const { email, otp, newPassword } =
      req.body;

    if(!email || !otp || !newPassword){
      return res.status(400).json({
        success: false,
        message: "Please provide all details",
      });
    }
    
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    const user = userResult.rows[0];

    const otpResult = await pool.query(
      `
      SELECT *
      FROM otp_codes
      WHERE user_id = $1
      AND otp = $2
      AND purpose = 'password_reset'
      AND verified = true
      `,
      [user.id, otp]
    );

    if (!otpResult.rows.length) {
      return res.status(400).json({
        success: false,
        message: "OTP not verified",
      });
    }

    const hash = await bcrypt.hash(
      newPassword,
      10
    );

    await pool.query(
      `
      UPDATE users
      SET password_hash = $1
      WHERE id = $2
      `,
      [hash, user.id]
    );

    await pool.query(
      `
      DELETE FROM otp_codes
      WHERE user_id = $1
      AND purpose = 'password_reset'
      `,
      [user.id]
    );

    res.json({
      success: true,
      message: "Password updated",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const googleLogin = async (
  req,
  res
) => {
  try {
    const { credential } = req.body;

    if(!credential){
      return res.status(403).json({
        success:false,
        message:"Please provide credentials"
      })
    }
    
    const ticket =
      await client.verifyIdToken({
        idToken: credential,
        audience:
          process.env.GOOGLE_CLIENT_ID,
      });

    const payload = ticket.getPayload();

    const {
      sub,
      name,
      email,
      picture,
    } = payload;

    let result = await pool.query(
      `
      SELECT *
      FROM users
      WHERE email=$1
      `,
      [email]
    );

    let user;

    if (result.rows.length === 0) {
      const newUser =
        await pool.query(
          `
          INSERT INTO users
          (
            name,
            email,
            avatar_url,
            google_id,
            is_verified,
            verified_at
          )
          VALUES
          (
            $1,
            $2,
            $3,
            $4,
            true,
            NOW()
          )
          RETURNING *
          `,
          [
            name,
            email,
            picture,
            sub,
          ]
        );

      user = newUser.rows[0];
    } else {
      user = result.rows[0];
    }

    generateToken(
      user.id,
      res
    );

    return res.json({
      success: true,
      // token,
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Google login failed",
    });
  }
};

export const logout = (req, res) => {
    res.clearCookie("jwt", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });

    return res.status(200).json({
        success: true,
        message: "Logout successful",
    });
};