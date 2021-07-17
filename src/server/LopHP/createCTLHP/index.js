import {settings} from '../../../app/config';

let api = settings.hostURL;

const createCTLHP = async (MaLopHP, MaSV) => {
  let res = '';

  var data = new FormData();
  data.append('MaSV', MaSV);
  data.append('MaLopHP', MaLopHP);

  console.log(MaLopHP);

  var requestOptions = {
    method: 'POST',
    body: data,
    redirect: 'follow',
  };

  await fetch(api + 'ChiTietLopHP/createCTLHP.php', requestOptions)
    .then(response => response.json())
    .then(data => {
      res = data;
    })
    .catch(error => console.log('error', error));

  return res;
};

export {createCTLHP};
