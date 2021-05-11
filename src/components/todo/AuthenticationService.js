import axios from 'axios'
import {API_URL} from '../../Constants'

export const USER_NAME_SESSION_ATTIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }
    
    createJwtToken(token) {
        return 'Bearer ' + token
    }

    executeBasicAuthenticationService(username, password){
        return axios.get(`${API_URL}/basicauth`, {headers:  {authorization: this.createBasicAuthToken(username, password)}})
    }
    
    executeJwtAuthenticationService(username, password){
        return axios.post(`${API_URL}/authenticate`, {username, password})
    }
    
    registerSuccesfullLoginForJwt(username, token){
        console.log('registerSuccessfulLogin')
        sessionStorage.setItem(USER_NAME_SESSION_ATTIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createJwtToken(token))
    }

    registerSuccesfullLogin(username, password){
        console.log('registerSuccessfulLogin')
        sessionStorage.setItem(USER_NAME_SESSION_ATTIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
    }
    
    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTIBUTE_NAME);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTIBUTE_NAME)
        if (user === null){
            return false
        }
        return true
    }

    getLoggedInUser() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTIBUTE_NAME)
        if (user === null){
            return ''
        }
        return user
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn){
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()