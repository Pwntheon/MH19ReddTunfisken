import moment from 'moment';

const API_URL = 'https://bigtuna.azurewebsites.net/api';

class Api {
  async getHousehold(accessToken = '') {
    if (!accessToken.length) {
      console.error('No accesstoken');
    }

    const data = await fetch(`${API_URL}/household/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });

    console.log(data);
    return data;
  }

  async createHousehold(household = {}, accessToken = '') {
    if (!accessToken.length) {
      console.error('no access token');
      return;
    }

    const data = await fetch(`${API_URL}/household/create`, {
      method: 'POST',
      body: JSON.stringify(household),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });

    console.log(data);
    return data;
  }

  getMyStatistics(household = null, accessToken = '', fromDateTime = moment().subtract(1, 'month')) {
    if(!household || !accessToken) {
      console.error('Missing data');
      return;
    }
    return fetch(`${API_URL}/statistics/me`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({FromDate: fromDateTime})
    });
  }

  getDistrictStatistics(household = null, accessToken = '', fromDateTime = moment().subtract(1, 'month')) {
    if(!household || !accessToken) {
      console.error('Missing data');
      return;
    }
    return fetch(`${API_URL}/statistics/${household.district}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({FromDate: fromDateTime})
    });
  }
}

export default new Api();
