

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SignupPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputFirstname () {
        return $('#firstname');
    }

    get inputLastname () {
        return $('#lastname');
    }

    get inputEmail () {
        return $('#email_address');
    }

    get inputPassword () {
        return $('[title="Password"]');
    }

    get inputConfirmPassword () {
        return $('#password-confirmation');
    }

    get btnSubmit () {
        return $('[title="Create an Account"]');
    }

    get inputSigninEmail () {
        return $('#email');
    }

    get btnSignin () {
        return $('[class="action login primary"]');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async signup (firstname, lastname, email, password, confirmPassword) {
        await this.inputFirstname.setValue(firstname);
        await this.inputLastname.setValue(lastname);
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.inputConfirmPassword.setValue(confirmPassword);
        await this.btnSubmit.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('');
    }
}

module.exports = new SignupPage();
