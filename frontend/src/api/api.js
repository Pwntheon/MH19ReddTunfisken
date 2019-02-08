const API_URL = 'https://bigtuna.azurewebsites.net/api/household';

class Api {
  async getHousehold(accessToken = '') {
    if (!accessToken.length) {
      console.error('No accesstoken');
    }

    const data = await fetch(`${API_URL}/me`, {
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

    const data = await fetch(`${API_URL}/create`, {
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
}

export default new Api();
