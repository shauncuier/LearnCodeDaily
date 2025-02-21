// const age = 30;
// const name = 'John';
// let isDeveloper;

const bottle = {
    color: 'blue',
    material: 'glass',
    height: 9,
    isFull: true,
    weight: 700,
    price: 100,
    };
console.log(bottle);
console.log(bottle.color);
console.log(bottle.material);
console.log(bottle.height);
console.log(bottle.isFull);
console.log(bottle.weight);
console.log(bottle.price);
console.log(bottle['color']);
console.log(bottle['material']);
console.log(bottle['height']);
console.log(bottle['isFull']);
console.log(bottle['weight']);
console.log(bottle['price']);


bottle.color = 'green';
console.log(bottle['color'], bottle['material'], bottle['height'], bottle['isFull'], bottle['weight'], bottle['price']);


