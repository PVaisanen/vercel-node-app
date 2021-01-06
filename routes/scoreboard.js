const express = require('express')
const router = express.Router()
const Player = require('../models/player')

// Getting all
router.get('/',async (req,res) => {
    try {
        const players = await Player.find()
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting all from category
router.get('/:category',async (req,res) => {
    try {
        const players = await Player.where({ 
            category: req.params.category}).sort('-score').limit(8)
        res.json(players)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting all from category and difficulty
router.get('/:category/:difficulty',async (req,res) => {
    try {
        const players = await Player.where({ 
            category: req.params.category, difficulty: req.params.difficulty}).sort('-score').limit(8)
        res.json(players)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting one
router.get('/:id',getPlayer,(req,res) => {
   res.json(res.player)
})
// Creating one
router.post('/', async (req,res) => {
    const player = new Player({
        name: req.body.name,
        category: req.body.category,
        score: req.body.score,
        playDate: req.body.playDate,
        difficulty: req.body.difficulty,

    })
    try {
        const newPlayer = await player.save()
        res.status(201).json(newPlayer)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
// Update one
router.patch('/:id', getPlayer, async (req,res) => {
    if (req.body.name != null) {
        res.player.name = req.body.name
    }
    if (req.body.score != null) {
        res.player.score = req.body.score
    }
    if (req.body.category != null ){
        res.player.category = req.body.category
    }
    if (req.body.difficulty != null ){
        res.player.difficulty = req.body.difficulty
    }
  
    try {
        const updateplayer = await res.player.save()
        res.json(updateplayer)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
// Delete one
router.delete('/:id', getPlayer, async (req,res) => {
    try {
        await res.player.remove()
        res.json({message: 'Deleted player'})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
    
async function getPlayer(req, res, next) {
    let player
    try {
        player = await Player.findById(req.params.id)        
        if (player == null) {
            return res.status(404).json({ message: 'cannot find player'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.player = player
    next()
}

module.exports = router