import { roughAction, api_status } from "../js/actions";
import { fetchUrl } from "../js/fetchUrl";
import { notification } from "antd";

export function loadRough(values) {
  // console.log("this is a data from the action values",values);
  return {
    type: roughAction.LOAD_ROUGH,
    values
  };
}

const loadSorting = values => {
  // console.log("this is a data from the action values",values);
  return {
    type: roughAction.LOAD_SORTING,
    values
  };
};

// const listRoughs = (values) => ({
//   type: roughAction.ROUGH_LISTING,
//   values,
// });

const apiSuccess = () => ({
  type: api_status.apisuccess
});

const apiFailed = () => ({
  type: api_status.apifailed
});

export function addRoughs(data) {
  return {
    type: roughAction.add_rough,
    payload: data || null
  };
}

export function updateRough() {
  return {
    type: roughAction.UPDATE_ROUGH
  };
}

const loadCaret = values => ({
  type: roughAction.CARET_LISTING,
  values
});

const loadUnused = values => ({
  type: roughAction.UNUSED_ROUGH,
  values
});

export function addSortings(data) {
  return {
    type: roughAction.ADD_SORTING,
    payload: data || null
  };
}

export const addRough = values => dispatch => {
  // console.log('TCL: updateModuleList -> data', values)
  // dispatch(addRoughs(values));
  // fetch('http://localhost:3001/rough', {
  //   method: 'POST',
  //   body: JSON.stringify({
  // 		name: values.name,
  // 		carat: values.carat,
  // 		price: values.price
  //   }),
  //   headers: {
  //     'Content-type': 'application/json',
  //   },
  // }).then(response => response.json()).then((json) => {
  //   dispatch(apiSuccess());
  // })
  //   .catch(() => dispatch(apiFailed()));

  // console.log('TCL: updateModuleList -> data', values);
  dispatch(addRoughs(values));
  fetchUrl("post", `rough`, values)
    .then(res => {
      // notification.success({ message: res.message });
      dispatch(apiSuccess());
    })
    .catch(() => {
      dispatch(apiFailed());
      // console.log("this is a console log in failapi");
    });
};

export const addSorting = values => dispatch =>
  new Promise((resolve, reject) => {
    fetchUrl("post", `sort`, values)
      .then(res => {
        dispatch(addSortings(values));
        // notification.success({ message: "Sorting added sucessfully !" });
        resolve(res);
      })
      .catch(e => {
        reject(e);
      });
  });

export const updateRoughData = (id, values) => dispatch => {
  // console.log('TCL : -> addSorting Action :>', id,values)
  fetchUrl("put", `rough/${id}`, values)
    .then(res => {
      // console.log('this is a responce', res);
      // notification.success({ message: res.message });
      dispatch(apiSuccess());
      dispatch(updateRough());
    })
    .catch(() => {
      dispatch(apiFailed());
      // console.log("this is a console log in failapi");
    });
};

export const listRough = () => dispatch => {
  // console.log('TCL: updateModuleList -> data')
  fetchUrl("GET", `rough`)
    .then(res => {
      // console.log('this is a responce', res);
      // notification.success({ message: res.message });
      dispatch(apiSuccess());
      dispatch(loadRough(res));
    })
    .catch(() => {
      dispatch(apiFailed());
      // console.log("this is a console log in failapi");
    });
};

export const listSorting = id => dispatch => {
  // console.log('TCL: updateModuleList -> data')
  fetchUrl("GET", `sort/${id}`)
    .then(res => {
      // console.log('this is a responce', res);
      // notification.success({ message: res.message });
      dispatch(apiSuccess());
      dispatch(loadSorting(res));
    })
    .catch(() => {
      dispatch(apiFailed());
      // console.log("this is a console log in failapi");
    });
};

export const unusedRough = id => dispatch =>
  new Promise((resolve, reject) => {
    fetchUrl("GET", `unused/${id}`)
      .then(res => {
        // console.log('this is a responce', res);
        dispatch(loadUnused(res));
        resolve(res);
      })
      .catch(e => {
        reject(e);
      });
  });

export const listCarats = () => dispatch => {
  fetchUrl("GET", `rough/caret`)
    .then(res => {
      // console.log('this is a responce', res);
      // notification.success({ message: res.message });
      dispatch(apiSuccess());
      dispatch(loadCaret(res));
    })
    .catch(() => {
      dispatch(apiFailed());
      // console.log("this is a console log in failapi");
    });
};

// export const listRough = () => (dispatch) => {
// console.log("TCL: values");
//   fetch('http://localhost:3001/rough')
//   .then(response => response.json()).then((json) =>{dispatch(loadRough(json))})
//   .catch(() => dispatch(apiFailed()));
// };

// export const listSorting = (id) => (dispatch) => {
// console.log("TCL: values");
//   fetch(`http://localhost:3001/sort/${id}`)
//   .then(response => response.json()).then((json) =>{dispatch(loadSorting(json))})
//   .catch(() => dispatch(apiFailed()));
// };
