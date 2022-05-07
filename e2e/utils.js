export const login = async (email = 'automationbusiness3@test.com') => {
    await element(by.text('LOGIN')).tap();

    await element(by.id('usernameInput')).replaceText(email);
    await element(by.id('passwordInput')).replaceText('qqqqqq');

    await element(by.id('passwordInput')).tapReturnKey();
    await element(by.text('SIGN IN')).tap();
}