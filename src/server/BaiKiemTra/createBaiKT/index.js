import {settings} from '../../../app/config';

let api = settings.hostURL;

const createBaiKT = async (TenBaiKT, Ngay, MaGV, MaLopHP, ThoiGianLam) => {
  let res = '';

  var data = new FormData();
  data.append('TenBaiKT', TenBaiKT);
  data.append('Ngay', Ngay);
  data.append('MaGV', MaGV);
  data.append('MaLopHP', MaLopHP);
  data.append('ThoiGianLam', ThoiGianLam);

  console.log(MaGV, ' - ', MaLopHP);

  var requestOptions = {
    method: 'POST',
    body: data,
    redirect: 'follow',
  };

  await fetch(api + 'BaiKiemTra/createBaiKT.php', requestOptions)
    .then(response => response.json())
    .then(data => {
      res = data;
    })
    .catch(error => console.log('error', error));

  return res;
};

export {createBaiKT};
