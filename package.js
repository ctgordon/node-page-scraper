class Package {
    _optionTitle;
    _description;
    _price;
    _priceAsFloat;
    _discount;


    get optionTitle() {
        return this._optionTitle;
    }

    set optionTitle(value) {
        this._optionTitle = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get priceAsFloat() {
        return this._priceAsFloat;
    }

    set priceAsFloat(value) {
        this._priceAsFloat = value;
    }

    get discount() {
        return this._discount;
    }

    set discount(value) {
        this._discount = value;
    }
}

exports.Package = Package;
