import {settings} from '../../app/config';

let api = settings.hostURL;

const addMoney = async (phone, currentMoney, usedMoney, useFor, comment) => {
  let resData = '';

  var data = new FormData();
  data.append('phone', phone);
  data.append('currentMoney', currentMoney);
  data.append('usedMoney', usedMoney);
  data.append('useFor', useFor);
  data.append('comment', comment);

  var requestOptions = {
    method: 'POST',
    body: data,
    redirect: 'follow',
  };

  await fetch(api + 'money/addMoney.php', requestOptions)
    .then(response => response.json())
    .then(data => {
      resData = data;
    })
    .catch(error => console.log('error', error));

  return resData;
};

export {addMoney};
