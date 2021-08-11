import ListProduct from "../component/ListProduct";
import AddProductPage from "./addProductPage";
import ProductApi from '../api/productAPI';
import { $ } from '../utils';
import sideBarPage from "./sideBarPage";

const AdminProductPage = {
    async render(){
        return /*html*/`
   
          <h6 class="text-left my-4"><a href="index.html" class="link-dark"><i class="fas fa-home"></i> Trang chủ</a>  /   <a href="">Admin</a></h6>
          <hr>
          <div class="container">
            <div class="row">
                ${await sideBarPage.render()}
          
              <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 class="h2">Quản trị sản phẩm</h1>
                    <div class="btn-toolbar mb-2 mb-md-0">
                        <div class="btn-group me-2">
                            <a href="/#/addproduct"><button type="button" class="btn btn-sm btn-outline-primary" >Thêm sản phẩm</button></a>
                        </div>
                    </div>
                </div>
                <div class="table-responsive" id="list-products">
                    ${await ListProduct.render()}
                </div>
              </main>
            </div>
          </div>
        `
    },
    async afterRender(){
        return  `${await ListProduct.afterRender()}`
    }
}
export default AdminProductPage;