import type { PokeApiPokemon, Pokemon, PokemonStats } from "../types/pokemon";

const POKEAPI_BASE = 'https://pokeapi.co/api/v2'

// 図鑑No.の最小・最大を定義
const POKEDEX_MIN = 1
const POKEDEX_MAX = 151

// PokeAPI の stats 配列をオブジェクトへ変換
function toPokemonStats(apiStats: PokeApiPokemon['stats']): PokemonStats {
  const map: Record<string, keyof PokemonStats> = {
    hp: 'hp',
    attack: 'attack',
    defense: 'defense',
    'special-attack': 'specialAttack',
    'special-defense': 'specialDefense',
    speed: 'speed',
  }

  // 初期化
  const result: PokemonStats = {
    hp: 0, attack: 0, defense: 0,
    specialAttack: 0, specialDefense: 0, speed: 0,
  }

  for (const s of apiStats) {
    const  key = map[s.stat.name]
    if (key) result[key] = s.base_stat
  }
  return result
}

// レスポンスを整形
function normalize(raw: PokeApiPokemon): Pokemon {
  const artwork = raw.sprites.other?.['official-artwork']?.front_default
  return {
    id: raw.id,
    name: raw.name,

    imageUrl: artwork ?? raw.sprites.front_default ?? '',
    stats: toPokemonStats(raw.stats),
  }
}

export async function fetchPokemon(id: number): Promise<Pokemon> {
  const res = await fetch(`${POKEAPI_BASE}/pokemon/${id}`)
  if (!res.ok) {
    throw new Error(`PokeAPI request failed: ${res.status} (id=${id})`)
  }
  const raw = (await res.json()) as PokeApiPokemon
  return normalize(raw)
}

export async function fetchRandomPokemon(): Promise<Pokemon> {
  const id =
    Math.floor(Math.random() * (POKEDEX_MAX - POKEDEX_MIN + 1)) + POKEDEX_MIN
  return fetchPokemon(id)
}

