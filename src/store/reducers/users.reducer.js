import { userConstants } from '../../store/constants/user.contants';
import { useUser } from 'contexts/UserContext.js';

export function users(state = {}, action) {

  const {activeUser} = useUser();

  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      console.log(activeUser)
      return {
        items: action.users
      };
    case userConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}