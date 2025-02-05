import express from 'express'
import resModel from '../schema/resource.js'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

// Get all resources by a user       
router.get('/:id', async (req, res) =>{
    try {
      const resources = await resModel.find({ userId: req.params.id })
      res.json(resources)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
})

router.post('/createResource', async (req, res) =>{
    const id = uuidv4()
    const { title, userId,contentType, link, subject } = req.body
    try{
        const newResource = new resModel({ title, userId, contentType, link, subject, id })
        const resource = await newResource.save()
        res.status(201).json(resource)
    }
    catch(error){
        if(error.name === 'ValidationError'){
            const errors = Object.values(error.errors).map(val => val.message)
            return res.status(400).json({errors})
        }
        else{
            res.status(500).json({ message: error.message })
        }
    }
})

// route to update resource
router.put('/updateResource', async (req, res) => {
    const { title, userId, contentType, link, subject,description } = req.body
    try {
        const updatedResource = await resModel.findByIdAndUpdate(req.body.id, { title, userId, contentType, link, subject,description }, { new: true })
        if (!updatedResource) return res.status(404).json({ message: 'Resource not found' })
        res.json(updatedResource)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//route to delete a resource

router.delete('/deleteResource/:id', async (req, res) => {
    try {
        const deletedResource = await resModel.findByIdAndDelete(req.params.id)
        if (!deletedResource) return res.status(404).json({ message: 'Resource not found' })
        res.json({ message: 'Resource deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})





export default router
