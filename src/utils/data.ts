import { Concert, RawConcert } from "../types";
import {
  RawAlbum,
  Album,
  RawSong,
  Song,
  AppearsOn,
  FrontMatter,
  Video,
  RawVideo,
} from "../types";

const API_URL = "https://zp0hhhsi.api.sanity.io/v1/graphql/production/default";

async function fetchSanity<T>(query: string) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  const json = await response.json();
  return json.data as Promise<T>;
}

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

  const response = await fetchSanity<{ allAlbums: RawAlbum[] }>(`
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
    }`);

  allAlbums = response.allAlbums
    .map((album) => ({
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

  const response = await fetchSanity<{ allSongs: RawSong[] }>(`
    query Songs {
      allSongs {
        title,
        lyrics
        album {
          title
        }
      }
    }`);

  allSongs = response.allSongs.map((song) => ({
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

export async function getAllAppearsOn() {
  const response = await fetchSanity<{ allAppearsOns: AppearsOn[] }>(`
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
    }`);

  return response.allAppearsOns;
}

export async function getFrontMatter() {
  const response = await fetchSanity<{ allFrontMatters: FrontMatter }>(`
    query FrontMatter {
      allFrontMatters {
        bodyRaw,
        title,
        image {
          asset {
            url
          }
        }
      }
    }
  `);

  return response.allFrontMatters;
}

export async function getAllVideos() {
  const response = await fetchSanity<{ allVideos: RawVideo[] }>(`
    query Videos {
      allVideos {
        title,
        url,
      }
    }`);

  const allVideos = response.allVideos.map((video) => {
    const id = video.url.match(/v=(\w+)$/)[1];
    return {
      ...video,
      id,
    } as Video;
  });

  return allVideos;
}

export async function getAllConcerts() {
  const response = await fetchSanity<{ allConcerts: RawConcert[] }>(`
    query Concerts {
      allConcerts {
        date,
        venue,
        venueURL,
        description,
        eventURL,
        city,
        tickets,
        country
      }
    }`);

  const allConcerts = response.allConcerts
    .map(
      (concert) =>
        ({
          ...concert,
          date: new Date(concert.date),
        } as Concert)
    )
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return allConcerts;
}
