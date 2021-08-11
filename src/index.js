import Error404Page from './pages/Error404Page';
import HomePage from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import ProductsPage from './pages/ProductsPage';
import { parserRequetsUrl, $ } from './utils';
import Header from './component/header';
import categoryPage from './pages/categoryPage';
import AddProductPage from './pages/addProductPage';
import AdminProductPage from './pages/AdminProductPage';
import ListCategories from './component/ListCategories';
import AddCatePage from './pages/addCategory';
import UpdateCatePage from './pages/updateCatePage.js';
import UpdateProductPage from './pages/updateProductPage';
import Footer from './component/footer';
import BlogPage from './pages/blogPage';
import SupportPage from './pages/supportPage';
import ListSupport from './component/listSupport';



const rouse = {
    '/': HomePage,
    '/blog': BlogPage,
    '/support': SupportPage,
    '/products': ProductsPage,
    '/products/:id': ProductDetail,
    '/category/:id': categoryPage,
    '/addproduct': AddProductPage,
    '/listproduct': AdminProductPage,
    '/listcategory': ListCategories,
    '/addcategory': AddCatePage,
    '/editcate/:id': UpdateCatePage,
    '/editproduct/:id': UpdateProductPage,
    '/supportadmin': ListSupport

}

const  router = async () => {
    const {resource, id} = parserRequetsUrl();
    const parseUrl = (resource ? `/${resource}` : '/') + (id ? '/:id' : '');
// console.log(parseUrl);

    const page = rouse[parseUrl] ? rouse[parseUrl] : Error404Page;
    $("#header").innerHTML = await Header.render();
    $("#main-content").innerHTML = await page.render();
    if(page.afterRender){await page.afterRender()};
    $("#footer").innerHTML = await Footer.render();
    // if (page.showjs) {
    //     await page.showjs();
    // }

}


window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);
