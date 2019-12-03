import axios from 'axios';

const FORM_SUBSCRIPTION_IDS = {
  newsletter: 5470393,
  blog: 5470394,
  product_releases: 5734448,
  tsl_info: 5713631,
  events: 5634664,
  stateofpostgres: 7847307,
};

const ENDPOINT_DOMAIN = process.env.NODE_ENV === 'production'
  ? 'https://responses.timescale.com'
  : 'https://dev-responses.timescale.com'

async function submitForm({
  submitBody,
  route = "/v2/stateofpostgres",
  onSuccess = () => {},
  onFailure = () => {},
}) {
  let addedFields = [];
  const hutk = document.cookie.match(/hubspotutk=(\w+)(;|$)/) || [];
  const subscriptions = [];
  for (let i = 0; i < submitBody.length; i += 1) {
    if (FORM_SUBSCRIPTION_IDS[submitBody[i].name] && submitBody[i].value) {
      subscriptions.push({ id: FORM_SUBSCRIPTION_IDS[submitBody[i].name], value: true });
    }
  }
  addedFields = [
    { name: 'gdpr', value: subscriptions },
  ];
  if (hutk[1]) {
    addedFields.push({ name: 'hutk', value: hutk[1] });
  }

  const postBody = submitBody.concat(addedFields);

  try {
    const response = await axios.post(ENDPOINT_DOMAIN + route, postBody);
    if (response.status < 300) {
      onSuccess(response);
    }
  } catch (e) {
    if (e.response) {
      onFailure(e.response);
    }
  }
}

export default submitForm;
