import { Col, Tab, Nav, Row } from 'react-bootstrap';
import Dashboard from './Dashboard/Dashboard';
import Profile from './Dashboard/Profile';

export default function VendorSideBar() {

    const tabs = [
        { eventKey: "dashboard", text: "Dashboard", section: <Dashboard/> },
        { eventKey: "profile", text: "Profile", section: <Profile/> },
        { eventKey: "settings", text: "Settings", section: "" },
        { eventKey: "products", text: "Products", section: "" },
        { eventKey: "add_products", text: "Add new product", section: "" },
        { eventKey: "signout", text: "Sign Out", section: "" },
    ]

    return (
        <div>
            <Tab.Container id="left-tabs-example" defaultActiveKey={tabs[0].eventKey}>
                <Row>
                    <Col sm={3} className="p-2">
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
                                        <Nav.Item key={tab.text} className="cursor-pointer">
                                            <Nav.Link className="text-black" eventKey={tab.eventKey}>{tab.text}</Nav.Link>
                                            <hr className="m-0" />
                                        </Nav.Item>
                                    ))
                                }
                            </Nav>
                        </div>

                    </Col>
                    <Col sm={9}>
                        <Tab.Content className="py-3">
                            {
                                tabs.map((tab,i) => (
                                    <Tab.Pane key={`Tab ${i}`} eventKey={tab.eventKey}>
                                        {tab.section}
                                    </Tab.Pane>
                                ))
                            }
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}
