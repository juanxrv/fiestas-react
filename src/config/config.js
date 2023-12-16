const BASE_URL = 'http://localhost:5191/api/'
import axios from 'axios'


// configure instance axios for use token in header (optional) and for use method GET, POST, PUT, DELETE

const axiosInstance = axios.create({

    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

// Add a request interceptor
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
        }
        return config
    },
    error => {
        Promise.reject(error)
    })

//Add a response interceptor

// axiosInstance.interceptors.response.use((response) => {
//     return response
// }, async function (error) {
//         const originalRequest = error.config
//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true
//             const refreshToken = localStorage.getItem('refreshToken')
//             const res = await axiosInstance.post('/auth/refreshToken', { refreshToken })
//             if (res.status === 201) {
//                 localStorage.setItem('token', res.data.token)
//                 localStorage.setItem('refreshToken', res.data.refreshToken)
//                 axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token
//                 return axiosInstance(originalRequest)
//             }
//         }
//         return Promise.reject(error)
//     }
// )

export default axiosInstance

