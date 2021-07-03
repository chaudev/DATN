import {settings} from '../../../app/config';

let api = settings.hostURL;

const getMH = async (phone, password) => {
  let res = '';

  var data = new FormData();
  // data.append('SDT', phone);
  // data.append('Password', password);

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  await fetch(api + 'MonHoc/getMH.php', requestOptions)
    .then(response => response.json())
    .then(data => {
      res = data;
    })
    .catch(error => console.log('error', error));

  return res;
};

export {getMH};
