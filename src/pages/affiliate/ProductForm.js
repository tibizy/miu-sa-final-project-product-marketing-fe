import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const ProductDetail = ({ history }) => {

    const [order, setOrder] = useState({});
    const [formData, setFormData] = useState({})

    const handleFieldChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const updateProduct = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/products/${e.target.value}`, formData).then((data) => {
            setUserForm({});
            getOrder();
        })
    }
    const getProduct = () => {
        const id = match.params.id;
        axios.get(`http://localhost:8080/products/${id}`).then((data) => {
            setOrder(data.data.product);
            setUserForm(data.data.product)
        })
    }

    useEffect(() => {
        getProduct();
    });
    
    return (
        <div className="App mt-5">
            <div className="container" style={{maxWidth: '30rem'}}>
                <h2 id="pageTitle" className="mt-5">New Product</h2>
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
                    <button id="btnSubmit" className="btn btn-dark mt-2" type="submit" onClick={submitForm}>Submit</button>
                    <button id="btnCancel" className="btn mt-2" type="submit" onClick={showForm}>Cancel</button>
                </form>
            </div>
        </div>
    );
}
