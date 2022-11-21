

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class PurchasePage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputCompany () {
        return $('[name="company"]');
    }

    get inputAddress0 () {
        return $('[name="street[0]"]');
    }

    get inputAddress1 () {
        return $('[name="street[1]"]');
    }

    get inputAddress2 () {
        return $('[name="street[2]"]');
    }

    get inputCity () {
        return $('[name="city"]');
    }

    get SelectProvince() {
        return $('[name="region_id"]');
    }

    get InputPostcode () {
        return $('[name="postcode"]');
    }

    get InputNumber () {
        return $('[name="telephone"]');
    }

    get RequireMessage () {
        return $('.field-error');
    }

    get RadioBtn () {
        return $('[name="ko_unique_1"]');
    }

    get btnSubmit () {
        return $('[title="Place Order"] ');
    }

    get AlertMessage () {
        return $('[role="alert"]');
    }

    get emptyCart () {
        return $('.cart-empty');
    }

    get btnNext () {
        return $('[data-role="opc-continue"]');
    }

    get inputEmail () {
        return $('[class="field required"] #customer-email');
    }

    get inputFirstname () {
        return $('[name="firstname"]');
    }

    get inputLastname () {
        return $('[name="lastname"]');
    }

    get billingDetails () {
        return $('.billing-address-details');
    }

     get congrats () {
        return $('.base');
    }

    get createAccount () {
        return $('[class="action primary"]');
    }


    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async shipping (email, firstname, lastname, company, address0, address1, address2, city, postcode, number) {
        await this.inputEmail.setValue(email);
        await this.inputFirstname.setValue(firstname);
        await this.inputLastname.setValue(lastname);
        await this.inputCompany.setValue(company);
        await this.inputAddress0.setValue(address0);
        await this.inputAddress1.setValue(address1);
        await this.inputAddress2.setValue(address2);
        await this.inputCity.setValue(city);
        await this.SelectProvince.selectByAttribute('data-title', 'Alabama');
        await this.InputPostcode.setValue(postcode);
        await this.InputNumber.setValue(number);
        await this.RadioBtn.click();
        await this.btnNext.click();
    }

    async payment () {
        await this.btnSubmit.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('checkout/#shipping');
    }
}

module.exports = new PurchasePage();

