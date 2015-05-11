function factorial(n){
    console.log('Calculating factorial');
    if(n <= 1)
        return 1;
    else
        return n * factorial(n-1);
}
//console.log(factorial(10));
mfactorial.cache = {};
function mfactorial(num) {
    if(num in mfactorial.cache)
        return mfactorial.cache[num];
    else{
        console.log('calculating factorial for ' + num);
        mfactorial.cache[num] = num * factorial(num -1);
        return mfactorial.cache[num];
    }
}
console.log(mfactorial(10));
console.log(mfactorial.cache);
console.log(mfactorial(10));

function memoize(fn){
    fn.cache = fn.cache || {};
    return function fx(){
        //arguments [10]

        //convert the arguments into a key by looping over the arguments - finish this part
        //hash function - md5 hash | arguments | single string

        //if(x === Object(x)) ? JSON.stringify(x) : x.toString()
        var key = '', value;
        if(!(key in fn.cache)){
            value = fn.apply(null, arguments);
            fn.cache[key] = value;
        }
        return fn.cache;
    };
}
var mfactorial = memoize(factorial);
mfactorial(10);

