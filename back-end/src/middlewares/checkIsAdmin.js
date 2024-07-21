export const checkIsAdmin = async (res, req, next) => {
  try {
    if (req.user.role === "admin") {
      return next();
    }
    return res.status(401).json({
      message: "Unthorrized",
    });
  } catch (error) {
    return res.status(401).json({
      message: "Unthorrized",
    });
  }
};
