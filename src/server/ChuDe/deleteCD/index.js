import {settings} from '../../../app/config';

let api = settings.hostURL;

const deleteCD = async MaCD => {
  let res = '';

  console.log('MaCD: ', MaCD);

  var data = new FormData();
  data.append('MaCD', MaCD);

  var requestOptions = {
    method: 'POST',
    body: data,
    redirect: 'follow',
  };

  await fetch(api + 'ChuDe/deleteCD.php', requestOptions)
    .then(response => response.json())
    .then(data => {
      res = data;
    })
    .catch(error => console.log('error', error));

  return res;
};

export {deleteCD};
