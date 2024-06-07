// Required code modules
const Monster = require("./p5-monster.js");

/*** Game Class ***/
/* Constructor expects an object */
// IMPORTANT: When declaring a class within a module,
// the class is the ONLY export!
module.exports = class MonsterGame {
  constructor({
    monsterList = [],
    gameDelayInMilliseconds = 5000,
    minimumLifeDrain = 1,
    maximumLifeDrain = 30,
  }) {
    console.log("Initializing monsters...");
    this.gameDelayInMilliseconds = gameDelayInMilliseconds;
    this.minimumLifeDrain = minimumLifeDrain;
    this.maximumLifeDrain = maximumLifeDrain;
    this.createMonsters(monsterList);
    console.log("Monsters initialized, ready to play!");
  }

  // List monsters
  listMonsters = () => {
    this.monsters.forEach((monster) => {
      const { monsterName, minimumLife, currentLife, isAlive } = monster;
      console.log(`Monster: ${monsterName}, Minimum Life: ${minimumLife}, Current Life: ${currentLife}, Is Alive: ${isAlive}`);
    });
  };

  // Create monsters from monster information
  createMonsters = (monsterList = []) => {
    this.monsters = monsterList.map((monster) => new Monster(monster));
  };

  // Main game playing method, will exit when all monsters have died
  async playGame() {
    console.log("Starting game...");
    let monstersAreAlive = true;
    do {
      // Sleep game
      console.log(`Sleeping for ${this.gameDelayInMilliseconds} milliseconds...`);
      await sleep(this.gameDelayInMilliseconds);

      // Call each monster's random life drain method
      this.monsters.forEach((monster) => {
        if (monster.isAlive) {
          monster.randomLifeDrain(this.minimumLifeDrain, this.maximumLifeDrain);
        }
      });

      // List monsters
      this.listMonsters();

      // Check if any monsters are alive and set Boolean
      monstersAreAlive = this.monsters.filter((monster) => monster.isAlive).length > 0;

      // See if any monsters are still alive
      if (!monstersAreAlive) {
        console.log('All monsters have died, game over!');
      }
    } while (monstersAreAlive);
  }
};

// Utility Functions
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}