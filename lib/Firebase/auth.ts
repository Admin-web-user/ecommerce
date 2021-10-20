import { app } from "./firebase";
import axios from "axios";
import {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app);

export const signUpAsSeller = async (
    {
        email,
        password,
        name,
        company_name,
        description,
        contact_number,
        address,
        city,
        payment_methods,
    },
    callback: Function
) => {
    try {
        //Create Seller Account
        const seller = await createUserWithEmailAndPassword(
            auth,
            email,
            String(password)
        );
        console.log(seller);

        //Sending verification message
        await sendEmailVerification(seller.user).then(async () => {
            if (seller.user) {
                //Add Seller to FireStore
                const setSeller = {
                    id: seller.user.uid,
                    name,
                    email,
                    company_name,
                };
                console.log();
                const ref = doc(db, "suppliers", setSeller.id);
                await setDoc(ref, setSeller).catch((err) => console.log(err));

                //Add Sellers detail in MySQL
                const supplierData = { email, username: name, company_name, description, contact_number, address, city, payment_methods, };
                const member_since = new Date().toISOString().slice(0, 19).replace('T', ' ');
                await axios
                    .post(`/api/set-seller`, { ...supplierData, member_since, uid: seller.user.uid })
                    .catch((err) => {
                        console.log(err)
                    });

                callback({
                    head: "Verify your email",
                    message:
                        "An email was sent to verify your email. Please verify your email.",
                });
            }
        });
    } catch (error) {
        console.log(error);
        callback({ error: error.message });
    }
};

export const isLoggedIn = (callback: Function) => {
    onAuthStateChanged(auth, (user) => {
        callback(user);
    });
};

export const logOut = async(callback: Function) => {
    signOut(auth).then(callback());
}

export const signInAsSeller = () => {
    
}