import User from "../models/user.models.js";
import ApiError from "../utils/ApiError.utils.js";
import ApiResponse from "../utils/ApiResponse.utils.js";
import asyncHandler from "../utils/AsyncHandler.utils.js";

const handleRegister = asyncHandler(async (req, res) => {
  const { fullName, userName, email, password } = req.body;

  if (
    [fullName, userName, email, password].some(
      (element) => element.trim() == "",
    )
  ) {
    throw new ApiError(500, "All credentials are required");
  }

  const existedUser = await User.findOne({
    $or: [{ email }, { userName }],
  });

  if (existedUser) {
    throw new ApiError(500, "User already exists...");
  }

  const user = await User.create({
    fullName,
    userName,
    email,
    password,
  });

  if (!user) {
    throw new ApiError(500, "Failed to create User");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User Created Successfully"));
});

const handleLogIn = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName && !email) {
    throw new ApiError(500, "UserName or email is required.");
  }
  if (!password) {
    throw new ApiError(500, "Please enter password");
  }

  //   const accessToken =

  const user = await User.findOne({
    $or: [{ userName }, { email }],
  }).select("+password");

  if (!user) {
    throw new ApiError(500, "User does not exist.");
  }

  console.log("USER: ", user);

  const isPassTrue = await user.checkPass(password);

  console.log("isPassword true: 0", isPassTrue);

  if (!isPassTrue) {
    throw new ApiError(500, "Password did not match");
  }

  const secretSalt = await user.createSalt(user._id);

  if (!secretSalt) {
    throw new ApiError(500, "Secret Salt not created");
  }

  user.salt = secretSalt;
  user.save();

  return res
    .status(200)
    .cookie("secretSalt", secretSalt)
    .json(new ApiResponse(200, user, "User logged In."));
});

export { handleRegister, handleLogIn };
