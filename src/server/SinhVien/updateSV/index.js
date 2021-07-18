import {settings} from '../../../app/config';

let api = settings.hostURL;

const updateSV = async (MaSV, TenSV, GioiTinh, DiaChi, Password) => {
  let res = '';

  console.log(
    'TenSV: ',
    TenSV,
    ' GioiTinh: ',
    GioiTinh,
    ' DiaChi: ',
    DiaChi,
    ' Password: ',
    Password,
  );

  var data = new FormData();
  data.append('MaSV', MaSV);
  data.append('TenSV', TenSV);
  data.append('GioiTinh', GioiTinh);
  data.append('DiaChi', DiaChi);
  data.append('Password', Password);

  var requestOptions = {
    method: 'POST',
    body: data,
    redirect: 'follow',
  };

  await fetch(api + 'SinhVien/updateSV.php', requestOptions)
    .then(response => response.json())
    .then(data => {
      res = data;
    })
    .catch(error => console.log('error', error));

  console.log('res: ', res);
  return res;
};

export {updateSV};
