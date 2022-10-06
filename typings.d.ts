export interface Genre {
    id: number
    name: string
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date?: string;
  title: string;
  media_type?: string;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
  name: string;
}

export interface Element {
    type: 
    | 'Bloopers'
    | 'Featurettes'
    | 'Behind the scene'
    | 'Clip'
    | 'Trailer'
    | 'Teaser'
}