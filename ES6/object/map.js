//object map

const allCountries = [
    {
        name: 'Afghanistan',
        currency: 'Afghan afghani',
        flag: 'https://restcountries.com/data/afg.svg',
        unicodeFlag: 'U+1F1E6 U+1F1EB',
        dialCode: '+93'
    },
    {
        name: 'Albania',
        currency: 'Albanian lek',
        flag: 'https://restcountries.com/data/alb.svg',
        unicodeFlag: 'U+1F1E6 U+1F1F1',
        dialCode: '+355'
    },
    {
        name: 'Algeria',
        currency: 'Algerian dinar',
        flag: 'https://restcountries.com/data/dza.svg',
        unicodeFlag: 'U+1F1E9 U+1F1FF',
        dialCode: '+213'
    },
    {
        name: 'Andorra',
        currency: 'Euro',
        flag: 'https://restcountries.com/data/and.svg',
        unicodeFlag: 'U+1F1E6 U+1F1E9',
        dialCode: '+376'
    },
    {
        name: 'Angola',
        currency: 'Angolan kwanza',
        flag: 'https://restcountries.com/data/ago.svg',
        unicodeFlag: 'U+1F1E6 U+1F1F4',
        dialCode: '+244'
    },
    {
        name: 'Anguilla',
        currency: 'East Caribbean dollar',
        flag: 'https://restcountries.com/data/aia.svg',
        unicodeFlag: 'U+1F1E6 U+1F1EE',
        dialCode: '+1264'
    },
    {
        name: 'Antigua and Barbuda',
        currency: 'East Caribbean dollar',
        flag: 'https://restcountries.com/data/atg.svg',
        unicodeFlag: 'U+1F1E6 U+1F1EC',
        dialCode: '+1268'
    },
    {
        name: 'Argentina',
        currency: 'Argentine peso',
        flag: 'https://restcountries.com/data/arg.svg',
        unicodeFlag: 'U+1F1E6 U+1F1F7',
        dialCode: '+54'
    }
];


const name = allCountries.map((country) => country.name);

// console.log(name);

allCountries.forEach((country) => {
    // console.log(country);
});

const products = [
    {
        name: 'laptop',
        price: 1000,
        count: 5
    },
    {
        name: 'desktop',
        price: 1500,
        count: 2
    },
    {
        name: 'phone',
        price: 500,
        count: 10
    },
    {
        name: 'tablet',
        price: 800,
        count: 7
    },
    {
        name: 'watch',
        price: 200,
        count: 15
    },
    {
        name: 'headphone',
        price: 50,
        count: 20
    },
    {
        name: 'keyboard',
        price: 20,
        count: 50
    },
    {
        name: 'mouse',
        price: 10,
        count: 100
    },
    {
        name: 'mouse',
        price: 10,
        count: 100
    },
    {
        name: 'mouse',
        price: 10,
        count: 100
    },
    {
        name: 'mouse',
        price: 10,
        count: 100
    }
];

const totalPrice = products.map((product) => product.price * product.count);
// console.log(totalPrice);

const productname = products.filter((product) => product.name === 'mouse');
console.log(productname);