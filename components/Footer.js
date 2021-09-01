import { Col, Row, ListGroup } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import FooterSocialAccount from "./FooterSocialAccount";

export default function Footer() {
    const shopDep = [
        {name: "Sneakers & Athletic", route: ""},
        {name: "Women's clothing", route: ""},
        {name: "Men's clothing", route: ""},
        {name: "Kid's clothing", route: ""},
        {name: "Women's shoes", route: ""},
        {name: "Men's shoes", route: ""},
        {name: "Smartphones & Tablets", route: ""},
        {name: "Wearable gadgets", route: ""},
    ]
    const AboutUs = [
        {name: "About company", route: ""},
        {name: "Our team", route: ""},
        {name: "Careers", route: ""},
        {name: "News", route: ""},
    ]
    return (
        <footer className="text-white bg-dark pt-5">
            <Container fluid="md">
                <Row>
                    <Col sm={5} lg={6}>
                        <h1>
                            Start your way<br /> for shopping here
                        </h1>
                        <p className="pt-3 text-justify">
                            We offer top quality and premium fashion clothing, accessories, shoes and footwear for all occasions.
                            We are a one stop shop for you. We know how important it is to you that you are happy with your purchase. We take pride in our work and have the capability to keep our customers happy and in good hands. We believe in a personal relationship with every customer and with a genuine need to help each one of our customers. We offer a fast and easy way to buy your fashion items online. Our customers find us through our website, social media, and word of mouth.
                        </p>
                    </Col>
                    <Col sm={4} lg={3} className="pt-2">
                        <h4 className="ps-1"><b> Shop department </b></h4>
                        <ListGroup variant="flush">
                            {
                                shopDep.map((dep) => (
                                    <ListGroup.Item key={dep.name}  className="bg-transparent text-white">
                                        {dep.name}
                                    </ListGroup.Item>
                                    )
                                )
                            }
                        </ListGroup>
                    </Col>
                    <Col sm={3} className="pt-2">
                        <h4 className="px-1"><b> About us </b></h4>
                        <ListGroup variant="flush">
                            {
                                AboutUs.map((dep) => (
                                    <ListGroup.Item key={dep.name}  className="bg-transparent text-white">
                                        {dep.name}
                                    </ListGroup.Item>
                                    )
                                )
                            }
                        </ListGroup>
                    </Col>
                    
                </Row>
                <hr />
                <FooterSocialAccount/>
            </Container>
        </footer>
    )
}
