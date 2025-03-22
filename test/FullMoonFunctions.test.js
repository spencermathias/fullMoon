const assert = require('assert');
const { getRandomSet } = require('../FullMoonFunctions');
const { getBeginnerSet } = require('../FullMoonFunctions');
const { validateSelectedCards } = require('../FullMoonFunctions');

describe('Full Moon Functions', () => {
    describe('getRandomSet', () => {
        it('should return 7 cards with at least 1 werewolf and 1 villager for getRandomSet(3)', () => {
            value = getRandomSet(3);
            console.log(value);
            assert.equal(Object.values(value).reduce((total, role) => total + role.length, 0), 7, 'Expected total cards to be 7');
            assert.equal(value.werewolves.length, 1, 'Expected 1 werewolf');
            assert.ok(['werewolf', 'lone Wolf', 'big bad wolf'].some(role => value.werewolves.includes(role)), 'Expected werewolf roles to include at least one valid role');
            assert.equal(value.villagers.length, 2, 'Expected 2 villagers');
            assert.ok(['villager', 'cursed'].some(role => value.villagers.includes(role)), 'Expected villager roles to include at least one valid role');
        });
        it('should return 10 cards with at least 1 werewolf and 1 villager for getRandomSet(4)', () => {
            value = getRandomSet(4);
            console.log(value);
            assert.equal(Object.values(value).reduce((total, role) => total + role.length, 0), 10, 'Expected total cards to be 10');
            assert.equal(value.werewolves.length, 1, 'Expected 1 werewolf');
            assert.ok(['werewolf', 'lone Wolf', 'big bad wolf'].some(role => value.werewolves.includes(role)), 'Expected werewolf roles to include at least one valid role');
            assert.equal(value.villagers.length, 2, 'Expected 2 villagers');
            assert.ok(['villager', 'cursed'].some(role => value.villagers.includes(role)), 'Expected villager roles to include at least one valid role');
        });
        it('should return 13 cards with at least 1 werewolf and 1 villager for getRandomSet(5)', () => {
            value = getRandomSet(5);
            console.log(value);
            assert.equal(Object.values(value).reduce((total, role) => total + role.length, 0), 13, 'Expected total cards to be 13');
            assert.equal(value.werewolves.length, 1, 'Expected 1 werewolf');
            assert.ok(['werewolf', 'lone Wolf', 'big bad wolf'].some(role => value.werewolves.includes(role)), 'Expected werewolf roles to include at least one valid role');
            assert.equal(value.villagers.length, 2, 'Expected 2 villagers');
            assert.ok(['villager', 'cursed'].some(role => value.villagers.includes(role)), 'Expected villager roles to include at least one valid role');
        });
        it('should return 15 cards with at least 1 werewolf and 1 villager for getRandomSet(6)', () => {
            value = getRandomSet(6);
            console.log(value);
            assert.equal(Object.values(value).reduce((total, role) => total + role.length, 0), 15, 'Expected total cards to be 15');
            assert.equal(value.werewolves.length, 2, 'Expected 2 werewolves');
            assert.ok(['werewolf', 'lone Wolf', 'big bad wolf'].some(role => value.werewolves.includes(role)), 'Expected werewolf roles to include at least one valid role');
            assert.equal(value.villagers.length, 3, 'Expected 3 villagers');
            assert.ok(['villager', 'cursed'].some(role => value.villagers.includes(role)), 'Expected villager roles to include at least one valid role');
        });
        it('should return 17 cards with at least 1 werewolf and 1 villager for getRandomSet(7)', () => {
            value = getRandomSet(7);
            console.log(value);
            assert.equal(Object.values(value).reduce((total, role) => total + role.length, 0), 17, 'Expected total cards to be 17');
            assert.equal(value.werewolves.length, 2, 'Expected 2 werewolves');
            assert.ok(['werewolf', 'lone Wolf', 'big bad wolf'].some(role => value.werewolves.includes(role)), 'Expected werewolf roles to include at least one valid role');
            assert.equal(value.villagers.length, 3, 'Expected 3 villagers');
            assert.ok(['villager', 'cursed'].some(role => value.villagers.includes(role)), 'Expected villager roles to include at least one valid role');
        });
        it('should return 19 cards with at least 1 werewolf and 1 villager for getRandomSet(8)', () => {
            value = getRandomSet(8);
            console.log(value);
            assert.equal(Object.values(value).reduce((total, role) => total + role.length, 0), 19, 'Expected total cards to be 19');
            assert.equal(value.werewolves.length, 3, 'Expected 3 werewolves');
            assert.ok(['werewolf', 'lone Wolf', 'big bad wolf'].some(role => value.werewolves.includes(role)), 'Expected werewolf roles to include at least one valid role');
            assert.equal(value.villagers.length, 3, 'Expected 3 villagers');
            assert.ok(['villager', 'cursed'].some(role => value.villagers.includes(role)), 'Expected villager roles to include at least one valid role');
        });
        it('should return 21 cards with at least 1 werewolf and 1 villager for getRandomSet(9)', () => {
            value = getRandomSet(9);
            console.log(value);
            assert.equal(Object.values(value).reduce((total, role) => total + role.length, 0), 21, 'Expected total cards to be 21');
            assert.equal(value.werewolves.length, 3, 'Expected 3 werewolves');
            assert.ok(['werewolf', 'lone Wolf', 'big bad wolf'].some(role => value.werewolves.includes(role)), 'Expected werewolf roles to include at least one valid role');
            assert.equal(value.villagers.length, 4, 'Expected 4 villagers');
            assert.ok(['villager', 'cursed'].some(role => value.villagers.includes(role)), 'Expected villager roles to include at least one valid role');
        });
        it('should return 23 cards with at least 1 werewolf and 1 villager for getRandomSet(10)', () => {
            value = getRandomSet(10);
            console.log(value);
            assert.equal(Object.values(value).reduce((total, role) => total + role.length, 0), 23, 'Expected total cards to be 23');
            assert.equal(value.werewolves.length, 3, 'Expected 3 werewolves');
            assert.ok(['werewolf', 'lone Wolf', 'big bad wolf'].some(role => value.werewolves.includes(role)), 'Expected werewolf roles to include at least one valid role');
            assert.equal(value.villagers.length, 4, 'Expected 4 villagers');
            assert.ok(['villager', 'cursed'].some(role => value.villagers.includes(role)), 'Expected villager roles to include at least one valid role');
        });
        it('should throw an error for getRandomSet(2)', () => {
            assert.throws(() => getRandomSet(2), Error, 'Expected an error for 2 players');
        });
        it('should throw an error for getRandomSet(11)', () => {
            assert.throws(() => getRandomSet(11), Error, 'Expected an error for 11 players');
        });
        it('should throw an error for getRandomSet(0)', () => {
            assert.throws(() => getRandomSet(0), Error, 'Expected an error for 0 players');
        });
        it('should throw an error for getRandomSet(-1)', () => {
            assert.throws(() => getRandomSet(-1), Error, 'Expected an error for negative players');
        });
        it('should throw an error for getRandomSet()', () => {
            assert.throws(() => getRandomSet(), Error, 'Expected an error for missing argument');
        });
    });
    describe('getBeginnerSet', () => {
        it('should return the correct beginner set for getBeginnerSet(4)', () => {
            const beginnerSet = getBeginnerSet(4);
            console.log(beginnerSet);
            assert.equal(beginnerSet.length, 10, 'Expected beginner set to have 10 cards');
            assert.ok(['werewolf', 'minion', 'villager', 'cursed', 'doppelganger','prince', 'mason', 'tanner','drunk', 'lycan'].every(role => beginnerSet.includes(role)), 'Expected beginner set to include all required roles');
        });
        it('should return the correct beginner set for getBeginnerSet(3)', () => {
            const beginnerSet = getBeginnerSet(3);
            console.log(beginnerSet);
            assert.equal(beginnerSet.length, 7, 'Expected beginner set to have 7 cards');
            assert.ok(['werewolf', 'villager', 'cursed', 'doppelganger','tanner', 'mason', 'lycan'].every(role => beginnerSet.includes(role)), 'Expected beginner set to include all required roles');
        });
        it('should return the correct beginner set for getBeginnerSet(5)', () => {
            console.log(getBeginnerSet(10));
            const beginnerSet = getBeginnerSet(5);
            console.log(beginnerSet);
            assert.equal(beginnerSet.length, 13, 'Expected beginner set to have 13 cards');
            assert.ok(['werewolf', 'minion', 'villager', 'cursed', 'doppelganger','prince', 'mason', 'tanner','drunk', 'lycan'].every(role => beginnerSet.includes(role)), 'Expected beginner set to include all required roles');
        });
    });
    describe('validateSelectedCards', () => {
        it('should return true for validateSelectedCards(getRandomSet(3), 3)', () => {
            let randomSet = getRandomSet(3);
            let flattenedSet = Object.values(randomSet).flat();
            let value = validateSelectedCards(flattenedSet, 3);
            console.log(value);
            assert.ok(value, 'Expected validation to pass for 3 players');
        });
        it('should return true for validateSelectedCards(getRandomSet(10), 10)', () => {
            let randomSet = getRandomSet(10);
            let flattenedSet = Object.values(randomSet).flat();
            let value = validateSelectedCards(flattenedSet, 10);
            console.log(value);
            assert.ok(value, 'Expected validation to pass for 10 players');
        });
        it('should return false for validateSelectedCards(getBeginnerSet(10), 10)', () => {
            let value = validateSelectedCards(getBeginnerSet(10), 10);
            console.log(value);
            assert.ok(!value, 'Expected validation to fail for beginner set with 10 players');
        });
    });
});
