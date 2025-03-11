
// https://countriesnow.space/api/v0.1/countries/info?returns=currency,flag,unicodeFlag,dialCode

fetch('https://countriesnow.space/api/v0.1/countries/info?returns=currency,flag,unicodeFlag,dialCode')
  .then(response => response.json())
  .then(data => {
    console.log(data.data[0].name);
  })
  .catch(error => console.error(error));

// https://countriesnow.space/api/v0.1/countries/capital


