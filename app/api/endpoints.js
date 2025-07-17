const endpoints = {
    login: 'users/login',
    register: 'users/register',
    userProfile: (id) => `users/${id}`,
    uploadKYC: (id) => `kyc/${id}/upload`,
    updateProfile: (id) => `users/${id}/update`,
    updateAvatar: (id) => `users/${id}/avatar/upload`,
};

export default endpoints;
