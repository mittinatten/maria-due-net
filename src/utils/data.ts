import { Concert, RawConcert } from "../types";
import {
  RawAlbum,
  Album,
  RawSong,
  Song,
  AppearsOn,
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
  return "/albums/" + titleToSlug(album.title) + "/";
}

function songPath(song: { title: string }) {
  return "/songs/" + titleToSlug(song.title) + "/";
}

function videoId(url: string): string | undefined {
  return url.match(/v=(\w+)$/)?.[1];
}

function generateWebpUrl(url: string): string {
  return url + "?fm=webp";
}

let allAlbums: Album[];
export async function getAllAlbums(origin: string): Promise<Album[]> {
  if (allAlbums) return allAlbums;

  const response = await fetchSanity<{ allAlbums: RawAlbum[] }>(`
    query Albums {
      allAlbums {
        title
        spotify
        year
        cover {
          asset {
            url
          }
        }
        recordLabel {
          name
          homePage
        }
        producer {
          name
          homePage
          sameAs
          about
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
        resourceURI: origin + songPath,
      })),
      resourceURI: origin + albumPath(album),
      cover: {
        asset: {
          url: album.cover.asset.url,
          webp: generateWebpUrl(album.cover.asset.url),
        },
      },
    }))
    .sort((a1: Album, a2: Album) => (a1.year > a2.year ? -1 : 1));

  return allAlbums;
}

export function getAlbumBySlug(
  lastPartOfSlug: string,
  origin: string
): Promise<Album> {
  return getAllAlbums(origin).then((albums) =>
    albums.find((album) => album.path.endsWith(lastPartOfSlug))
  );
}

let allSongs: Song[];
export async function getAllSongs(origin: string): Promise<Song[]> {
  if (allSongs) return allSongs;

  const response = await fetchSanity<{ allSongs: RawSong[] }>(`
    query Songs {
      allSongs {
        title
        lyrics
        album {
          title
          year
        }
        video
        lyricsBy {
          name
          homePage
          sameAs
          about
        }
        musicBy {
          name
          homePage
          sameAs
          about
        }
      }
    }`);

  allSongs = response.allSongs.map((song) => ({
    ...song,
    path: songPath(song),
    resourceURI: origin + songPath(song),
    album: {
      ...song.album,
      path: albumPath(song.album),
      resourceURI: origin + albumPath(song.album),
      year: song.album.year,
    },
    videoId: song.video && videoId(song.video),
  }));

  return allSongs;
}

export async function getSongBySlug(
  slug: string,
  origin: string
): Promise<Song> {
  return getAllSongs(origin).then((songs) =>
    songs.find((song) => song.path.endsWith(slug))
  );
}

export async function getAllAppearsOn() {
  const response = await fetchSanity<{ allAppearsOns: AppearsOn[] }>(`
    query Collaborations {
      allAppearsOns {
        title
        year
        spotify
        by {
          about
          name
          homePage
          sameAs
        }
      }
    }`);

  return response.allAppearsOns.sort((a, b) => (a.year > b.year ? -1 : 1));
}

export async function getAllVideos() {
  const response = await fetchSanity<{ allVideos: RawVideo[] }>(`
    query Videos {
      allVideos {
        title
        url
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
