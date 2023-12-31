const { sequelize } = require("../db"); // Импорт объектов из модуля db
const { UserModel } = require("./user.model");

async function initializeUserTable() {
    try {
      await sequelize.sync();
      const [user, created] = await UserModel.findOrCreate({
        where: { email: 'manucher5160@gmail.com' },
        defaults: {
          username: 'manurakh',
          email: 'manucher5160@gmail.com',
          balance: 10000,
          },
      });
  
      if (created) {
        console.log('User created with an initial balance of 10000');
      } else {
        console.log(`User already exists with a balance of ${user.balance}`);
      }
    } catch (error) {
      console.error(`Database synchronization error: ${error.message}`);
    }
    finally {
        console.log("Users table was created successfully");
    }
}

async function updateBalance(userId, amount) {
    const user = await getUserInfo(userId);

    if (!user) {
    return { status: 404, error: 'User not found' };
    }

    if (user.balance - amount < 0) {
        throw new Error("Not enough balance");
    }

    const updatedUser = await user.update({ balance: user.balance - amount });

    return { ...updatedUser.dataValues };
}

async function getUserInfo (userId = "") {
    const result = await UserModel.findOne({ where: { id: userId } });
    if (!result) throw new Error(`User ${userId} does not exist`);

    return result;
}
  
  initializeUserTable(); //normally it should be a migration script, not a running while starting the server, but in the task definition we had to initialize it while starting the server

  module.exports = {
    updateBalance,
    getUserInfo,
  };
  