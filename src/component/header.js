import CategoryAPI from "../api/categoryAPI";
import ModalCard from "../component/modalCard";
import AddToCard from "./addToCard"
import { $ } from "../utils";


const Header = {
    async render(){
        const { data : categories } = await CategoryAPI.getAll();
        // console.log(await ModalCard.render())
        return /*html */`
        <div class="container-fluid">
            <div class="ps-5">
                <a class="navbar-brand pl-3" href="#"><img src="./img/dautayshop.png"  style="max-height: 80px;" alt=""></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
        
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav fs-5 ">
                    <li class="nav-item ">
                        <a class="nav-link text-dark" href="index.html">Trang chủ</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link text-dark dropdown-toggle" href="#" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">Sản phẩm</a>
                        <ul class="dropdown-menu mt-0" aria-labelledby="dropdownMenuLink">
                        ${
                            categories.map(category =>{
                                return `
                                <li class="border-bottom p-0"><a class="dropdown-item" href="/#/category/${category.id}">${category.name}</a></li>
                                `
                            }).join("")
                        }
                        </ul>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link text-dark" href="/#/blog">Tin tức</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-dark" href="/#/support">Hỗ trợ</a>
                    </li>
                </ul>
            </div>

            
            <div class="pe-5 d-flex">
                <div class="dropdown pe-3">
                    <button class="btn btn-outline-secondary" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Tài Khoản <i class="fas fa-user"></i>
                    </button>
                    <ul class="dropdown-menu px-2 mx-auto" aria-labelledby="dropdownMenuButton1">
                        <li class=" px-0 mx-auto py-1"><a class="dropdown-item border border-dark rounded-3 text-center" href="#">Đăng nhập</a></li>
                        <li class=" px-0 mx-auto py-1"><a class="dropdown-item border border-dark rounded-3 text-center" href="#">Đăng Ký</a></li>
                    </ul>
                </div>
                <button class="btn btn-outline-secondary" id="cartDetails" data-bs-toggle="modal" data-bs-target="#detail-cart">Giỏ Hàng <i class="fas fa-shopping-cart"> </i>  <span class="total-cart-product badge bg-secondary">0</span></button>
                <a href="/#/listproduct"><button class="btn btn-outline-secondary ms-3">Admin <i class="fas fa-user-cog"></i></button></a> 
                
            </div>
        </div>
        <div style="display: none">
            ${await Header.afterRender()}        
        </div>
        `
    },
    async afterRender(){ 
        //  console.log(AddToCard.updateCartDisplay())
        await AddToCard.getCartDetail();
        $('#checkout').addEventListener('click', e =>{
            e.preventDefault();
            // const

            console.log("acjsa");
        })
        // $('#quantityInCart').addEventListener('change', ()=>{
        //     if($('#quantityInCart').value <= 0){
        //         swal({
        //             title: "Bạn muốn xóa sản phẩm này khỏi giỏ hàng?",
                    
        //             icon: "warning",
        //             buttons: true,
        //             dangerMode: true,
        //           })
        //           .then((willDelete) => {
        //             if (willDelete) {
        //               swal("Xóa  thành công!", {
        //                 icon: "success",
        //               });
        //             } else {
        //               swal("Xóa không thành công!");
        //             }
        //           });

        //     }else{
        //     console.log("hết rồi")

        //     }
        // })
    },
    async changeCart(){
        
    }
}

export default Header;