const exercise1 = require('../exercise1');

describe('fizzBuzz' ,() =>{
    it('Should throw an error if the input given is not a number',() =>{
        const input = [null, undefined, ''];
        input.forEach(a=>{
            expect(() => {exercise1.fizzBuzz(a)}).toThrow();});
        });
    
    it('Should return FizzBuzz if the input is divisible by both 3 and 5',() =>{
        const result = exercise1.fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    });

    it('Should return Fizz if the input is divisible by 3' ,() =>{
        const result = exercise1.fizzBuzz(3);
        expect(result).toBe('Fizz');
    });

    it('Should return Buzz if the input is divisible by 5', () =>{
        const result = exercise1.fizzBuzz(5);
        expect(result).toBe('Buzz');
    })

    it('Should return the input, if not dvisible by 3 and 5', () =>{
        const result = exercise1.fizzBuzz(1);
        expect(result).toBe(1);
    })
        
});