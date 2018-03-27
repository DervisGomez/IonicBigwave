const ROOT = 'https://bigwave.herokuapp.com';
export const routes = {
    login: (email, pass) => {
        return `${ROOT}/auth/sign_in?email=${email}&password=${pass}`
    },
    registerUser: () => {
        return `${ROOT}/auth`
    }
}
