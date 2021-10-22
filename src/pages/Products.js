import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';

export const Products = ({ history, match }) => {

    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    let { path } = useRouteMatch();

    const addToCart = (product) => {
        dispatch({ type : "add product to cart", product: product, quantity: 1 });
    }

    const saveProducts = (products) => {
        dispatch({ type : "save products", products: products });
    }

    const getProducts = () => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products`).then((data) => {
            saveProducts(data.data);
        })
        // saveProducts([
        //     {"productId":"9a937579-04aa-4234-9930-47785523a45b","name":"Ada Adam","vendor":"Ada Inc","quantity":70,"amount":500.0,"category":"Electronics"},
        //     {"productId":"e0702da3-4dbf-4bb2-98c7-6c0631642c32","name":"Simon Peter","vendor":"Simon Co.","quantity":100,"amount":25.23,"category":"Apparel"},
        //     {"productId":"06d066ce-1fbe-4a34-8806-3472ceb3eb10","name":"Pellegrino","vendor":"Ferragamo","quantity":65,"amount":14.1,"category":"Beauty"},
        //     {"productId":"5caac69a-968a-43a7-bff9-73ec4b50f80d","name":"Mourinho Jose","vendor":"Hike","quantity":80,"amount":46.0,"category":"Outdoor"},
        //     {"productId":"dae3d674-2f3d-4df9-9d39-673c13ff75e7","name":"Betty Ferguson","vendor":"Haley","quantity":98,"amount":7.83,"category":"Grocery"},
        //     {"productId":"20b45409-8fcc-4640-b3e4-697752964a8d","name":"Pellegrino","vendor":"Ferragamo","quantity":65,"amount":14.1,"category":"Beauty"},
        //     {"productId":"ad55c03e-cc75-42f9-bb40-8c5c28171a74","name":"Mourinho Jose","vendor":"Hike","quantity":80,"amount":46.0,"category":"Outdoor"},
        //     {"productId":"a15d523e-ca38-499c-8c12-915d46973b9e","name":"Betty Ferguson","vendor":"Haley","quantity":98,"amount":7.83,"category":"Grocery"}
        // ])
    }

    // const gotoDetail = (e) => history.push(`product/${e.target.value}`)
    
    useEffect(() => {
        if(!products.length) getProducts();
        dispatch({ type : "show banner" });
    }, []);

    return (
        <div>
            <div className="container p-5 App">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    {
                        products?.map((p, index) =>
                            <div className="col mb-5" key={p.productId}>
                            <Link to={`${path}/product/${p.productId}`} className="text-decoration-none">
                                <div className="card border-0">
                                    <img className="card-img-top rounded-circle" src={`https://picsum.photos/400/400?random=${index}`} alt="..."/>
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            <h5 className="fw-bolder">{p.name}</h5>
                                            {p.quantity} qty - ${p.amount}
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
                </div>
            </div>
        </div>
    );
}
