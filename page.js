module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    commentField: '#comment',
    cardField: '#number.card-input',
    cvvField: '#code.card-input',
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    cardButton: '//div[starts-with(text(), "Add card")]',
    supportiveButton: '//div[starts-with(text(), "Supportive")]',
    closePaymentPicker: '.payment-picker .close-button',
    linkCard: 'button=Link',
    orderButton: 'button=order',
    addIceCreamButton: 'div.counter-plus',
    // Modals
    phoneNumberModal: '.modal',
    overlay: '.overlay',
    carSearchModal: '.order-header-title',
    // Functions
    waitForOverlayToDisappear: async function () {
        const overlay = await $(this.overlay);
        await overlay.waitForDisplayed({ reverse: true, timeout: 15000 });
      },

    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
    pickPaymentMethod: async function() {
        const payButton = await $('.pp-button.filled');
        await payButton.waitForDisplayed();
        await payButton.click();
        const addCard = await $(this.cardButton);
        await addCard.waitForDisplayed();
        await addCard.click()
        const cardNumberField = $(this.cardField);
        await cardNumberField.waitForDisplayed();
        await cardNumberField.click();
    },
    fillCardFields: async function(cardNumber, cardCode) {
        const cardNumberField = await $(this.cardField)
        await cardNumberField.setValue(cardNumber)
        const cardCodeField = await $(this.cvvField)
        await cardCodeField.setValue(cardCode)
        await browser.keys("Tab")
        const linkTheCard = await $(this.linkCard);
        await linkTheCard.waitForDisplayed();
        await linkTheCard.click()
    },
    writeDriverMessage: async function(message) {
        const messageField = await $(this.commentField);
        await messageField.waitForDisplayed();
        await messageField.setValue(message)
    },

    orderIceCreams: async function (quantity) {
        const counterValueElement = await $("div.counter-value");
        await counterValueElement.waitForDisplayed();
        const currentValueText = await counterValueElement.getText();
        const currentValue = parseInt(currentValueText, 10);
    
        if (isNaN(currentValue)) {
          throw new Error("Failed to retrieve current ice cream count.");
        }
    
        if (currentValue < quantity) {
          const incrementButton = await $("div.counter-plus");
          await incrementButton.waitForDisplayed();
    
          for (let i = currentValue; i < quantity; i++) {
            await incrementButton.click();
            await browser.pause(100);
          }
        }
    
        
        const finalValueText = await counterValueElement.getText();
        const finalValue = parseInt(finalValueText, 10);
        expect(finalValue).toBe(quantity);
      },

      orderBlanketAndHandkerchiefs: async function () {
        const blanketSwitchLabel = await $("div.r-sw-label=Blanket and handkerchiefs");
        const blanketSwitchInput = await $(".switch");
        await this.waitForOverlayToDisappear();
        await blanketSwitchInput.scrollIntoView();
        await blanketSwitchInput.waitForClickable({ timeout: 10000 });
    
        const isChecked = await blanketSwitchInput.isSelected();
        if (!isChecked) {
          await blanketSwitchInput.click();
        }
    },

    confirmCarSearchModal: async function () {
        const carSearchModal = await $(this.carSearchModal);
        await carSearchModal.waitForDisplayed({ timeout: 30000 });
      },
};