// 這邊使用 axios 方便進行 promises base request
import axios from 'axios';
// 記得附加上我們存在 cookies 的 token  
export default function fetchComponentData(token = 'token') {
  const  promises = [axios.get('http://localhost:3000/api/recipes'), axios.get('http://localhost:3000/api/authenticate?token=' + token)];
  return Promise.all(promises);
}