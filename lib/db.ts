import mysql from 'serverless-mysql';

export const db = mysql({
    config: {
        host: process.env.MYSQL_HOST || 'localhost',
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USERNAME || 'root',
        password: /*process.env.MYSQL_PASSWORD*/ '',
        port: parseInt(process.env.MYSQL_PORT),
    }
})

export async function query(q: string, values: any = []) {
    try {
        const results = await db.query(q, values);
        await db.end();
        return results;
    } catch (error) {
        console.log(error)
    }
}

// values: ( [][][] |string | number)[] | string | number = []