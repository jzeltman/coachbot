const Goal = require('../models/goal.model');

exports.create = (req,res) => {
    console.log('createHandler',req.body)
    let goal = new Goal({ 
        name: req.body.name, 
        user: 'tentman',
        complete: false 
    });
        goal.save( (err) => {
            if (err) return console.log(err);
            res.send(goal);
        });
};

exports.read = (req,res) => {
    console.log('readHandler')
    Goal.findById(req.params.id, (err, goal) => {
        if (err) console.log(err);
        res.send(goal);
    })
};

exports.update = (req,res) => {
    console.log('updateHandler')
    Goal.findByIdAndUpdate(req.params.id, {$set: req.body}, (err,product) => {
        if (err) console.log(err);
        res.send('goal updated');
    })
};

exports.delete = (req,res) => {
    console.log('destroyHandler')
    Goal.findByIdAndRemove(req.params.id, (err,product) => {
        if (err) console.log(err);
        res.redirect('/');
        console.log('deleted goal');
    })
};

exports.goalsByUser = (req,res) => {
    Goal.find({ user: req.params.user }, (err,docs) => { 
        console.log('docs',docs); 
        if (err) console.log(err);
        res.send(docs);
    });
}