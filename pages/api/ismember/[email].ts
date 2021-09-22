import { NextApiHandler } from 'next';
import { query } from '@/lib/db';

const handler: NextApiHandler = async (req, res) => {
    const { email } = req.query;
    const sql = `SELECT email, id FROM
    SUPPLIERS WHERE email= ?`

    if (email) {
        try {
            const result = await query(sql, email)
            console.log(result)
            if (result[0]) {
                return res.json(result)
            }
            return res.json({ error: "The email is not registered." })

        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error.message })
        }
    }
}

export default handler;
