const axios = require('axios');
const cheerio = require('cheerio');
const {Package} = require("./package");

const global = {
    url: `https://wltest.dns-systems.net/`,
}

const getHtml = async (url) => {
    const {data} = await axios.get(url);
    return data;
};

const cheerioInit = async (url) => {
    return cheerio.load(await getHtml(url));
};

const mapPackagesToJson = async ($) => {
    return $('div.package')
        .map((_, pkg) => {
            const $pkg = $(pkg);

            // Use Cheerio's selectors to find specific elements
            const optionTitle = $pkg.find('.header').find('h3').text();
            const description = $pkg.find('.package-description').text();
            const price = $pkg.find('.package-price').find('.price-big').text();
            const priceAsFloat = price.trim().replace('£', '');
            const discount = $pkg.find('.package-price').find('p').text();
            const thePackage = new Package;
            thePackage.optionTitle = optionTitle;
            thePackage.description = description;
            thePackage.price = price;
            thePackage.priceAsFloat = priceAsFloat;
            thePackage.discount = discount;
            return thePackage;
        })
        .toArray();
}

const sortPackagesByPrice = async (packages) => {
    packages = packages.sort((a, b) => parseFloat(b.priceAsFloat) - parseFloat(a.priceAsFloat));
    return packages;
};

const printPackages = async (packages) => {
    packages.forEach((pkg, index) => {
        console.log(`Package #${index + 1}`);
        console.log(`\t Title: ${pkg.optionTitle}`);
        console.log(`\t Description: ${pkg.description}`);
        console.log(`\t Price: ${pkg.price}`);
        console.log(`\t Discount: ${pkg.discount === '' ? 'N/A' : pkg.discount}`);
        console.log('\n');
    });
};

module.exports = {global, getHtml, mapDataToArray: mapPackagesToJson, sortPackagesByPrice, cheerioInit, printPackages};
