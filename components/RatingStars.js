import { StarFillIcon } from '@primer/octicons-react';

export default function RatingStars({rate, size = "medium"}) {
    
    const isGreater = (i) => {
        return {greater:Math.floor(+rate)>=i+1,
             decimalExist: i < +rate && +rate < i+1}
    }
    const ratingStars = () => {
        let stars= []
        for (let i = 0; i < 5; i++) {
            stars.push(<StarFillIcon size={size} key={`star ${i+1}`}
            className={`${size=="small"? "mx-1" : "mx-2 px-1"}`} 
            fill={isGreater(i).greater ? "red" : isGreater(i).decimalExist ? "orange" : "grey"} />)
        }
        return stars
    }

    return (
        <div className="py-1 rating_stars">
           {ratingStars()} 
        </div>
    )
}
