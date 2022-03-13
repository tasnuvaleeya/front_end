import React, {useEffect, useState} from "react";

import APIService from "./APIService";
import {useCookies} from "react-cookie";
import {useHistory} from 'react-router-dom'
function Login () {

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useCookies(['loginToken'])
    const [isLogin, setLogin] = useState(true)
    let history = useHistory()
    useEffect(() => {
        if (token['loginToken']) {
            history.push('/articles')
        }
    }, [token])

    const RegisterBtn = () => {
        APIService.RegisterUser({username, password})
            .then(() => btnLogin())
            .catch(error => console.log(error))

    }

    const btnLogin = () => {

        APIService.LoginUser({username, password})
            .then(resp => setToken('loginToken', resp.token))
            .catch(error => console.log(error))

    }
    return (
        <div className='App'><br/><br/>
            {/*<h2>Please Login</h2><br/><br/>*/}
            <div className='mb-3'>

                <br/>
                <br/>
                {isLogin ? <h1>Please Login </h1> : <h1>Please Register </h1>}


                <label htmlFor='username' className='form-label'>Username</label>
                <input type='text' className='form-control' placeholder='Please enter username' value={username} onChange={(e) => setUserName(e.target.value)}/>
                <label htmlFor='password' className='form-label'>Password</label>
                <input type='password' className='form-control' placeholder='Please enter password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                {/*<button onClick={btnLogin} className='btn btn-primary'>Login</button>*/}
                {isLogin ?  <button onClick = {btnLogin} className = "btn btn-primary">Login</button>
                    :  <button onClick = {RegisterBtn} className = "btn btn-primary">Register</button>
                }

            </div>

            <div className = "mb-3">
                <br/>
                {isLogin ? <h5>If You Don't Have Account, Please <button className = "btn btn-primary" onClick = {() => setLogin(false)} >Register</button>Here</h5>

                    :  <h5>If You Have Account, Please <button className = "btn btn-primary" onClick = {() => setLogin(true)} >Login</button>Here</h5>
                }

            </div>
        </div>
    )
}

export default Login