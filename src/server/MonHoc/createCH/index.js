import {settings} from '../../../app/config';

let api = settings.hostURL;

const createCH = async (MaCD, CauHoi, A, B, C, D, DapAn) => {
  let res = '';

  var data = new FormData();
  data.append('MaCD', MaCD);
  data.append('CauHoi', CauHoi);
  data.append('A', A);
  data.append('B', B);
  data.append('C', C);
  data.append('D', D);
  data.append('DapAn', DapAn);

  var requestOptions = {
    method: 'POST',
    body: data,
    redirect: 'follow',
  };

  await fetch(api + 'CauHoi/createCH.php', requestOptions)
    .then(response => response.json())
    .then(data => {
      res = data;
    })
    .catch(error => console.log('error', error));

  return res;
};

export {createCH};
