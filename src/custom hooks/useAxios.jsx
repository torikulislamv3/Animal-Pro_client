import axios from 'axios';
 const axiosHook = axios.create({
    baseURL : "http://localhost:5000"
})
const useAxios = () => {
    return axiosHook;
};

export default useAxios;