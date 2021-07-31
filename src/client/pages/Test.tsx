import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import userSlice from '../data/redux/slices/auth/auth';

const Test = () => {
  const dispatchToServer2 = userSlice.actions["server/hello"];

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(dispatchToServer2(""))
  }

  return <h4>TEST <button onClick={handleClick}>click</button></h4>
};

export default Test;
