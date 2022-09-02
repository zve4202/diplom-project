const debug = require("debug")("server:db");
const chalk = require("chalk");
const bcrypt = require("bcryptjs");

const models = require("../models");
const rolesMock = require("./mockData/roles.json");
const usersMock = require("./mockData/users.json");
const { generateUserData } = require("../utils");
const { salt } = require("../config/config");

async function generate(data, model) {
    return Promise.all(
        data.map(async (item) => {
            try {
                const exists = await model.find({
                    name: item.name
                });

                if (exists.length !== 0) {
                    return exists[0];
                }
                const item_id = item._id;
                delete item._id;
                const newItem = new model(item);
                item._id = item_id;
                await newItem.save();
                return newItem;
            } catch (error) {
                return error;
            }
        })
    );
}

async function generateASIS(data, model) {
    return Promise.all(
        data.map(async (item) => {
            try {
                const exists = await model.find({
                    _id: item._id
                });

                if (exists.length !== 0) {
                    return exists[0];
                }
                const newItem = new model(item);
                await newItem.save();
                return newItem;
            } catch (error) {
                // console.log(error);
                return error;
            }
        })
    );
}

async function InitEntities(name, data, model, ASIS = false) {
    const result = ASIS
        ? await generateASIS(data, model)
        : await generate(data, model);

    if (result) {
        debug(`${name} in DB ${chalk.green("✓")}`);
    } else {
        debug(`${name} error ${chalk.red("x")}`);
    }

    return result;
}

module.exports = async () => {
    const settingExists = await models.Setting.find();
    if (settingExists.length === 0) {
        await models.Setting.create({ curs: 95, extra_charge: 10 });
        debug(`setting in DB ${chalk.green("✓")}`);
    }

    const usersExists = await models.User.find();
    if (usersExists.length !== usersMock.length) {
        const roles = await InitEntities("roles", rolesMock, models.role, true);

        models.User.collection.drop();
        const users = await Promise.all(
            usersMock.map(async (user) => {
                try {
                    user.password = await bcrypt.hash(user.password, salt);
                    delete user._id;
                    return await models.User.create({
                        ...user,
                        ...generateUserData()
                    });
                } catch (error) {
                    console.log(error);
                    return error;
                }
            })
        );
        if (users) {
            debug(`users in DB ${chalk.green("✓")}`);
        } else {
            debug(`users error ${chalk.red("x")}`);
        }
    }

    debug(`mock init is complete ${chalk.green("✓")}`);
};
