import {settings} from '../../../app/config';

let api = settings.hostURL;

const getTestByDate = async (MaGV, Ngay) => {
  let res = '';

  var data = new FormData();
  data.append('MaGV', MaGV);
  data.append('Ngay', Ngay + '');

  console.log(MaGV, ' - ', Ngay);

  var requestOptions = {
    method: 'POST',
    body: data,
    redirect: 'follow',
  };

  await fetch(api + 'Calen/getTestByDate.php', requestOptions)
    .then(response => response.json())
    .then(data => {
      res = data;
    })
    .catch(error => console.log('error', error));

  return res;
};

export {getTestByDate};
