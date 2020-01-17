import { packetAction } from "../js/actions";
import {fetchUrl} from '../js/fetchUrl';
import {notification} from 'antd';

const loadCarat = (values) => {
  console.log("this is a data from the action values",values);
	return {
    type: roughAction.LOAD_ROUGH,
    values
	};
}

const loadManager = (values) => {
  console.log("this is a data from the action values",values);
  return {
    type: roughAction.LOAD_SORTING,
    values,
	};
}


export const addSorting = values => (dispatch) => (
new Promise(((resolve,reject) => {
  fetchUrl('post', `sort`, values)
    .then((res) => {
      dispatch(addSortings(values));
      notification.success({ message: "Sorting added sucessfully !" });
      resolve(res);
    })
    .catch((e) => {
      reject(e)
    });
}))
);

export const loadManagers = () => (dispatch) => (
  new Promise(((resolve,reject) => {
    fetchUrl('get', `manager`)
    .then((res) => {
      console.log('this is a responce', res);
      dispatch(loadManager(res));
      resolve(res);
      notification.success({ message: res.message });
    })
    .catch((e) => {
      reject(e);
    });
  }))
  );

