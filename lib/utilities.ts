
export const removeItem = (a: Array<String>, item: String) : Array<String> => {
    for( var i = 0; i < a.length; i++){ 
                                   
        if ( a[i] === item) { 
            a.splice(i, 1); 
            i--;
        }
    }
    return a ? a : []
}


export const MAGIC_PUBLIC_KEY = process.env.MAGIC_PUBLIC_KEY || 'pk_test_47E887C7DC9AE19A';