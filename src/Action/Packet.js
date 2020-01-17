import { packetAction } from "../js/actions";
import { fetchUrl } from "../js/fetchUrl";
import { notification } from "antd";

const loadCarat = values => {
  // console.log("this is a data from the action values",values);
  return {
    type: packetAction.load_carat,
    values
  };
};

const loadManager = values => {
  // console.log("this is a data from the action values",values);
  return {
    type: packetAction.manger_name,
    values
  };
};

export const loadCarats = values => dispatch =>
  new Promise((resolve, reject) => {
    fetchUrl("get", `rough/caret`)
      .then(res => {
        dispatch(loadCarat(res));
        // notification.success({ message: "Sorting added sucessfully !" });
        resolve(res);
      })
      .catch(e => {
        reject(e);
      });
  });

export const loadManagers = () => dispatch =>
  new Promise((resolve, reject) => {
    fetchUrl("get", `manager`)
      .then(res => {
        // console.log('this is a responce', res);
        dispatch(loadManager(res));
        resolve(res);
        // notification.success({ message: res.message });
      })
      .catch(e => {
        reject(e);
      });
  });

export const addPacket = data => dispatch =>
  new Promise((resolve, reject) => {
    fetchUrl("post", "packet", data)
      .then(res => {
        resolve(res);
      })
      .catch(e => {
        reject(e);
      });
  });

export const getIssuePackets = () => dispatch =>
  new Promise((resolve, reject) => {
    fetchUrl("get", "return/sawing/list")
      .then(res => {
        console.log("this is a all packet data in a Issue carat => ", res);
        // dispatch({ type: packetAction.sawing_Issue, payload: res });
        resolve(res);
      })
      .catch(e => {
        reject(e);
      });
  });

export const listPacket = () => dispatch =>
  new Promise((resolve, reject) => {
    fetchUrl("get", "packet")
      .then(res => {
        // console.log("this is a all packet data => ", res);
        resolve(res);
      })
      .catch(e => {
        reject(e);
      });
  });

export const listsrno = id => dispatch =>
  new Promise((resolve, reject) => {
    fetchUrl("get", `packet/srno/${id}`)
      .then(res => {
        // console.log("this is a all packet data => ", res);
        resolve(res);
      })
      .catch(e => {
        reject(e);
      });
  });

export const listCaratPck = id => dispatch =>
  new Promise((resolve, reject) => {
    fetchUrl("get", `packet/carat/pck/${id}`)
      .then(res => {
        console.log("this is a all packet data in a packet carat => ", res);
        dispatch({ type: packetAction.load_packet_carat, payload: res });
        resolve(res);
      })
      .catch(e => {
        reject(e);
      });
  });

export const setPacketIssueOffice = data => dispatch =>
  new Promise((resolve, reject) => {
    fetchUrl("post", "save/packet/sawing", data)
      .then(res => {
        // console.log("this is a all packet data in a packet carat => ", res);
        // dispatch({ type: packetAction.sawing_Issue, payload: res });
        resolve(res);
      })
      .catch(e => {
        reject(e);
      });
  });

export const returnSawingPacket = data => dispatch =>
  new Promise((resolve, reject) => {
    fetchUrl("put", "update/sawing-return", data)
      .then(res => {
        // console.log("this is a all packet data in a packet carat => ", res);
        // dispatch({ type: packetAction.sawing_Issue, payload: res });
        resolve(res);
      })
      .catch(e => {
        reject(e);
      });
  });
