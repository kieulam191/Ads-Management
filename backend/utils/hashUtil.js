import bcrypt from 'bcrypt';

export async function hash(plaintextPassword) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(plaintextPassword, salt);
    return hash;
}

export async function compare(plaintextPassword, hash) {
    return await bcrypt.compareSync(plaintextPassword, hash, function(err, result) {
        return result;
    });
}
