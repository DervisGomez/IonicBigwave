export const ROOT = 'https://bigwave.herokuapp.com/v1';
export const routes = {
    login: (email, pass) => {
        return `auth/sign_in?email=${email}&password=${pass}`
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
    pymesCreate: () => {
        return `pymes/create`
    },
    sellers: () => {
    	return `sellers`
    },
    sellersCreate: () => {
        return `sellers/create`
    },
    independents: () => {
    	return `independents`
    },
    independentsCreate: () => {
        return `independents/create`
    },
    categoriesFilter: () => {
        return `profiles/categories`
    },
    categories: () =>{
        return   `profiles/categories`
    },
    geolocation:() =>{
        return `geolocation/look_for`
    }
 }
