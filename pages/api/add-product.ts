import { NextApiHandler } from "next";
import { query, db } from "@/lib/db";

const handler: NextApiHandler = async (req, res) => {
    try {
        const {
            title,
            category,
            subcategory,
            price,
            description,
            image,
            stock,
            discount,
            supplierId,
        } = req.body;

        if (req.method === "POST") {
            const results = await query(`
            INSERT INTO table_name (title, category, subcategory, price, description, image, stock, rating, discount, supplierId)
            VALUES (${db.escape(title)}, ${db.escape(category)}, ${db.escape(subcategory)}, 
            ${db.escape(price)}, ${db.escape(description)}, ${db.escape(image)}, ${db.escape(stock)},
             ${0}, ${db.escape(discount)}, ${db.escape(supplierId)}})
        `);
            return res.json(results);
        } else {
            res.status(403).json({ message: "Invalid method" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export default handler;
