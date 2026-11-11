import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const supabaseUrl = 'https://cuhgzkkhauuccrbkplsg.supabase.co'
const supabaseAnonKey = 'sb_publishable_8OjUdhXpnu0sUZUbOzRqmg_Q0EfZoZr' // Vul hier je anon key in

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const jsonPath = path.join(__dirname, 'data', 'DokkanCharacterData.json')
const rawData = fs.readFileSync(jsonPath, 'utf8')
const fullUnits = JSON.parse(rawData)

// We filteren eventuele dubbele ID's ook direct uit de array zelf
const uniqueUnitsMap = new Map()
fullUnits.forEach(unit => {
    if (unit.id && !uniqueUnitsMap.has(unit.id)) {
        uniqueUnitsMap.set(unit.id, {
            id: unit.id,
            name: unit.name,
            title: unit.title
        })
    }
})

const cleanedUnits = Array.from(uniqueUnitsMap.values())

async function seed() {
    console.log(`Bezig met uploaden van ${cleanedUnits.length} unieke units...`)

    const chunkSize = 500
    for (let i = 0; i < cleanedUnits.length; i += chunkSize) {
        const chunk = cleanedUnits.slice(i, i + chunkSize)
        // Gebruik upsert i.p.v. insert om conflicten op ID te voorkomen
        const { error } = await supabase.from('characters').upsert(chunk)

        if (error) {
            console.error(`Fout bij batch ${i / chunkSize + 1}:`, error.message)
            return
        }
        console.log(`Batch ${i / chunkSize + 1} geüpload (${chunk.length} units)...`)
    }

    console.log('Klaar! Alle unieke units staan netjes in Supabase.')
}

seed()