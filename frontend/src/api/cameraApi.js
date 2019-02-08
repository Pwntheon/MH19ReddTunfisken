const API_URL =
  'https://westeurope.api.cognitive.microsoft.com/customvision/v2.0/Prediction/b394e0b1-e386-444f-ba67-20cb9ea32df6/image';
const PREDICTION_KEY = '062025dc84c74957a38a447b2c3660e6';
class Api {
  async postImage(base64Image) {
    if (!base64Image) return;

    const data = await fetch(`${API_URL}`, {
      method: 'POST',
      body: base64Image, //this.b64toBlob(base64Image, 'image/jpeg'),
      headers: {
        'Content-Type': 'application/octet-stream',
        'Prediction-Key': PREDICTION_KEY
      }
    });

    console.log(data);
    return data;
  }

  b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
}

export default new Api();
