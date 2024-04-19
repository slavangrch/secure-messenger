export function storeData(userId, token) {
  localStorage.setItem('token', token);
  localStorage.setItem('userId', userId);
}

export function deleteDataFromStorage() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('tokenExpiration');
}

export function getToken() {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  const duration = getDuration();
  if (duration < 0) {
    return 'Token is expired';
  }
  return token;
}

export function getUserId() {
  const userId = localStorage.getItem('userId');
  return userId;
}

export function checkAuth() {
  const token = getToken();
  if (!token || token === 'Token is expired') {
    return redirect('/auth/login');
  }
  return null;
}

export function getDuration() {
  const expiration = localStorage.getItem('tokenExpiration');
  const expirationDate = new Date(expiration);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}
