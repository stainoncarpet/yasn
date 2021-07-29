import validator from 'validator';

const _validateToken = async () => {
  const entries = Object.entries(window.localStorage);

  var query = `mutation VALIDATE_AUTH_CREDENTIALS($id: ID!, $authToken: String!) {
        validateAuthCredentials(id: $id, authToken: $authToken) {
            userId
            authToken
            avatar
        }
    }`;

  if (entries.length > 0) {
    const [id, token] = entries[0];

    if (id.length > 0 && token.length > 0) {

      const res = await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: { id, authToken: token },
        })
      })
      const { data } = await res.json();

      return { id: data.validateAuthCredentials.userId, token: data.validateAuthCredentials.authToken, shouldUpdateStorage: false, avatar: data.validateAuthCredentials.avatar }
    } else {
      return null;
    }
  } else {
    return null;
  }
};


const validator = {
  validateFullName: () => {},
  validateUserName: () => {},
  validateEmail: () => { },
  validatePassword: () => { },
  validateToken: _validateToken,
  checkUserCredAvailability: async (email, userName) => {
    const response = await fetch(`http://localhost:3000/user/check`, {
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
};

// or do it in real time server-side like username?

export default validator;