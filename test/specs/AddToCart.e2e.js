const ProductPage = require('../pageobjects/product.page');
//const signupdata = require("../Data/signupdata");


describe('Should be Able to add items to cart', () => {
    beforeEach(() =>{
       ProductPage.open();

       //ensure user is on the correct page
       expect($(ProductPage.PageTitle)).toHaveTextContaining("Olivia 1/4 Zip Light Jacket");
    });

    
        it(`Should attempt to add a product to cart without required fields`, async () => {

            const submit = await ProductPage.btnSubmit;

            //Click the Add to Cart button
            await submit.click();
             
            //asserting that the correct error message is displayed
            await expect(ProductPage.ErrorMessage1).toHaveTextContaining('This is a required field.');  

            //asserting that the correct error message is displayed
            await expect(ProductPage.ErrorMessage2).toHaveTextContaining('This is a required field.');
        });


        it(`Should attempt to Add product to cart with 0 quantity`, async () => {

            //Click the small size option
            await ProductPage.SizeSmall.click();

            //Click the blue color
            await ProductPage.ColorBlue.click();

            //Set quantity to 0
            await ProductPage.InputQty.setValue("0");

            //Click the Add to Cart button
            await ProductPage.btnSubmit.click();

            //asserting that the correct message is displayed
            await expect(ProductPage.QtyError).toHaveTextContaining("Please enter a quantity greater than 0.");
             
        });

    
        it(`Should attempt to Add product to cart with required fields`, async () => {

            //Click the small size option
            await ProductPage.SizeSmall.click();

            //Click the blue color
            await ProductPage.ColorBlue.click();

            //Click the Add to Cart button
            await ProductPage.btnSubmit.click();

            //asserting that the correct message is displayed
            await expect(ProductPage.SucessMessage).toHaveTextContaining("You added Olivia 1/4 Zip Light Jacket to your shopping cart.");
             
        });
});
        
describe('Should be Able to add items to cart from grid', () => {
        it(`Should attempt to Add product to cart from grid page`, async () => {

            await browser.url('https://magento.softwaretestingboard.com/women/tops-women/jackets-women.html');

            //Click the small size option
            await ProductPage.SizeSmall.click();

            //Click the blue color
            await ProductPage.ColorBlue.click();

            //Click the Add to Cart button
            await ProductPage.btnSubmit.click();

            //asserting that the correct message is displayed
            await expect(ProductPage.SucessMessage).toHaveTextContaining("You added Olivia 1/4 Zip Light Jacket to your shopping cart.");
             
        });

        it(`Should attempt to Add product to cart from grid page without required options`, async () => {

            await browser.url('https://magento.softwaretestingboard.com/women/tops-women/jackets-women.html');

            //Click the small size option
            await ProductPage.SizeSmall.click();

            //Click the Add to Cart button
            await ProductPage.btnSubmit.isClickable();
            await ProductPage.btnSubmit.click();

            //asserting that the correct message is displayed
            await expect(ProductPage.NoticeMessage).toHaveTextContaining("You need to choose options for your item.");
             
        });
});