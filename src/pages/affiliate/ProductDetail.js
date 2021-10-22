import axios from 'axios';
import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

export const ProductDetail = ({ match }) => {

    const [product, setProduct] = useState({});
    const [formData, setFormData] = useState({})
    const [formError, setFormError] = useState({})
    const [formIsVisible, setFormIsVisible] = useState(false)

    const handleFieldChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const updateProduct = (e) => {
        e.preventDefault();
        if(!validateForm(formData)) return;
        axios.put(`http://localhost:8080/products/${e.target.value}`, formData).then((data) => {
            setFormData({});
            getProduct();
        })
    }
    const getProduct = () => {
        const id = match.params.id;
        axios.get(`http://localhost:8080/products/${id}`).then((data) => {
            setProduct(data.data.product);
            setFormData(data.data.product)
        })
    }

    const showForm = (e) => setFormIsVisible(!formIsVisible);

    useEffect(() => {
        getProduct();
    });

    const validateForm = (form) => {
        let isValid = true; let formError = {name: [], quantity: []};
        if(!form.name){
            formError = ({ ...formError, name: ["name is required"]});
            isValid = false;
        }
        if(!(form.quantity > 0)){
            formError = ({ ...formError, quantity: ["minimum quantity required"]});
            isValid = false;
        }
        setFormError(formError);
        return isValid;
    }
    
    return (
        !formIsVisible ?
        <div className="App mt-5">
            <h2 id="pageTitle">
                Product Detail
                <button className="btn btn-outline-dark" onClick={showForm}>Edit</button>
            </h2>
            <div className="row">
                <div className="col-6">
                        <p>Name: <br /> {product.name || '-'}</p>
                </div>
                <div className="col-6">
                        <p>Description: <br /> {product.description || '-'}</p>
                </div>
                <div className="col-6">
                        <p>Price: <br /> {product.price || '-'}</p>
                </div>
                <div className="col-6">
                        <p>Quantity: <br /> {product.quantity || '-'}</p>
                </div>
            </div>
        </div> :
        <div className="container mt-5" style={{maxWidth: '30rem'}}>
            <form>
                <div className="form-group mb-2">
                    <label>Name:</label>
                    <input id="inputName" name="name" className="form-control" value={formData.name} onChange={handleFieldChange}/>
                    { formError['name']?.map((error, index) => <span key={index}> {error}</span>) }
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <input id="inputDescription" name="description" className="form-control" value={formData.description} onChange={handleFieldChange}/>
                </div>
                <div className="form-group">
                    <label>Quantity:</label>
                    <input id="inputQuantity" name="quantity" className="form-control" value={formData.quantity} onChange={handleFieldChange}/>
                    { formError['quantity']?.map((error, index) => <span key={index}> {error}</span>) }
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input id="inputPrice" name="price" className="form-control" value={formData.price} onChange={handleFieldChange}/>
                </div>
                <button id="btnSubmit" className="btn btn-dark mt-2" type="submit" onClick={updateProduct}>Update</button>
                <button id="btnCancel" className="btn mt-2" type="submit" onClick={showForm}>Cancel</button>
            </form>
        </div>
    );
}
