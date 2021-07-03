import {settings} from '../../../app/config';

let api = settings.hostURL;

const getCH = async MaMH => {
  console.log('MaMH: ', MaMH);
  let res = '';

  var data = new FormData();
  data.append('MaMH', MaMH);

  var requestOptions = {
    method: 'POST',
    body: data,
    redirect: 'follow',
  };

  await fetch(api + 'CauHoi/getCH.php', requestOptions)
    .then(response => response.json())
    .then(data => {
      res = data;
    })
    .catch(error => console.log('error', error));

  return res;
};

export {getCH};
