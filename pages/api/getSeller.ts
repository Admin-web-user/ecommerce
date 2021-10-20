import { NextApiHandler } from 'next';
import { firebaseAdmin } from '@/lib/Firebase/service';
import { query } from '@/lib/db';

const handler: NextApiHandler = async (req, res) => {
    try {
        if(req.method === "POST") {
            const { token } = req.body;
            const { email, uid } = await firebaseAdmin.auth().verifyIdToken(String(token))
            const sql = `SELECT email, username, company_name, description, contact_number, address, city, payment_methods, member_since
            FROM SUPPLIERS WHERE uid = ?`
            const sellerData = await query(sql, uid).catch(err => console.log(err));
            console.log(sellerData);

            if(sellerData) {
                return res.json(sellerData)
            }
        }
    } catch (error) {
        console.log(error)
        res.json({ message: error.message })
    }
}
export default handler;
