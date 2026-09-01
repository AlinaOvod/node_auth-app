import { register, activateUser, login, refresh, logout } from '../services/auth.service.js';
import { getRefreshTokenFromRequest, clearRefreshTokenCookie, setRefreshTokenCookie } from '../lib/tokens.js';


function respondWithSession(res, { accessToken, refreshToken, user }) {
  setRefreshTokenCookie(res, refreshToken);
  res.json({ accessToken, user });
}

export async function registerController(req, res) {
  await register(req.body);
  res.status(201).json({});
}

export async function activateController(req, res) {
  const { activationToken } = req.params;
  const session = await activateUser(activationToken);

  respondWithSession(res, session);
}

export async function loginController(req, res) {
  const session = await login(req.body);

  respondWithSession(res, session);
}

export async function refreshController(req, res) {
  const rawRefreshToken = getRefreshTokenFromRequest(req);
  const session = await refresh(rawRefreshToken);

  respondWithSession(res, session);
}

export async function logoutController(req, res) {
  const rawRefreshToken = getRefreshTokenFromRequest(req);

  await logout(rawRefreshToken);
  clearRefreshTokenCookie(res);
  res.status(204).end();
}

