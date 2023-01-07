export default class Client {
    constructor(name,type,phoneNumber,id){
         this.name = name;
         this.type = type
        this.dataNumbers = phoneNumber;
        this.id = id;
        
        this.saleAmount = 0;
        this.rating = 0;
        this.products = [];
    }
 
}

