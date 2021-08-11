// import data from '../data';//1

import ProductApi from '../api/productAPI'; //sử dụng folder api

// import axios from 'axios';

const Products = {
//sử dụng fetch
//1 không có async
    async render(){
        try {
            const {data : products} = await ProductApi.getAll();
// console.log(products);
            // const reponse = await axios('https://5e79b4b817314d00161333da.mockapi.io/products');
            // const products = await reponse.data;
            const result = products.map(product =>{
                return `
                    <div class="col-4">
                        <div class="card">
                            <img src="${product.image}" class="card-img-top" alt="${product.name}">
                            <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">Mo ta</p>
                            <p class="text-danger">${product.price}</p>
                            <a href="#/products/${product.id}" class="btn btn-primary">Xem chi tiet</a>
                            </div>
                        </div>
                    </div>
                `
            }).join("");
// console.log(result);
            return `
            <h1>Sản phẩm</h1>
            <div class="row">
                ${result}
            </div>
        `
        } catch (error) {
            console.log(error);
        }
        // const {products} = data;//1
        // const result = products.map(product =>{
    }
}

export default Products;