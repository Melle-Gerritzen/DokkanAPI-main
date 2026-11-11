import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
//fs= filesystem Node.js module waarmee je backend bestandssystemen op de harde schijf kan benaderen
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
//path is module om bestandsmappen en paden te beheren Windows(\)Mac/Linux(/) anders zorgt path dat het pad klopt
//__dirname= de map waar dit bestand zich bevindt
const jsonPath = path.join(__dirname, '../data/DokkanCharacterData.json')
const dokkanData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))

export function getAllCharacters(req, res) {
    try {
        res.json(dokkanData)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export function getCharacterById(req, res) {
    try {
        const characterId = req.params.id
        const character = dokkanData.find(c => c.id === characterId)

        if (!character) {
            return res.status(404).json({ message: "Character niet gevonden" })
        }

        res.json(character)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}