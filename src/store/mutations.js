/**
 * Created by whobird on 17/8/17.
 */
import * as types from './mutation-types'

export default {
    [types.SET_OPENID](state,payload){
        state.openid=payload.openid;
    },
    [types.SET_LOGIN](state,payload){
        state.login=payload.login;
    }
}
