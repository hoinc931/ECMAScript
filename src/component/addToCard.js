import ProductApi from "../api/productAPI";
import Header from "./header";

const AddToCard = {
    // render(){

    // },
    async addToCartSto(productId){
        // lấy dữ liệu cart từ localstorage ra ngoài
        let cart = localStorage.getItem('cart');
        // ép kiểu string sang json
        cart = cart == null ? [] : JSON.parse(cart);
        // kiểm tra xem đã có sản phẩm với id nhận được trong giỏ hàng hay chưa?
        // let existed = cart.find(item => item.id == productId);
        let id = Number(productId);

        let existed = cart.map(index => index.id).indexOf(id);
        
        let {data : product} = await ProductApi.addCard(productId);
        // nếu chưa có 
        if(existed == -1){
            // thì thêm sản phẩm đó vào giỏ hàng & bổ sung thuộc tính quantity
                                
            product.quantityInCart = 1;
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
        }else{
            // nếu có rồi thì tìm ra index của phần tử trùng id và tăng giá trị của thuộc tính quantity lên 1 đơn vị
            cart[existed].quantityInCart += 1;
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        swal({
            title: "Thêm vào giỏ hàng thành công!",
            icon: "success",
            button: "Ố kề!!!",
          });
        await AddToCard.updateCartDisplay();
        await AddToCard.getCartDetail();
        
    },
    updateCartDisplay(){
        // lấy dữ liệu cart từ localstorage ra ngoài
        let cart = localStorage.getItem('cart');
        // ép kiểu string sang json
        cart = cart == null ? [] : JSON.parse(cart);
        // chạy vòng lặp qua tất cả các phần tử trong mảng cart
        let totalProduct = 0;
        // đếm số lượng sản phẩm đang có trong giỏ hàng
        cart.forEach(element => {
            totalProduct+= element.quantityInCart
        });
        // cập nhật lại số hiển thị trên menu
        document.querySelector('.total-cart-product').innerText = totalProduct;
    },
    async getCartDetail(){
        // lấy dữ liệu cart từ localstorage ra ngoài
        let cart = localStorage.getItem('cart');
        // ép kiểu string sang json
        cart = cart == null ? [] : JSON.parse(cart);
        
        let tableContent = ``;
        let totalMoney = 0;
        if(cart == ""){
            tableContent = `Giỏ hàng của bạn chưa có sản phẩm nào. `
        }else{
            cart.forEach(item => {
                totalMoney += item.quantityInCart*item.price;
                tableContent += `<tr>
                                    <td>${item.id}</td>
                                    <td>${item.name}</td>
                                    <td>
                                        <img src="${item.image}" width="70">    
                                    </td>
                                    <td>${item.price}</td>
                                    <td><input type="number" value="${item.quantityInCart}" id="quantityInCart"  class="form-control"></td>
                                    <td>${item.quantityInCart*item.price}</td>
                                </tr>`;
            });
            tableContent += `<tr class="fw-bolder">
                                <td colspan="5" >Tổng số tiền</td>
                                <td>${totalMoney}</td>
                            </tr>`;
        }
        
                        // console.log(document.querySelector('#cart-detail-tbody'))
        document.querySelector('#cart-detail-tbody').innerHTML = tableContent;
    }
}

export default AddToCard;