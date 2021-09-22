import { NextApiHandler } from 'next';
import { query } from '@/lib/db';

const handler: NextApiHandler = async (req, res) => {
    try {
        const productsQuery = `
        SELECT category,
        PRODUCTS.description,
        PRODUCTS.discount, 
        PRODUCTS.id,
        PRODUCTS.image, 
        PRODUCTS.price, 
        PRODUCTS.rating, 
        PRODUCTS.stock, 
        PRODUCTS.subcategory, 
        SUPPLIERS.company_name, 
        PRODUCTS.title 
        FROM PRODUCTS
        INNER JOIN SUPPLIERS ON PRODUCTS.supplierId  = SUPPLIERS.id
        ORDER BY id DESC LIMIT 10
    `
        // const SUPPLIERSQuery = `SELECT * FROM SUPPLIERS`

        const results = await query(productsQuery)
        // console.log(req.method)
        return res.json(results)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

export default handler;
