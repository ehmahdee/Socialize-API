const {User, Thought} = require('../models')

module.exports = {
    getThoughts(req, res) {
        Thought.find ()
        .then ((thoughts) => res.status(200).json(thoughts))
        .catch ((error) => res.status(500).json(error))
    },
    createThought(req, res) {
        Thought.create(req.body)
        .then ((thought) => {
            return User.findOneAndUpdate (
                {username: req.body.username},
                {$addToSet: {thoughts: thought._id}},
                {new: true}
            )
        })
        .then ((thoughts) => res.status(200).json(thoughts))
        .catch ((error) => res.status(500).json(error))
    },
    updateThought (req,res) {
        Thought.findOneAndUpdate (
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then ((thought) => !thought
            ?res.status(404).json({message: 'no thought matches that ID'})
            :res.json(thought)
            )
            .catch((error) => res.status(500).json(error))
    },
    deleteThought (req, res) {
        Thought.findOneAndDelete({ _id: req.params.id })
        ,then((thought) => !thought
        ? res.status(400).json({ message: 'no thought matches that ID'})
        :User.findOneAndUpdate (
            {thoughts: req.params.thoughtId},
            {$pull: {thoughts:req.params.thoughtId}},
            {new: true}
        )
        )
        .then(() => res.json({message: 'Thought obliterated!'}))
        .catch((error) => res.status(500).json(error))
    },
    addReaction (req, res) {
        Thought.findOneAndUpdate (
            {_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {runValidators: true, new: true}
        )
        .then ((thought) => !thought
        ? res.status(404).json ({message: 'no thought matches that ID'})
        :res.json(thought))
        .catch ((error) => res.status(500).json(error))
    },
    deleteReaction (req, res) {
        Thought.findOneAndUpdate (
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {runValidators: true, new: true}
        )
        .then ((thought) => !thought
        ? res.status(404).json ({message: 'no thought matches that ID'})
        :res.json(thought)
        )
        .catch ((error) => res.status(500).json(error))
    }
}