import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';

export const SearchProducts = ({ history, match }) => {

    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    let { path } = useRouteMatch();

    const addToCart = (product) => {
        dispatch({ type : "add product to cart", product: product });
    }
    
    const searchProducts = (e) => {
        axios.get(`http://localhost:8080/books?${e.target.name}=${e.target.value}`).then((data) => {
            console.log('filtered books', data.data)
            setProducts(data.data.products);
        })
    }

    return (
        <div>
            <div className="container p-5 App">
            <form className="mb-5" style={{maxWidth: '30rem', margin: 'auto'}}>
                <label>Search product</label>
                <input name="name" placeholder="enter product name" className="form-control mt-3" onChange={searchProducts} />
            </form>
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    {
                        products?.map((p, index) =>
                            <div className="col mb-5" key={p.id}>
                            <Link to={`${path}/product/${p.id}`} className="text-decoration-none">
                                <div className="card border-0">
                                    <img className="card-img-top rounded-circle" src={`https://picsum.photos/400/400?random=${index}`} alt="..."/>
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            <h5 className="fw-bolder">{p.name}</h5>
                                            {p.quantity} qty - ${p.price}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div className="text-center">
                                    <button value={1} className="btn btn-outline-dark mt-auto" onClick={() => addToCart(p)}>Add to cart</button>
                                </div>
                            </div>
                        </div>
                        )
                    }
                    <div className="col mb-5">
                        <Link to={`${path}/product/1`} className="text-decoration-none">
                            <div className="card border-0">
                                <img className="card-img-top rounded-circle" src="https://picsum.photos/400/400?random=1" alt="..."/>
                                <div className="card-body p-4">
                                    <div className="text-center">
                                        <h5 className="fw-bolder">Fancy Product</h5>
                                        40 qty - $80.00
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div className="text-center">
                                <button value={2} className="btn btn-outline-dark mt-auto" onClick={() => addToCart(null)}>Add to cart</button>
                            </div>
                        </div>
                    </div>
                    <div className="col mb-5">
                        <Link to={`${path}/product/1`} className="text-decoration-none">
                            <div className="card border-0">
                                <img className="card-img-top rounded-circle" src="https://picsum.photos/400/400?random=1" alt="..."/>
                                <div className="card-body p-4">
                                    <div className="text-center">
                                        <h5 className="fw-bolder">Fancy Product</h5>
                                        40 qty - $80.00
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div className="text-center">
                                <button value={2} className="btn btn-outline-dark mt-auto" onClick={() => addToCart(null)}>Add to cart</button>
                            </div>
                        </div>
                    </div>
                    <div className="col mb-5">
                        <Link to={`${path}/product/1`} className="text-decoration-none">
                            <div className="card border-0">
                                <img className="card-img-top rounded-circle" src="https://picsum.photos/400/400?random=2" alt="..."/>
                                <div className="card-body p-4">
                                    <div className="text-center">
                                        <h5 className="fw-bolder">Fancy Product</h5>
                                        40 qty - $80.00
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div className="text-center">
                                <button value={3} className="btn btn-outline-dark mt-auto" onClick={() => addToCart(null)}>Add to cart</button>
                            </div>
                        </div>
                    </div>
                    <div className="col mb-5">
                        <Link to={`${path}/product/2`} className="text-decoration-none">
                            <div className="card border-0">
                                <img className="card-img-top rounded-circle" src="https://picsum.photos/400/400?random=3" alt="..."/>
                                <div className="card-body p-4">
                                    <div className="text-center">
                                        <h5 className="fw-bolder">Fancy Product</h5>
                                        40 qty - $80.00
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div className="text-center">
                                <button value={4} className="btn btn-outline-dark mt-auto" onClick={() => addToCart(null)}>Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
