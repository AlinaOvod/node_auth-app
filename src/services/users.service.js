import { prisma } from '../lib/prisma.js';
import { hashPassword, verifyPassword } from '../lib/password.js';
import { ApiError } from '../utils/ApiError.js';
import { toPublicUser } from '../utils/toPublicUser.js';

export async function getMe(userId) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  return toPublicUser(user);
}

export async function updateName(userId, name) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { name },
  });

  return toPublicUser(user);
}

export async function changePassword(userId, { oldPassword, newPassword }) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  const isOldPasswordCorrect = await verifyPassword(
    oldPassword,
    user.passwordHash,
  );

  if (!isOldPasswordCorrect) {
    throw new ApiError(
      400,
      'INVALID_PASSWORD',
      'Current password is incorrect',
    );
  }

  const passwordHash = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash },
  });
}
