export async function decryptMessage(message, sharedKey) {
  try {
    const decryptedBase64 = atob(message);
    const decryptedBytes = new Uint8Array(
      [...decryptedBase64].map((char) => char.charCodeAt(0))
    );
    const decryptedMessage = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: new Uint8Array(13),
      },
      sharedKey,
      decryptedBytes
    );

    const decodedMessage = new TextDecoder().decode(decryptedMessage);

    return decodedMessage;
  } catch (error) {
    console.log(error);
    return `Decryption failed. The key may be incompatible.`; //
  }
}
