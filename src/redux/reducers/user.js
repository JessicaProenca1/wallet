import { email } from '../actions';

// função reducer faz o mesmo trabalho que o setstate. O reducer modifica o state.

const INITIAL_STATE_USER = {
  email: '',
};

const user = (state = INITIAL_STATE_USER, action) => {
  switch (action.type) {
  case email:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default user;
