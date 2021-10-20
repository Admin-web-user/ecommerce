import { format } from 'fecha';
import Image from 'next/image';
import { useRouter } from 'next/router';
import VendorSideBar from '../../components/VendorSideBar';
import { Col, Container, Row, Spinner, Button } from 'react-bootstrap';
import Profile from '../../components/Dashboard/Profile';
import AddProducts from '../../components/Dashboard/AddProducts';
import Products from '../../components/Dashboard/Products';
import Dashboard from '../../components/Dashboard/Dashboard';
import SignOutFromVendor from '../../components/Dashboard/SignOut';
import { useEffect, useState, useContext } from 'react';
import AuthContext from '../../lib/context';
import SellerLogin from '../../components/SellerLogin';
import { logOut } from '../../lib/Firebase/auth';
import axios from 'axios';

export default function Index() {
    const router = useRouter();

    const [sellerProfile, setProfile] = useState({ email: '', username: '', company_name: '', description: '', contact_number: '', address: '', city: '', payment_methods: '', member_since: '' })

    const { seller, loaded } = useContext(AuthContext)

    const [param, setParam] = useState(null)
    useEffect(() => {
        setParam(router?.query);

        const sessionedProfile = JSON.parse(sessionStorage.getItem('profile'));

        if (!sessionedProfile?.email) {
            seller?.getIdToken()
                .then((token) => {
                    axios.post('/api/getSeller', { token })
                        .then(res => {
                            const respondedData = res.data[0];
                            if (respondedData) {
                                setProfile(respondedData)
                                sessionStorage.setItem('profile', JSON.stringify(respondedData));
                            }
                        })
                })
        }
        else {
            setProfile(sessionedProfile);

        }
    }, [router, seller])

    const FormatTime = (date) => {
        if( date ) {
            const refinedDate = date.split('T')[0].split('-');
            return format(new Date(refinedDate), 'MMMM D, YYYY')
        }
    }

    if (!loaded) {
        return (
            <div className="py-4 d-flex justify-content-center align-items-center h-100">
                <Spinner animation="border" variant="success" />
            </div>
        )
    }
    else if (!seller) {
        return (
            <>
                <main className="pt-5 pb-4">
                    <SellerLogin />
                </main>
            </>
        )
    }

    return (
        <>
            <main>
                <div className="pt-5 pb-4 text-white bg-success" >
                    <Container className="d-lg-flex justify-content-between py-2 py-lg-3">
                        <div className="d-flex gap-2 align-items-center pb-2">
                            <Image className="rounded-circle" src="https://vercel.com/api/www/avatar/bd67b89a997b881fd07313e65e06a9d515e1d5cc?s=160" alt="Vendor's cover" width={80} height={80} />
                            <div>
                                <h4 className="pb-3"><strong>{sellerProfile.company_name}</strong></h4>
                                <span>Member since 
                                    <b><time> {FormatTime(sellerProfile.member_since)}</time></b>
                                    </span>
                            </div>
                        </div>

                        <div>
                            <h5>Total sale</h5>
                            <h3><strong>100</strong></h3>
                        </div>
                    </Container>
                </div>
                <Container>
                    <Row>
                        <Col sm={4}>
                            <VendorSideBar />
                        </Col>
                        <Col sm={8}>
                            {
                                param?.tab === "profile" && seller?.emailVerified ? <Profile profile={sellerProfile} /> :
                                    param?.tab === "products" && seller?.emailVerified ? <Products /> :
                                        param?.tab === "signout" && seller?.emailVerified ? <SignOutFromVendor /> :
                                            param?.tab === "add-products" && seller?.emailVerified ? <AddProducts />
                                                : seller?.emailVerified && <Dashboard />
                            }
                            {
                                !seller?.emailVerified &&
                                <div className="text-center py-4">
                                    <h4 className="pb-2 text-center">
                                        <b>Check your inbox!!</b><br /> A verification link was sent to {seller?.email}. Please verify your email before start working</h4>
                                    <Button> SEND AGAIN </Button>
                                    <p className="text-center py-2 fw-bolder">OR</p>
                                    <Button variant="success" onClick={() => logOut(() => router.push('/vendor'))}>SIGN OUT</Button>
                                </div>
                            }
                        </Col>
                    </Row>
                </Container>
            </main>
        </>
    )
}
