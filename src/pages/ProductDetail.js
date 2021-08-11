// import data from '../data';
import { $ , parserRequetsUrl } from '../utils';
// import axios from 'axios';

import ProductApi from '../api/productAPI'; //sử dụng folder api
import CategoryAPI from '../api/categoryAPI';
import AddToCard from '../component/addToCard.js'

const ProductDetail = {
    async render(){
        window.scrollTo(0, 0);
        try {
            const {id} = parserRequetsUrl();
            const {data : product} = await ProductApi.get(id);
            const {data:category} = await CategoryAPI.get(product.categoryId);
            // const product = products.find(product => product.id == id);
            const {data : products} = await ProductApi.sameProduct();
            var count = 1;
            const resultCate =  products.map(item => {
                const price = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)
                // if()

                return `
                    <div class="col-3 pb-4">
                        <div class="card  shadow h-100">
                            <img src="${item.image}" class="card-img-top" alt="${item.name}">
                            <div class="card-body">
                                <h5 class="card-title">${item.name}</h5>
                                <p class="text-danger">${price}</p>
                                <a href="#/products/${item.id}" class="btn btn-primary">Chi tiết</a>
                            </div>
                        </div>
                    </div>
                `
            }).join("");
            
            const priceDetail = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)
            
            return /*html*/`
            <div class="container">
                <h6 class="text-left my-4"><a href="index.html" class="link-dark"><i class="fas fa-home"></i> Trang chủ</a>  /   <a href="/#/category/${category.id}" class="text-dark">${category.name}</a>  /  ${product.name}</h6>
                <hr>
                <div class="row">
                    <div class="col-5"  style="object-fit: cover;">
                        <img src="${product.image}" width="90%" alt="${product.name}">
                    </div>

                    <div class="col-7 ps-5">
                        <h1>${product.name}</h1>
                        <p>Mô tả sản phẩm: ${product.detail}</p>
                        <p>Giá: ${priceDetail}</p>
                        

                        <div class="pay">
                            <button class="btn btn-outline-secondary text-uppercase" style="width:200px">Mua ngay</button>
                            <button class="btn btn-outline-secondary text-uppercase" id="addCard" data-id="${product.id}" style="width:200px">Thêm vào giỏ</button>
                        </div>
                    </div>
                </div>

                <hr>
                <div class="detailProduct">
                    <h2 class="text-uppercase text-center ">chi tiết sản phẩm</h2>
                    <p>${product.detail}</p>
                </div>

                <div class="sameProduct pt-5">
                    <h2 class="text-uppercase ">sản phẩm tương tự</h2>
                    <hr>
                    <div class="row">
                        ${resultCate}
                    </div>
                </div>
            </div>
            `
        } catch (error) {
            console.log(error);
        }

        
    },
    async afterRender(){
        $('#addCard').addEventListener('click', async function(){
        
            const id = $('#addCard').dataset.id;
            await AddToCard.addToCartSto(id);
        })
    }
}
export default ProductDetail;