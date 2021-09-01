import Image from 'next/image';
import { Container } from 'react-bootstrap';
import Background2 from '../public/images/sellingBg.webp';

export default function Selling() {
    const width = 550;

    return (
        <div className="py-5" style={{ background: "#f4f4f4" }}>
            <Container className="bg-white p-0">
                <div className="d-grid justify-content-center align-items-center gap-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
                    <div className="py-4 px-1 text-center">
                        <h1 className="py-1">Start selling on ESMARY</h1>
                        <p className="py-2 ">Small things can make a big difference</p>
                    </div>
                    <div>
                        <Image src={Background2.src} alt="Selling or buying item" width={width} height={Background2.height * width / Background2.width} />
                    </div>
                </div>
            </Container>
        </div>
    )
}
