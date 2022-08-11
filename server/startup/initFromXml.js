const debug = require("debug")("server:db");
const chalk = require("chalk");

const fs = require("fs");
const XmlStream = require("xml-stream");
const models = require("../models");
const { slugify } = require("../utils");

class Counter {
    constructor(xml) {
        this.x = 0;
        this.y = 0;
        this.xml = xml;
        this.step = 1000;
    }
    pause = () => {
        this.x++;
        if (this.x % this.step === 0) {
            debug("pause");
            this.xml.pause();
        }
    };
    resume = () => {
        this.y++;
        if (this.x === this.y) {
            debug("resume", this.x);

            try {
                this.xml.resume();
            } catch (error) {}
        }
    };
}

async function foundModel(_id, model) {
    try {
        const result = await model.findOne({ _id });
        return result !== null;
    } catch (error) {
        debug(error);
    }
    return false;
}

async function importEntity(item, model_name, counter, model) {
    const { id, alias } = item;
    delete item.id;
    const _id = Number(id);
    const newitem = { _id, alias, ...item };

    // log("model_name", model_name);
    if (model_name === "title") {
        newitem.image = newitem.image === "null" ? null : newitem.image;
        newitem.style = newitem.style === "null" ? null : newitem.style;
        newitem.origin = newitem.origin === "null" ? null : newitem.origin;
    }

    // log("newitem", newitem);
    try {
        if (id) {
            const exists = await foundModel(_id, model);
            if (!exists) {
                const forsave = new model(newitem);
                const saved = await forsave.save();

                debug(saved);
            }
        }
    } catch (error) {
        debug(error);
    }
    counter.resume();
}

async function importFrom(name, model) {
    model.collection.drop();
    const file = `startup/xml/${name}.xml`;
    debug(file);

    const stream = fs.createReadStream(file);
    const xml = new XmlStream(stream);
    const counter = new Counter(xml);
    xml.collect("expdata");
    xml.on("endElement: expdata", function (item) {
        counter.pause();
        importEntity(item.$, name, counter, model);
    });
}

async function setSequence(model) {
    let seq = 0;
    const name = model.modelName.toLowerCase();
    const data = await model.find().sort({ _id: -1 }).limit(1);
    if (data.length > 0) {
        seq = data[0]._id;
    }
    const sequence = await models.sequence.findOneAndUpdate(
        { _id: name },
        { _id: name, seq },
        { new: true, upsert: true }
    );
    debug(sequence);
}

module.exports = async () => {
    // await importFrom("category", models.category);
    // await importFrom("label", models.label);
    // await importFrom("artist", models.artist);
    // await importFrom("format", models.format);
    // await importFrom("title", models.title);
    // await importFrom("product", models.product);

    // await setSequence(models.category);
    // await setSequence(models.label);
    // await setSequence(models.artist);
    // await setSequence(models.format);
    // await setSequence(models.title);
    // await setSequence(models.product);
    debug(`XML init is complete ${chalk.green("✓")}`);
};
