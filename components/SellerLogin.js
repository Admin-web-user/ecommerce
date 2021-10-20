import {
    Container,
    Button,
    FormControl,
    FormGroup,
    FormLabel,
    Row,
    Col,
    FormCheck,
    Spinner
} from "react-bootstrap";
import { useState, useContext } from "react";
import { PencilIcon, SignInIcon } from "@primer/octicons-react";
import axios from "axios";
import AuthContext from '../lib/context';
import Modal from "./Modal";
import { signUpAsSeller } from "../lib/Firebase/auth";

export default function SellerLogin() {
    const { loginSeller } = useContext(AuthContext)

    const [member, setMember] = useState({ email: '' })
    const [seller, setSeller] = useState({
        username: "",
        company_name: "",
        email: "",
        contact_number: "",
        address: "",
        city: "",
        description: "",
        payment_methods: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [repeatedPass, setRepeatedPass] = useState("")

    //For Modal
    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState({ head: '', body: '' })

    function showModal(head, body, display = true) {
        setNotification({
            head: head,
            body: body
        })
        setShow(display);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        console.log(seller);
        try {
            if (seller.email && seller.company_name && seller.password) {
                await signUpAsSeller({
                    email: seller.email,
                    password: seller.password,
                    name: seller.username,
                    company_name: seller.company_name,
                    contact_number: seller.contact_number,
                    address: seller.address,
                    city: seller.city,
                    description: seller.description,
                    payment_methods: seller.payment_methods,
                },
                    async (response) => {
                        setLoading(false)
                        if (response?.error)
                            showModal('ERROR', response.error)
                        else
                            showModal(response.head, response.message)

                        //Rest of the code here
                        console.log(response.user)
                    })
            } else {
                showModal('Error! Information missing', 'Some of the input field is missing. Please fill up the required informations')
            }
        } catch (error) {
            setLoading(false)
            showModal('ERROR', error.message)
        }
    };

    const onChangeInput = (e) => {
        setSeller({ ...seller, [e.target.name]: e.target.value });
    };

    const handleCheckbox = (e) => {
        if (e.target.checked) {
            setSeller((prev) => ({
                ...seller,
                payment_methods: prev?.payment_methods + e.target.name + ",",
            }));
            console.log(seller, e.target.checked);
        } else {
            setSeller((prev) => ({
                ...seller,
                payment_methods: prev?.payment_methods.replace(e.target.name + ",", ""),
            }));
            console.log(seller, e.target.checked);
        }
    };

    const onSignIn = async (e) => {
        e.preventDefault()
        if (member?.email) {
            try {
                setLoading(true)

                //Code goes here....

            } catch (error) {
                setLoading(false)
                console.log(error.message)
                showModal('ERROR', error.message)
            }
        }
    }
    return (
        <Container>
            {
                loading &&
                <div className="top-0 start-0 d-flex justify-content-center align-items-center w-100 h-100 position-fixed bg-dark bg-opacity-25">
                    <Spinner animation="border" variant="success" /> &nbsp; <h5 className="text-success">LOADING</h5>
                </div>

            }

            <h2 className="pb-4 mb-2">Want to sell your products?</h2>
            <Row>
                <Col className="my-5" md={5}>
                    <h3>Already a member ? </h3>
                    <form onSubmit={(e) => onSignIn(e)}>
                        <FormGroup className="my-2">
                            <FormControl type="email" placeholder="Your email"
                                onChange={(e) => setMember({ ...member, email: e.target.value })} required />
                        </FormGroup>
                        <Button variant="success" type="submit" className="w-100" >
                            {" "}
                            <SignInIcon /> Sign in
                        </Button>
                    </form>
                </Col>

                <Col>
                    <h3>Not registered yet?</h3>
                    <form
                        className="border rounded-3 p-2 shadow mt-3"
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <h4>
                            {" "}
                            <PencilIcon size="medium" /> <b>Register here</b>
                        </h4>
                        <FormGroup className="my-3">
                            <FormLabel>
                                {" "}
                                <b> User name</b>
                            </FormLabel>
                            <FormControl
                                onChange={(e) => onChangeInput(e)}
                                name="username"
                                maxLength={20}
                                required
                            />
                        </FormGroup>
                        <FormGroup className="my-3">
                            <FormLabel>
                                {" "}
                                <b> Company Name</b>
                            </FormLabel>
                            <FormControl
                                onChange={(e) => onChangeInput(e)}
                                name="company_name"
                            />
                        </FormGroup>
                        <Row className="align-items-center">
                            <Col md={6}>
                                <FormGroup className="my-2">
                                    <FormLabel>
                                        {" "}
                                        <b> Email</b>
                                    </FormLabel>
                                    <FormControl
                                        onChange={(e) => onChangeInput(e)}
                                        name="email"
                                        type="email"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup className="my-3">
                                    <FormLabel>
                                        {" "}
                                        <b> Contact number</b>
                                    </FormLabel>
                                    <FormControl
                                        onChange={(e) => onChangeInput(e)}
                                        name="contact_number"
                                        type="number"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <FormGroup className="my-3">
                            <FormLabel>
                                {" "}
                                <b> Password</b>
                            </FormLabel>
                            <FormControl
                                onChange={(e) => onChangeInput(e)}
                                name="password"
                                type="password"
                                autoComplete="on"
                            />
                        </FormGroup>
                        <FormGroup className="my-3">
                            <FormLabel>
                                {" "}
                                <b> Repeat password</b>
                            </FormLabel>
                            <FormControl
                                onChange={(e) => setRepeatedPass(e.target.value)}
                                name="repeat password"
                                type="password"
                            />
                        </FormGroup>

                        <small style={{ color: "red" }}>
                            {repeatedPass && repeatedPass !== seller.password ? 'Password does not match' : null}
                        </small>

                        <Row>
                            <Col md={6}>
                                <FormGroup className="my-3">
                                    <FormLabel>
                                        {" "}
                                        <b> Address</b>
                                    </FormLabel>
                                    <FormControl
                                        onChange={(e) => onChangeInput(e)}
                                        name="address"
                                        type="text"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup className="my-3">
                                    <FormLabel>
                                        {" "}
                                        <b> City</b>
                                    </FormLabel>
                                    <FormControl
                                        onChange={(e) => onChangeInput(e)}
                                        name="city"
                                        type="text"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <FormGroup className="my-3">
                            <FormLabel>
                                {" "}
                                <b> Description</b> <small>optional</small>
                            </FormLabel>
                            <FormControl
                                onChange={(e) => onChangeInput(e)}
                                name="description"
                                as="textarea"
                                rows={5}
                            />
                        </FormGroup>
                        <div className="py-3">
                            <h5 className="mb-0">
                                <b>Payment methods</b>{" "}
                            </h5>
                            <small className="mb-3">Choose atleast one</small>
                            <FormCheck
                                type="checkbox"
                                label="Bkash"
                                onChange={(e) => handleCheckbox(e)}
                                name="Bkash"
                            />
                            <FormCheck
                                type="checkbox"
                                label="Rocket"
                                name="Rocket"
                                onChange={(e) => handleCheckbox(e)}
                            />
                            <FormCheck
                                type="checkbox"
                                label="Paypal"
                                name="Paypal"
                                onChange={(e) => handleCheckbox(e)}
                            />
                            <FormCheck
                                type="checkbox"
                                label="Cash on delivery"
                                name="Cash on delivery"
                                onChange={(e) => handleCheckbox(e)}
                            />
                        </div>

                        <Button
                            type="submit"
                            variant="success"
                            size="lg"
                            className="w-100 mb-3 mt-5"
                            disabled={!repeatedPass || repeatedPass != seller.password}
                        >
                            Submit
                        </Button>
                    </form>
                </Col>
            </Row>
            {

            }
            <Modal show={show} handleClose={() => setShow(false)} head={notification.head} body={notification.body} />

        </Container>
    );
}
