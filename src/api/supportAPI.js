import {axiosClient} from './axiosClient';

const SupportAPI = {
    getAll(){
        const url = `/supports`;
        return axiosClient.get(url);
    },
    get(id){
        const url = `/supports/${id}`;
        return axiosClient.get(url);
    },
    remove(id){
        const url = `/supports/${id}`;
        return axiosClient.delete(url);
    },
    send(content){
        const url = `/supports`;
        return axiosClient.post(url, content);
    }
}

export default SupportAPI;