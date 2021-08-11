import {axiosClient} from './axiosClient';

const ProductApi = {
    getAll(){
        const url = `/products?_limit=12`;
        return axiosClient.get(url);
    },
    getAllAdmin(){
        const url = `/products`;
        return axiosClient.get(url);
    },
    get(id){
        const url = `/products/${id}`;
        return axiosClient.get(url);
    },
    getCate(id){
        const url = `/products/${id}/?_expand=category&_limit=2`;
        return axiosClient.get(url);
    },
    addProduct(product){
        const url = `/products`;
        return axiosClient.post(url, product);
    },
    remove(id){
        const url = `/products/${id}`;
        return axiosClient.delete(url);
    },
    update(id, data){
        const url = `/products/${id}`;
        return axiosClient.put(url, data);
    },
    addCard(id){
        const url = `/products/${id}?_expand=category`;
        return axiosClient.get(url);
    },
    sameProduct(){
        const url = `/products/?_page=categoryId&_limit=4`;
        return axiosClient.get(url);
    }
}

export default ProductApi;