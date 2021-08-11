import CategoryAPI from '../api/categoryAPI';
import { $ } from '../utils';
import sideBarPage from "./sideBarPage";

const AddCatePage = {
    async render(){
        
        return /*html*/ `
        <h6 class="text-left my-4"><a href="index.html" class="link-dark"><i class="fas fa-home"></i> Trang chủ</a>  /   <a href="">Admin</a></h6>
        <hr>
        <div class="container">
          <div class="row">
              ${await sideBarPage.render()}
        
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">

                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Thêm mới danh mục</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="addNameCate">Tên danh mục: 
                            <span class="text-success" style="display:none;" id="success"><i class="fas fa-check-circle"></i></span>
                            <span class="text-danger" style="display:none;" id="danger"><i class="fas fa-times-circle"></i></span>
                        </label>
                        <input type="text" name="addNameCate" id="addNameCate"  class="form-control">
                        
                    </div>
                    
                </div>
                <div class="modal-footer">
                    <a href="/#/listcategory"><button type="button" class="btn btn-secondary">Hủy</button></a>
                    <button type="submit" class="btn btn-primary" disabled="disabled" id="add">Thêm</button>
                </div>
            </main>
          </div>
        </div>
            
        `
    },
    async afterRender(){
        $('#add').addEventListener('click',async e => {
            e.preventDefault();
            const cate = {
                // id: 11,
                name: $('#addNameCate').value
            }
            await CategoryAPI.addCate(cate);
            // alert("Thêm danh mục thành công!!!");
            swal("Thành công!", "Thêm mới danh mục thành công!!!", "success");

            window.location.hash = "/listcategory"
            
        }),
        $('#addNameCate').addEventListener('keyup',async function(){
            // console.log($('#addNameCate').value)
            const cateName = $('#addNameCate').value;
            var check = 1;
            const {data : categories1} = await CategoryAPI.getAll();

            const abc = await categories1.map(category => {
                // console.log(category)
                if(cateName == category.name){
                    check += 1;
                }
                return check;
            })
            
            if(check == 2){
                $('#danger').style.display = "block";
                $('#danger i').innerText = "   Danh mục đã tồn tại";

                $('#success').style.display = "none";
                check += 1;
            }else if(cateName == "" || cateName.length <= 2){
                $('#danger').style.display = "block";
                $('#danger i').innerText = "   Vui lòng không để trống và Tên danh mục phải lớn hơn 2 ký tự";
                $('#success').style.display = "none";
                check += 1;
            }else {
                $('#success').style.display = "block";
                $('#success i').innerText = "   Hợp lệ";
                
                $('#danger').style.display = "none";
                check = 1;
            }
            if(check == 1){
                $("#add").disabled = false;
            }else{
                $("#add").disabled = true;
            }
        })
    }
}

export default AddCatePage;