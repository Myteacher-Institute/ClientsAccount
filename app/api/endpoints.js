const endpoints = {
  login: 'users/login',
  register: 'users/register',
  userProfile: id => `users/${id}`,
  uploadKYC: id => `kyc/${id}/upload`,
  updateProfile: id => `users/${id}/update`,
  updateAvatar: id => `users/${id}/avatar/upload`,
  topupWithCard: id => `users/${id}/topupWithCard`,
  verifyTopup: id => 'users/verifyTopup',
  withdraw: id => `users/${id}/withdrawToBank`,
};

export default endpoints;
