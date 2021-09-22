import { useContext } from 'react';
import AuthContext from '../../lib/context';
import { Button } from "react-bootstrap";

export default function SignOut() {

    const { logoutSeller } = useContext(AuthContext);

    const onSignOut = () => {
        logoutSeller();
    }

    return (
        <div className="d-grid justify-content-center align-items-center h-100">
            <div className="p-2 text-center">
            <h2 className="py-2">Are you sure you want to sign out?</h2>
            <Button variant="success" size="lg" onClick={() => onSignOut()}>Sign out</Button>
            </div>
        </div>
    )
}
