const endpoints = {
  login: 'users/login',
  register: 'users/register',
  userProfile: id => `users/${id}`,
  uploadKYC: id => `kyc/${id}/upload`,
  verifyTopUp: id => 'users/verifyTopUp',
  updateProfile: id => `users/${id}/update`,
  withdraw: id => `users/${id}/withdrawToBank`,
  updateAvatar: id => `users/${id}/avatar/upload`,
  topUpWithCard: id => `users/${id}/topUpWithCard`,
  updateAfterDeposit: id => `users/${id}/updateAfterDeposit`,
};

export default endpoints;
