import { ChevronDownIcon, PlusIcon } from "@primer/octicons-react";
import axios from "axios";
import { Col, Row, ListGroup, ListGroupItem } from "react-bootstrap";
// import {useRouter} from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

export default function Index({ products }) {
    console.log(products)

    const AllCategories = [
        { text: "Men", route: "/men" }, { text: "Women", route: "women" }, { text: "Combo", route: "combo" }
        , { text: "Special", route: "special" }, { text: "Sneakers & Athletic", route: "" }
    ]

    return (
        <>
            <section style={{ maxWidth: "1500px" }} className="mx-auto px-1">
                <Row>
                    <Col md={4} className="my-3 py-3 slideTrigger">
                        <h2 className="text-md-justify">All Categories
                            <button className="btn">
                                <ChevronDownIcon size="medium" />
                            </button>
                        </h2>
                        <ListGroup className="py-2 slider" variant="flush">
                            {
                                AllCategories.map(category => (
                                    <ListGroupItem style={{ maxWidth: "400px" }}
                                        className="py-2 d-flex justify-content-between w-100 mx-auto" key={category?.text}>
                                        <span>{category?.text}</span>
                                        <button className="btn"><PlusIcon /></button>
                                    </ListGroupItem>
                                ))
                            }
                        </ListGroup>
                    </Col>

                    <Col md={8} className="d-grid products py-4 mt-lg-4">
                        {
                            products.map(product => (
                                <Link href={`/product/${product?.id}`} key={product?.title} passHref>
                                    <div className="product product_hover d-grid justify-content-center align-items-stretch">
                                        <Image
                                            src={product?.image} width={500}
                                            height={500} alt={product?.ttle} />
                                        <div className="d-grid product_detail justify-content-center">
                                            <div className="product_name">{product?.title}</div>
                                            <div className="product_price py-2">
                                                Price: $ <b>{product?.price}</b>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </Col>

                </Row>
            </section>
        </>
    )
}

export async function getServerSideProps(context) {
    if (context?.query?.category) {
        const { category } = context?.query;
        const { data } = await axios.get(`https://fakestoreapi.com/products/category/${category}`)
            .catch(err => console.log(err))
        return {
            props: {
                products: data
            }
        }
    }
    const { data } = await axios.get(`https://fakestoreapi.com/products?sort=desc`)
        .catch(err => console.log(err))
    return {
        props: {
            products: data
        }
    }
}