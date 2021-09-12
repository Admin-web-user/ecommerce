import Link from 'next/link';
import { Nav, } from 'react-bootstrap';

export default function VendorSideBar() {

    const tabs = [
        { eventKey: "dashboard", text: "Dashboard", href: "" },
        { eventKey: "profile", text: "Profile", href: "profile" },
        { eventKey: "products", text: "Products", href: "products" },
        { eventKey: "add_products", text: "Add new product", href: "add-products" },
        { eventKey: "signout", text: "Sign Out", href: "signout" },
    ]

    return (
        <div>
            <div className="p-2">
                <div className="p-1 shadow">
                    <div className="bg-light-1 pt-2 px-2">
                        <h5>
                            Accounts
                        </h5>
                        <hr />
                    </div>
                    <Nav variant="pills" className="flex-column">
                        {
                            tabs.map(tab => (
                                <div key={tab.text}>
                                    <Nav.Item className="cursor-pointer p-2">
                                        <Link className="text-black" href={`?tab=${tab.href}`} >{tab.text}</Link>
                                    </Nav.Item>
                                    <hr className="m-0" />
                                </div>
                            ))
                        }
                    </Nav>
                </div>

            </div>
        </div>
    )
}
