
const PurchasePage = require('../pageobjects/purchase.page');
const ProductPage = require('../pageobjects/product.page');
const shippingdata = require("../Data/shippingdata");
const { faker } = require('@faker-js/faker');

describe('Website sign up page empty cart', () => {

    for(const record of shippingdata){
        it(`Should attempt to checkout with an empty cart`, async () => {
    
            PurchasePage.open();
            
            //asserting that the correct message is displayed
            await expect(PurchasePage.emptyCart).toHaveTextContaining(record.emptycart);  
        });
    }
});

describe('Website sign up page', () => {
    beforeEach(() => {

        browser.url('https://magento.softwaretestingboard.com/olivia-1-4-zip-light-jacket.html');

    });


    for(const record of shippingdata){
    it(`Should attempt to enter shipping information without shipping method`, async () => {
        
         //Click the small size option
         await ProductPage.SizeSmall.click();

         //Click the blue color
         await ProductPage.ColorBlue.click();

         //Click the Add to Cart button
         await ProductPage.btnSubmit.click();

         //asserting that the correct message is displayed
         await expect(ProductPage.SucessMessage).toHaveTextContaining("You added Olivia 1/4 Zip Light Jacket to your shopping cart.");

        PurchasePage.open();

        //Click the next button
        await PurchasePage.btnNext.click(); 

        //asserting that the correct message is displayed
         await expect(PurchasePage.AlertMessage).toHaveTextContaining(record.alertmessage);  
    });
    }

    for(const record of shippingdata){
        it(`Should attempt to enter shipping information without required fields`, async () => {
    
            //Click the small size option
            await ProductPage.SizeSmall.click();
    
            //Click the blue color
            await ProductPage.ColorBlue.click();
    
            //Click the Add to Cart button
            await ProductPage.btnSubmit.click();
    
            //asserting that the correct message is displayed
            await expect(ProductPage.SucessMessage).toHaveTextContaining("You added Olivia 1/4 Zip Light Jacket to your shopping cart.");
    
            PurchasePage.open();

            await PurchasePage.RadioBtn.click();
    
            //Click the next button
            await PurchasePage.btnNext.click(); 
    
            //asserting that the correct message is displayed
             await expect(PurchasePage.RequireMessage).toHaveTextContaining(record.errormessage);  
        });
    }

    for(const record of shippingdata){
            it(`Should attempt to purchase a product `, async () => {
        
            //Click the small size option
            await ProductPage.SizeSmall.click();
        
            //Click the blue color
            await ProductPage.ColorBlue.click();
        
            //Click the Add to Cart button
            await ProductPage.btnSubmit.click();
        
            //asserting that the correct message is displayed
            await expect(ProductPage.SucessMessage).toHaveTextContaining("You added Olivia 1/4 Zip Light Jacket to your shopping cart.");
        
            PurchasePage.open();
    
            await PurchasePage.shipping(faker.internet.email(record.firstname, record.lastname, 'work.com'), record.firstname, record.lastname, record.company, record.address0, record.address1, record.address2, record.city, record.postcode, record.number);
                 
            await PurchasePage.payment();

            //asserting that the correct message is displayed
            await expect(PurchasePage.congrats).toHaveTextContaining(record.Congratulation); 

        });
    }
});

describe('View Order History', () => {
    for(const record of shippingdata) {
    it(`Should attempt to view order history `, async () => {

        browser.url('https://magento.softwaretestingboard.com/olivia-1-4-zip-light-jacket.html');
        
        //Click the small size option
        await ProductPage.SizeSmall.click();
    
        //Click the blue color
        await ProductPage.ColorBlue.click();
    
        //Click the Add to Cart button
        await ProductPage.btnSubmit.click();
    
        //asserting that the correct message is displayed
        await expect(ProductPage.SucessMessage).toHaveTextContaining("You added Olivia 1/4 Zip Light Jacket to your shopping cart.");
    
        PurchasePage.open();

        await PurchasePage.shipping(faker.internet.email(record.firstname, record.lastname, 'work.com'), record.firstname, record.lastname, record.company, record.address0, record.address1, record.address2, record.city, record.postcode, record.number);
             
        await PurchasePage.payment();

        //asserting that the correct message is displayed
        await expect(PurchasePage.congrats).toHaveTextContaining(record.Congratulation); 

        await PurchasePage.createAccount.click();

        //enter password and click the create account button
        await $('[title="Password"]').setValue("Password#2");
        await $('#password-confirmation').setValue("Password#2");
        await $('[title="Create an Account"]').click();
        
        //click the order menu option
        await $('.nav [href="https://magento.softwaretestingboard.com/sales/order/history/"]').click();

        //click the view order link
        await $('.col [class="action view"]').click();

        //assert that the correct item name is on the order details
        await expect($('[data-th="Product Name"]')).toHaveTextContaining("Olivia 1/4 Zip Light Jacket");

    });
}

});