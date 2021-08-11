import ProductApi from '../api/productAPI';

const HomePage = {
    async render(){
        try{
            const {data : products} = await ProductApi.getAll();
            const result = products.map(product =>{
                const price = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)

                return `
                    <div class="col-3 pb-4" style="object-fir:cover;">
                        <div class="card  shadow h-100">
                            <img src="${product.image}" class="card-img-top bd-placeholder-img" height="250px" style="object-fit: cover" alt="${product.name}">
                            <div class="card-body" >
                                <h5 class="card-title">${product.name}</h5>
                                <p class="text-danger">${price}</p>
                                <a href="#/products/${product.id}" class="btn btn-primary">Chi tiết</a>
                            </div>
                        </div>
                    </div>
                `
            }).join("");

            return /*html */`
                <div class="banner" >
                    <img src="https://i.pinimg.com/originals/09/26/bb/0926bbd7c5fc3e767c37cb5a6970bfbc.jpg" class="w-100 shadow" style="max-height:300" alt="">
                </div>
                <div class="container">
                    <h2 class="text-center my-4">Sản phẩm mới</h2>
                    <hr>
                    <div class="card-group">
                        <div class="row">
                            ${result}
                        </div>
                    </div>
                </div>

                <div class="banner h-5 pt-4" >
                    <img src="https://shopquangkhanh.com/wp-content/uploads/2019/08/banner-nike-adidas.jpg" class="w-100" style="max-height: 400px;"  alt="">
                    <div class="container">
                        <div class="row border pt-4 shadow-sm">
                            <div class="col-4 text-center border-end">
                                <h2 style="color: rgb(238, 65, 65);"><i class="fas fa-shipping-fast fa-2x"></i></h2>
                                <p class="text-uppercase">Giao hàng toàn quốc</p>
                                <p>Vận chuyển khắp Việt Nam</p>
                            </div>

                            <div class="col-4 text-center border-end">
                                <h2 style="color: rgb(238, 65, 65);"><i class="fas fa-wallet fa-2x"></i></h2>
                                <p class="text-uppercase">Thanh toán khi nhận hàng</p>
                                <p>Nhận hàng tại nhà rồi thanh toán</p>
                            </div>

                            <div class="col-4 text-center">
                                <h2 style="color: rgb(238, 65, 65);"><i class="fas fa-sync-alt fa-2x"></i></h2>
                                <p class="text-uppercase">ĐỔI HÀNG DỄ DÀNG</p>
                                <p>Đổi hàng thoải mái trong 30 ngày</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }catch(error){
            console.log(error);
        }
        
    }
}

export default HomePage;

{/* <div class="col-4">
                        <div class="card">
                            <img src="..." class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-4">
                        <div class="card">
                            <img src="..." class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-4">
                        <div class="card">
                            <img src="..." class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div> */}