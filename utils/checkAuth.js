import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = req.headers.authorization || "";

  if (token === "" || token === undefined || token === null) {
    res.status(403).json({ message: "Invalid authorization" });
  }

  const [bearer, jwtToken] = token.split(" ");

  if (bearer !== "Bearer") {
    res.status(401).json({ message: "Not authorized to access" });
  }

  try {
    const { _id } = jwt.verify(jwtToken, "secret123");

    req.userId = _id;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Not authorized to access" });
  }
};
