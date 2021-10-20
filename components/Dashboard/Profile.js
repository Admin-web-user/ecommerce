import { useState } from "react";
import Image from "next/image";
import { SyncIcon } from "@primer/octicons-react";
import { Button, FormControl, FormLabel } from "react-bootstrap";

export default function Profile({ profile }) {
  const [changedProfile, setChangedProfile] = useState(profile);
  const formInputs = [
    {
      name: "company_name",
      label: "Company name",
      required: true,
      placeholder: profile?.company_name,
    },
    {
      name: "username",
      label: "User name",
      required: true,
      placeholder: profile?.username,
    },
    {
      name: "email",
      label: "Email",
      required: true,
      placeholder: profile?.email,
    },
    {
      name: "address",
      label: "Address",
      required: true,
      placeholder: profile?.address,
    },
    { name: "city", label: "City", required: true, placeholder: profile?.city },
    {
      name: "contact_number",
      label: "Contact number",
      required: true,
      placeholder: profile?.contact_number,
    },
    {
      name: "description",
      label: "Description",
      placeholder: profile?.description,
      as: "textarea",
    },
  ];

  const handleChange = (e) => {
      setChangedProfile({...changedProfile, [e.target.name]: e.target.value})
      console.log(changedProfile)
  }

  const updateChanges = () => {
    if(!Object.is(changedProfile, profile)) {

    }
  }

  return (
    <div>
      <div className="bg-light rounded-3 p-4 mb-4">
        <div className="d-flex align-items-center">
          <Image
            className="rounded-circle"
            src="https://vercel.com/api/www/avatar/bd67b89a997b881fd07313e65e06a9d515e1d5cc?s=160"
            height={90}
            width={90}
            alt="Vendor's cover"
          />
          <div className="ps-3">
            <Button className="btn-secondary btn-shadow btn-sm mb-2">
              <SyncIcon />
              Change <span className="d-none d-sm-inline">avatar</span>
            </Button>
            <div className="p mb-0 fs-ms text-muted">
              Upload JPG, GIF or PNG image. 300 x 300 required.
            </div>
          </div>
        </div>
      </div>
      <form>
        {formInputs.map((formInput) => (
          <div key={formInput.name}>
            <FormLabel className="mt-3">
              <b> {formInput.label} :</b>
            </FormLabel>
            <FormControl
              name={formInput.name}
              value={formInput.placeholder}
              disabled={formInput?.name === "email"}
              autoComplete="true"
              required={formInput.required ? formInput.required : false}
              as={formInput.as ? formInput.as : "input"}
              rows={5}
              onChange={(e) => handleChange(e)}
            />
          </div>
        ))}
  
        <Button className="my-4" variant="success" disabled={Object.is(changedProfile, profile)}>
          Save Changes
        </Button>
      </form>
    </div>
  );
}
