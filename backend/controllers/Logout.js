export const logout = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',
    path: '/',
    expires: new Date(0)
  });

  return res.status(200).json({ message: 'Logged out successfully' });
};
