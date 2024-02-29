import userModel from "../../model/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const isAuthorize = async (req, res, next) => {
  const jwt_secret = process.env.SECRET;

  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];

    try {
      const decode = jwt.verify(token, jwt_secret);
      console.log("Decoded Token:", decode);

      const user = await userModel.findById(decode.userId).select("+token");
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User not found, unauthorized access!",
        });
      }

      req.user = user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.json({
          success: false,
          message: "session expired try sign in!",
        });
      }
      if (error.name === "JsonWebTokenError") {
        return res.json({
          success: false,
          message: "unauthorized access!",
        });
      }

      res
        .status(404)
        .json({ success: false, message: "Internal server error!" });
    }
  } else {
    res.status(200).json({ success: true, message: "unauthorized access!" });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json("Not authorized as an admin");
  }
};
export { isAuthorize, admin };

// const isAuthorize = asyncHandler(async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];

//       const decoded = jwt.verify(token, process.env.SECRET);
//       console.log("Decoded Token:", decoded);

//       req.user = await userModel.findById(decoded.userId).select("-password");

//       next();
//     } catch (error) {
//       console.error(error);
//       res.status(401);
//       throw new Error("Not authorized, token failed");
//     }
//   }

//   if (!token) {
//     res.status(401);
//     throw new Error("Not authorized, no token");
//   }
// });
