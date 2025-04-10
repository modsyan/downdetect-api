const authService = require("../services/login");

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing email or password" });
    }

    const token = await authService.login(email, password);
    res.json({ token: token });
  } catch (error) {
    res.status(401).json({ message: "invalid " });
  }
}

async function refreshToken(req, res) {
  try {
    const { token } = req.body;
    const newToken = await authService.login(token);
    // console.log(newToken);
    res.json({ newToken: newToken });
  } catch (error) {
    // console.log(error);
    res.status(401).json({ message: "invalid" });
  }
}

module.exports = {
  login,
  refreshToken,
};
