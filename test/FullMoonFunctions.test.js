const assert = require('assert');
const { getRandomSet } = require('../FullMoonFunctions');
const { getBeginnerSet } = require('../FullMoonFunctions');

describe('Full Moon Functions', () => {
    describe('getRandomSet', () => {
        it('should return 7 cards with at least 1 werewolf and 1 villager for getRandomSet(3)', () => {
            value = getRandomSet(3);
            console.log(value);
            assert.equal(value.length, 7);
            assert.ok(['werewolf', 'lone Wolf', 'big bad wolf'].some(role => value.includes(role)));
            assert.ok(['villager', 'cursed'].some(role => value.includes(role)));
        });
        it('should return 10 cards with at least 1 werewolf and 1 villager for getRandomSet(4)', () => {
            value = getRandomSet(4);
            console.log(value);
            assert.equal(value.length, 10);
            assert.ok(['werewolf', 'lone Wolf', 'big bad wolf'].some(role => value.includes(role)));
            assert.ok(['villager', 'cursed'].some(role => value.includes(role)));
        });
        it('should return 13 cards with at least 1 werewolf and 1 villager for getRandomSet(5)', () => {
            value = getRandomSet(5);
            console.log(value);
            assert.equal(value.length, 13);
            assert.ok(['werewolf', 'lone Wolf', 'big bad wolf'].some(role => value.includes(role)));
            assert.ok(['villager', 'cursed'].some(role => value.includes(role)));
        });
        it('should return 15 cards with at least 1 werewolf and 1 villager for getRandomSet(6)', () => {
            value = getRandomSet(6);
            console.log(value);
            assert.equal(value.length, 15);
            assert.ok(['werewolf', 'lone Wolf', 'big bad wolf'].some(role => value.includes(role)));
            assert.ok(['villager', 'cursed'].some(role => value.includes(role)));
        });
        it('should return 17 cards with at least 1 werewolf and 1 villager for getRandomSet(7)', () => {
            value = getRandomSet(7);
            console.log(value);
            assert.equal(value.length, 17);
            assert.ok(['werewolf', 'lone Wolf', 'big bad wolf'].some(role => value.includes(role)));
            assert.ok(['villager', 'cursed'].some(role => value.includes(role)));
        });
        it('should return 19 cards with at least 1 werewolf and 1 villager for getRandomSet(8)', () => {
            value = getRandomSet(8);
            console.log(value);
            assert.equal(value.length, 19);
            assert.ok(['werewolf', 'lone Wolf', 'big bad wolf'].some(role => value.includes(role)));
            assert.ok(['villager', 'cursed'].some(role => value.includes(role)));
        });
        it('should return 21 cards with at least 1 werewolf and 1 villager for getRandomSet(9)', () => {
            value = getRandomSet(9);
            console.log(value);
            assert.equal(value.length, 21);
            assert.ok(['werewolf', 'lone Wolf', 'big bad wolf'].some(role => value.includes(role)));
            assert.ok(['villager', 'cursed'].some(role => value.includes(role)));
        });
        it('should return 23 cards with at least 1 werewolf and 1 villager for getRandomSet(10)', () => {
            value = getRandomSet(10);
            console.log(value);
            assert.equal(value.length, 23);
            assert.ok(['werewolf', 'lone Wolf', 'big bad wolf'].some(role => value.includes(role)));
            assert.ok(['villager', 'cursed'].some(role => value.includes(role)));
        });
        it('should throw an error for getRandomSet(2)', () => {
            assert.throws(() => getRandomSet(2), Error);
        });
        it('should throw an error for getRandomSet(11)', () => {
            assert.throws(() => getRandomSet(11), Error);
        });
        it('should throw an error for getRandomSet(0)', () => {
            assert.throws(() => getRandomSet(0), Error);
        });
        it('should throw an error for getRandomSet(-1)', () => {
            assert.throws(() => getRandomSet(-1), Error);
        });
        it('should throw an error for getRandomSet()', () => {
            assert.throws(() => getRandomSet(), Error);
        });
    });
    describe('getBeginnerSet', () => {
        it('should return the correct beginner set for getBeginnerSet(4)', () => {
            const beginnerSet = getBeginnerSet(4);
            console.log(beginnerSet);
            assert.equal(beginnerSet.length, 10); // Assuming the beginner set for 4 players has 10 cards
            assert.ok(['werewolf', 'minion', 'villager', 'cursed', 'doppelganger','prince', 'mason', 'tanner','drunk', 'lycan'].every(role => beginnerSet.includes(role)));
        });
        it('should return the correct beginner set for getBeginnerSet(3)', () => {
            const beginnerSet = getBeginnerSet(3);
            console.log(beginnerSet);
            assert.equal(beginnerSet.length, 7); // Assuming the beginner set for 3 players has 7 cards
            assert.ok(['werewolf', 'villager', 'cursed', 'doppelganger','tanner', 'mason', 'lycan'].every(role => beginnerSet.includes(role)));
        });
        it('should return the correct beginner set for getBeginnerSet(5)', () => {
            console.log(getBeginnerSet(10));
            const beginnerSet = getBeginnerSet(5);
            console.log(beginnerSet);
            assert.equal(beginnerSet.length, 13); // Assuming the beginner set for 5 players has 13 cards
            assert.ok(['werewolf', 'minion', 'villager', 'cursed', 'doppelganger','prince', 'mason', 'tanner','drunk', 'lycan'].every(role => beginnerSet.includes(role)));
        });
    });
});
