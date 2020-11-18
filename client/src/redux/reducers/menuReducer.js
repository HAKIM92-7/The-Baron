import { SHOW_MENU, CLOSE_MENU } from '../actions/types';

const initialState = {
    
showMenu:false

};

export default function (state = initialState, action) {
  

  switch (action.type) {
    case SHOW_MENU:
      return {showMenu:!state.showMenu} ;


    default:
      return state;
  }
}