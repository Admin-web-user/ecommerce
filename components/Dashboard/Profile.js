import Image from 'next/image'
import { SyncIcon } from "@primer/octicons-react"
import { Button, FormControl, FormLabel } from 'react-bootstrap'

export default function Profile() {
    const profile = {
        name: "John Doe",
        email: "johndoe64@gmail.com",
        company_name: "The Brand Box",
        city: "Chittagong",
        address: "Muradpur",
    }
    return (
        <div>
            <div className="bg-light rounded-3 p-4 mb-4">
                <div className="d-flex align-items-center">
                    <Image className="rounded-circle" src="https://vercel.com/api/www/avatar/bd67b89a997b881fd07313e65e06a9d515e1d5cc?s=160"
                        height={90} width={90} alt="Vendor's cover" />
                    <div className="ps-3">
                        <Button className="btn-secondary btn-shadow btn-sm mb-2">
                            <SyncIcon />
                            Change <span className="d-none d-sm-inline">avatar</span>
                        </Button>
                        <div className="p mb-0 fs-ms text-muted">Upload JPG, GIF or PNG image. 300 x 300 required.</div>
                    </div>
                </div>
            </div>
            <form>
                <FormLabel className="mt-3"><b>Name:</b></FormLabel>
                <FormControl placeholder={profile?.name} autoComplete="true" required/>
                <FormLabel className="mt-3"><b>Email:</b></FormLabel>
                <FormControl placeholder={profile?.email} type="email" autoComplete="true" required/>
                <FormLabel className="mt-3"><b>City:</b></FormLabel>
                <FormControl placeholder={profile?.city} autoComplete="true" required/>
                <FormLabel className="mt-3"><b>Address:</b></FormLabel>
                <FormControl placeholder={profile?.address} autoComplete="true" required/>
                <Button className="my-4" variant="success">Save Changes</Button>
            </form>
        </div>
    )
}
