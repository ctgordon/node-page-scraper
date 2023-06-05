const appService = require('./app.service');

const url = appService.global.url;

console.log(`Welcome to the Wireless Logic page scraping app! Scraping HTML on ${url}.`);

appService.cheerioInit(url).then(async ($) => {
    // Wait for packages and map results to array
    await appService.mapDataToArray($).then((packages) => {

        // Sort the packages into ascending order using the 'priceAsFloat' property.
        appService.sortPackagesByPrice(packages);

        // Print results of array to console
        appService.printPackages(packages);
    });
});
