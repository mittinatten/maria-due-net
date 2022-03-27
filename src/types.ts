import { PortableTextBlocks } from "@portabletext/svelte/ptTypes";

type SanityImage = {
  asset: {
    url: string;
  };
};

export type Person = {
  name: string;
  homePage: string;
  sameAs: string;
  about: string;
};

export type Link = {
  title: string;
  path: string;
};

export type BreadCrumb = Link[];

export interface RawAlbum {
  title: string;
  songs: { title: string }[];
  recordLabel: {
    name: string;
    homePage: string;
  };
  cover: SanityImage;
  year: number;
  spotify: string;
  producer: Person;
}

export interface Album extends RawAlbum {
  path: string;
  songs: Link[];
}

export interface RawSong {
  title: string;
  lyrics: string;
  lyricsBy: Person[];
  musicBy: Person[];
  album: {
    title: string;
    year: number;
  };
  video?: string;
}

export interface Song extends RawSong {
  path: string;
  album: Link & { year: number };
  videoId?: string;
}

export interface AppearsOn {
  title: string;
  year: number;
  spotify: string;
  by: {
    about: string;
    name: string;
    homePage: string;
    sameAs: string;
  };
}

export interface FrontMatter {
  bodyRaw: PortableTextBlocks;
  title: string;
  image?: SanityImage;
}

export interface RawVideo {
  title: string;
  url: string;
}

export interface Video extends RawVideo {
  id: string;
}

export interface RawConcert {
  date: string;
  venue: string;
  venueURL?: string;
  description: string;
  eventURL?: string;
  city: string;
  tickets?: string;
  country: string;
}

export type Concert = RawConcert & { date: Date };
