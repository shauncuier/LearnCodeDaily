const API_URL = 'https://countriesnow.space/api/v0.1/countries/info?returns=currency,flag,unicodeFlag,dialCode';
let allCountries = []; // Store all countries data

const createElement = (tag, content, attributes = {}) => {
  const element = document.createElement(tag);
  if (content) element.textContent = content;
  Object.entries(attributes).forEach(([key, value]) => element[key] = value);
  return element;
};

const displayCountryInfo = (countryData, container = document.body) => {
  const { name, currency, flag, unicodeFlag, dialCode } = countryData;
  const countryContainer = document.createElement('div');

  const elements = [
    createElement('h2', name),
    createElement('p', `Currency: ${currency}`),
    createElement('img', null, { src: flag, width: 200, height: 120, style: 'object-fit: contain' }),
    createElement('p', `Unicode Flag: ${unicodeFlag}`),
    createElement('p', `Dial Code: ${dialCode}`)
  ];

  countryContainer.style.cssText = `
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

  elements.forEach(element => countryContainer.appendChild(element));
  container.appendChild(countryContainer);
};

const searchCountry = () => {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const resultContainer = document.getElementById('countryResult');
  resultContainer.innerHTML = ''; // Clear previous results

  const filteredCountries = allCountries.filter(country =>
    country.name.toLowerCase().includes(searchInput)
  );

  if (filteredCountries.length === 0) {
    resultContainer.innerHTML = '<p>No countries found</p>';
    return;
  }

  filteredCountries.forEach(country => displayCountryInfo(country, resultContainer));
};

fetch(API_URL)
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  })
  .then(data => {
    allCountries = data.data.sort((a, b) => a.name.localeCompare(b.name));
    // Initially display all countries
    const resultContainer = document.getElementById('countryResult');
    allCountries.forEach(country => displayCountryInfo(country, resultContainer));
  })
  .catch(error => console.error('Error fetching country data:', error));
