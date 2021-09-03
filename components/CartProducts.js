import Image from "next/image"
import Link from 'next/link'
import { FormControl, FormLabel, Button, Spinner } from 'react-bootstrap'
import { SyncIcon, XCircleIcon } from '@primer/octicons-react';

export default function CartProducts({ products }) {

    return (
        <>
            {products[0] ? products.map(product => <CartProduct product={product} key={product?.title} />) : (
                <Spinner variant="success" />
            )}
            <Button className="w-100 mx-auto my-2" variant="outline-danger"> <SyncIcon /> Upade Cart </Button>

        </>
    )
}

const CartProduct = ({ product }) => {
    return (
        <div className="d-sm-flex justify-content-between align-items-center my-2 pb-3 border-bottom">
            <Link href={`/product/${product.id}`} passHref>
            <div className="d-block d-sm-flex align-items-center text-center text-sm-start">
                <a className="d-inline-block flex-shrink-0 mx-auto me-sm-4">
                    <Image height={180} width={180} src={product.image || "https://octodex.github.com/images/yogitocat.png"} alt={product.title} />
                </a>
                <div className="pt-2">
                    <h5 className="product-title fs-base mb-2">
                        <a>{product?.title}</a>
                    </h5>
                    <div className="fs-sm"><span className="text-muted me-2">Size:</span>8.5</div>
                    <div className="fs-sm"><span className="text-muted me-2">Color:</span>White &amp; Blue</div>
                    <div className="fs-lg text-accent pt-2">${product.price}</div>
                </div>
            </div>
            </Link>


            <div className="pt-2 pt-sm-0 ps-sm-3 mx-auto mx-sm-0 text-center text-sm-start">
                <FormLabel>Quantity</FormLabel>
                <FormControl type="number" id="quantity"
                    value={product.quantity || 0}
                    onChange={() => { }}
                />
                <button className="btn btn-link px-0 text-danger" type="button">
                    <XCircleIcon /> <span className="fs-sm">Remove</span>
                </button>
            </div>
        </div>
    )
}