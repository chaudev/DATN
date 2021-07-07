import {settings} from '../../../app/config';

let api = settings.hostURL;

const getCD = async (MaGV, MaMH) => {
  let res = '';

  var data = new FormData();
  data.append('MaGV', MaGV);
  data.append('MaMH', MaMH);

  console.log(MaGV, ' - ', MaMH);

  var requestOptions = {
    method: 'POST',
    body: data,
    redirect: 'follow',
  };

  await fetch(api + 'ChuDe/getCD.php', requestOptions)
    .then(response => response.json())
    .then(data => {
      res = data;
    })
    .catch(error => console.log('error', error));

  return res;
};

export {getCD};
