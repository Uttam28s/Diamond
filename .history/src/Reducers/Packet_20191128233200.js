import {packetAction} from '../js/actions';

const Packet = (
  state = {
    loadCarat:'',
    loadManager : '',
  }, Action
) => {
  switch(Action.type) {
    case packetAction.load_carat : 
    return {
      ...state,
      loadCarat : {...Avtion.value}
    };
    break;

    case packetAction.manger_name :
      return {
        ...state,
        loadManager : {...Action.vale}
      };
      break;
    default : 
    return  state ; 
  }
}

export default Packet ;