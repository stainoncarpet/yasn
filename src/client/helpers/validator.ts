import { isEmail, isStrongPassword, isAlphanumeric, isURL } from 'validator';

const _validateToken = async (userId, token) => {
  try {
    const res = await fetch('http://localhost:3000/auth/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({userId, token})
    })
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    
    return null;
  }
};

const _checkUserCredAvailability = async (email, userName) => {
  if (userName) {
    return {userName: isAlphanumeric(userName)};
  }
  const response = await fetch(`http://localhost:3000/auth/check`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    body: JSON.stringify({
      email: email,
      userName: userName
    })
  });

  const data = await response.json();

  return data;
}

const myValidator = {
  validateFullName: (input) => {},
  validateUserName: (input) => {
  },
  validateEmail: (input) => {
    return isEmail(input);
  },
  validatePassword: (input) => {
    return isStrongPassword(input);
  },
  validateToken: _validateToken,
  checkUserCredAvailability: _checkUserCredAvailability,
  validateImageUrl: (url) => {
    const choppedURL = url.split('.');
    const imageExtension = choppedURL[choppedURL.length - 1];

    const imageFormats = ["jpeg", "jpg", "bmp", "gif", "ico", "png", "svg", "webp"];

    const isUrlValid = isURL(url) && imageFormats.includes(imageExtension);

    return isUrlValid;
  }
};

export default myValidator;