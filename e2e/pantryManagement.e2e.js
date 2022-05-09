import {login} from "./utils";

describe('Offers', () => {
    beforeAll(async () => {
        await device.launchApp({permissions: {location: 'always', notifications: 'YES'}});
    });

    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it('should let the customer save a new pantry item (FR-15, FR-16)', async () => {
        await login('testing3@test.com');

        await element(by.text('Pantry')).tap();
        await element(by.id('floatingBtn')).tap();

        await element(by.text('Browse products')).tap();
        await element(by.text('Chicken')).tap();

        await element(by.text('Save')).tap();
    })
});