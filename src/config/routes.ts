export const ROOT = 'https://bigwave.herokuapp.com/v1';
export const routes = {
    login: (email, pass) => {
        return `auth/sign_in?email=${email}&password=${pass}`
    },
    sing_out: () => {
        return `auth/sign_out`
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
    sellersShow: () => {
        return `sellers/own`
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
    productsAll(){
        return 'products/all';
    },
    geolocation:() =>{
        return `geolocation/look_for`
    },
    follow:(type,profile) =>{
        return `current_user/follow/${type}/${profile}`
    },
    unfollow:(type,profile) =>{
        return `current_user/unfollow/${type}/${profile}`
    },
    following:(type,) =>{
        return `current_user/following/${type}`
    }
 }
