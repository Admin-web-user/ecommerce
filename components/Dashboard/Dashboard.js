import VendorChart from "./VendorChart";

export default function Dashboard() {
    return (
        <>
            <div>
                <h3 className="pb-2"><b>Your earnings / sales</b></h3>
                <div className="d-grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
                    <div className="bg-light p-2 rounded-2 text-center">
                        <h5 className="py-2 text-muted"><b>Order recieved</b></h5>
                        <div>
                            <h2><strong>
                                0
                            </strong></h2>
                        </div>
                    </div>

                    <div className="bg-light p-2 rounded-2 text-center">
                        <h5 className="py-2 text-muted"><b>Your earnings</b></h5>
                        <div>
                            <h2><strong>
                                $ 00
                            </strong></h2>
                            <span><small> Sales 8/1/2021 - 8/15/2021 </small></span>
                        </div>
                    </div>


                    <div className="bg-light p-2 rounded-2 text-center">
                        <h5 className="py-2 text-muted"><b>Lifetime earnings</b></h5>
                        <div>
                            <h2><strong>
                                $ 00
                            </strong></h2>
                        </div>
                    </div>
                </div>
                <div className="py-5">
                    <div className="py-3 px-2 rounded-3 border border-1 ">
                        <h3 className="fs-sm pb-3 mb-3 border-bottom">Sales value, USD <span className="fw-normal fs-6 text-muted">(Past month)</span></h3>
                        <VendorChart type="Line" />
                    </div>
                </div>
            </div>
        </>
    )
}
