import React from 'react';
import { useDispatch } from 'react-redux';

import Heading1 from '../common/Heading1/Heading1';
import { logIn } from '../../data/redux/slices/auth/thunks';

const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const dispatch = useDispatch();

  const handleLogin = async () => dispatch(logIn({ email, password }));

  const loading = false;

  return (
    <section className="section">
      <Heading1>Log in</Heading1>
      <div className="field">
        <p className="control has-icons-left has-icons-right">
          <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
          <button className={`button is-success${loading ? " is-loading" : ""}`} onClick={handleLogin} disabled={loading}>
            {loading ? "" : "Log in"}
          </button>
        </p>
      </div>
    </section>
  );
};

export default LoginForm;
