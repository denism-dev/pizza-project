const thingController = require('../controllers/thing.controller');

module.exports = (app) => {
    app.post('/api/things', thingController.createThing);
    app.get('/api/things', thingController.getThings);
    app.get('/api/things/:id', thingController.getThingById);
    app.put('/api/things/:id', thingController.updateThing);
    app.put('/api/things/:id/like', thingController.likeThing);
    app.delete('/api/things/:id', thingController.deleteThing);
};