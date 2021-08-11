import SupportAPI from '../api/supportAPI.js';
import sideBarPage from '../pages/sideBarPage.js';
import { $, reRender } from '../utils.js';

const ListSupport = {
    async render(){
        window.scrollTo(0, 0);
        const {data : supports} = await SupportAPI.getAll();

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
                <table class="table table-striped align-middle table-hover table-sm text-center">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th>Nội dung hỗ trợ</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${supports.map((support, index) => {
                            return `
                            <tr>
                                <td>${index+=1}</td>
                                <td>${support.name}</td>
                                <td>${support.phone}</td>
                                <td>${support.email}</td>
                                <td>${support.content}</td>
                                <td>    
                                    <button class="btn btn-outline-danger btn-sm" data-id="${support.id}"><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                            `
                        }).join("")}
                    </tbody>
                </table>
            </main>
        </div>
    </div>
        `
    },
    async afterRender(){
        const btns = $('.btn-outline-danger');
        btns.forEach(btn => {
            const id = btn.dataset.id;
            btn.addEventListener('click', async function(){
                swal({
                    title: "Bạn có chắc là muốn xóa mục này?",
                    // text: "Once deleted, you will not be able to recover this imaginary file!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                    buttons: ["Hủy", "Xóa"],
                  })
                  .then(async (willDelete) => {
                    if (willDelete) {
                        await SupportAPI.remove(id);
                        swal("Xóa thành công!", {
                            icon: "success",
                        });
                        await reRender(ListSupport);
                    } else {
                      swal("Xóa thất bại!");
                    }
                    // console.log(reRender(ListCategories))
                    
                })
                
            })
        })
    }
}

export default ListSupport;