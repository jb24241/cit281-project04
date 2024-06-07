// Monster class
module.exports = class Monster {
    constructor({ monsterName = "Unknown", minimumLife = 0, currentLife = 100 }) {
      this.monsterName = monsterName;
      this.minimumLife = minimumLife;
      this.currentLife = currentLife;
      this.isAlive = this.currentLife >= this.minimumLife;
    }
  
    updateLife(lifeChangeAmount) {
      this.currentLife = Math.max(this.currentLife + lifeChangeAmount, 0);
      this.isAlive = this.currentLife >= this.minimumLife;
    }
  
    randomLifeDrain(minimumLifeDrain, maximumLifeDrain) {
      const lifeDrain = getRandomInteger(minimumLifeDrain, maximumLifeDrain + 1);
      this.updateLife(-lifeDrain);
      console.log(`${this.monsterName} drained ${lifeDrain} life points.`);
    }
  };
  
  // Utility function
  function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  