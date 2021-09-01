import { StarFillIcon } from '@primer/octicons-react';
import RatingStars from "./RatingStars";
import { Row, ProgressBar, Col } from 'react-bootstrap';

export default function ReviewsRates({rating}) {
    const rates = [
        { percentage: 80, star: 5, color: "danger" },
        { percentage: 40, star: 4, color: "success" },
        { percentage: 50, star: 3, color: "info" },
        { percentage: 20, star: 2, color: "warning" },
        { percentage: 10, star: 1, color: "primary" },
    ]
    return (
        <>
            <Row className="align-items-center">
                <Col className="py-2" md={6}>
                    <h2>Consumer Reviews</h2>
                    <div className="py-2">
                        <RatingStars rate={rating?.rate}/>

                        {
                            rating?.rate && rating?.count ? 
                            <p className="fs-clamp-1 py-2"> {rating?.rate} average based on {rating?.count} reviews. </p>
                            : <p className="fs-clamp-1 py-2">No ratings and reviews yet</p>
                        }
                    </div>
                </Col>

                <Col className="py-2" md={6}>
                    {
                        rates.map((rate) => (
                            <div key={rate.star} className="ratingBar d-grid">
                                <span>
                                    {rate.star} <StarFillIcon />
                                </span>
                                <ProgressBar className="my-3"
                                    style={{ height: "5px" }} variant={rate.color} now={rate.percentage} />
                            </div>
                        ))
                    }
                </Col>
            </Row>
        </>
    )
}
