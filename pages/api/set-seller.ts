import { NextApiHandler } from "next";
import bcrypt from 'bcrypt';
import { db, query } from "@/lib/db";


const encryptPassword = async (PlaintextPassword: string, saltRounds = 10) => {
    const hash = await bcrypt.hash(PlaintextPassword, saltRounds)
        .catch((err) => console.log(err))
    return hash || null;
}

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
        token
    } = req.body;
    try {

        if (req.method === "POST") {
            if(token) {
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
                        token)
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
                        token
                    ]]
                    const queriedResponse = await query(postSQL, [values]).catch(err => {throw new Error(err.message)});
                    res.json(queriedResponse);
    
                } else {
                    res.json({ error: 'The email is already in use' })
                }
            } else {
                res.json({error: " MISSING A TOKEN "})
            }

        } else if (req.method === "PUT") {
            const verifyToken = await query(`SELECT token WHERE id = ? `, [token]);
            console.log(verifyToken);

        } else {
            res.status(403).json({ message: "Invalid method" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export default handler;


