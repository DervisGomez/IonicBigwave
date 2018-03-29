const ROOT = 'https://bigwave.herokuapp.com/v1';
export const routes = {
    login: (email, pass) => {
        return `${ROOT}/auth/sign_in?email=${email}&password=${pass}`
    },
    registerUser: () => {
        return `${ROOT}/auth`
    },
    perfil: () =>{
    	return `${ROOT}/current`;
    }
}
