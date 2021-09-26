import { isEmail, isStrongPassword, isURL } from 'validator';

const _checkUserCredAvailability = async (email, userName) => {
  try {
    const response = await fetch(`/auth/check`, {
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
  } catch (error) {
    console.error(error);
  }
}

const _validateAuth = async () => {
  try {
    const res = await fetch(`/auth/validate`);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const myValidator = {
  validateFullName: (input: string) => { },
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
  validateAuth: _validateAuth,
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