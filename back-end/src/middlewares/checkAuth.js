export const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.slit("")[1];
  } catch (error) {
    return res.status(401).json({
      message: "Unthorized",
    });
  }
};
