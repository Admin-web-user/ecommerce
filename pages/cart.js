import { ChevronLeftIcon } from "@primer/octicons-react";
import { Col, Container, Row, Button } from "react-bootstrap";
import AsideTotal from "../components/AsideTotal";
import CartProducts from '../components/CartProducts';
import axios from 'axios';

export default function Cart({ products }) {

    console.log(products[0])
    return (
        <>
            <main>
                <div className="py-5 text-white" style={{ background: "var(--primary)" }}>
                    <Container className="d-lg-flex justify-content-between py-2 py-lg-3">
                        <h3 className="pb-3"><strong>Your cart</strong></h3>
                    </Container>
                </div>
                <Container className="pb-5 mb-2 mb-md-4" style={{ marginTop: "-4.875rem" }}>
                    <Row>
                        <Col lg={8}>
                            <div className="d-flex justify-content-between align-items-center pt-3 pb-4 pb-sm-4 mt-1">
                                <h4 className="text-white">Products</h4>
                                <Button size="sm" variant="danger">
                                    <ChevronLeftIcon /> Continue shopping</Button>
                            </div>
                            {
                                products[0] ?
                                    <CartProducts products={products} />
                                    :
                                    "No item was found"
                            }
                        </Col>
                        <Col lg={4} className="pt-4 pt-lg-0 ps-xl-5">
                            <AsideTotal />
                        </Col>
                    </Row>
                </Container>
            </main>
        </>
    )
}

export async function getServerSideProps() {
    const BaseURL = "https://fakestoreapi.com";
    let Products = [];
    
    const {data} = await axios.get(`${BaseURL}/carts/1`);
    if(data?.products) {
            for (let i = 0; i < data?.products.length; i++) {
                const res = await axios.get(`${BaseURL}/products/${data?.products[i].productId}`);
                Products.push({...res.data, quantity: data?.products[i].quantity})
            }
    }
    
    return {
        props: {
            products: Products
        }
    }
}