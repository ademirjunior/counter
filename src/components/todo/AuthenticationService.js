import axios from 'axios'

class AuthenticationService {

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }
    
    createJwtToken(token) {
        return 'Bearer ' + token
    }

    executeBasicAuthenticationService(username, password){
        return axios.get('http://localhost:8080/basicauth', {headers:  {authorization: this.createBasicAuthToken(username, password)}})
    }
    
    executeJwtAuthenticationService(username, password){
        return axios.post('http://localhost:8080/authenticate', {username, password})
    }
    
    registerSuccesfullLoginForJwt(username, token){
        console.log('registerSuccessfulLogin')
        sessionStorage.setItem('authenticatedUser', username);
        this.setupAxiosInterceptors(this.createJwtToken(token))
    }

    registerSuccesfullLogin(username, password){
        console.log('registerSuccessfulLogin')
        sessionStorage.setItem('authenticatedUser', username);
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
    }
    
    logout() {
        sessionStorage.removeItem('authenticatedUser');
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser')
        if (user === null){
            return false
        }
        return true
    }

    getLoggedInUser() {
        let user = sessionStorage.getItem('authenticatedUser')
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