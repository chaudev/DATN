import {settings} from '../../../app/config';

let api = settings.hostURL;

const updateCH = async (MaCH, CauHoi, A, B, C, D, DapAn, MaCD) => {
  let res = '';

  var data = new FormData();
  data.append('MaCH', MaCH);
  data.append('CauHoi', CauHoi);
  data.append('A', A);
  data.append('B', B);
  data.append('C', C);
  data.append('D', D);
  data.append('DapAn', DapAn);
  data.append('MaCD', MaCD);

  var requestOptions = {
    method: 'POST',
    body: data,
    redirect: 'follow',
  };

  await fetch(api + 'CauHoi/updateCH.php', requestOptions)
    .then(response => response.json())
    .then(data => {
      res = data;
    })
    .catch(error => console.log('error', error));

  return res;
};

export {updateCH};
