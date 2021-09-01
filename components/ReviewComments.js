import { Button } from "react-bootstrap";
import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import CatIcon from "../public/images/cat-icon.png";
import RatingStars from "./RatingStars";
import { SyncIcon } from "@primer/octicons-react";

export default function ReviewComments() {
    return (
        <>
            <ReviewComment/>
            <ReviewComment/>
            <Button variant="outline-danger" className="mt-1 mb-3 w-100"> <SyncIcon/> See more</Button>
        </>
    )
}

export function ReviewComment() {
    return (
        <div>
            <Row className="justify-content-left py-2">
                <Col className="d-flex gap-2 align-items-center">
                    <Image width={60} height={60} src={CatIcon.src} alt="Avatar"/>
                    <div>
                        <h6><b>Jhon Doe</b></h6>
                        <small className="text-muted"><time> May 17, 2021 </time></small>
                    </div>
                </Col>
                <Col>
                    <RatingStars size="small" rate={3.2}/>
                </Col>
            </Row>
            <Row className="py-1">
                <Col>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry{`'`}s standard dummy text ever since the 1500s,
                 when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                </Col>
            </Row>
            <hr/>

            <Row className="justify-content-left py-2">
                <Col className="d-flex gap-2 align-items-center">
                    <Image width={60} height={60} src={CatIcon.src} alt="Avatar"/>
                    <div>
                        <h6><b>Jhon Doe</b></h6>
                        <small className="text-muted"><time> May 17, 2021 </time></small>
                    </div>
                </Col>
                <Col>
                    <RatingStars size="small" rate={3.2}/>
                </Col>
            </Row>
            <Row className="py-1">
                <Col>
                It has survived not only five centuries, but also the leap into electronic typesetting, 
                remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                </Col>
            </Row>
            <hr/>
        </div>
    )
}
