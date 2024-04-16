export function validateEmail(email) {
  const index = email.indexOf('@');
  const dotIndex = email.substring(index + 1);
  if (!email) {
    return false;
  } else if (index === -1 || index === 0 || index === email.length - 1) {
    return false;
  } else if (dotIndex.indexOf('.') === -1) {
    return false;
  }
  return true;
}

export function validatePassword(password, corfirmedPassword) {
  if (!password) {
    return false;
  } else if (password.length < 8) {
    return false;
  } else if (corfirmedPassword) {
    if (password !== corfirmedPassword) {
      return false;
    }
  }
  return true;
}
