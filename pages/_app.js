import NProgress from 'nprogress';
import router from 'next/router';
import NavigationBar from '../components/NavigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import 'nprogress/nprogress.css';
import 'chartist/dist/chartist.css'
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }) {

  router.onRouteChangeStart = () => NProgress.start()

  router.onRouteChangeComplete = () => NProgress.done()

  router.onRouteChangeError = () => NProgress.done()

  return (
    <>
      <NavigationBar />
      <section className="pt-top">
        <Component {...pageProps} key={router}/>
      </section>
      <Footer/>
    </>
  )
}

export default MyApp
