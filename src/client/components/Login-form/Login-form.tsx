import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logIn } from '../../redux/slices/auth/thunks';
import myValidator from '../../helpers/validator';
import miscSlice from '../../redux/slices/misc/misc';
import { EPortalComponent } from '../../interfaces/state/i-misc-slice';
import { IStoreState } from '../../interfaces/state/i-store-state';

const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [areCredentialsValid, setAreCredentialsValid] = React.useState(false);

  const auth = useSelector((state: IStoreState) => state.auth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (myValidator.validateEmail(email) && myValidator.validatePassword(password)) {
      setAreCredentialsValid(true);
    } else {
      setAreCredentialsValid(false);
    }
  }, [email, password])

  return (
    <React.Fragment>
      <div className="field">
        <p className="control has-icons-left has-icons-right">
          <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          <span className="icon is-small is-right">
            <i className="fas fa-check" />
          </span>
        </p>
      </div>
      <div className="field">
        <p className="control has-icons-left">
          <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <span className="icon is-small is-left">
            <i className="fas fa-lock" />
          </span>
        </p>
      </div>
      <button className={auth.isLoading ? "button is-info mt-2 is-loading" : "button is-info mt-2"} onClick={() => dispatch(logIn({ email, password }))} disabled={!areCredentialsValid || auth.isLoading}>
        Login
      </button>
      <p className="forgot-password has-text-centered mt-4"><a onClick={() => dispatch(miscSlice.actions.togglePortal({ component: EPortalComponent.PASSWORDRESETFORM }))}>Forgot password?</a></p>
    </React.Fragment>
  );
};

export default LoginForm;