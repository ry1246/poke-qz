// API が返すデータの型
// レスポンスの項目が巨大につき、必要な項目だけを定義

// stats 1件分
export interface PokeApiStat {
  base_stat: number
  stat: {
    name: string
  }
}

// 画像URL群
export interface PokeApiSprites {
  front_default: string | null
  other?: {
    'official-artwork'?: {
      front_default: string | null
    }
  }
}

// /pokemon/{id} レスポンスのうち必要な部分のみ
export interface PokeApiPokemon {
  id: number
  name: string
  stats: PokeApiStat[]
  sprites: PokeApiSprites
}

// ステータスを名前付きで保持
export interface PokemonStats {
  hp: number
  attack: number
  defense: number
  specialAttack: number
  specialDefense: number
  speed: number
}

// 出題用の1匹分のデータ
export interface Pokemon {
  id: number
  name: string
  imageUrl: string
  stats: PokemonStats
}
