import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

export const  Login = ({ match, history }) => {

    const dispatch = useDispatch();
    const users = useSelector(state => state.users)
    const [userForm, setUserForm] = useState({ username: '', password: ''})
    const [errMessage, setErrMessage] = useState('')

    const handleFieldChange = (e) => setUserForm({ ...userForm, [e.target.name]: e.target.value });

    const submitForm = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, { ...userForm }).then((data) => {
            dispatch({ type : "save user session", user_session: { token: data.data.token , isLoggedIn: true } })
            history.push(`${match.path}/home` )
        }, (err) => { console.log(err); setErrMessage('Wrong username/password combination, please try again!'); });

        // dispatch({ type : "validate user", user: userForm })
        // const user = users.find(u => u.username === userForm.username && u.password === userForm.password);
        // if(user) history.push("/home")
        // else setErrMessage('Wrong username/password combination, please try again!')
    }
    
    return (
        <div className="container" style={{maxWidth: '30rem'}}>
            <h2 id="pageTitle" className="mt-5">Login</h2>
            <form>
                <div className="form-group mb-2">
                    <label>Username:</label>
                    <input id="inputUsername" name="username" className="form-control" value={userForm.username} onChange={handleFieldChange}/>
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input id="inputPassword" name="password" className="form-control" value={userForm.password} onChange={handleFieldChange}/>
                </div>
                <p id="errMessage" className="text-danger mt-2">{errMessage}</p>
                <button id="btnSubmit" className="btn btn-dark mt-2" type="submit" onClick={submitForm}>Login</button>
            </form>
        </div>
    );
}
