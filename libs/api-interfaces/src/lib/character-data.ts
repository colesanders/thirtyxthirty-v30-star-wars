import { Character } from './api-interfaces';

export enum CharacterData{
    HAIR = "hair",
    BIRTH_YEAR = "birth_year",
    EYE_COLOR = "eye_color",
    GENDER = "gender",
    HAIR_COLOR = "hair_color",
    HEIGHT = "height",
    MASS = "mass",
    SKIN_COLOR = "skin_color",
    HOMEWORLD = "home_world",
}

export const getStringProperties = (character: Character) => {
    const entries = Object.entries(character);
    const values = Object.values(CharacterData);
}