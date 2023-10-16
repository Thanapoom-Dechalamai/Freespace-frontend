import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { Navbar, Nav, Container, Row, Col, Dropdown } from 'react-bootstrap';
import { Outlet } from "react-router";
import { GoHomeFill, GoSearch } from 'react-icons/go';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { BsPerson } from 'react-icons/bs';
import { FaCode } from 'react-icons/fa6';
import { useNavigate } from "react-router-dom";
import CreatePostButton from '../button/createPostButton';

function NavbarComponent()
{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () =>
    {
        dispatch(logout());
        navigate('/authentication');
    };
    return (
        <Container className='mt-2'>
            <Navbar className='d-md-none' bg="white" variant="white" fixed="top">

                <Row className='w-100'>
                    <Col xs={4}></Col>
                    <Col xs={4}>
                        <Navbar.Brand href="home">
                            <FaCode className='nav-brand-icon' />
                        </Navbar.Brand>
                    </Col>
                    <Col xs={4} className='d-flex justify-content-end'>
                        <Dropdown className='d-md-none d-flex justify-content-center mt-1'>
                            <Dropdown.Toggle size='sm' variant="dark" id="dropdown-basic">

                            </Dropdown.Toggle>

                            <Dropdown.Menu className='dropdown-menu-end'>
                                <Dropdown.Item onClick={handleLogout}>
                                    Sign out
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown></Col>
                </Row>

            </Navbar>
            <Row>
                <Navbar bg="white" variant="white" fixed="bottom">
                    <Col xs={0} md={2}>
                        <Navbar.Brand className='d-none d-md-block m-0' href="/">
                            <FaCode className='nav-brand-icon' />
                        </Navbar.Brand>
                    </Col>
                    <Col xs={12} md={8}>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto w-100 justify-content-center">
                                <div className="d-flex justify-content-between nav-icon-container">
                                    <Nav.Item>
                                        <Nav.Link href="/">
                                            <GoHomeFill className='nav-icon' />
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="search">
                                            <GoSearch className='nav-icon' />
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link>
                                            <CreatePostButton className='nav-icon' />
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="profile">
                                            <BsPerson className='nav-icon' />
                                        </Nav.Link>
                                    </Nav.Item>
                                </div>
                            </Nav>
                        </Navbar.Collapse>
                    </Col>
                    <Col xs={0} md={2}>
                        <Dropdown className='d-flex justify-content-center'>
                            <Dropdown.Toggle size='sm' variant="transparent" id="dropdown-basic">

                            </Dropdown.Toggle>

                            <Dropdown.Menu className='dropdown-menu-end'>
                                <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Navbar>
            </Row>
            <Outlet />
        </Container>
    );
}

export default NavbarComponent;