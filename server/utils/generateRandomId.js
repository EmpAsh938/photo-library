const chars = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

const generateRandomId = (size) => {
    let randomized_string = '';
    for(let i=0;i<size;i++){
        let random_num = Math.floor(Math.random() * chars.length);
        randomized_string += chars[random_num];
    }
    return randomized_string;
}

module.exports = generateRandomId;