import { Badge, FormGroup, FormLabel, FormSelect, Row, Col } from 'react-bootstrap';

function Products() {
    return (
        <div className="my-2 py-2">
            <Row className="justify-content-between align-items-center">
                <Col sm={7} md={8}>
                    <h5 className="pt-1 pb-2"><b className="h2"> Your products </b> <Badge bg="secondary">3</Badge> </h5>
                </Col>
                <Col sm={5} md={4}>
                    <FormGroup className="d-flex align-items-center">
                        <FormLabel className="w-75">Sort by:</FormLabel>
                        <FormSelect defaultValue="Time">
                            <option value="Time">Time</option>
                            <option value="Name">Name</option>
                            <option value="Price">Price</option>
                        </FormSelect>
                    </FormGroup>
                </Col>
            </Row>
            <hr />
        </div>
    )
}

export default Products

export const Product = () => {
    return (
        <>
            <div>
                
            </div>
        </>
    )
}
