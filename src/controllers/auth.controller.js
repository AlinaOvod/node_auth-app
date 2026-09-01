import { register, activateUser } from '../services/auth.service.js';
import { setRefreshTokenCookie } from '../lib/tokens.js';

export async function registerController(req, res) {
  await register(req.body);
  res.status(201).json({});
}

export async function activateController(req, res) {
  const { activationToken } = req.params;
  const { accessToken, refreshToken, user } =
    await activateUser(activationToken);

  setRefreshTokenCookie(res, refreshToken);
  res.json({ accessToken, user });
}
