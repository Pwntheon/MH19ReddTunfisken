const API_URL =
  'https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/5c51155e-a050-4b72-94ea-bc8abf8cb5bc/image?iterationId=004571f6-28f5-415e-b200-25ca6692b7c9';
const PREDICTION_KEY = '81227541151d4d74ab3a2265792d14dd';
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
