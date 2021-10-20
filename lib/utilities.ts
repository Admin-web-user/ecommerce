import bcrypt from 'bcrypt';

const encryptPassword = async (PlaintextPassword: string, saltRounds = 10) => {
    const hash = await bcrypt.hash(PlaintextPassword, saltRounds)
        .catch((err) => console.log(err))
    return hash || null;
}
export const removeItem = (a: Array<String>, item: String) : Array<String> => {
    for( var i = 0; i < a.length; i++){ 
                                   
        if ( a[i] === item) { 
            a.splice(i, 1); 
            i--;
        }
    }
    return a ? a : []
}
