import api from "./recipeService.js";


export async function loginUser(Email, Password){
    const response = await api.post('/Auth/login', {Email, Password})
    return response.data

}

export async function registerUser(UserName, Email, Password){
    const response = await api.post('/Auth/register', {UserName, Email, Password})
    return response.data
}

export default api;