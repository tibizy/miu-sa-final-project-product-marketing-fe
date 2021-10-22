import axios from 'axios';
import { useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export const Checkout = ({ history, match }) => {

    const dispatch = useDispatch();
    const [orderId, setOrderId] = useState(null)
    const [orderItems] = useState(history.location.state?.cart)
    // const orderItems = history.location.state?.cart || []

    const billingInfo = useSelector(state => state.billing?.billingInfo || {fname: "", lname: "", email: "", phone: "", address: "", city: "", zip: ""})
    const [userForm, setUserForm] = useState(billingInfo)
    const [userFormError, setUserFormError] = useState({})

    const paymentInfo = useSelector(state => state.billing?.paymentInfo || {nameOnCard: "", cardNumber: "", type: "CARD", expDate: "", validationCode: ""})
    const [userForm2, setUserForm2] = useState(paymentInfo)
    const [userFormError2, setUserFormError2] = useState({})

    const handleFieldChange = (e) => setUserForm({ ...userForm, [e.target.name]: e.target.value });
    const handleFieldChange2 = (e) => setUserForm2({ ...userForm2, [e.target.name]: e.target.value });

    console.log(match.path)

    const submitBillingForm = (e) => {
        e.preventDefault();
        if(!validateForm1(userForm)) return;
        dispatch({ type : "save billing info", billingInfo: userForm })
        // history.push(`${match.path}/payment`, { cart: orderItems })
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/orders`, { productList: orderItems, customerBillingInfo:userForm }).then((data) => {
            console.log(data.data?.data?.orderId)
            const orderId = data.data?.data?.orderId
            setOrderId(orderId)
            history.push(`${match.path}/orderSummary/${orderId}`, { cart: orderItems })
            setUserForm({});
            setUserFormError({});
        })

        // setOrderId("dfafe032-5e12-4b21-b56c-824d8467749b")
        // history.push(`${match.path}/orderSummary/{orderId}`, { cart: orderItems } )
    }

    const submitPaymentForm = (e) => {
        e.preventDefault();
        console.log('userForm2', userForm2)
        if(!validateForm2(userForm2)) return;
        // dispatch({ type : "save payment info", user: userForm2 })
        const totalAmount = (orderItems || []).reduce((a, b) => a + (b.amount * b.quantity), 0)
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/payment`, { ...userForm2, orderNumber: orderId, amount: totalAmount }).then((data) => {
            history.push(`${match.path}/paymentSummary/${orderId}`, { cart: orderItems, } )
            setUserForm2({});
            setUserFormError2({});
        })
        // history.push(`${match.path}/paymentSummary`)
    }

    const goHome = ( ) => {
        history.push('/store')
    }

    const gotoPayment = () => {
        console.log(orderItems)
        history.push(`${match.path}/payment`, { cart: orderItems } )
    }

    const validateForm1 = (form) => {
        let isValid = true; let formError = {lname: [], fname: [], email: [], phone: [], address: [], city: [], zip : []};
        console.log(form)
        if(!form.fname){
            formError = ({ ...formError, fname: ["first name is required"]});
            isValid = false;
        }
        if(!form.lname){
            formError = ({ ...formError, lname: ["last name is required"]});
            isValid = false;
        }
        if(!form.email){
            formError = ({ ...formError, email: ["email is required"]});
            isValid = false;
        }
        if(!form.phone){
            formError = ({ ...formError, phone: ["phone is required"]});
            isValid = false;
        }
        if(!form.address){
            formError = ({ ...formError, address: ["address is required"]});
            isValid = false;
        }
        if(!form.city){
            formError = ({ ...formError, city: ["city is required"]});
            isValid = false;
        }
        if(!form.zip){
            formError = ({ ...formError, zip: ["zip is required"]});
            isValid = false;
        }
        setUserFormError(formError);
        return isValid;
    }

    const validateForm2 = (form) => {
        let isValid = true; let formError = {cardNumber: [], type: [], expDate: [], validationCode: []};
        if(!form.type){
            formError = ({ ...formError, type: ["payment type is required"]});
            isValid = false;
        }
        if(!form.cardNumber){
            formError = ({ ...formError, cardNumber: ["cardNumber is required"]});
            isValid = false;
        }
        if(!form.expDate){
            formError = ({ ...formError, expDate: ["expiryDate is required"]});
            isValid = false;
        }
        if(!form.validationCode){
            formError = ({ ...formError, validationCode: ["validationcode is required"]});
            isValid = false;
        }
        console.log(form)
        setUserFormError2(formError);
        return isValid;
    }

    const goTo = (url) => history.push(match.path + url);

    useEffect(() => {
        dispatch({ type : "hide banner" });
    }, []);

    return (
        <div className="container px-4 px-lg-5 mb-5">
            <div className="row">
                <div className="col">
                    <Switch>
                        <Route exact path={`${match.path}`} >
                            <h2 id="pageTitle" className="mt-5">Checkout - Billing Info</h2>
                            <form>
                                <div className="form-group mb-2">
                                    <label>First Name:</label>
                                    <input id="inputFName" name="fname" className="form-control" value={userForm.fname} onChange={handleFieldChange}/>
                                    { userFormError['fname']?.map((error, index) => <span key={index}> {error}</span>) }
                                </div>
                                <div className="form-group mb-2">
                                    <label>Last Name:</label>
                                    <input id="inputLName" name="lname" className="form-control" value={userForm.lname} onChange={handleFieldChange}/>
                                    { userFormError['lname']?.map((error, index) => <span key={index}> {error}</span>) }
                                </div>
                                <div className="form-group mb-2">
                                    <label>Email:</label>
                                    <input id="inputEmail" name="email" className="form-control" value={userForm.email} onChange={handleFieldChange}/>
                                    { userFormError['email']?.map((error, index) => <span key={index}> {error}</span>) }
                                </div>
                                <div className="form-group mb-2">
                                    <label>Phone:</label>
                                    <input id="inputPhone" name="phone" className="form-control" value={userForm.phone} onChange={handleFieldChange}/>
                                    { userFormError['phone']?.map((error, index) => <span key={index}> {error}</span>) }
                                </div>
                                <div className="form-group mb-2">
                                    <label>Address:</label>
                                    <input id="inputStreet" name="address" className="form-control" value={userForm.address} onChange={handleFieldChange}/>
                                    { userFormError['address']?.map((error, index) => <span key={index}> {error}</span>) }
                                </div>
                                <div className="form-group mb-2">
                                    <label>City:</label>
                                    <input id="inputCity" name="city" className="form-control" value={userForm.city} onChange={handleFieldChange}/>
                                    { userFormError['city']?.map((error, index) => <span key={index}> {error}</span>) }
                                </div>
                                <div className="form-group mb-2">
                                    <label>Zip:</label>
                                    <input id="inputZip" name="zip" className="form-control" value={userForm.zip} onChange={handleFieldChange}/>
                                    { userFormError['zip']?.map((error, index) => <span key={index}> {error}</span>) }
                                </div>
                                <button id="btnSubmitBilling" className="btn btn-dark mt-2 mb-5" onClick={submitBillingForm}>Submit</button>
                            </form>
                        </Route>
                        <Route path={`${match.path}/orderSummary/:orderId`}>
                            <h2 id="pageTitle3" className="mt-5">Order Summary</h2>
                            <p>Your order {orderId} has been created successfuly, proceed to <Link to={'#'} onClick={gotoPayment}>make payment</Link>.</p>
                        </Route>
                        <Route path={`${match.path}/payment`}>
                            <h2 id="pageTitle2" className="mt-5">Order - Payment</h2>
                            <form>
                                <div className="form-group my-2">
                                    <label>Card Type: </label> &nbsp;
                                    <label htmlFor="type"><input name="type" selected={true} type="radio" onChange={handleFieldChange2} value="CARD"/> Card</label>
                                    &nbsp;
                                    <label htmlFor="type"><input name="type" type="radio" onChange={handleFieldChange2}  value="BANK"/> Bank</label>
                                    <br />
                                    { userFormError2['type']?.map((error, index) => <span key={index}> {error}</span>) }
                                </div>
                                {(() => {
                                if (userForm2?.type?.toUpperCase() === 'BANK'){
                                    return (
                                        <div>
                                            <div className="form-group mb-2">
                                                <label>Account Name :</label>
                                                <input id="inputAccountName" name="accountName" className="form-control" value={userForm2.accountName} onChange={handleFieldChange2}/>
                                                { userFormError2['accountName']?.map((error, index) => <span key={index}> {error}</span>) }
                                            </div>
                                            <div className="form-group mb-2">
                                                <label>Account Number :</label>
                                                <input id="inputAccountNumber" name="accountNumber" className="form-control" value={userForm2.accountNumber} onChange={handleFieldChange2}/>
                                                { userFormError2['accountNumber']?.map((error, index) => <span key={index}> {error}</span>) }
                                            </div>
                                            <div className="form-group mb-2">
                                                <label>Routing Number:</label>
                                                <input id="inputRoutingNo" name="routingNo" className="form-control" value={userForm2.routingNo} onChange={handleFieldChange2}/>
                                                { userFormError2['routingNo']?.map((error, index) => <span key={index}> {error}</span>) }
                                            </div>
                                        </div>
                                    )
                                }else{
                                    return (
                                        <div>
                                            <div className="form-group mb-2">
                                                <label>Card Name :</label>
                                                <input id="inputCardName" name="nameOnCard" className="form-control" value={userForm2.nameOnCard} onChange={handleFieldChange2}/>
                                                { userFormError2['nameOnCard']?.map((error, index) => <span key={index}> {error}</span>) }
                                            </div>
                                            <div className="form-group mb-2">
                                                <label>Card Number :</label>
                                                <input id="inputCardNumber" name="cardNumber" className="form-control" value={userForm2.cardNumber} onChange={handleFieldChange2}/>
                                                { userFormError2['cardNumber']?.map((error, index) => <span key={index}> {error}</span>) }
                                            </div>
                                            <div className="form-group mb-2">
                                                <label>Expiry Date:</label>
                                                <input id="inputExpiryDate" name="expDate" className="form-control" value={userForm2.expDate} onChange={handleFieldChange2}/>
                                                { userFormError2['expDate']?.map((error, index) => <span key={index}> {error}</span>) }
                                            </div>
                                            <div className="form-group mb-2">
                                                <label>Validation Code:</label>
                                                <input id="inputValidationCode" name="validationCode" className="form-control" value={userForm2.validationCode} onChange={handleFieldChange2}/>
                                                { userFormError2['validationCode']?.map((error, index) => <span key={index}> {error}</span>) }
                                            </div>
                                        </div>
                                    )
                                }
                            })()}
                                <button id="btnSubmitPayment" className="btn btn-dark mt-2 mb-5" onClick={submitPaymentForm}>Submit</button>
                                <button id="btnCancelPayment" className="btn mt-2 mb-5" onClick={() => goTo('/')}>Back</button>
                            </form> 
                        </Route>

                        <Route path={`${match.path}/paymentSummary/:orderId`}>
                            <h2 id="pageTitle3" className="mt-5">Summary</h2>
                            <p>Thanks for making payment for your order.</p>
                            <button id="btnGoToHome" className="btn btn-dark mt-2 mb-5" onClick={goHome}>Go Home</button>
                        </Route>
                    </Switch>
                </div>

                <div className="col">
                    <h2 id="pageTitle" className="mt-5 mb-2">Cart Items</h2>
                    <span>My items</span>
                    <ul className="list-group">
                    {
                            orderItems?.map(p => 
                                <li  key={p.name} className="list-group-item d-flex justify-content-between align-items-center">
                                    {p.name} | {(p.amount + (p.markUp || 0)) * p.quantity}
                                    <span className="badge bg-primary rounded-pill">{p.quantity}</span>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}
