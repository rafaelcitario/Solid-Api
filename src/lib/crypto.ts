import { Hash, createHash } from 'crypto';


export function encryptPassword(password: string): string {
  // let encrypted: Hash;
  const hash = createHash('sha512');
  const encrypted = hash.on('readable', async (): Promise<Hash> => {
    return await hash.read(512);
  });


  hash.write(password);
  hash.end();
  return encrypted.digest('hex');
}
