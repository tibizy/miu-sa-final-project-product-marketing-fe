import { useSelector } from 'react-redux';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';

import { Products, ProductDetail, Cart } from './';
import { Checkout } from './Checkout';
import { SearchProducts } from './SearchProducts';

export const  Home = () => {

    const cart = useSelector(state => state.cart)
    const showBanner = useSelector(state => state.showBanner)
    // const [products, setProducts] = useState(useSelector(state => state.products));
    let { path } = useRouteMatch();
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container px-4 px-lg-5">
                    <Link className="navbar-brand" to={path}>Front Store</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="d-flex me-auto">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" data-bs-toggle="dropdown" />
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link  className="dropdown-item" to="#">Action</Link></li>
                                <li><Link  className="dropdown-item" to="#">Another action</Link></li>
                            </ul>
                        </form>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4 d-none">
                            <li className="nav-item"><Link className="nav-link text-dark" to={`${path}/search`}> Search Products </Link></li>
                        </ul>
                        <form className="d-flex">
                            <Link className="btn btn-outline-dark"  to={`${path}/cart`}>
                                <i className="bi-cart-fill me-1"></i>
                                Cart
                                <span className="badge bg-dark text-white ms-1 rounded-pill">{cart?.length}</span>
                            </Link>
                            <Link className="nav-link text-dark" to="/admin"> Affiliate </Link>
                        </form>
                    </div>
                </div>
            </nav>
            {(() => {
                if (showBanner){
                    return (
                        <header className="py-5" style={{backgroundColor: '#F4F7FC'}}>
                            <div className="container px-4 px-lg-5 my-5">
                                <div className="text-center">
                                    <h1 className="display-4 fw-bolder">Shop with confidence</h1>
                                    <p className="lead fw-normal mb-0">Low price doesn't mean low quality, we are above that</p>
                                </div>
                            </div>
                        </header>
                    )
                }
                
                return null;
              })()}
            {/* <header className="py-5" style={{backgroundColor: '#F4F7FC'}}>
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center">
                        <h1 className="display-4 fw-bolder">Shop with confidence</h1>
                        <p className="lead fw-normal mb-0">Low price doesn't mean low quality, we are above that</p>
                    </div>
                </div>
            </header> */}
            <main>
                <Switch>
                    <Route exact path={`${path}`} component={Products} />
                    <Route path={[`${path}/search`]} component={SearchProducts} />
                    <Route path={[`${path}/product/:id`]} component={ProductDetail} />
                    <Route path={[`${path}/a-product/:id`]} render={(props) => <ProductDetail {...props} isAffiliate={true}  />}  />
                    <Route path={[`${path}/cart`]} component={Cart} />
                    <Route path={[`${path}/checkout`]} component={Checkout} />
                </Switch>
            </main>
            <footer className="py-5 bg-dark">
                <div className="container"><p className="m-0 text-center text-white">Copyright © Your Website 2021</p></div>
            </footer>
        </div>
    );
}
