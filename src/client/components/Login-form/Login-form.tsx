import React from 'react';
import {useMutation} from "@apollo/client";

import Heading1 from '../common/Heading1/Heading1';
import {LOGIN_USER} from "../../data/apollo/mutations/login-user";
import UserContext from '../../data/context/User-context';
import setAuth from '../../data/context/action-creators/set-auth';

const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [loginUser, {loading, error}] = useMutation(LOGIN_USER);

  const {state, dispatch} = React.useContext<any>(UserContext);

  const handleClick = async () => {
    const {data} = await loginUser({variables: {email, password}});
    if(data.loginUser.userId && data.loginUser.authToken) {
      dispatch(setAuth(data.loginUser.userId, data.loginUser.authToken, true, data.loginUser.avatar));
    }
  };

  return (
    <section className="section">
      <Heading1>Log in</Heading1>
      <div className="field">
        <p className="control has-icons-left has-icons-right">
          <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
          <span className="icon is-small is-right">
            <i className="fas fa-check"></i>
          </span>
        </p>
      </div>
      <div className="field">
        <p className="control has-icons-left">
          <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <span className="icon is-small is-left">
            <i className="fas fa-lock"></i>
          </span>
        </p>
      </div>
      <div className="field">
        <p className="control">
        <button className={`button is-success${loading ? " is-loading" : ""}`} onClick={handleClick} disabled={loading}>
          {loading ? "" : "Log in"}
        </button>
        </p>
      </div>
    </section>
  )
}

export default LoginForm;
