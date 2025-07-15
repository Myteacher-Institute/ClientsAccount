const endpoints = {
    login: 'login',
    register: 'register',
    userProfile: (id) => `${id}`,
    updateProfile: (id) => `${id}/update`,
    updateAvatar: (id) => `${id}/avatar/upload`,
};

export default endpoints;
