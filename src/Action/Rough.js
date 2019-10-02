import { roughAction, api_status } from "../js/actions";
import {fetchUrl} from '../js/fetchUrl';
import {notification} from 'antd';

export function loadRough() {
	return {
		type: roughAction.LOAD_ROUGH,
	};
}

const apiSuccess = () => ({
  type: api_status.apisuccess
});

const apiFailed = () => ({
  type: api_status.apifailed
});

export function addRough(data) {
	return {
		type: roughAction.add_rough,
		payload: data || null
	};
}

// export const addRough = values => (dispatch) => {
//   dispatch(addRoughs(values));
//   console.log("TCL: values", values);
//   fetch('http://localhost:3001/rough', {
//     method: 'POST',
//     body: JSON.stringify({
// 			name: values.sellername,
// 			carat: values.caret,
// 			price: values.amount
//     }),
//     headers: {
//       'Content-type': 'application/json',
//     },
//   }).then(response => response.json()).then((json) => {
//     dispatch(apiSuccess());
//   })
//     .catch(() => dispatch(apiFailed()));
// };
