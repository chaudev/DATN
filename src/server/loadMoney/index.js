import {settings} from '../../app/config';

let api = settings.hostURL;

const getHistory = async phone => {
  let resData = '';

  var data = new FormData();
  data.append('phone', phone);

  var requestOptions = {
    method: 'POST',
    body: data,
    redirect: 'follow',
  };

  await fetch(api + 'money/getHistory.php', requestOptions)
    .then(response => response.json())
    .then(data => {
      resData = data;
    })
    .catch(error => console.log('error', error));

  return resData;
};

export {getHistory};
