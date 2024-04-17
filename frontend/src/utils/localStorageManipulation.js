export function storeData(userId, token) {
  localStorage.setItem('token', token);
  localStorage.setItem('userId', userId);
}

export function getToken() {
  const token = localStorage.getItem('token');
  return token;
}

export function getUserId() {
  const userId = localStorage.getItem('userId');
  return userId;
}

export function checkAuth() {
  const token = getToken();
  if (!token) {
    return redirect('/auth/login');
  }
  return null;
}
