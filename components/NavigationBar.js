import Link from 'next/link';
import { useState } from 'react';
import { SearchIcon } from '@primer/octicons-react';
import { CartIcon, GridIcon } from './icons/Icon';
import Nav from "react-bootstrap/Nav";
import ListGroup from 'react-bootstrap/ListGroup';
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Background1 from '../public/images/bg1.webp';

export default function NavigationBar() {
    const navItems = [
        { text: "All Categories", type: "offcanvas", icon: <GridIcon size="15" /> },
        { text: "Sell", route: "/vendor" },
        { text: "Cart", route: "/cart", icon: <CartIcon fill="white" size="15" /> },
        { text: "Sign in/up", route: "/auth" }
    ];

    const AllCategories = [
        { text: "All", route: "" },
        { text: "Men", route: "men's clothing" }, { text: "Women", route: "women's clothing" }, { text: "Combo", route: "" }
        , { text: "Special", route: "" }, { text: "Sneakers & Athletic", route: "" }
    ]
    const [show, setShow] = useState(null);

    const handleShow = (item) => setShow(item);
    const handleClose = () => setShow(null);

    return (
        <>
            <Navbar collapseOnSelect expand="md"
                style={{ zIndex: 1, background: `url(${Background1?.src})`, backgroundPosition: "center", backgroundAttachment: "fixed" }}
                className="position-absolute w-100 bg-transparent text-white">
                <div className="container-fluid px-lg-5">
                    <Link href="/">
                        <a className="text-white navbar-brand">ESMARY</a>
                    </Link>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className="navbar-dark justify-content-end border-0" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                        <Nav className="nav_container justify-content-end py-2 text-center" style={{ fontSize: "1.15rem" }}>
                            <div>
                                <div className="justify-content-center d-flex align-items-center input_container border border-start-0 border-end-0 border-top-0 border-bottom-light">
                                    <input type="search" style={{ color: "white", maxWidth: "240px", width: "100%" }}
                                        className="form-control bg-transparent border-0 rounded-0"
                                        name="search" placeholder="Search item" />
                                    <button className="btn"><SearchIcon size="small" fill="white" /></button>
                                </div>
                            </div>
                            {
                                navItems.map(item => {
                                    return (
                                        <Nav.Item key={item.text}>
                                            {item?.type === "offcanvas" ? (
                                                <>
                                                    <button className="btn w-100 hover mx-lg-3 text-white" onClick={() => handleShow(item?.text)}>
                                                        <span style={{ fill: "white" }}>{item?.icon}</span> {item?.text}
                                                    </button><hr className="d-md-none mb-0" />

                                                    <Offcanvas show={show === item?.text} onHide={handleClose}>
                                                        <Offcanvas.Header closeButton>
                                                            <Offcanvas.Title>
                                                                {item?.text} <span style={{ fill: "black" }}>{item?.icon}</span>
                                                            </Offcanvas.Title>
                                                        </Offcanvas.Header>
                                                        <Offcanvas.Body>
                                                            <ListGroup variant="flush">
                                                                {
                                                                    AllCategories.map(category => (
                                                                        <ListGroup.Item key={category?.text}>
                                                                            <Link href={`products?category=${category?.route}`} passHref>
                                                                                <button className="w-100 btn">
                                                                                    {category?.text}
                                                                                </button>
                                                                            </Link>
                                                                        </ListGroup.Item>
                                                                    ))
                                                                }
                                                            </ListGroup>
                                                        </Offcanvas.Body>
                                                    </Offcanvas>
                                                </>
                                            ) : (
                                                <Link href={item?.route}>
                                                    <a className="btn w-100 hover mx-lg-3 text-white">
                                                        {item?.icon} {item.text}<hr className="d-md-none mb-0" /></a>
                                                </Link>
                                            )}
                                        </Nav.Item>
                                    )
                                }
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar >
        </>
    )
}
