function splitLyrics(lyrics: string): string {
  const lines = lyrics.split(/(?=[A-Z])/);

  return lines.join("<br/>");
}

export default splitLyrics;
