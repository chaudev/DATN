import {settings} from '../../../app/config';

let api = settings.hostURL;

const getCD = async MaGV => {
  let res = '';

  var data = new FormData();
  data.append('MaGV', MaGV);

  var requestOptions = {
    method: 'POST',
    body: data,
    redirect: 'follow',
  };

  await fetch(api + 'ChuDe/getCD.php', requestOptions)
    .then(response => response.json())
    .then(data => {
      res = data;
    })
    .catch(error => console.log('error', error));

  return res;
};

export {getCD};
