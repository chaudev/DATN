import {settings} from '../../../app/config';

let api = settings.hostURL;

const createLPH = async (TenLopHP, MaGV, MaMH, MaLop) => {
  let res = '';

  var data = new FormData();
  data.append('TenLopHP', TenLopHP);
  data.append('MaGV', MaGV);
  data.append('MaMH', MaMH);
  data.append('MaLop', MaLop);

  var requestOptions = {
    method: 'POST',
    body: data,
    redirect: 'follow',
  };

  await fetch(api + 'LopHocPhan/createLPH.php', requestOptions)
    .then(response => response.json())
    .then(data => {
      res = data;
    })
    .catch(error => console.log('error', error));

  return res;
};

export {createLPH};
