import { Switch, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Orders, OrderDetail, ProductDetail, Products, Login } from '.';


export const  Home = ({ history, match }) => {

    const isLoggedIn = useSelector(state => state.user_session?.isLoggedIn)

    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container px-4 px-lg-5">
                    <Link className="navbar-brand" to={`${match.path}/`}>Front Store Admin</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {(() => {
                            if (isLoggedIn){
                                return (
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                                        <li className="nav-item"><Link className="nav-link text-dark" to={`${match.path}/orders`}> Orders </Link></li>
                                        <li className="nav-item"><Link className="nav-link text-dark" to={`${match.path}/productMarkups`}> ProductMarkup </Link></li>
                                    </ul>
                                )
                            }else{
                                return (<ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                                    <li className="nav-item"><Link className="nav-link text-dark" to={`${match.path}/`}> Login </Link></li>
                                </ul>)
                            }
                        })()}
                            
                        
                        <form className="d-flex">
                            <Link className="nav-link text-dark" to="/store"> Frontend </Link>
                        </form>
                    </div>
                </div>
            </nav>
            <Switch>
                <Route exact path={[`${match.path}/`]} component={Login} />
                <Route exact path={[`${match.path}/orders`]} component={Orders} />
                <Route path={[`${match.path}/orders/:id`]} component={OrderDetail} />
                <Route exact path={[`${match.path}/productMarkups`]} component={Products} />
                <Route path={[`${match.path}/productMarkups/:id`]} component={ProductDetail} />
            </Switch>
        </div>
    );
}
