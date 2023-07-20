import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {
  const [currUser, setCurrUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrUser(user);
    }
  }, []);

  const logOutHandler = async () => {
    try {
      await axios.get('http://localhost:8080/api/v1/users/logout', { withCredentials: true });
      localStorage.removeItem('user');
      message.success('Logged Out Successfully');

      navigate('/login');
    } catch (error) {
      message.error('Failed. Try Again Later');
    }
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary custom-nav" >
      <Container className='custom-nav2'>
        <Navbar.Brand href="/" style={{fontSize:'30px',textShadow: '0 0 1.5px black'}}>SpendWise</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/transaction">All Transaction</Nav.Link>
            <Nav.Link href="/income">Incomes</Nav.Link>
            <Nav.Link href="/expense">Expenses</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Item className='my-2' style={{fontSize:'16px',textShadow: '0 0 0.7px black'}}><FaUser />  {currUser.name}</Nav.Item>
            <Nav.Link onClick={logOutHandler}>SignOut</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default Header;
