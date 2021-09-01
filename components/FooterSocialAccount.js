import { Col, Row } from "react-bootstrap";

export default function FooterSocialAccount() {
    const socialAppIcons = [
        { path: "M19 6h5v-6h-5c-3.86 0-7 3.14-7 7v3h-4v6h4v16h6v-16h5l1-6h-6v-3c0-0.542 0.458-1 1-1z" },
        { path: "M22 20c-2 2-2 4-4 4s-4-2-6-4-4-4-4-6 2-2 4-4-4-8-6-8-6 6-6 6c0 4 4.109 12.109 8 16s12 8 16 8c0 0 6-4 6-6s-6-8-8-6z" },
        { path: "M29 0h-26c-1.65 0-3 1.35-3 3v26c0 1.65 1.35 3 3 3h26c1.65 0 3-1.35 3-3v-26c0-1.65-1.35-3-3-3zM12 26h-4v-14h4v14zM10 10c-1.106 0-2-0.894-2-2s0.894-2 2-2c1.106 0 2 0.894 2 2s-0.894 2-2 2zM26 26h-4v-8c0-1.106-0.894-2-2-2s-2 0.894-2 2v8h-4v-14h4v2.481c0.825-1.131 2.087-2.481 3.5-2.481 2.488 0 4.5 2.238 4.5 5v9z" },
    ]
    return (

        <Row>
            <Col><h4>ESMARY</h4></Col>
            <Col>
                {
                    socialAppIcons.map((icon, i) => (
                        <button className="btn border border-light mx-2 hover" key={i}>
                            <svg className="icon" viewBox="0 0 32 32">
                                <path d={icon?.path}></path>
                            </svg>
                        </button>
                    ))
                }
            </Col>
        </Row>
    )
}
