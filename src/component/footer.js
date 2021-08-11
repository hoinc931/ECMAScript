const Footer = {
    async render(){
        return /*html */`
            <div class="row pb-2 bg-gray-300">
                <div class="col-4">
                    <img src="img/dautayshop.png" width="180" alt="">
                    <div class="contact">
                        <p class="fw-border fs-3 text-center">Liên hệ</p>
                        <a href="https://www.facebook.com/"><i class="fab fa-facebook-square fa-3x"></i></a>
                        <a href="https://www.instagram.com/"><i class="fab fa-instagram-square fa-3x"></i></a>
                        <p>Điện thoại: 0981927129</p>
                        <p>Email: hoincph10298@fpt.edu.vn</p>
                    </div>
                </div>
                <div class="col-4">
                    <p class="fw-border fs-3 text-center">Giới thiệu</p>
                    <ul class="list-group">
                        <li class="list-group-item border-0">Về chúng tôi</li>
                        <li class="list-group-item border-0">Hướng dẫn đặt hàng</li>
                        <li class="list-group-item border-0">Hotline: 0981927129</li>
                        <li class="list-group-item border-0">Hệ thống cửa hàng</li>
                    </ul>
                </div>
                <div class="col-4">
                    <p class="fw-border fs-3 text-center">Hỗ trợ</p>
                    <ul class="list-group">
                        <li class="list-group-item border-0">Liên hệ shop</li>
                        <li class="list-group-item border-0">Chính sách đổi trả và bảo hành</li>
                        <li class="list-group-item border-0">Chính sách giao hàng</li>
                        <li class="list-group-item border-0">Chính sách bảo mật</li>
                    </ul>
                </div>
            </div>
            <hr>
            <div class="text-center pb-4">
                Bản quyền © 2018 Giày xShop.
            </div>
        
        `
    }
}

export default Footer;