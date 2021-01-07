const express = require('express')
const router = express.Router()
const Visitor = require('../models/visit')

// Getting page
router.get('/',async (req,res) => {
    try {
        const visits = await Visitor.find()
        res.json(visits)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting one
router.get('/:id',getVisit,(req,res) => {
    res.json(res.visit)
 })

 // Creating one
 router.post('/', async (req,res) => {
    const visit = new Visitor({
         page: req.body.page,
         counter: req.body.counter,
      })
      console.log("create one") 
  
     try {
         const newVisit = await visit.save()
         res.status(201).json(newVisit)
     } catch (err) {
         res.status(400).json({ message: err.message })
     }
 })


  // Update one
router.patch('/:id', updateVisit, async (req,res) => {

    try {
        const updatecounter = await res.visit.save()
        res.json(updatecounter)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Delete one
router.delete('/:id', getVisit, async (req,res) => {
    try {
        await res.visit.remove()
        res.json({message: 'Deleted page counter'})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getVisit(req, res, next) {
    let visit
    try {
        visit = await Visitor.findById(req.params.id)        
        if (visit == null) {
            return res.status(404).json({ message: 'cannot find counter'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.visit = visit
    next()
}

async function updateVisit(req, res, next) {
    let visit
    try {
        visit = await Visitor.findById(req.params.id)        
        if (visit == null) {
            return res.status(404).json({ message: 'cannot find counter'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
    visit.counter += 1
    res.visit = visit
    next()
}

module.exports = router
