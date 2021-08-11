import ProductApi from "../api/productAPI";
import { $, reRender } from '../utils.js';

const ListProduct = {
    async render(){
        window.scrollTo(0, 0);
        const {data : products} = await ProductApi.getAllAdmin();

        return /*html*/`
        <table class="table table-striped align-middle table-hover table-sm text-center">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>Ảnh</th>
                    <th>Danh mục</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Chi tiết</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                ${products.map((product, index) => {
                    const price = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)
                    return `
                    <tr>
                        <td>${index+=1}</td>
                        <td>${product.name}</td>
                        <td><img src="${product.image}" width="100"></td>
                        <td>${product.categoryId}</td>
                        <td>${price}</td>
                        <td>${product.quantity}</td>
                        <td>
                            <button class="btn btn-outline-info btn-sm" data-id="${product.id}" data-bs-toggle="modal" data-bs-target="#a${product.id}"><i class="fas fa-info-circle"></i></button>
                            
                            <!-- Modal -->
                            <div class="modal fade" id="a${product.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-xl">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Chi tiết</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        ${product.detail}
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>    
                            <a class="btn btn-outline-primary btn-sm" href="/#/editproduct/${product.id}"><i class="fas fa-edit"></i></a>
                            <button class="btn btn-outline-danger btn-sm" data-id="${product.id}"><i class="fas fa-trash"></i></button>

                        </td>
                    </tr>
                    `
                }).join("")}
            </tbody>
        </table>
        `
    },
    async afterRender(){
        const btns = $('#list-products .btn-outline-danger');
        btns.forEach(btn => {
            const id = btn.dataset.id;
            btn.addEventListener('click', async function(){
                swal({
                    title: "Bạn có chắc là muốn xóa sản phẩm này?",
                    // text: "Once deleted, you will not be able to recover this imaginary file!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                    buttons: ["Hủy", "Xóa"],
                  })
                  .then(async (willDelete) => {
                    if (willDelete) {
                        await ProductApi.remove(id);
                        swal("Xóa sản phẩm thành công!", {
                            icon: "success",
                        });
                        await reRender(ListProduct, '#list-products');
                    } else {
                      swal("Xóa thất bại!");
                    }
                })
                
            })
        })
    }
}

export default ListProduct;