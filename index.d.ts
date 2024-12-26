export type Accuracy = 'high' | 'medium' | 'low'

export interface ExtensionConfig {
  name: string
  version: string
  description: string
  id: string
  type: 'torrent' | 'nzb' | 'url'
  accuracy: Accuracy
  seed: 'perma' | number
  icon: string // URL to the icon
  update: string // URL to the config file, can be prefixed with 'gh:' to fetch from GitHub, e.g. 'gh:username/repo' or 'npm:' to fetch from npm, e.g. 'npm:package-name', or a straight url
  code: string // URL to the extension code, can be prefixed with 'gh:' to fetch from GitHub, e.g. 'gh:username/repo' or 'npm:' to fetch from npm, e.g. 'npm:package-name', or a straight url
  options: {
    [key: string]: {
      type: 'string' | 'number' | 'boolean'
      description: string
      default: any
    }
  }
}

export interface TorrentResult {
  title: string // torrent title
  link: string // link to .torrent file, or magnet link
  id?: number
  seeders: number
  leechers: number
  downloads: number
  hash: string // info hash
  size: number // size in bytes
  verified: boolean // if it's a verified release, e.g. it's 100% certain it's the correct episode, manually verified by the provider e.g. anidb
  date: Date // date the torrent was uploaded
  type?: 'batch' | 'best' | 'alt'
}

export interface TorrentQuery {
  anilistId: number // anilist anime id
  anidbAid?: number // anidb anime id
  anidbEid?: number // anidb episode id
  titles: string[] // list of titles and alternative titles
  episode?: number
  episodeCount?: number // total episode count for the series
  resolution: '2160' | '1080' | '720' | '540' | '480' | ''
  exclusions: string[] // list of keywords to exclude from searches
}

export type SearchFunction = (query: TorrentQuery, options?: {
  [key: string]: {
    type: 'string' | 'number' | 'boolean'
    description: string
    default: any
  }
}) => Promise<TorrentResult[]>

export class TorrentSource {
  test: () => Promise<boolean>
  single: SearchFunction
  batch: SearchFunction
  movie: SearchFunction
}

export class NZBorURLSource {
  test: () => Promise<boolean>
  search: (hash: string, options?: {
    [key: string]: {
      type: 'string' | 'number' | 'boolean'
      description: string
      default: any
    }
  }) => Promise<string> // accepts btih hash, return URL to NZB or DDL
}
