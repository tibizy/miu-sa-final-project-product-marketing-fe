import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';

export const Products = ({ history, match }) => {

    // const dispatch = useDispatch();
    // const products = useSelector(state => state.products)
    const [products, setProducts] = useState([]);
    const [productMarkups, setProductMarkups] = useState([]);

    const [formData, setFormData] = useState({ name: "", description: "", quantity: 0, price: 0 })
    const [formError, setFormError] = useState({ })

    const [formIsVisible, setFormIsVisible] = useState(false)

    const handleFieldChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const submitForm = (e) => {
        e.preventDefault();
        if(!validateForm(formData)) return;
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/affiliates/productMarkups`, formData).then((data) => {
            setFormData({productId: "", markupType: "", amount: 0});
            setFormError({});
            getProducts();
        })
    }
    const getProducts = () => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products`).then((data) => {
            setProducts(data.data);
        })
    }

    const getProductMarkups = () => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/affiliates/productMarkup`).then((data) => {
            setProductMarkups(data.data);
        })
    }

    const gotoDetail = (e) => history.push(`${match.path}/${e.target.value}`)
    const showForm = (e) => setFormIsVisible(!formIsVisible);


    useEffect(() => {
        getProductMarkups();
        getProducts();
    }, []);

    const validateForm = (form) => {
        let isValid = true; let formError = {productId: [], quantity: []};
        if(!form.productId){
            formError = ({ ...formError, productId: ["product is required"]});
            isValid = false;
        }
        if(!(form.amount > 0)){
            formError = ({ ...formError, amount: ["amount must be greater than 0"]});
            isValid = false;
        }
        setFormError(formError);
        return isValid;
    }

    return (
        !formIsVisible ?
        <div className="mt-5 mb-5 px-4 px-lg-5">
            <h2 id="pageTitle" className="my-4">
                Product Markups <button className="btn btn-outline-dark float-end" onClick={showForm}>Add New</button>
            </h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Product</th>
                    <th scope="col">Markup</th>
                    <th scope="col">Markup Type</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productMarkups?.map(o => 
                            <tr key={o.id}>
                                <th scope="row">1</th>
                                <td><Link to={`/store/a-product/${o.id}`}>{o.productId}</Link></td>
                                <td>{o.amount}</td>
                                <td>{o.markupType}</td>
                                <td><button className="btn btn-outline-dark float-end" value={o.id} onClick={gotoDetail}>view</button></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
        :
        <div className="container mt-5" style={{maxWidth: '30rem'}}>
            <h2 id="pageTitle" className="">New Product Markup</h2>
            <form>
                <div className="form-group mb-2">
                    <label htmlFor="inputProductId">Product:</label>
                    <select id="inputProductId" name="productId" className="form-control" value={formData.productId} onChange={handleFieldChange}>
                        <option></option>
                        {
                            products?.map(o =>  <option key={o.id}>{o.name}</option>)
                        }
                    </select>
                    { formError['productId']?.map((error, index) => <span key={index}> {error}</span>) }
                </div>
                <div className="form-group">
                    <label htmlFor="inputAmount">Markup:</label>
                    <input id="inputAmount" name="amount" type="number" className="form-control" value={formData.amount} onChange={handleFieldChange}/>
                    { formError['amount']?.map((error, index) => <span key={index}> {error}</span>) }
                </div>
                <div className="form-group">
                    <label htmlFor="inputMarkupType">Markup Type:</label>
                    <select id="inputMarkupType" name="markupType" className="form-control" value={formData.markupType} onChange={handleFieldChange}>
                        <option>FIXED</option>
                        <option>PERCENTAGE</option>
                    </select>
                </div>
                <button id="btnSubmit" className="btn btn-dark mt-2" type="submit" onClick={submitForm}>Submit</button>
                <button id="btnCancel" className="btn mt-2" type="submit" onClick={showForm}>Cancel</button>
            </form>
        </div>
    );
}
