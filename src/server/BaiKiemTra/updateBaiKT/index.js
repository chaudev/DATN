import {settings} from '../../../app/config';

let api = settings.hostURL;

const updateBaiKT = async (MaBaiKT, TenBaiKT, Ngay, MaGV, ThoiGianLam) => {
  let res = '';

  var data = new FormData();
  data.append('MaBaiKT', MaBaiKT);
  data.append('TenBaiKT', TenBaiKT);
  data.append('Ngay', Ngay);
  data.append('MaGV', MaGV);
  data.append('ThoiGianLam', ThoiGianLam);

  console.log('Ngay: ', Ngay);

  var requestOptions = {
    method: 'POST',
    body: data,
    redirect: 'follow',
  };

  await fetch(api + 'BaiKiemTra/updateBaiKT.php', requestOptions)
    .then(response => response.json())
    .then(data => {
      res = data;
    })
    .catch(error => console.log('error', error));

  return res;
};

export {updateBaiKT};
