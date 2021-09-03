import Image from 'next/image';
import VendorSideBar from '../../components/VendorSideBar';
import { Col, Container, Row } from 'react-bootstrap';

export default function index() {
    return (
        <>
            <main>
                <div className="pt-5 pb-4 text-white bg-success" >
                    <Container className="d-lg-flex justify-content-between py-2 py-lg-3">
                        <div className="d-flex gap-2 align-items-center pb-2">
                            <Image className="rounded-circle" src="https://vercel.com/api/www/avatar/bd67b89a997b881fd07313e65e06a9d515e1d5cc?s=160" alt="Vendor's cover" width={80} height={80} />
                            <div>
                                <h4 className="pb-3"><strong>The brand box</strong></h4>
                                <span>Member since <time>February 2021</time></span>
                            </div>
                        </div>

                        <div>
                            <h5>Total sale</h5>
                            <h3><strong>100</strong></h3>
                        </div>
                    </Container>
                </div>
                <Container>
                    <Row>
                        <Col>
                            <VendorSideBar />
                        </Col>
                    </Row>
                </Container>
            </main>
        </>
    )
}
