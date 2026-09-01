import {
  getMe,
  updateName,
  changePassword,
} from '../services/users.service.js';

export async function getMeController(req, res) {
  const user = await getMe(req.userId);

  res.json(user);
}

export async function updateNameController(req, res) {
  const user = await updateName(req.userId, req.body.name);

  res.json(user);
}

export async function changePasswordController(req, res) {
  await changePassword(req.userId, req.body);
  res.status(200).json({});
}
