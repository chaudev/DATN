import {settings} from '../../../app/config';

let api = settings.hostURL;

const deleteBaiKT = async MaBaiKT => {
  let res = '';

  var data = new FormData();
  data.append('MaBaiKT', MaBaiKT);

  console.log(MaBaiKT);

  var requestOptions = {
    method: 'POST',
    body: data,
    redirect: 'follow',
  };

  await fetch(api + 'BaiKiemTra/deleteBaiKT.php', requestOptions)
    .then(response => response.json())
    .then(data => {
      res = data;
    })
    .catch(error => console.log('error', error));

  return res;
};

export {deleteBaiKT};