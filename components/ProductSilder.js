import {useRef} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Spinner from 'react-bootstrap/Spinner'
import { ChevronRightIcon } from '@primer/octicons-react'

function PopularCategories({ products, title }) {

    const productContainer = useRef();

    const scrollProductContainer = () => {
         const el = productContainer.current;
         el.focus();
         el.scroll({
             left: el.scrollLeft + window.innerWidth/2,
             behaviour: 'smooth'
         })
    }
    return (
        <>
            <section style={{ padding: "4vw .5rem" }}>
                <div className="py-3 d-flex justify-content-between pl-2 pr-1">
                    <h2>{title}</h2>
                    <button className="btn text-decoration-underline">View all</button>
                </div>
                {
                    products ? (
                        <div className="position-relative">
                            <div ref={productContainer} tabIndex="0"
                             className="d-flex hide_scroll pe-5" style={{ outlineColor: "transparent", overflowX: "auto", gap: "1vw", scrollBehavior: "smooth" }}>
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
                            </div>
                            <div style={{right: '0'}}
                            className="align-items-center h-100 position-absolute top-0 d-flex justify-content-end">
                                <button className="p-0 btn arrow_btn rounded-circle" onClick={()=>scrollProductContainer()}>
                                    <ChevronRightIcon className="small_arrow" size='large' /></button>
                            </div>
                        </div>

                    ) : (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    )
                }
            </section>
        </>
    )
}

export default PopularCategories
