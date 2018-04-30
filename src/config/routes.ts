export const ROOT = 'https://bigwave.herokuapp.com/v1/';
export const routes = {
    login: (email, pass) => {
        return `/auth/sign_in?email=${email}&password=${pass}`
    },
    registerUser: () => {
        return `auth`
    },
    registerUser2: () => {
        return `${ROOT}/auth`
    },
    perfil: () =>{
    	//return `${ROOT}/users/current`;
        return `users/current`
    },
    pymes: () => {
    	return `pymes`
    },
    sellers: () => {
    	return `sellers`
    },
    independents: () => {
    	return `independents`
    },
    categoriesFilter: () => {
        return `profiles/categories`
    },
    categories: () =>{
        return   `profiles/categories`
    }
 }
