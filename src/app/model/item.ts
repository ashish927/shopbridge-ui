import { Deserializable } from './deserializable';
export class Item implements Deserializable{
    public id: string;
    public name: string;
    public price: string;
    public description: string;
    

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
