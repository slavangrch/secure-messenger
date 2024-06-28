export async function generateKeyPair() {
  const keys = await window.crypto.subtle.generateKey(
    {
      name: 'ECDH',
      namedCurve: 'P-384',
    },
    true,
    ['deriveKey']
  );

  const publicKeyJwk = await window.crypto.subtle.exportKey(
    'jwk',
    keys.publicKey
  );

  const privateKeyJwk = await window.crypto.subtle.exportKey(
    'jwk',
    keys.privateKey
  );

  return { publicKeyJwk, privateKeyJwk };
}
