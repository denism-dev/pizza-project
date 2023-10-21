const Thing = require('../models/thing.model');

// Controller functions for CRUD operations
module.exports.createThing = async (req, res) => {
    try {
        const newThing = new Thing(req.body);
        const savedThing = await newThing.save();
        res.status(201).json(savedThing);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports.getThings = async (req, res) => {
    const things = await Thing.find({});
    res.json(things);
}

module.exports.getThingById = async (req, res) => {
    try {
        const thing = await Thing.findById(req.params.id);
        if (!thing) {
            res.status(404).json({ error: 'Thing not found' });
            return;
        }
        res.json(thing);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports.updateThing = async (req, res) => {
    try {
        const updatedThing = await Thing.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name },
            { new: true }
        );
        res.json(updatedThing);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports.likeThing = async (req, res) => {
    try {
        const updatedThing = await Thing.findByIdAndUpdate(
            req.params.id,
            { $inc: { likes: 1 } },
            { new: true }
        );
        res.json(updatedThing);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports.deleteThing = async (req, res) => {
    try {
        await Thing.findByIdAndRemove(req.params.id);
        res.status(204).end();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};