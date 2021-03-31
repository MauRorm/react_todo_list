const DOMAIN = window.location.host.indexOf('localhost') > -1 ? 'http://localhost:3000' : 'https://todo-server-node-v1.herokuapp.com';
const apiConstants = {
    API_POST_LOGIN: `${DOMAIN}/auth/login`,
    API_GET_PROFILE: `${DOMAIN}/userProfile`,
    API_TODO: `${DOMAIN}/todo/`,
};

export default apiConstants
