import * as fs from 'fs'
import * as xml2js from 'xml2js'
import mongoose from 'mongoose'
import { WorldsChampionModel, IWorldsChampion } from '../models/worlds_champion.model'

export async function importDataXML() {
	// Wczytaj zawartość pliku XML
	const xmlData = fs.readFileSync('./data_to_import/dane z mistrzostw/worlds_champions.xml', 'utf-8')

	// Utwórz parser XML
	const parser = new xml2js.Parser()

	// Parsuj dane XML
	parser.parseString(xmlData, (err, result) => {
		if (err) {
			console.error('Błąd parsowania pliku XML:', err)
		} else {
			// Otrzymane dane znajdują się w obiekcie 'result'
			const championStats = result.statistics.championStats

			// Przetwarzaj każdy rekord championStats
			championStats.forEach((championStat: any) => {
				const champion = String(championStat.champion[0])
				const sumTotal = Number(championStat.sum_total[0])
				const winTotal = Number(championStat.win_total[0])
				const sumBans = Number(championStat.sum_bans[0])
				const sumPickBan = Number(championStat.sum_pick_ban[0])

				// Twórz obiekt na podstawie modelu danych
				const worldsChampion = {
					champion: champion,
					sum_total: sumTotal,
					win_total: winTotal,
					sum_bans: sumBans,
					sum_pick_ban: sumPickBan,
				} as IWorldsChampion

				// Zapisz obiekt do bazy danych
				WorldsChampionModel.create(worldsChampion)
					.then(() => {
						console.log(`Zapisano rekord dla ${champion}`)
					})
					.catch(error => {
						console.error('Błąd podczas zapisywania rekordu:', error)
					})
			})
		}
	})
}
