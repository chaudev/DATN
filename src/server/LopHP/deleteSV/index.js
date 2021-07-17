import {settings} from '../../../app/config';

let api = settings.hostURL;

const deleteSV = async (MaLopHP, MaSV) => {
  let res = '';

  var data = new FormData();
  data.append('MaLopHP', MaLopHP);
  data.append('MaSV', MaSV);

  console.log('MaLopHP: ', MaLopHP);
  console.log('MaSV: ', MaSV);

  var requestOptions = {
    method: 'POST',
    body: data,
    redirect: 'follow',
  };

  await fetch(api + 'ChiTietLopHP/deleteSV.php', requestOptions)
    .then(response => response.json())
    .then(data => {
      res = data;
    })
    .catch(error => console.log('error', error));

  return res;
};

export {deleteSV};
