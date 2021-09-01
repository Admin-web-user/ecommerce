import Image from 'next/image';
import { useRef, useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Col, Container, Row, FormSelect, Spinner } from 'react-bootstrap';
import ReviewsRates from '../../components/ReviewsRates';
import WriteReview from '../../components/WriteReview';
import ReviewComments from '../../components/ReviewComments';
import ProductSlider from '../../components/ProductSilder';

export default function Product({ product }) {

  console.log(product);
  const [categorizedData, setCategorizedData] = useState()

  const domElement = useRef();

  useEffect(() => {
    lazyLoad(domElement.current, async () => {
      const { category } = product;
      const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`)
        .catch(err => console.log(err))

        setCategorizedData(response.data);

    })
  }, [])

  function Capitalize(text) {
    return text[0].toUpperCase() + text.substring(1);
  }

  const lazyLoad = (target, callback) => {

    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        
        if (entry.isIntersecting) {
          callback();
          observer.disconnect();
        }
        
      })
    })
    io.observe(target)
  }

  return (
    <>
      <Container fluid="md" className="pt-5">
        {
          product?.title ?
            <>
              <Row>
                <Col md={6}>
                  <Image src={product?.image || ""} height={400} width={400} alt={product?.title} />
                </Col>
                <Col md={6}>
                  <div>
                    <h3 className="text-muted"> {Capitalize(product?.category)} </h3>
                    <h1 className="py-2">{product?.title}</h1>
                    <h2 className="py-2">$ {product?.price}</h2>
                  </div>
                  <p className="my-2 py-3 px-1 text-justify fs-clamp-1">
                    {product?.description}
                  </p>
                  <div className="my-4  mx-1 d-flex justify-content-evenly gap-3">
                    <FormSelect size="sm" className="fw-bold border border-3" style={{ maxWidth: "120px" }}>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </FormSelect>
                    <Button variant="danger" className="w-100 py-2 px-4 shadow"> Add to cart </Button>
                  </div>
                </Col>
              </Row>
              <hr />
              <ReviewsRates rating={product.rating} />
              <hr className="my-4" />
              <Row>
                <Col md={7}>
                  <ReviewComments />
                </Col>
                <Col md={5}>
                  <div className="py-3">
                    <WriteReview />
                  </div>
                </Col>
              </Row>
              <hr />
              <h2 className="pt-3 mt-3">You may also like</h2>
              <div ref={domElement}>
                {
                  categorizedData ? <ProductSlider products={categorizedData} /> : <Spinner/>
                }
            
              </div>
            </> :
            "The item was not found"
        }
      </Container>
    </>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.query
  const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`)
    .catch(err => console.log(err));

  return {
    props: { product: data }
  }
}