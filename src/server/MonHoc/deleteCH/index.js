import {settings} from '../../../app/config';

let api = settings.hostURL;

const deleteCH = async MaCH => {
  let res = '';

  var data = new FormData();
  data.append('MaCH', MaCH);

  var requestOptions = {
    method: 'POST',
    body: data,
    redirect: 'follow',
  };

  await fetch(api + 'CauHoi/deleteCH.php', requestOptions)
    .then(response => response.json())
    .then(data => {
      res = data;
    })
    .catch(error => console.log('error', error));

  console.log('deleteCH: ', res);

  return res;
};

export {deleteCH};
