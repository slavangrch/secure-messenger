export async function encryptMessage(message, sharedKey) {
  const encodedMessage = new TextEncoder().encode(message);
  const encryptedMessage = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: new Uint8Array(13) },
    sharedKey,
    encodedMessage
  );

  const encryptedBytes = new Uint8Array(encryptedMessage);
  const encryptedText = String.fromCharCode.apply(null, encryptedBytes);
  const encryptedBase64 = btoa(encryptedText);

  return encryptedBase64;
}
