import { postAction, actionType } from "../components/Constant/allConstants";
import { fetchUrl } from "../js/fetchUrl";

export const editUser = () => ({
  type: postAction
});

const apiSuccess = () => ({
  type: actionType.apiSuccess
});

const apifailed = () => ({
  type: actionType.apifailed
});

// export const detailData = id => (dispatch) => {
//     fetch(`http://dummy.restapiexample.com/api/v1/employee/${id}`)
//       .then(responce => responce.json())
//       .then(data => dispatch(listData(data)))
//       .catch(error => message.error(error));
//   };

// export const login = data => (dispatch) => {
//   console.log('this is a login action log::', data);
//   const user = {
//     email: data.userName,
//     password: data.password,
//   };
//   dispatch(editUser());
//   fetchUrl('post', 'login', user, false).then(
//     (res) => {
//       const resData = res.data || null;
//       if (resData) {
//         localStorage.setItem('user', resData);
//       } else {
//         localStorage.setItem('user', null);
//       }
//       // notification.success({ message: res.message });
//       dispatch(apiSuccess());
//     },
//   ).catch(
//     () => {
//       dispatch(apifailed());
//       // notification.error({ message: 'Somethings went Wrong' })
//     },
//   );
// };
