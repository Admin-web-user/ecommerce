import { SignInIcon, PersonIcon } from '@primer/octicons-react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'

export default function auth() {

    const inputs = [
        { placeholder: "First name", type: "text", name: "first_name", for: "signUp" },
        { placeholder: "Last name", type: "text", name: "last_name", for: "signUp" },
        { placeholder: "Email Address", type: "email", name: "email" },
        { placeholder: "Phone number", type: "number", name: "phone", for: "signUp" },
        { placeholder: "Password", type: "password", name: "password" },
        { placeholder: "Confirm Password", type: "password", name: "confirm_password", for: "signUp" },
    ]

    return (
        <>
            <main className="d-grid py-5" style={{placeItems: "center"}}>
                <Container className="py-4 py-lg-5 my-4">
                    <Row>
                        <Col md={6} className="py-4 mt-3 mt-md-0 border">
                            <h2 className="h4 mb-3"><b>Sign in</b></h2>
                            <Form>
                                <Row className="gx-4 gy-3">
                                    {
                                        inputs.map(input => (
                                            input?.for !== "signUp" ? (
                                                <Col lg={12} key={input.name}>
                                                    <Form.Control placeholder={input?.placeholder} autoComplete="true"/>
                                                    <Form.Control.Feedback type="invalid">
                                                        Please enter your first name!.
                                                    </Form.Control.Feedback>
                                                </Col>
                                            ) : ""

                                        ))
                                    }
                                    <div className="text-end fw-bolder">
                                        <button type="button" className="btn">Forgot password?</button>
                                    </div>
                                    <hr className="w-75 mx-auto"/>
                                    <Col sm={12}>
                                        <button className="btn w-100 btn-outline-danger">
                                            <SignInIcon /> SIGN IN
                                        </button>
                                    </Col>
                                    <p className="text-center">OR</p>
                                    <Col sm={12}>
                                        <button className="btn w-100 btn-outline-danger">
                                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="30px" height="30px"><path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
                                            &nbsp; SIGN IN WITH GOOGLE
                                        </button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>

                        <Col md={6} className="py-4 mt-3 mt-md-0 border">
                            <h2 className="h4 mb-3"><b>No account? Sign up</b></h2>
                            <p className="fs-sm text-muted mb-4"><b>
                                Registration takes less than a minute but gives you full control over your orders.</b></p>
                            <Form>
                                <Row className="gx-4 gy-3">
                                    {
                                        inputs.map(input => (
                                            <Col sm={input?.type ==='password'? 12 : 6} key={input.name}>
                                                <Form.Control placeholder={input?.placeholder} 
                                                type={input?.type} autoComplete="true" required/>
                                                <Form.Control.Feedback type="invalid">
                                                    Please enter your {input?.placeholder}!.
                                                </Form.Control.Feedback>
                                            </Col>
                                        ))
                                    }
                                    <Col sm={12}>
                                        <button className="btn w-100 btn-outline-danger">
                                            <PersonIcon /> SIGN UP
                                        </button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </main>
        </>
    )
}
