import { isEmail, isStrongPassword, isAlphanumeric, isAlpha } from 'validator';

const validateToken = async (userId, token) => {
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

const checkUserCredAvailability = async (email, userName) => {
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
    console.log("password validation: ", isStrongPassword(input));

    return isStrongPassword(input);
  },
  validateToken: validateToken,
  checkUserCredAvailability: checkUserCredAvailability
};

// or do it in real time server-side like username?

export default myValidator;