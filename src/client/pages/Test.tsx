import React from 'react';

import { useSubscription } from '@apollo/client';
import userSlice from '../data/redux/slices/user';
import {fetchPosts} from '../data/redux/slices/posts';
import { useDispatch, useSelector } from 'react-redux';

const Test = () => {
  //const setUser = userSlice.actions.setUser;



  const dispatch = useDispatch();

const pu = () => {
  dispatch(fetchPosts())
  dispatch(fetchPosts())
}


  return <h4>TEST <button onClick={pu}>click</button></h4>
};

export default Test;
