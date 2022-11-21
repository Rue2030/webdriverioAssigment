const SignupPage = require('../pageobjects/signup.page');
const signupdata = require("../Data/signupdata");
const { faker } = require('@faker-js/faker');



describe('Website sign up page', () => {
    beforeEach(() =>{

        SignupPage.open();
        const clickAble = $('[href="https://magento.softwaretestingboard.com/customer/account/create/"]');
        clickAble.isClickable();
        clickAble.click();

    });

    for(const record of signupdata){
        it(`Should attempt to signup ${record.firstname} without required fields`, async () => {

            //Use data from signup data to populate the signup page
            await SignupPage.signup(record.firstname, record.lastname, record.invalidemail, record.password, record.confirmpassword);

            //asserting that the correct message is displayed
            await expect($('#email_address-error')).toHaveTextContaining(record.emailerror);  
        });
    }

    for(const record of signupdata){
        it(`Should attempt to signup ${record.firstname} with invalid email`, async () => {

            //Use data from signup data to populate the signup page
            await SignupPage.signup(record.firstname, record.lastname, record.invalidemail, record.password, record.confirmpassword);

            //asserting that the correct message is displayed
            await expect($('#email_address-error')).toHaveTextContaining(record.emailerror);  
        });
    }

    for(const record of signupdata){
        it(`Should attempt to signup ${record.firstname} with invalid password`, async () => {

            //Use data from signup data to populate the signup page
            await SignupPage.signup(record.firstname, record.lastname, faker.internet.email(record.firstname, record.lastname, 'work.com'), record.invalidpassword, record.invalidpassword);

            //asserting that the correct message is displayed
            await expect($('#password-error')).toHaveTextContaining(record.passworderror);  
        });
    }

    for(const record of signupdata){
        it(`Should attempt to signup ${record.firstname} with valid information`, async () => {

            

            //Use data from signup data to populate the signup page
            await SignupPage.signup(record.firstname, record.lastname, faker.internet.email(record.firstname, record.lastname, 'work.com'), record.password, record.confirmpassword);

            //asserting that the correct message is displayed
            await expect($('.message-success')).toHaveTextContaining(record.successmessage); 

            //click the dropdown option containing log out and signing out the user
            await $('[data-action="customer-menu-toggle"]').click();
            await $('.authorization-link>a').click();
            
        });
    }

    for(const record of signupdata){
        it(`Should attempt to signup ${record.firstname} with duplicate emails`, async () => {

            const userEmail = faker.internet.email(record.firstname, record.lastname, 'work.com');

            //Use data from signup data to populate the signup page
            await SignupPage.signup(record.firstname, record.lastname, userEmail, record.password, record.confirmpassword);

            //click the dropdown option containing log out and signing out the user
            await $('[data-action="customer-menu-toggle"]').click();
            await $('.authorization-link>a').click();

            //sign out user
            const clickAble = $('[href="https://magento.softwaretestingboard.com/customer/account/create/"]');
            clickAble.click();

            //Use data from signup data to populate the signup page
            await SignupPage.signup(record.firstname, record.lastname, userEmail, record.password, record.confirmpassword);

            //asserting that the correct message is displayed
            await expect($('.message-error')).toHaveTextContaining(record.errormessage);  
        });
    }
});

