import rateLimit from "express-rate-limit";

export const shortenLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: "Too many URLs created. Try again 1 minute later.",
});

export const redirectLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5000,
});
