export async function generateSharedKey(publicKeyJwk, privateKeyJwk) {
  const publicKey = await window.crypto.subtle.importKey(
    'jwk',
    publicKeyJwk,
    {
      name: 'ECDH',
      namedCurve: 'P-384',
    },
    true,
    []
  );

  const privateKey = await window.crypto.subtle.importKey(
    'jwk',
    privateKeyJwk,
    {
      name: 'ECDH',
      namedCurve: 'P-384',
    },
    true,
    ['deriveKey']
  );

  return await window.crypto.subtle.deriveKey(
    { name: 'ECDH', public: publicKey },
    privateKey,
    { name: 'AES-GCM', length: 128 },
    true,
    ['encrypt', 'decrypt']
  );
}
