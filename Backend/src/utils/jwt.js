import jwt from "jsonwebtoken";

export const generateToken = (userId,res) => {
  const token = jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  res.cookie('jwt',token,{
    maxAge:7*24*60*60*1000,
    httpOnly:true,
    secure:process.env.NODE_ENV==='production',
    sameSite:
    process.env.NODE_ENV === "production"
      ? "none"
      : "lax",
    }
  )
  return token;
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    return decoded;
  } catch (error) {
    return null;
  }
};