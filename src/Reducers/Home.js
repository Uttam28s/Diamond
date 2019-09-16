import { postAction, actionType } from "../components/Constant/allConstants";

const Home = (
  state = {
    singleData: {},
    apicall: false,
    apistatus: false
  },
  Action
) => {
  switch (Action.type) {
    case postAction:
      return {
        ...state,
        apicall: false,
        apistatus: false
      };
    case actionType.apiSuccess:
      return {
        ...state,
        apicall: false,
        apistatus: true
      };
    case actionType.apifailed:
      // message.error('Api Failed please try again');
      return {
        ...state,
        apicall: false,
        apistatus: false
      };
    default:
      return state;
  }
};

export default Home;
