const appService = require('./app.service');
const url = appService.global.url;

describe('html', () => {
    describe('packages', () => {

        // Should be an array of package objects.
        it('should be an array', async () => {
            appService.cheerioInit(url).then(async ($) => {
                // Wait for packages and map results to array
                await appService.mapDataToArray($).then((packages) => {
                    expect(Array.isArray(packages)).toBe(true);
                });
            });
        });

        // Expecting 6 packages from page scrape.
        it('should get 6 packages', async () => {
            appService.cheerioInit(url).then(async ($) => {
                // Wait for packages and map results to array
                await appService.mapDataToArray($).then((packages) => {
                    expect(packages).toHaveLength(6);
                });
            });
        });

        // Make sure package sorting is working correctly.
        it('most expensive to be first', async () => {
            const mockPackages = [
                {
                    'optionTitle': 'Test 1',
                    'description': 'Test 1',
                    'price': '£175.00',
                    'priceAsFloat': '175.00',
                    'discount': ''
                },
                {
                    'optionTitle': 'Test 2',
                    'description': 'Test 2',
                    'price': '£178.00',
                    'priceAsFloat': '178.00',
                    'discount': ''
                }
            ];
            appService.cheerioInit(url).then(async ($) => {
                await appService.sortPackagesByPrice(mockPackages).then(() => {
                    expect(mockPackages[0].price).toBe('£178.00');
                });
            });
        });

        // Each package should have correct properties. 
        it('should have correct properties', async () => {
            appService.cheerioInit(url).then(async ($) => {
                // Wait for packages and map results to array
                await appService.mapDataToArray($).then((packages) => {
                    packages.forEach((pkg) => {
                        expect(pkg).toHaveProperty('optionTitle');
                        expect(pkg).toHaveProperty('description');
                        expect(pkg).toHaveProperty('price');
                        expect(pkg).toHaveProperty('discount');
                    });
                });
            });
        });
    });
});

