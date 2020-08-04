import { CharacterData, CharacterList } from './character-data';
import { FilmData, FilmList } from './film-data';
import { StarShipData, StarShipList } from './starship-data';
import { VehicleData, VehicleList } from './vehicle-data';
import { SpeciesData, SpeciesList } from './species-data';
import { PlanetData, PlanetList } from './planet-data';

export enum StarWarsDataSetFields {
    FILMS = 'films',
    PEOPLE = 'people',
    PLANETS = 'planets',
    SPECIES = 'species',
    STARSHIPS = 'starships',
    VEHICLES = 'vehicles',
}

export const StarWarsDataSets = {
    [StarWarsDataSetFields.PEOPLE]: {detail: CharacterData, list: CharacterList},
    [StarWarsDataSetFields.FILMS]: {detail: FilmData, list: FilmList},
    [StarWarsDataSetFields.STARSHIPS]: {detail: StarShipData, list: StarShipList},
    [StarWarsDataSetFields.VEHICLES]: {detail: VehicleData, list: VehicleList},
    [StarWarsDataSetFields.SPECIES]: {detail: SpeciesData, list: SpeciesList},
    [StarWarsDataSetFields.PLANETS]: {detail: PlanetData, list: PlanetList},
}

export const DATA_SETS = Object.values(StarWarsDataSetFields);

export const getDataSet = (data: string) => {
    return Object.values(StarWarsDataSetFields).find(dataType => {
        return data === dataType
    })
}