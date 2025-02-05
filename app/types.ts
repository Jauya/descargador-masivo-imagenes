export interface FreepikResources {
  data?: DataImage[];
  meta?: Meta2;
  message?:string
}

export interface DataImage {
  id: number;
  title: string;
  url: string;
  filename: string;
  licenses: License[];
  products: Product[];
  meta: Meta;
  image: Image;
  stats: Stats;
  author: Author;
}

export interface License {
  type: string;
  url: string;
}

export interface Product {
  type: string;
  url: string;
}

export interface Meta {
  published_at: string;
  is_new: boolean;
  available_formats: AvailableFormats;
}

export interface AvailableFormats {
  jpg: Jpg;
}

export interface Jpg {
  total: number;
  items: Item[];
}

export interface Item {
  id: number;
  name?: string;
  colorspace?: string;
  size: number;
}

export interface Image {
  type: string;
  orientation: string;
  source: Source;
}

export interface Source {
  url: string;
  key: string;
  size: string;
}

export interface Stats {
  downloads: number;
  likes: number;
}

export interface Author {
  id: number;
  name: string;
  avatar: string;
  slug: string;
}

export interface Meta2 {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface FreepikDownload {
  message?: string
  data?: DataDownload;
}

export interface DataDownload {
  filename: string;
  url: string;
}
