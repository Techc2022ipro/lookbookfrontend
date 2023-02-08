export const Verified = {username: sessionStorage.getItem("username"), uid: sessionStorage.getItem("uid")};

export const isVerified = () => {
  if(Verified.username) return true;
  return false;
}

export const logout = () => {
  sessionStorage.removeItem('username');
  sessionStorage.removeItem('uid');
}
