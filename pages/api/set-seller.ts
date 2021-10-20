import { NextApiHandler } from "next";
import { firebaseAdmin } from '@/lib/Firebase/service';
import { db, query } from "@/lib/db";

const isSellerInDatabase = async (email: string) => {
    const sql = `SELECT company_name from SUPPLIERS WHERE email = ?`;
    try {
        const result = await query(sql, [email]);
        return result;
    } catch (error) {
        console.log(error)
    }
}

const handler: NextApiHandler = async (req, res) => {
    const { id } = req.query;
    console.log(req.query);
    const {
        company_name,
        username,
        email,
        address,
        contact_number,
        city,
        payment_methods,
        description,
        member_since,
        token,
        uid
    } = req.body;
    try {
        //POST method
        if (req.method === "POST") {
            if (uid) {
                const checkSeller = await isSellerInDatabase(email);
                if (!checkSeller[0]?.email) {
                    const postSQL = `
                    INSERT INTO SUPPLIERS (
                        company_name,
                        username,
                        email,
                        address,
                        contact_number,
                        city,
                        payment_methods,
                        description,
                        member_since,
                        uid)
                        VALUES ?`

                    const values = [[
                        company_name,
                        username,
                        email,
                        address,
                        contact_number,
                        city,
                        payment_methods,
                        description,
                        member_since,
                        uid,
                    ]]
                    const queriedResponse = await query(postSQL, [values]).catch(err => { throw new Error(err.message) });
                    res.json(queriedResponse);

                } else {
                    res.json({ error: 'The email is already in use' })
                }
            } else {
                res.json({ error: " Technical Error!!; MISSING User ID " })
            }

            //PUT method
        } else if (req.method === "PUT") {
            const { email: sellerEmail, uid } = await firebaseAdmin.auth().verifyIdToken(token);
            if (sellerEmail && uid) {

                const putSQL = `UPDATE SUPPLIERS
                SET  company_name = ?,
                username = ?,
                email = ?,
                address = ?,
                contact_number = ?,
                city = ?,
                payment_methods = ?,
                description = ? 
                WHERE EXISTS (SELECT email FROM SUPPLIERS WHERE uid = ?)`

                const values = [company_name, username, email, address, contact_number, city, payment_methods, description,]

                
                const queriedResponse = await query(putSQL, values).catch(err => { throw new Error(err.message) });
                res.json(queriedResponse);
            }

        } else {
            res.status(403).json({ message: "Invalid method" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export default handler;


