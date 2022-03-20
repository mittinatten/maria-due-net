import { RawAlbum, Album, RawSong, Song, AppearsOn } from "../types";

const API_URL = "https://zp0hhhsi.api.sanity.io/v1/graphql/production/default";

function titleToSlug(title: string) {
  return title.replace(/ /g, "-").toLowerCase();
}

function albumPath(album: { title: string }) {
  return "/albums/" + titleToSlug(album.title);
}

function songPath(song: { title: string }) {
  return "/songs/" + titleToSlug(song.title);
}

let allAlbums: Album[];
export async function getAllAlbums(): Promise<Album[]> {
  if (allAlbums) return allAlbums;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query Albums {
          allAlbums {
            title,
            spotify,
            year,
            cover {
              asset {
                url
              }
            },
            recordLabel {
              name,
              homePage
            },
            producer {
              name,
              homePage,
              sameAs
            }
            songs {
              title
            }
            cover {
              asset {
                url
              }
            }
          }
        }`,
    }),
  });

  const json = await response.json();

  allAlbums = json.data.allAlbums
    .map((album: RawAlbum) => ({
      ...album,
      path: albumPath(album),
      songs: album.songs.map((song) => ({
        ...song,
        path: songPath(song),
      })),
    }))
    .sort((a1: Album, a2: Album) => (a1.year > a2.year ? 1 : -1));

  return allAlbums;
}

export function getAlbumBySlug(lastPartOfSlug: string): Promise<Album> {
  return getAllAlbums().then((albums) =>
    albums.find((album) => album.path.endsWith(lastPartOfSlug))
  );
}

let allSongs: Song[];
export async function getAllSongs(): Promise<Song[]> {
  if (allSongs) return allSongs;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query Songs {
          allSongs {
            title,
            lyrics
            album {
              title
            }
          }
        }`,
    }),
  });

  const json = await response.json();

  allSongs = json.data.allSongs.map((song: RawSong) => ({
    ...song,
    path: songPath(song),
    album: {
      ...song.album,
      path: albumPath(song.album),
    },
  }));

  return allSongs;
}

export async function getSongBySlug(slug: string): Promise<Song> {
  return getAllSongs().then((songs) =>
    songs.find((song) => song.path.endsWith(slug))
  );
}

let allAppearsOn: AppearsOn[];
export async function getAllAppearsOn(): Promise<AppearsOn[]> {
  if (allAppearsOn) return allAppearsOn;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query Collaborations {
          allAppearsOns {
            title,
            year,
            spotify,
            by {
              about,
              name,
              homePage,
              sameAs,
            }
          }
        }`,
    }),
  });

  const json = await response.json();

  allAppearsOn = json.data.allAppearsOns;
  return allAppearsOn;
}
