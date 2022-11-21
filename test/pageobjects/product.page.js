

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ProductPage extends Page {
    /**
     * define selectors using getter methods
     */
    get SizeSmall () {
        return $('[option-label="S"]');
    }

    get ColorBlue () {
        return $('#option-label-color-93-item-50');
    }

    get ErrorMessage1 () {
        return $('[for="super_attribute[143]"]');
    }

    get ErrorMessage2 () {
        return $('[for="super_attribute[93]"]');
    }

    get QtyError () {
        return $('#qty-error');
    }

    get PageTitle () {
        return $('.page-title>span');
    }

    get SucessMessage () {
        return $('[data-ui-id="message-success"]');
    }

    get NoticeMessage () {
        return $('[data-ui-id="message-notice"]');
    }

    get InputQty () {
        return $('#qty');
    }

    get btnSubmit () {
        return $('[title="Add to Cart"]');
    }


    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('olivia-1-4-zip-light-jacket.html#');
    }
}

module.exports = new ProductPage();



