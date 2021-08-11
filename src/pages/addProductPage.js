import CategoryAPI from '../api/categoryAPI';
import ProductApi from '../api/productAPI';
import { $ } from '../utils';
import AdminProductPage from './AdminProductPage';
import sideBarPage from "./sideBarPage";
import firebase from "../firebase"

const AddProductPage = {
    async render(){
        const {data : categories} = await CategoryAPI.getAll();
        const resultCate = categories.map(category =>{
            return `
                <option value="${category.id}">${category.name}</option>
            `
        }).join("");
        return /*html*/ `
        <h6 class="text-left my-4"><a href="index.html" class="link-dark"><i class="fas fa-home"></i> Trang chủ</a>  /   <a href="">Admin</a></h6>
        <hr>
        <div class="container">
          <div class="row">
              ${await sideBarPage.render()}
        
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">

                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Thêm mới sản phẩm</h5>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="addNameProduct">Tên sản phẩm:
                            <span class="text-danger" style="display:none;" id="dangerName"><i class="fas fa-times-circle"></i></span>
                        </label>
                        <input type="text" name="addNameProduct" id="addNameProduct" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="product-image">Ảnh:
                            <span class="text-danger" style="display:none;" id="dangerImage"><i class="fas fa-times-circle"></i></span>
                        </label>
                        <input type="file" placeholder="Chọn file ảnh" name="product-image" id="product-image" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="addCate">Danh mục:
                            <span class="text-danger" style="display:none;" id="dangerCate"><i class="fas fa-times-circle"></i></span>
                        </label>
                        <select class="form-select" name="addCate" id="addCate" aria-label="Default select example">
                            <option value="0" selected>Chọn danh mục</option>
                            ${resultCate}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="addPrice">Giá:
                            <span class="text-danger" style="display:none;" id="dangerPrice"><i class="fas fa-times-circle"></i></span>
                        </label>
                        <input type="number" name="addPrice" id="addPrice" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="addQuantity">Số lượng:
                            <span class="text-danger" style="display:none;" id="dangerQuantity"><i class="fas fa-times-circle"></i></span>
                        </label>
                        <input type="number" name="addQuantity" id="addQuantity" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="addDetail">Chi tiết sản phẩm:
                            <span class="text-danger" style="display:none;" id="dangerDetail"><i class="fas fa-times-circle"></i></span>
                        </label>
                        <textarea name="addDetail" class="form-control" id="addDetail" cols="30" rows="4"></textarea>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary">Hủy</button>
                    <button type="submit" class="btn btn-primary" id="add">Thêm</button>
                </div>
            </main>
          </div>
        </div>
            
        `
    },
    async afterRender(){
        $('#add').addEventListener('click',async e => {
            e.preventDefault();
            const productName = $('#addNameProduct').value;
            const productCate = $('#addCate').value;
            const productDetail = $('#addDetail').value;
            const productQuantity = $('#addQuantity').value;
            const productPrice = $('#addPrice').value;
            const productImage = $('#product-image').files[0];

            var checkAll = 0;
            
            //check name
            var checkName = 1;
            const {data : products} = await ProductApi.getAllAdmin();
            products.map(product => {
                if(productName == product.name){
                    return checkName += 1;
                }
            });
            //name
            if(productName == ""){
                $('#dangerName').style.display = "block";
                $('#dangerName i').innerText = "   Không để trống tên sản phẩm";
                checkAll += 1;
                // return false;
            }else if(checkName != 1){
                $('#dangerName').style.display = "block";
                $('#dangerName i').innerText = "   Tên sản phẩm đã tồn tại";
                checkAll += 1;
                // return false;
            }else{
                $('#dangerName').style.display = "none";
                checkAll = 0;
            }

            //image
            if(productImage == undefined){
                $('#dangerImage').style.display = "block";
                $('#dangerImage i').innerText = "   Thêm file ảnh";
                checkAll += 1;
            }else{
                $('#dangerImage').style.display = "none";
                checkAll = 0;
            }

            //category
            if(productCate == 0){
                $('#dangerCate').style.display = "block";
                $('#dangerCate i').innerText = "   Chọn danh mục";
                checkAll += 1;
            }else{
                $('#dangerCate').style.display = "none";
                checkAll = 0;
            }

            //price
            if(productPrice == ""){
                $('#dangerPrice').style.display = "block";
                $('#dangerPrice i').innerText = "   Nhập giá sản phẩm";
                checkAll += 1;
            }else if(productPrice <= 0){
                $('#dangerPrice').style.display = "block";
                $('#dangerPrice i').innerText = "   Giá phải lớn hơn 0";
                checkAll += 1;
            }else{
                $('#dangerPrice').style.display = "none";
                checkAll = 0;
            }

            //quantity
            if(productQuantity == ""){
                $('#dangerQuantity').style.display = "block";
                $('#dangerQuantity i').innerText = "   Nhập số lượng sản phẩm";
                checkAll += 1;
            }else if(productQuantity <= 0){
                $('#dangerQuantity').style.display = "block";
                $('#dangerQuantity i').innerText = "   Số lượng phải lớn hơn 0";
                checkAll += 1;
            }else{
                $('#dangerQuantity').style.display = "none";
                checkAll = 0;
            }

            //productDetail
            if(productDetail == ""){
                $('#dangerDetail').style.display = "block";
                $('#dangerDetail i').innerText = "   Nhập chi tiết sản phẩm";
                checkAll += 1;
            }else{
                $('#dangerDetail').style.display = "none";
                checkAll = 0;
            }

            // console.log(productPrice)

            //checkAll
            if(checkAll != 0){
                swal({
                  title: "Thêm sản phẩm thất bại!!!",
                  icon: "warning"
                });
            }else{
                let storageRef = firebase.storage().ref(`images/${productImage.name}`);
                storageRef.put(productImage).then( function() {
                    // console.log('up load thang cong');
                storageRef.getDownloadURL().then( async (url) => {
                        const product = {
                            // id: Math.random().toString(36).substr(2, 9),
                            name: $('#addNameProduct').value,
                            categoryId: $('#addCate').value,
                            price: $('#addPrice').value,
                            quantity: $('#addQuantity').value,
                            detail: $('#addDetail').value,

                            image: url
                        };
                        await  ProductApi.addProduct(product);
                        swal("Thành công!", "Thêm sản phẩm thành công thành công!!", "success");
                        window.location.hash ='/listproduct';
                        
                    })
                })
            }
            
        })
    },
    // showjs(){
    //     CKEDITOR.replace('addDetail');
    // }
}

export default AddProductPage;