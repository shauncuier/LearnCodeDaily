
// https://countriesnow.space/api/v0.1/countries/info?returns=currency,flag,unicodeFlag,dialCode

fetch('https://countriesnow.space/api/v0.1/countries/info?returns=currency,flag,unicodeFlag,dialCode')
  .then(response => response.json())
  .then(data => {
    country(data)
  })
  .catch(error => console.error(error));

// https://countriesnow.space/api/v0.1/countries/capital


const country = (data) => {


  // write a loop for all data

  for (let i = 0; i < data.data.length; i++) {
    const country = data.data[i].name;
    const currency = data.data[i].currency;
    const flag = data.data[i].flag;
    const unicodeFlag = data.data[i].unicodeFlag;
    const dialCode = data.data[i].dialCode;

    const countryName = document.createElement('h2');
    countryName.textContent = country;
    document.body.appendChild(countryName);

    const currencyName = document.createElement('p');
    currencyName.textContent = `Currency: ${currency}`;
    document.body.appendChild(currencyName);

    const flagImage = document.createElement('img');
    flagImage.width = 200;
    flagImage.src = flag;
    document.body.appendChild(flagImage);


    const unicodeFlagImage = document.createElement('p');
    unicodeFlagImage.textContent = `Unicode Flag: ${unicodeFlag}`;
    document.body.appendChild(unicodeFlagImage);

    const dialCodeNumber = document.createElement('p');
    dialCodeNumber.textContent = `Dial Code: ${dialCode}`;
    document.body.appendChild(dialCodeNumber);
  }
}