import bcrypt from 'bcrypt';
const saltRounds = 10;
export async function hash(plaintextPassword) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plaintextPassword, salt);
    return hash;
}

export async function compare(plaintextPassword, hash) {
    return await bcrypt.compareSync(plaintextPassword, hash, function(err, result) {
        return result;
    });
}
