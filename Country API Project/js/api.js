const API_URL = 'https://countriesnow.space/api/v0.1/countries/info?returns=currency,flag,unicodeFlag,dialCode';

const createElement = (tag, content, attributes = {}) => {
  const element = document.createElement(tag);
  if (content) element.textContent = content;
  Object.entries(attributes).forEach(([key, value]) => element[key] = value);
  return element;
};

const displayCountryInfo = (countryData) => {
  const {name, currency, flag, unicodeFlag, dialCode} = countryData;
  const container = document.createElement('div');
  
  const elements = [
    createElement('h2', name),
    createElement('p', `Currency: ${currency}`),
    createElement('img', null, {src: flag, width: 200, height: 120, style: 'object-fit: contain'}),
    createElement('p', `Unicode Flag: ${unicodeFlag}`),
    createElement('p', `Dial Code: ${dialCode}`)
  ];
  
  container.style.cssText = `
    border: 1px solid #ccc;
    padding: 20px;
    margin: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    display: inline-block;
    text-align: center;
    width: 250px;
    height: 350px;
    vertical-align: top;
    overflow: hidden;
  `;
  
  elements.forEach(element => container.appendChild(element));
  document.body.appendChild(container);
};

fetch(API_URL)
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  })
  .then(data => {
    // Sort countries by name alphabetically
    const sortedCountries = data.data.sort((a, b) => a.name.localeCompare(b.name));
    sortedCountries.forEach(displayCountryInfo);
  })
  .catch(error => console.error('Error fetching country data:', error));
