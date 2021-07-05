import {settings} from '../../../app/config';

let api = settings.hostURL;

const createCD = async (TenCD, MaMH, MaGV) => {
  let res = '';

  var data = new FormData();
  data.append('TenCD', TenCD);
  data.append('MaMH', MaMH);
  data.append('MaGV', MaGV);

  var requestOptions = {
    method: 'POST',
    body: data,
    redirect: 'follow',
  };

  await fetch(api + 'ChuDe/createCD.php', requestOptions)
    .then(response => response.json())
    .then(data => {
      res = data;
    })
    .catch(error => console.log('error', error));

  return res;
};

export {createCD};
