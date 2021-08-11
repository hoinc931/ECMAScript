import {axiosClient} from './axiosClient';

const CategoryAPI = {
    getAll(){
        const url = `/categories`;
        return axiosClient.get(url);
    },
    get(id){
        const url = `/categories/${id}`;
        return axiosClient.get(url);
    },
    addCate(cate){
        const url = `/categories`;
        return axiosClient.post(url, cate);
    },
    remove(id){
        const url = `/categories/${id}`;
        return axiosClient.delete(url);
    },
    update(id, data){
        const url = `/categories/${id}`;
        return axiosClient.put(url, data);
    }
}

export default CategoryAPI;