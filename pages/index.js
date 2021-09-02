import Image from 'next/image';
import Banner from '../components/Banner';
import Background1 from '../public/images/bg1.webp';
import Background3 from '../public/images/sneakers.webp';
import ProductSilder from '../components/ProductSilder';
import Selling from '../components/Selling';
import Background4 from '../public/images/web_bg.webp';

export default function Home({ featuredProducts, bestDeals }) {
  
  const windoWidth = 1920;

  return (
    <>
      <div className="d-grid text-center text-white gap-5 pt-5"
        style={{ background: `url(${Background1?.src})`, backgroundPosition: "center", backgroundAttachment: "fixed" }}>
        <hr className="opacity-0 mt-0" />
        <h1 className="py-3 mx-auto px-1 fw-bolder" style={{ lineHeight: "1.5", maxWidth: "800px", fontSize: "clamp(2rem, 5vw, 4rem)" }}>
          DISCOVER SECRETS OF SAVING MONEY ONLINE
        </h1>
        <button className="btn bg-transparent btn-outline-light btn-lg border border-3 rounded-0 mx-auto mb-5"
          style={{ fontSize: "1.25em", width: "200px", fontWeight: '600' }}>
            <a href="#popularCategories">SHOP NOW</a>
            </button>
        <hr className="opacity-0" />
      </div>

      <ProductSilder id="popularCategories" products={featuredProducts} title="Popular Categories" />
      <ProductSilder products={bestDeals} title="Best Deals" />
      <Banner
        suptitle="Complete your look with"
        title="New exclusive sneakers"
        subtitle="For out doors"
        banner={Background3} reverse={true} />
      <Selling />
      <div>
        <Image src={Background4?.src} width={windoWidth} height={500} alt="bottom image"/>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const data = await fetch('https://fakestoreapi.com/products?limit=8');
  const womenClothing = await fetch('https://fakestoreapi.com/products/category/women\'s clothing');
  const bestDeals = await womenClothing.json();
  const featuredProducts = await data.json();

  return {
    props: {
      featuredProducts,
      bestDeals
    }
  }
}
