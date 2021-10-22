import { useDispatch, useSelector } from 'react-redux';

export const Cart = ({ history, match }) => {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart)

    const removeProductFromCart = (e) => {
        e.preventDefault();
        const product = cart.find(p => p.id === e.target.value);
        if(product) dispatch({ type : "remove product from cart", product: product })
    }
    
    const showCheckOut = (e) => history.push(`${match.path.replace('cart', '')}checkout`, { cart});

    return (
        <div className="container mt-5">
            <h2 id="pageTitle" className="my-4">Cart</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">product</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Amount</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart?.map(p => 
                            <tr key={p.name}>
                                <th scope="row">1</th>
                                <td>{p.name}</td>
                                <td>{p.quantity}</td>
                                <td>${p.amount}</td>
                                <td>${p.amount * p.quantity}</td>
                                <td><button className="btn btn-outline-dark float-end" value={p.id} onClick={removeProductFromCart}>remove</button></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <div className="clearfix my-5">
                <button className="btn btn-outline-dark float-end" onClick={showCheckOut}>Checkout</button>
            </div>
        </div>
    );
}
