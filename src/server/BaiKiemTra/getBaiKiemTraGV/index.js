import {settings} from '../../../app/config';

let api = settings.hostURL;

const getBaiKiemTraGV = async (MaGV, MaLopHP) => {
  let res = '';

  var data = new FormData();
  data.append('MaGV', MaGV);
  data.append('MaLopHP', MaLopHP);

  console.log(MaGV, ' - ', MaLopHP);

  var requestOptions = {
    method: 'POST',
    body: data,
    redirect: 'follow',
  };

  await fetch(api + 'BaiKiemTra/getBaiKiemTraGV.php', requestOptions)
    .then(response => response.json())
    .then(data => {
      res = data;
    })
    .catch(error => console.log('error', error));

  return res;
};

export {getBaiKiemTraGV};
