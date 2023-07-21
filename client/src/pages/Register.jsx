import React, { useEffect, useState } from 'react'
import { Button, Form, Input,Spin,message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);

  const submitHandler = async (values)=>{
    try{
      console.log(values);
      setLoading(true);
      await axios.post("http://localhost:8080/api/v1/users/register",values);
      setLoading(false);
      message.success("Registered Succesfully!");
      navigate("/login");
    }
    catch(error){
      setLoading(false);
      message.error("Registration Failed, try again after sometime");
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
      <h1 className='mb-5' style={{fontStyle : 'italic',fontSize: '50px',textShadow: '0 1px 2px black'}}>SpendWise</h1>
      <div className='register-div'>

      
        <Form className="register-form" layout='vertical' onFinish={submitHandler}>
        <h2 className='text-center p-3'>Create Account</h2>
          <Form.Item label="Name" name="name" >
            <Input placeholder='Your Name'/>
          </Form.Item>
          <Form.Item label="Email" name="email" >
            <Input placeholder='abc@xyz.com' type='email'/>
          </Form.Item>
          <Form.Item label="Password" name="password" >
            <Input.Password placeholder='Enter Password'type='password'/>
          </Form.Item>
          <div className='d-flex justify-content-between pt-2'>
            <div className='d-flex mt-2' >
              <p style={{marginRight : 5}}>Already Registered? </p>
              <Link to="/login"> Login</Link>
            </div>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </div>
        </Form>
        </div>
      </div>
      }
    </>
  )
}

export default Register