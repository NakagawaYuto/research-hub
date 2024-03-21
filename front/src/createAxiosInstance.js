import axios from 'axios';
import Cookies from 'universal-cookie';

const createAxiosInstance = () => {
  const cookies1 = new Cookies();

  const BACKEND_URL = process.env.BACKEND_URL;

  const ax = axios.create({
    baseURL: "https://mkr7ke6tvz.ap-northeast-1.awsapprunner.com/",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${cookies1.get('accesstoken')}`
    }
  });

  ax.interceptors.request.use(req => {
  
    const access_token = cookies1.get('accesstoken');  // クッキーに保存されているアクセストークンを取得
  
  
    if(access_token !== undefined){ // アクセストークンが存在するなら
      return axios.post('http://localhost:8080/auth/jwt/verify',{  // アクセストークンのチェック
        token:access_token,
      }).then(res => {
        // すべての処理が終了した後に実行する
        return req; // Promiseの解決値としてreqを返す
      }).catch(err => {
        // アクセストークンに問題あり
        if(err.response.status === 401){
          // 検証結果が401の場合リフレッシュを試す
          const refresh_token = cookies1.get('refreshtoken');
          return axios.post('http://localhost:8080/auth/jwt/refresh',{
            refresh: refresh_token,
          }).then(res => {
            // トークンを更新した後にリクエストを送信
            cookies1.set('accesstoken', res.data.access);
            cookies1.set('refreshtoken', res.data.refresh);
  

            // // トークンが更新された後に、更新されたアクセストークンをaxiosのヘッダーに設定する
            req.headers['Authorization'] = `JWT ${res.data.access}`;
            return req;
  
          }).catch(err => {
            // パターン(4)
            // リクエストをキャンセルするためにPromiseを拒否する
            return Promise.reject(err);
          });
        }
      });
    }
    else{
      return req;
      // リクエストをキャンセルするためにPromiseを拒否する
      // return Promise.reject("no token.");
    }
  })

  ax.interceptors.response.use(
    (response) => response, // 成功時のresponseはそのまま返す
    (error) => {

      return Promise.reject(error); // エラーを呼び出し元に返す
    }
  );

  return ax;
};

export default createAxiosInstance;