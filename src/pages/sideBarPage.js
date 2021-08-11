
const sideBarPage = {
    async render(){
        return /*html */`
        <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div class="position-sticky pt-3">
                <ul class="nav flex-column list-group">
                    <li class="list-group-item list-group-item-action list-group-item-primary">
                        <a class="nav-link text-dark fs-5"  href="/#/listproduct">
                            Sản phẩm
                        </a>
                    </li>
                    <li class="list-group-item list-group-item-action list-group-item-primary">
                        <a class="nav-link text-dark fs-5" href="/#/listcategory">
                            Danh mục
                        </a>
                    </li>
                    <li class="list-group-item list-group-item-action list-group-item-primary">
                        <a class="nav-link text-dark fs-5" href="/#/supportadmin">
                            Hỗ trợ
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
        `
    }
}

export default sideBarPage;