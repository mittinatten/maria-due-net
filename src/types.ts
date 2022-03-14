export type Link = {
  title: string;
  path: string;
};

export type BreadCrumb = Link[];

export interface RawAlbum {
  title: string;
  songs: { title: string }[];
}

export interface Album extends RawAlbum {
  path: string;
  songs: BreadCrumb;
}

export interface RawSong {
  title: string;
  lyrics: string;
  lyricsBy: string;
  album: {
    title: string;
  };
}

export interface Song extends RawSong {
  path: string;
  album: Link;
}
