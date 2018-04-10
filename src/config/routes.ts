export const ROOT = 'https://bigwave.herokuapp.com/v1';
export const routes = {
    login: (email, pass) => {
        return `/auth/sign_in?email=${email}&password=${pass}`
    },
    registerUser: () => {
        return `auth`
    },
    perfil: () =>{
    	//return `${ROOT}/users/current`;
        return `/users/current`;
    },
    pymes: () => {
    	return `${ROOT}/pymes`;
    },
    sellers: () => {
    	return `${ROOT}/sellers`;
    },
    independents: () => {
    	return `${ROOT}/independents`;
    }
}
