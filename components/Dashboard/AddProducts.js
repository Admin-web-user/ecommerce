import {UploadIcon} from '@primer/octicons-react';
import { Button, FormControl, FormGroup, FormLabel, FormText } from "react-bootstrap";

function AddProducts() {
    const product = {
        title: "",
    }
    return (
        <>
            <form className="p-2 my-2">
                <FormLabel className="my-2"><b>Product name:</b></FormLabel>
                <FormControl className="py-2" placeholder="" required />

                <div className="file-drop-area my-3">
                    <UploadIcon size={30} className="my-2" />
                    <span className="file-drop-message">Drag and drop here to upload product screenshot</span>
                    <input className="file-drop-input" type="file" />
                    <Button className="file-drop-btn" variant="success">Or select a photo</Button>
                    <div className="form-text">1000 x 800px ideal size for hi-res displays</div>
                </div>

                <FormLabel className="my-2"><b>Product description:</b></FormLabel>
                <FormControl placeholder="" as="textarea" style={{ minHeight: "180px" }} required />

                <FormLabel className="my-2"><b>Product tags:</b></FormLabel>
                <FormControl placeholder="Such as Shirts, Sarees, Pants, Jeans etc" as="textarea" row={5} required />
                <FormText>Up to 10 keywords that describe your item. Tags should all be in lowercase.</FormText>

                <FormGroup className="my-2">
                    <FormLabel className="my-2"><b>Products for sale:</b></FormLabel>
                    <FormControl type="file" accept="image/*" multiple />
                </FormGroup>

                <Button className="my-3 w-100" size="lg" variant="success" > <UploadIcon size={24} /> Upload Product </Button>
            </form>
        </>
    )
}

export default AddProducts
