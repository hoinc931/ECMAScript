import AddToCard from "./addToCard";
import { $ } from '../utils.js';

const ModalCard = {
    async render(){
        return `<!-- Modal -->
        <div class="modal fade" id="detail-cart" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Danh sách sản phẩm</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <table class="table table-hover">
                            <thead>
                                <th>ID</th>
                                <th>Tên sản phẩm</th>
                                <th>Ảnh sản phẩm</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Tổng tiền</th>
                            </thead>
                            <tbody id="cart-detail-tbody">
                            </tbody>
                        </table>
                        <div class="row">
                        <h1>Thông tin khách hàng</h1>

                            <div class="col-6">
                                <div class="form-group">
                                    <label for="">Tên khách hàng</label>
                                    <input type="text" class="form-control" id="customer_name" >
                                </div>
                                <div class="form-group">
                                    <label for="">Email khách hàng</label>
                                    <input type="text" class="form-control" id="customer_email" >
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <label for="">Số điện thoại khách hàng</label>
                                    <input type="text" class="form-control" id="customer_phone_number" >
                                </div>
                                <div class="form-group">
                                    <label for="">Địa chỉ</label>
                                    <input type="text" class="form-control" id="customer_address" >
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                        <button type="button" class="btn btn-primary" id="checkout">Thanh Toán</button>
                    </div>
                </div>
            </div>
        </div>
        `
    },
    async afterRender(){
        
        // console.log(abc)
        
    }
}

export default ModalCard;