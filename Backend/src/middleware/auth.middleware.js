import { verifyToken } from "../utils/jwt.js";

export const protectRoute = async (req, res, next) => {
  try {
    // const authHeader = req.headers.authorization;

    // if (
    //   !authHeader ||
    //   !authHeader.startsWith("Bearer ")
    // ) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Unauthorized",
    //   });
    // }

    // const token = authHeader.split(" ")[1];

    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({
            success:false,
            message:"Unauthorized"
        });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};