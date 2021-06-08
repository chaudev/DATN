import {settings} from '../../app/config';

let api = settings.hostURL;

const updateCurrentMoney = async (phone, id, currentMoney) => {
  let resData = '';

  var data = new FormData();
  data.append('phone', phone);
  data.append('id', id);
  data.append('currentMoney', currentMoney);

  var requestOptions = {
    method: 'POST',
    body: data,
    redirect: 'follow',
  };

  await fetch(api + 'money/updateCurrentMoney.php', requestOptions)
    .then(response => response.json())
    .then(data => {
      resData = data;
    })
    .catch(error => console.log('error', error));

  return resData;
};

export {updateCurrentMoney};
