import Image from 'next/image';
import { Container } from 'react-bootstrap';

export default function Banner({suptitle, title, subtitle, banner, bannerWidth=550, reverse=false}) {
    return (
        <div className="py-5">
            <Container>
                <div className="d-grid justify-content-center align-items-center gap-2"
                 style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
                <div className="py-4 px-1">
                        <p className="py-2 md_res_txt">{suptitle}</p>
                        <h1 className="py-1">{title}</h1>
                        <p className="py-2 md_res_txt">{subtitle}</p>
                    </div>
                    <div style={{gridRow: reverse?"1": "auto" }}>
                        <Image src={banner.src} alt="Image"
                         width={bannerWidth} height={banner.height * bannerWidth / banner.width} />
                    </div>
                </div>
            </Container>
        </div>
    )
}
