
import jwt from "jsonwebtoken";

export const generateToken = (res, adminId) => {
  const token = jwt.sign({ id: adminId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  res.cookie("AdminToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // only https in prod
    sameSite: "Strict",
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 days
  });

  return token;
};
