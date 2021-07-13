import {settings} from '../../../app/config';

let api = settings.hostURL;

const deleteCTBKT = async (MaBaiKT, MaCH) => {
  let res = '';

  var data = new FormData();
  data.append('MaBaiKT', MaBaiKT);
  data.append('MaCH', MaCH);

  console.log(MaBaiKT, ' - ', MaCH);

  var requestOptions = {
    method: 'POST',
    body: data,
    redirect: 'follow',
  };

  await fetch(api + 'ChiTietBaiKT/deleteCTBKT.php', requestOptions)
    .then(response => response.json())
    .then(data => {
      res = data;
    })
    .catch(error => console.log('error', error));

  return res;
};

export {deleteCTBKT};
