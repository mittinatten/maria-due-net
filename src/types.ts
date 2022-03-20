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
  cover: {
    asset: {
      url: string;
    };
  };
  year: number;
  spotify: string;
  producer: {
    name;
    homePage;
    sameAs;
  };
}

export interface Album extends RawAlbum {
  path: string;
  songs: Link[];
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
