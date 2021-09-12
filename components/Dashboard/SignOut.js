import { Button } from "react-bootstrap";

export default function SignOut() {
    return (
        <div className="d-grid justify-content-center align-items-center h-100">
            <div className="p-2 text-center">
            <h2 className="py-2">Are you sure you want to sign out?</h2>
            <Button variant="success" size="lg">Sign out</Button>
            </div>
        </div>
    )
}
