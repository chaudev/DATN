import {settings} from '../../../app/config';

let api = settings.hostURL;

const updateGV = async (MaGV, TenGV, GioiTinh, DiaChi, Password) => {
  let res = '';

  console.log(
    'TenGV: ',
    TenGV,
    ' GioiTinh: ',
    GioiTinh,
    ' DiaChi: ',
    DiaChi,
    ' Password: ',
    Password,
  );

  var data = new FormData();
  data.append('MaGV', MaGV);
  data.append('TenGV', TenGV);
  data.append('GioiTinh', GioiTinh);
  data.append('DiaChi', DiaChi);
  data.append('Password', Password);

  var requestOptions = {
    method: 'POST',
    body: data,
    redirect: 'follow',
  };

  await fetch(api + 'GiangVien/updateGV.php', requestOptions)
    .then(response => response.json())
    .then(data => {
      res = data;
    })
    .catch(error => console.log('error', error));

  console.log('res: ', res);
  return res;
};

export {updateGV};
