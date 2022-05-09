describe('Authentication', () => {
    beforeAll(async () => {
        await device.launchApp({permissions: {location: 'always', notifications: 'YES'}});
    });

    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it('should be able to log in', async () => {
        await expect(element(by.text('Reduce food waste'))).toBeVisible();
        await element(by.id('loginBtn')).tap();

        await element(by.id('usernameInput')).replaceText('testing3@test.com');
        await element(by.id('passwordInput')).replaceText('qqqqqq');

        await element(by.id('passwordInput')).tapReturnKey();
        await element(by.id('submitBtn')).tap();
    });
    it('should be able to sign up as a customer (FR-1, FR-8)', async () => {
        await expect(element(by.text('Reduce food waste'))).toBeVisible();
        await element(by.id('signupBtn')).tap();

        await element(by.id('emailInput')).typeText(`automation3@test.com`);
        await element(by.id('passwordInput')).replaceText('qqqqqq');
        await element(by.id('confirmPasswordInput')).replaceText('qqqqqq');

        await element(by.id('confirmPasswordInput')).tapReturnKey();
        await element(by.id('submitBtn')).tap();

        await expect(element(by.text('Create your profile'))).toBeVisible();
        await expect(element(by.text('Photo'))).toBeVisible();
        await expect(element(by.text('Full name'))).toBeVisible();
        await expect(element(by.text('Phone number'))).toBeVisible();
        await expect(element(by.text('Family card number (optional)'))).toBeVisible();

        await element(by.id('mainScrollView')).scrollTo('bottom');
        await element(by.id('saveBtn')).tap();

        await expect(element(by.text('Welcome'))).toBeVisible();
    });
    it('should be able to sign up as a business owner (FR-2, FR-3)', async () => {
        await expect(element(by.text('Reduce food waste'))).toBeVisible();
        await element(by.id('signupBtn')).tap();

        await element(by.id('emailInput')).typeText(`automationbusiness3@test.com`);
        await element(by.id('passwordInput')).replaceText('qqqqqq');
        await element(by.id('confirmPasswordInput')).replaceText('qqqqqq');

        await element(by.id('confirmPasswordInput')).tapReturnKey();
        await element(by.id('checkbox')).tap();

        await element(by.id('submitBtn')).tap();

        await expect(element(by.text('Business name'))).toBeVisible();
        await expect(element(by.text('Location'))).toBeVisible();
        await expect(element(by.text('Phone number'))).toBeVisible();
        await expect(element(by.text('Usual pick-up time'))).toBeVisible();

        await element(by.id('mainScrollView')).scrollTo('bottom');
        await element(by.id('saveBtn')).tap();

        await expect(element(by.text('Select possible leftover stock'))).toBeVisible();
        await element(by.id('selectProductsBtn')).tap();
        await element(by.text('Chicken')).tap();
        await element(by.text('Save')).tap();

        await element(by.id('saveBtn')).tap();
    });
});
