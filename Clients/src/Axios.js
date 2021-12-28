
import axios from 'axios'

const axiosCall =axios.create({
    baseURL:"http://localhost:8000/api/"
})

export default axiosCall;
