const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(page.phoneNumberModal);
        await expect(phoneNumberModal).toBeExisting();
    })

    it('should fill in the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })

    it('should set the address', async () => {
        await browser.url('/')
        await page.fillAddresses('East 2nd Street,601', '1300 1st St');
    })

    it('should select the supportive plan', async () => {
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportiveButton = await $(page.supportiveButton);
        await supportiveButton.waitForDisplayed();
        await supportiveButton.click();
        await expect(supportiveButton).toBeExisting()

    } )

    it('should add a credit card', async () => {
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.pickPaymentMethod()
        const cardNumber = helper.getCardNumber();
        const cardCode = helper.getCardCode();
        await page.fillCardFields(cardNumber, cardCode)
        const closePaymentOptions = await $(page.closePaymentPicker);
        await closePaymentOptions.waitForDisplayed()
        await closePaymentOptions.click();
        const addedCard = await $('div=Card')
        await  expect(addedCard).toBeExisting()
    })

    it('should write a message for the driver', async () => {
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const message = "Get here ASAP buddy"
        await page.writeDriverMessage(message)
        const messageField = await $(page.commentField)
        await expect(messageField).toHaveValue(message)
    })

    it('should order 2 ice cream cones', async () => {
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportiveButton = await $(page.supportiveButton);
        await supportiveButton.waitForDisplayed();
        await supportiveButton.click();
        await page.orderIceCreams(2);
    })

    it('should order a blanket and handkerchiefs', async () => {
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportiveButton = await $(page.supportiveButton);
        await supportiveButton.waitForDisplayed();
        await supportiveButton.click();
        await page.orderBlanketAndHandkerchiefs();
    })

    it('the car search modal should appear', async () => {
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportiveButton = await $(page.supportiveButton);
        await supportiveButton.waitForDisplayed();
        await supportiveButton.click();
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        const message = "Get here ASAP buddy"
        await page.writeDriverMessage(message)
        const order = await $('.smart-button-main=Order')
        await order.click()
        await browser.pause(8000)
    })
})
