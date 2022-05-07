import { login } from "./utils";

describe('Offers', () => {
    beforeAll(async () => {
        await device.launchApp({permissions: {location: 'always', notifications: 'YES'}});
    });

    beforeEach(async () => {
        await device.reloadReactNative();
    });

    // it('should be able to create a new offer as a business owner (FR-4)', async () => {
    //     await login();
    //
    //     await element(by.text('Stock')).tap();
    //
    //     await element(by.text('Select products to give away')).tap();
    //     await element(by.text('Chicken')).tap();
    //     await element(by.text('Submit')).tap();
    //
    //     await element(by.id('descriptionInput')).replaceText('Test description by automation');
    //     await element(by.id('titleInput')).replaceText('Offer by automation');
    //     await element(by.id('titleInput')).tapReturnKey();
    //
    //     await element(by.text('Save')).tap();
    //     await expect(element(by.text('Leftover stock orders'))).toBeVisible();
    // })
    // it('should be able to view the reservations list and filter them (FR-5)', async () => {
    //     await login();
    //
    //     await element(by.text('Posted')).tap();
    //     await element(by.text('Reserved')).tap();
    //     await element(by.text('Taken')).tap();
    //     await element(by.text('All')).tap();
    // })
    // it('should be able to view the reservations details and mark it as taken (FR-6)', async () => {
    //     await login();
    //
    //     await element(by.text('Reserved')).tap();
    //     await element(by.id('order-0')).tap();
    //
    //     await expect(element(by.text('Description'))).toBeVisible();
    //     await expect(element(by.text('Pickup time'))).toBeVisible();
    //     await expect(element(by.text('Products'))).toBeVisible();
    //     await expect(element(by.text('Products'))).toBeVisible();
    //
    //     await element(by.text('Mark as taken')).tap();
    //     await expect(element(by.text('Leave a review'))).toBeVisible();
    // })
    // it('should be able to leave a review about the customer after the offer is taken (FR-7)', async () => {
    //     await login();
    //
    //     await element(by.text('Reserved')).tap();
    //     await element(by.id('order-0')).tap();
    //
    //     await element(by.text('Mark as taken')).tap();
    //
    //     await expect(element(by.text('Leave a review'))).toBeVisible();
    //     await element(by.text('Yes')).tap();
    //
    //     await element(by.id('feedbackInput')).replaceText('Review by automation');
    //     await element(by.id('star-3')).tap();
    //     await element(by.text('Rate your experience')).tap();
    //
    //     await element(by.text('Submit')).tap();
    // })
    // it('should be able to view available offers as a customer (FR-9)', async () => {
    //     await login('testing3@test.com');
    //
    //     await expect(element(by.text('Closest to you'))).toBeVisible();
    //     await expect(element(by.text('Categories'))).toBeVisible();
    //
    //     await element(by.text('See all')).atIndex(0).tap();
    // })
    // it('should be able to view the map as a customer (FR-10)', async () => {
    //     await login('testing3@test.com');
    //
    //     await element(by.text('Locations')).tap();
    // })
    // it('should be able to view offer details as a customer (FR-11)', async () => {
    //     await login('testing3@test.com');
    //
    //         await element(by.text('More')).tap();
    //         await element(by.text('Reservations history')).tap();
    //         await element(by.text('Offer by automation')).tap();
    //
    //         await expect(element(by.text('Description'))).toBeVisible();
    //         await expect(element(by.text('Company information'))).toBeVisible();
    //         await expect(element(by.text('Pickup time'))).toBeVisible();
    //         await expect(element(by.text('Products'))).toBeVisible();
    // })
    // it('should let the customer view the reservation history (FR-13)', async () => {
    //     await login('testing3@test.com');
    //
    //     await element(by.text('More')).tap();
    //     await element(by.text('Reservations history')).tap();
    //
    //     await expect(element(by.text('History'))).toBeVisible();
    //     await expect(element(by.text('Offer by automation'))).toBeVisible();
    // })
    // it('should let the customer leave a review about the business owner (FR-14)', async () => {
    //     await login('testing3@test.com');
    //
    //     await element(by.text('More')).tap();
    //     await element(by.text('Reservations history')).tap();
    //
    //     await element(by.id('moreActionsBtn')).tap();
    //     await element(by.text('Leave a review')).tap();
    //
    //     await element(by.id('feedbackInput')).replaceText('Review by automation customer');
    //     await element(by.id('star-4')).tap();
    //     await element(by.text('Rate your experience')).tap();
    //
    //     await element(by.text('Submit')).tap();
    // })
})
