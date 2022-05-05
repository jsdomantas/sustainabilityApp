describe('Example', () => {
    beforeAll(async () => {
        await device.launchApp({permissions: {location: 'always', notifications: 'YES'}});
    });

    beforeEach(async () => {
        await device.reloadReactNative();
    });

    // it('should be able to log in', async () => {
    //     await expect(element(by.text('Reduce food waste'))).toBeVisible();
    //     await element(by.id('loginBtn')).tap();
    //
    //     await element(by.id('usernameInput')).typeText('testing3@test.com');
    //     await element(by.id('passwordInput')).typeText('qqqqqq');
    //
    //     await element(by.id('submitBtn')).tap();
    //     await element(by.id('submitBtn')).tap();
    // });
    it('should be able to sign up as a customer', async () => {
        await expect(element(by.text('Reduce food waste'))).toBeVisible();
        await element(by.id('signupBtn')).tap();

        await element(by.id('emailInput')).typeText('automation1@test.com');
        await element(by.id('passwordInput')).typeText('qqqqqq');
        await element(by.id('confirmPasswordInput')).typeText('qqqqqq');

        await element(by.id('submitBtn')).tap();
        await element(by.id('submitBtn')).tap();
    });
});
