export class ListIngredient {
  public _id: string;
  public email: string;
  public name: string;
  public amount: number;

  constructor(_id: string, email: string, name: string, amount: number) {
    this._id = _id;
    this.email = email;
    this.name = name;
    this.amount = amount;
  }
}
