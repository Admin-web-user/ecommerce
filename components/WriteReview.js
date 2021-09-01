import { FormLabel, FormControl, FormGroup, Button } from "react-bootstrap";

export default function WriteReview() {
    return (
        <>
            <div className="bg-light-1 py-4 px-3 rounded-3 border border-1">
                <h3 className="pb-2 fw-bold">Write a review</h3>
                <form className="py-1">
                    <FormLabel className="pt-2"><b>Name</b></FormLabel>
                    <FormControl name="name" type="text" placeholder="Your name" />
                    <FormLabel className="pt-2"><b>Email</b></FormLabel>
                    <FormControl name="email" type="email" placeholder="Your email" />

                    <FormGroup className="mb-3 pt-2">
                        <FormLabel><b>Review</b></FormLabel>
                        <FormControl as="textarea" rows={5} />
                    </FormGroup>
                    <Button type="submit" variant="danger" className="my-2 w-100"> Submit a Review </Button>
                </form>
            </div>
        </>
    )
}
