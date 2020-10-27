import {
  ORDER_PASSED,
  ORDER_FAIL,
  ORDER_INFOS_SENT,
  ORDER_INFOS_FAIL,
} from '../actions/types';

const initialState = {
  order: [],
  loading: true,
  error: {},
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case ORDER_PASSED:
      return {
        ...state,
        order: payload,
        loading: false,
      };

    case ORDER_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
