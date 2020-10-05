const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

describe('absolute',()=>{
    it('Should return a positive number if input is positive',()=>{
        const result =lib.absolute(1);
        expect(result).toBe(1);
    });
    
    it("Should return negative number is the input is negative", ()=>{
        const result =lib.absolute(-1);
        expect(result).toBe(1);
    });
    
    it("Should return 0 if the input is 0",()=>{
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe('greet', () =>{
    it('Should  return greeting message' ,() =>{
        const result = lib.greet('Preeti');
        expect(result).toMatch(/Preeti/);
        expect(result).toContain('Preeti');
    });
});

describe('getCurrencies', () =>{
    it('Should  return defined currencies' ,() =>{
        const result = lib.getCurrencies();
      
        //Too general
        expect(result).toBeDefined();
        expect(result).not.toBeNull();

        //Too specific
        expect(result[0]).toBe('USD');
        expect(result[1]).toBe('AUD');
        expect(result[2]).toBe('EUR');
        expect(result.length).toBe(3);

        //Proper way
        expect(result).toContain('USD');
        expect(result).toContain('AUD');
        expect(result).toContain('EUR');

        //Ideal Way
        expect(result).toEqual(expect.arrayContaining(['USD','AUD','EUR']));

    });
});

describe('getProduct',() =>{
    it('Should return product with the given id as an input' ,() =>{
        const result = lib.getProduct(1);
        expect(result).toEqual({ id: 1, price: 10 });
        expect(result).toMatchObject({ id: 1, price: 10 });
        // expect(result).toHaveProperty( 'id' , '1');
    });
});

describe('registerUser',() =>{
    it('Should throw an error if the input is falsy' ,() =>{
        const args = [null, undefined, NaN, '',0, false];
        args.forEach(a=>{
            expect(() => {lib.registerUser(a)}).toThrow();
        });
    });
    it('Should return a user object if valid username is passed',()=>{
        const result = lib.registerUser('Preeti');
        expect(result).toMatchObject({  username: 'Preeti' });
        expect(result.id).toBeGreaterThan(0);
    });    
});

describe('applyDiscount',() =>{
    it('Should return 10% discount id the customer has more than 10 points',()=>{
        db.getCustomerSync=function(customerId){
            console.log('Fake reading customer...');
            return { id: customerId, points: 20};
        }

        const order = { customerId: 1, totalPrice: 10};
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9)
    });    
});

describe('notifyCustomer',() =>{
    it('Should send an email to the customer',()=>{
        db.getCustomerSync= jest.fn().mockReturnValue({email:'a'});
        // db.getCustomerSync=function(customerId){
        //     return { email:'a'};
        // }

        mail.send= jest.fn();
        
        lib.notifyCustomer({customerId: 1});
        expect(mail.send).toHaveBeenCalled();
    });    
});
