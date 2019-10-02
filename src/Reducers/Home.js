
// import {api_status, roughAction} from '../js/actions'

// const Test = (
//   state = {
//     apicall: false,
//     apistatus: false,
//   },
//   Action
// ) => {
//   switch (Action.type) {
//     case roughAction.add_rough:
//       console.log("Module List", Action.values);
//       return {
//         ...state,
//         apicall: false,
//         apistatus: false
//       };
//     case api_status.apifailed:
//       return {
//         ...state,
//         apicall: false,
//         apistatus: false
//       };
//     case api_status.apisuccess:
//       return {
//         ...state,
//         apicall: false,
//         apistatus: true
//       };
//     default:
//       return state;
//   }
// };

// export default Test;

import store from '../Store/Store';
import { notification } from 'antd';
import apiList from '../js/apiList';
import {roughAction} from '../js/actions';
import {fetchUrl} from '../js/fetchUrl';


const addRoughApiCall = (data) => {
  console.log('abc');
  fetchUrl(apiList.Rough.addRough.method, apiList.Rough.addRough.url, data)
  .then(res => {
			notification.success({ message: res.message });
      store.dispatch({ type: roughAction.LOAD_ROUGH, payload: res.data });
		})
    .catch((errors) => {
      // onRequestFail(errors);
      console.log("dispatch action",errors);
    });
}


const onRequestFail = (errors) => {
  store.dispatch({ type: roughAction.ROUGH_REQUEST_FAIL });
  Object.keys(errors).forEach((x) => {
    errors[x].map(error => notification.error({ message: error }));
  });
};

const Test = (
  state = {
    apiCall: false,
    questionRequestStatus: false,
    rough:[],
  },
  action,
) => {
  // let index = -1;
  // let idx = -1;
  // let data = [];
  switch (action.type) {

    case roughAction.LOAD_ROUGH:
      console.log('response',action.payload);
      state = {
        ...state,
        rough: action.payload,
      };
      break;

case roughAction.add_rough:
      state = {
        ...state,
      };
      addRoughApiCall(action.payload);
      break;


    default:
      return state;
//   }
//   return state;
};
return state;
}

export default Test;
