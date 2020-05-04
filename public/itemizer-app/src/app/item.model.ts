export class Item {
    _description:String = ''
    _price:Number = 0

    constructor(description: String = 'Description', price: Number = 1.0) {
        this._description = description
        this._price = price
    }
}
