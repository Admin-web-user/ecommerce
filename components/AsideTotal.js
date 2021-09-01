import { Accordion, FormControl, Button } from 'react-bootstrap';
import { CreditCardIcon } from '@primer/octicons-react'

export default function AsideTotal() {
    return (
        <>
            <aside className="bg-white rounded-3 shadow-lg p-4">
                <div className="text-center mb-4 pb-3 border-bottom">
                    <h2 className="h4 mb-3 pb-1">Summary</h2>
                    <div className="d-flex justify-content-between">
                        <h6 className="fw-normal">Items <span> 3 </span></h6>
                        <h6 className="fw-normal">$265.<small>00</small></h6>
                    </div>
                </div>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Apply Coupon Code</Accordion.Header>
                        <Accordion.Body>
                            <FormControl placeholder="Coupon code" type="text" />
                            <div className="mt-3">
                                <Button className="w-100" variant="outline-danger">
                                    Apply coupon code
                                </Button>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <div className="d-flex justify-content-between my-3">
                    <h6 className="fw-normal">Total price</h6>
                    <h6 className="fw-normal">$275.<small>00</small></h6>
                </div>
                <Button className="w-100" variant="danger"><CreditCardIcon /> Proceed to Checkout</Button>
            </aside>
        </>
    )
}
