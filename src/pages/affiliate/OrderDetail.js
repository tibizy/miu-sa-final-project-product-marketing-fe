import { useEffect, useState } from 'react';
import axios from 'axios';

export const OrderDetail = ({ history, match }) => {

    const [order, setOrder] = useState({});
    const [formData, setFormData] = useState({})

    const handleFieldChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const updateOrder = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/orders/${e.target.value}`, formData).then((data) => {
            setFormData({});
            getOrder();
        })
    }
    const getOrder = () => {
        const id = match.params.id;
        axios.get(`http://localhost:8080/orders/${id}`).then((data) => {
            setOrder(data.data.order);
            setFormData(data.data.order)
        })
    }

    useEffect(() => {
        getOrder();
    });
    
    return (
        <div className="App mt-5">
            <h2 id="pageTitle">Order Detail</h2>
            <div className="row">
                <div className="col-6">
                        <p>Id: <br /> {order.id || '-'}</p>
                </div>
                <div className="col-6">
                        <p>Status: <br /> {order.status || '-'}</p>
                </div>
                <div className="col-6">
                        <p>Amount: <br /> {order.amount || '-'}</p>
                </div>
                <div className="col-6">
                        <p>Date Created: <br /> {order.dateCreated || '-'}</p>
                </div>
            </div>
            <ul className="list-group">
                {
                    order?.items?.map(i => <li className="list-group-item">{i.name}, {i.qty}</li>)
                }
            </ul>
            <form>
                <div class="m-auto" style={{maxWidth: '30rem'}}>
                    <div className="form-group mb-2">
                        <label>Status:</label>
                        <select id="selectStatus" name="status" className="form-control" value={formData.status} onChange={handleFieldChange}>
                            <option value=""></option>
                            <option value="PLACED">PLACED</option>
                            <option value='SHIPPED'>SHIPPED</option>
                            <option value='DELIVERED'>DELIVERED</option>
                        </select>
                    </div>
                    <button className="btn btn-outline-dark btn-block float-end" onClick={updateOrder}>Update</button>
                </div>
            </form>
        </div>
    );
}
