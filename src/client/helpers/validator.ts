import { isEmail, isStrongPassword, isAlphanumeric, isURL } from 'validator';

//@ts-ignore
const app_address = APP_ADDRESS;

const _validateToken = async (userId, token) => {
  try {
    const res = await fetch(`${app_address}/auth/validate`, {
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
  const response = await fetch(`${app_address}/auth/check`, {
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
  validateFullName: (input: string) => {},
  validateUserName: (input: string) => {
  },
  validateEmail: (input: string): boolean => {
    return isEmail(input);
  },
  validatePassword: (input: string): boolean => {
    return isStrongPassword(input);
  },
  validatePasswords: (input1: string, input2: string): boolean => {
    return isStrongPassword(input1) && input1 === input2;
  },
  validateToken: _validateToken,
  checkUserCredAvailability: _checkUserCredAvailability,
  validateImageUrl: (url: string): boolean => {
    const choppedURL = url.split('.');
    const imageExtension = choppedURL[choppedURL.length - 1];

    const imageFormats = ["jpeg", "jpg", "bmp", "gif", "ico", "png", "svg", "webp"];

    const isUrlValid = isURL(url) && imageFormats.includes(imageExtension);

    return isUrlValid;
  }
};

export default myValidator;