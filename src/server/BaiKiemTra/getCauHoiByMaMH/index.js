import {settings} from '../../../app/config';

let api = settings.hostURL;

const getCauHoiByMaMH = async (MaMH, MaCD, MaGV) => {
  let res = '';

  var data = new FormData();
  data.append('MaMH', MaMH);
  data.append('MaCD', MaCD);
  data.append('MaGV', MaGV);

  console.log('MaGV: ', MaGV);

  var requestOptions = {
    method: 'POST',
    body: data,
    redirect: 'follow',
  };

  await fetch(api + 'CauHoi/getCauHoiByBKT.php', requestOptions)
    .then(response => response.json())
    .then(data => {
      res = data;
    })
    .catch(error => console.log('error', error));

  return res;
};

export {getCauHoiByMaMH};
