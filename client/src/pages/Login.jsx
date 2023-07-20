import { Button, Form, Input, Spin, message } from 'antd'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);

  const submitHandler = async (values)=>{
    try{
      setLoading(true);
      const {data} = await axios.post("http://localhost:8080/api/v1/users/login", values, { withCredentials: true });
      localStorage.setItem('user',JSON.stringify(data))
      setLoading(false);
      message.success("Logged In Succesfully!");
      navigate("/");
    }
    catch{
      setLoading(false);
      message.error("Invalid Email or Password.");
    }
  }

  useEffect(()=>{
    if(localStorage.getItem('user')){
      navigate('/')
    }
  },[navigate])


  return (
    <>
      {loading ? <Spin size = 'large' className='d-flex justify-content-center align-items-center spinner'/> : 
      <div className='register-page'>
      <div className='login-div'>

      
          <Form className="login-form" layout='vertical' onFinish={submitHandler}>
          <h2 className='text-center pb-4'>Login</h2>
            <Form.Item label="Email" name="email" >
              <Input placeholder='abc@xyz.com' type='email'/>
            </Form.Item>
            <Form.Item label="Password" name="password" >
              <Input.Password placeholder='Enter Password'type='password'/>
            </Form.Item>
            <div className='d-flex justify-content-between pt-2'>
              <div className='d-flex mt-2'>
                <p style={{marginRight : 3}}>Don't have an account?</p>
                <Link to="/register">Create Account</Link>
              </div>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
      }
    </>
  )
}

export default Login