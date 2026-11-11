import express from 'express'
import { getAllCharacters, getCharacterById } from '../controllers/characterController.js'

const router = express.Router()

// Route voor alle karakters
router.get('/', getAllCharacters)

// Route voor één specifiek karakter op basis van ID
router.get('/:id', getCharacterById)

export default router