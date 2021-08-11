import CategoryAPI from "../api/categoryAPI";
import ProductApi from "../api/productAPI";
import { $ , parserRequetsUrl } from "../utils"
import sideBarPage from "./sideBarPage";
import firebase from "../firebase"


const UpdateProductPage = {
    async render(){
        window.scrollTo(0, 0);

        const {id} = parserRequetsUrl();
        const {data : product} = await ProductApi.get(id);

        const {data : categoryName} = await CategoryAPI.getAll();
        var cate = "";
        categoryName.map(category => {
            if(category.id == product.categoryId){
                cate += `<option value="${category.id}" selected>${category.name}</option>`
            }else{
                cate += `<option value="${category.id}">${category.name}</option>`
            }
            return cate;
        })

        return /*html*/`
            <h6 class="text-left my-4"><a href="index.html" class="link-dark"><i class="fas fa-home"></i> Trang chủ</a>  /   <a href="">Admin</a></h6>
                <hr>
                <div class="container">
                <div class="row">
                    ${await sideBarPage.render()}
                
                    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">

                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Sửa sản phẩm</h5>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="productName">Tên sản phẩm:
                                    <span class="text-danger" style="display:none;" id="dangerName"><i class="fas fa-times-circle"></i></span>
                                </label>
                                <input type="text" name="productName" value="${product.name}" id="productName" class="form-control">
                                <input type="hidden" value="${product.id}" id="idProduct">
                            </div>
                            <div class="form-group">
                                <label for="productImage">Ảnh:</label>
                                <img src="${product.image}" width="100px" alt="">
                                <input type="file" name="productImage" value="" id="productImage" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="productCate">Danh mục: 
                                    <span class="text-danger" style="display:none;" id="dangerCate"><i class="fas fa-times-circle"></i></span>
                                </label>
                                <select class="form-select" name="productCate" id="productCate" aria-label="Default select example">
                                    ${cate}
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="productPrice">Giá:</label>
                                <input type="number" name="productPrice" value="${product.price}" id="productPrice" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="productQuantity">Số lượng:</label>
                                <input type="number" name="productQuantity" value="${product.quantity}" id="productQuantity" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="productDetail">Chi tiết:</label>
                                <textarea name="productDetail" id="productDetail" class="form-control"  cols="30" rows="10">${product.detail}</textarea>
                            </div>
                            
                        </div>
                        <div class="modal-footer">
                            <a href="/#/listproduct"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button></a>
                            <button type="submit" class="btn btn-primary" id="update">Cập nhật</button>
                        </div>
                    </main>
                </div>
            </div>`
    },
    async afterRender(){
        const { id } = parserRequetsUrl();
        const { data: product} = await ProductApi.get(id);

        $("#update").addEventListener('click', async (e) => {
            e.preventDefault();
            // const productName = $('#addNameProduct').value;
            // const productCate = $('#addCate').value;
            // const productDetail = $('#addDetail').value;
            // const productQuantity = $('#addQuantity').value;
            // const productPrice = $('#addPrice').value;
            // const productImage = $('#product-image').files[0];
            if ($("#productImage").value != "") {
                const productImage = $('#productImage').files[0];
                let storageRef = firebase.storage().ref(`images/${productImage.name}`);
                storageRef.put(productImage).then(function (){
                    storageRef.getDownloadURL().then( async (url) => {
                        var imageUrl = url;
                        const newProduct = {
                            name:$('#productName').value,
                            price: $('#productPrice').value,
                            quantity: $('#productQuantity').value,
                            detail: $('#productDetail').value,
                            categoryId: $('#productCate').value,
                            image: imageUrl,
                        }
                        await ProductApi.update(id, newProduct);
                        swal({
                            title: "Good job!",
                            text: "Cập nhật thành công",
                            icon: "success",
                            button: "OK!",
                          });
                        window.location.hash = "/listproduct"
                    }) 
                })
            }else{
                const newProduct= {
                    name:$('#productName').value,
                    price: $('#productPrice').value,
                    quantity: $('#productQuantity').value,
                    detail: $('#productDetail').value,
                    categoryId: $('#productCate').value,
                    image: product.image,
                }
                await ProductApi.update(id, newProduct);
                swal({
                    title: "Good job!",
                    text: "Cập nhật thành công",
                    icon: "success",
                    button: "OK!",
                  });
                window.location.hash = "/listproduct"
            }

           
        })

      
    }
}

export default UpdateProductPage;