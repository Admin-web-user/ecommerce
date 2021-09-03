import Image from 'next/image';
import ErrorImg from '../public/images/404.webp';
import { Button, Container } from 'react-bootstrap';

export default function ErrorPage() {
    return (
        <Container className="py-2 my-2 mx-auto text-center">
            <Image src={ErrorImg.src} alt="404 not found"  width={900} height={500}/>
            <h1 className="py-2">The page you are looking for was not found</h1>
            <div className="py-4">
            <Button href="/" variant="success" size="lg">Back to Home</Button>
            </div>
        </Container>
    )
}
