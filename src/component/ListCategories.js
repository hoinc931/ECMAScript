import CategoryAPI from "../api/categoryAPI";
import { $, reRender } from '../utils.js';
import sideBarPage from "../pages/sideBarPage";

const ListCategories = {
    async render(){
        window.scrollTo(0, 0);

        const {data : categories} = await CategoryAPI.getAll();

        return /*html*/`
        <h6 class="text-left my-4"><a href="index.html" class="link-dark"><i class="fas fa-home"></i> Trang chủ</a>  /   <a href="">Admin</a></h6>
          <hr>
          <div class="container">
            <div class="row">
                ${await sideBarPage.render()}
          
              <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 class="h2">Quản trị Danh mục</h1>
                    <div class="btn-toolbar mb-2 mb-md-0">
                        <div class="btn-group me-2">
                            <a href="/#/addcategory"><button type="button" class="btn btn-sm btn-outline-primary" >Thêm danh mục</button></a>
                        </div>
                    </div>
                </div>
                <div class="table-responsive" id="list-categories">
                    <table class="table table-striped align-middle table-hover table-sm text-center">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>ID</th>
                                <th>Tên danh mục</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            ${categories.map((category, index) => {
                                return `
                                <tr">
                                    <td>${index+1}</td>
                                    <td>${category.id}</td>
                                    <td>${category.name}</td>
                                    
                                    <td>    
                                        <a class="btn btn-outline-info btn-sm" href="/#/editcate/${category.id}"><i class="fas fa-edit"></i></a>
                                        <button class="btn btn-outline-danger btn-sm btn-del" data-id="${category.id}"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                `
                            }).join("")}
                        </tbody>
                    </table>
                </div>
              </main>
            </div>
          </div>
        
        `
    },
    async afterRender(){
        const btns = $('#list-categories .btn-del');
        btns.forEach(btn => {
            const id = btn.dataset.id;
            btn.addEventListener('click', async function(){
                
                swal({
                    title: "Bạn có chắc là muốn xóa danh mục này?",
                    // text: "Once deleted, you will not be able to recover this imaginary file!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                    buttons: ["Hủy", "Xóa"],
                  })
                  .then(async (willDelete) => {
                    if (willDelete) {
                        await CategoryAPI.remove(id);
                        swal("Danh mục này đã bị xóa!", {
                            icon: "success",
                        });
                        await reRender(ListCategories);
                    } else {
                      swal("Xóa thất bại!");
                    }
                    // console.log(reRender(ListCategories))
                    
                  })
                
            })
        })
    }
}

export default ListCategories;