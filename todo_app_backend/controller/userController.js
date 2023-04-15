import { User } from "../models/userSchema.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/fearures.js";
import ErrorHandler from "../middleware/error.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User already exists", 400));

    const hashedPAssword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPAssword });

    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid email or password", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid email or password", 400));

    sendCookie(user, res, `Welcome ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  return res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: (process.env.NODE_DEV = "Development" ? "lax" : "none"),
      secure: (process.env.NODE_DEV = "Development" ? false : true),
    })
    .json({
      success: true,
      user: req.user,
    });
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};
