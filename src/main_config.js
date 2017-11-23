/**
 * Created by whobird on 17/8/31.
 */
/*const baseUrl='http://www.powerlongmuseum.com/artWeb/authLink/1/'*/
/*const baseUrl='http://plocc.powerlong.com/artWeb/authLink/1/';*/

let _env='product'; //dev/product
let baseUrl;

var tokenKey=localStorage.getItem('tokenKey')||'';
var isLogin=localStorage.getItem('isLogin')||false;

if(_env=='dev'){
  baseUrl='http://jdlabtest.yueworld.cn/jdlabWeb/authLink/1/'
}else{
  baseUrl='http://jdlabtest.yueworld.cn/jdlabWeb/authLink/1/'
}

export default {
  env:_env,
  baseUrl:baseUrl,
  tokenKey:tokenKey,
  isLogin:isLogin
}
