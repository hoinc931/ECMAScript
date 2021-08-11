import CategoryAPI from "../api/categoryAPI";
import ProductApi from "../api/productAPI";
import { parserRequetsUrl } from "../utils";

const categoryPage = {
    async render(){
        try{
            //categories
            const {data : categories} = await CategoryAPI.getAll();
            const resultCate = categories.map(category =>{
                return `
                    <li class="list-group-item"><a class="text-decoration-none text-dark fw-bolder" href="/#/category/${category.id}">${category.name}</a></li>
                `
            }).join("");

            

            //products
            const {id} = parserRequetsUrl();
            const {data : category} = await CategoryAPI.get(id);
            
            const {data: products} = await ProductApi.getAll();
            const result = products.filter(product => product.categoryId == id).map(item => {
                const price = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)

                return /*html*/`
                            <div class="col-4 pb-4">
                                <div class="card  shadow h-100">
                                    <img src="${item.image}" class="card-img-top" alt="${item.name}">
                                    <div class="card-body">
                                        <h5 class="card-title">${item.name}</h5>
                                        <p class="card-text">Mo ta</p>
                                        <p class="text-danger">${price}</p>
                                        <a href="#/products/${item.id}" class="btn btn-primary">Chi tiết</a>
                                    </div>
                                </div>
                            </div>
                `
            }).join("");
            
            return /*html*/`<div class="container pt-5">
                        <div class="row">
                            <div class="col-3">
                                <h3>Danh mục sản phẩm</h3>
                                <hr>
                                <ul class="list-group">
                                    ${resultCate}
                                </ul>   

                            </div>

                            <div class="col-9">
                                <h3 class="text-center">${category.name}</h3>
                                <hr>
                                <div class="row">
                                    ${result}
                                </div>
                            </div>
                        </div>
                    </div>`;
        }catch(error){
            console.log(error);
        }
        
    }
}

export default categoryPage;