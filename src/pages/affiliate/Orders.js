import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const Orders = ({ history, match }) => {

    const access_token = useSelector(state => state.user_session?.token)

    const [orders, setOrders] = useState([]);
    const gotoOrderDetail = (e) => history.push(`${match.path}/${e.target.value}`)

    const getOrder = () => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/affiliates/transaction/`, { headers: { 'Authorization': `Bearer ${access_token}`}}).then((data) => {
            setOrders(data.data);
        })
    }

    useEffect(() => {
        getOrder();
    }, []);
    
    return (
        <div className="px-4 px-lg-5 mt-5 mb-5 ">
            <h2 id="pageTitle" className="my-4">Orders</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Order Id</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Status</th>
                    <th scope="col">Date Created</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders?.map((o, index) => 
                            <tr key={o.transRef}>
                                <th scope="row">{index + 1}</th>
                                <td>{o.transRef}</td>
                                <td>${o.amount}</td>
                                <td>{o.paymentStatus}</td>
                                <td>{o.transDate}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}
