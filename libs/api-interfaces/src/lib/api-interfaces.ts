export interface Message {
  message: string;
}

export interface Character {
  id: number,
  name: string,
  height: number,
  mass: number,
  hair_color: string,
  skin_color: string,
  eye_color: string,
  birth_year: string,
  gender: string,
  homeworld: string,
  films: string[],
  species: [],
  vehicles: string[],
  starships: string[],
  created: string,
  edited: string,
  url: string
}

export interface General {
  id: number,
  name: string,
  height: number,
  mass: number,
  hair_color: string,
  skin_color: string,
  eye_color: string,
  birth_year: string,
  gender: string,
  homeworld: string,
  films: string[],
  species: [],
  vehicles: string[],
  starships: string[],
  created: string,
  edited: string,
  url: string
}

export interface Login {
  username: string,
  password: string,
  id: string | number
}

export interface ApiObj {
  count: number,
  next: string,
  previous: string,
  results: Character[]
}