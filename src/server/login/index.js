import {settings} from '../../app/config';

let api = settings.hostURL;

const postLogin = async (phone, password) => {
  let resData = '';

  var data = new FormData();
  data.append('phone', phone);
  data.append('password', password);

  var requestOptions = {
    method: 'POST',
    body: data,
    redirect: 'follow',
  };

  await fetch(api + 'account/login.php', requestOptions)
    .then(response => response.json())
    .then(data => {
      resData = data;
    })
    .catch(error => console.log('error', error));

  return resData;
};

export {postLogin};
