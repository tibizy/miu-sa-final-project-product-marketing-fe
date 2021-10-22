import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export const ProductDetail = ({ history, match, ...props }) => {
    const dispatch = useDispatch();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [productMarkup, setProductMarkup] = useState({});
    const [isAffiliate] = useState(props.isAffiliate);
    const url = isAffiliate ? 'a-product' : 'product';

    const getProduct = () => {
        const id = match.params.id;
        // id = Buffer.from(id, 'base64').toString()?.split(":")
        if(isAffiliate){
            axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/affiliates/productMarkup/${id}`).then((data) => {
                var prodMarkup = data.data;
                setProductMarkup(prodMarkup);
                axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products/${prodMarkup?.productId}`).then((data) => {
                    setProduct({ ...data.data, markUp: (prodMarkup?.amount || 0) });
                })
            })
        }else{
            axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products/${id}`).then((data) => {
                setProduct(data.data);
            })
        }
        // setProduct({"productId":"9a937579-04aa-4234-9930-47785523a45b","name":"Ada Adam","vendor":"Ada Inc","quantity":70,"amount":500.0,"category":"Electronics"})
    }

    const addToCart = (product) => {
        dispatch({ type : "add product to cart", product: product, quantity });
        setProduct({...product, quantity: product.quantity, affiliateId: productMarkup?.affiliateId})
    }

    const buyNow = (product) => {
        history.push(`${match.path.replace(`/${url}/:id`, '/checkout')}`, { cart: [{ ...product, quantity: quantity, affiliateId: productMarkup?.affiliateId }] });
    }


    useEffect(() => {
        getProduct();
        dispatch({ type : "hide banner" });
    }, []);

    return (
        <div className="container mt-5 px-4 px-lg-5">
            <div className="mb-3">
                <h2 id="pageTitle mb-1">
                    {product.name} 
                </h2>   
                <small>CATEGORY: {product.category}</small>
            </div>
            <div className="row">
                <div className="col">
                <div className="mb-5" style={{maxWidth: '35rem'}}>
                    <img className="card-img-top " src="https://picsum.photos/300/300?random=1" alt="..."/>
                </div>
                </div>
                <div className="col">
                    <p>Name: <br /> {product.name || '-'}</p>
                    <p>Category: <br /> {product.category || '-'}</p>
                    <p>Description: <br /> {product.description || '-'}</p>
                    <p>Price: <br /> ${product.amount + (product.markUp || 0) || '-'}</p>
                    <p>Quantity Left: <br /> {product.quantity - quantity || '-'}</p>
                    <div className="row">
                        <div className="col">
                            <div className="form-group mb-2">
                                <input id="inputQty" name="inputQty" type="number" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                            </div>
                        </div>
                        <div className="col">
                            <div>
                            {(() => {
                                if (!isAffiliate){
                                    return (
                                        <button value={1} className="btn btn-outline-dark mt-auto" onClick={() => addToCart(product)}>Add to cart</button>
                                    )
                                }
                            })()}
                                <button value={1} className="btn btn-primary mt-auto mx-3" onClick={() => buyNow(product)}>Buy Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
