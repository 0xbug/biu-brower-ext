import MurmurHash3 from 'imurmurhash';

export const mmh3 = (content) => {
    console.log(Buffer.from(content,'binary').toString('base64'))
    let hashState = MurmurHash3(Buffer.from(content,'binary').toString('base64'),0);
    const result = hashState.result()
    console.log(Buffer.from(content,'binary').toString('base64'))
    console.log(result)
    return result;
}

