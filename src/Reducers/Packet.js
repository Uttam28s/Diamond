import { packetAction } from "../js/actions";

const Packet = (
  state = {
    loadCarat: "",
    loadManager: "",
    packet_carat: {}
  },
  Action
) => {
  switch (Action.type) {
    case packetAction.load_carat:
      return {
        ...state,
        loadCarat: { ...Action.value }
      };
      break;

    case packetAction.load_packet_carat:
      return {
        ...state,
        packet_carat: Action.payload
      };
      break;

    case packetAction.sawing_Issue:
      return {
        ...state,
        sawing_Issue: Action.payload
      };
      break;

    case packetAction.manger_name:
      return {
        ...state,
        loadManager: { ...Action.vale }
      };
      break;
    default:
      return state;
  }
};

export default Packet;
