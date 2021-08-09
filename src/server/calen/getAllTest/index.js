import {settings} from '../../../app/config';

let api = settings.hostURL;

const getAllTest = async MaGV => {
  let res = '';

  var data = new FormData();
  data.append('MaGV', MaGV);

  console.log(MaGV, ' - ', MaLopHP);

  var requestOptions = {
    method: 'POST',
    body: data,
    redirect: 'follow',
  };

  await fetch(api + 'Calen/getAllTest.php', requestOptions)
    .then(response => response.json())
    .then(data => {
      res = data;
    })
    .catch(error => console.log('error', error));

  return res;
};

export {getAllTest};
