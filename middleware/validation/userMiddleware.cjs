const { check, validationResult } = require("express-validator");

// signUp validation
const validatorUserSignUp = [
  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Must be a valid name")
    .isLength({ min: 3, max: 20 })
    .withMessage("Name must be 3 to 20 characters")
    .custom((value) => {
      if (/\d/.test(value)) {
        throw new Error("Name cannot contain numbers");
      }
      return true;
    }),

  check("email").normalizeEmail().isEmail().withMessage("Invalid email"),

  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password field cannot be empty")
    .isLength({ min: 3, max: 20 })
    .withMessage("Password must be 3 to 20 characters long"),

  check("confirmPassword")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Both passwords must be the same");
      }
      return true;
    }),

  check("phone")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Phone number must not be empty")
    .isLength({ min: 1, max: 11 })
    .withMessage("Phone number must be 1 to 11 characters long"),

  check("apartment")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Apartment field cannot be empty"),

  check("city")
    .trim()
    .not()
    .isEmpty()
    .withMessage("City field cannot be empty"),

  check("zip").trim().not().isEmpty().withMessage("Zip field cannot be empty"),

  check("country")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Country field cannot be empty"),
];

// sign-in validation
const validateUserSignIn = [
  check("email").trim().isEmail().withMessage("email/password is required!"),
  check("password")
    .trim()
    .notEmpty()
    .withMessage("email/password is required!"),
];

// To visualize validation result in the frontend
const userValidation = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();

  const error = result[0].msg;
  res.json({ success: false, message: error });
};

module.exports = {
  validatorUserSignUp,
  userValidation,
  validateUserSignIn,
};
