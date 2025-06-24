import AbstractExtension from "./abstract";

export default class NyaapiExtension extends AbstractExtension {
  constructor() {
    super({
      id: "nyaapi",
      name: "Nyaapi",
      version: "1.0.0",
      homepage: "https://nyaapi.deno.dev",
      icon: "https://nyaapi.deno.dev/favicon.ico",
    });
  }

  /**
   * Searches torrents matching the given query.
   * @param {string} query - Search keywords.
   * @param {number} [page=1] - Page number.
   * @returns {Promise<Array<Object>>} List of torrent items.
   */
  async search(query, page = 1) {
    const url = new URL("https://nyaapi.deno.dev/nyaa");
    url.searchParams.set("q", query);
    url.searchParams.set("page", page.toString());

    const resp = await fetch(url.toString());
    const data = await resp.json();

    // Map API results to extension items
    return data.results.map(item => ({
      title: item.name,
      link: item.link,           // URL to torrent page
      download: item.torrent,    // .torrent file URL
      magnet: item.magnet,       // magnet URI
      seeds: item.seeders,
      peers: item.leechers,
      size: item.size,           // size string, e.g. "10.5 GiB"
      time: new Date(item.pubDate).getTime(),
    }));
  }

  /**
   * Fetches detailed info for a single torrent.
   * @param {Object} item - Item returned by search().
   * @returns {Promise<Object>} Detailed torrent info.
   */
  async getInfo(item) {
    // For Nyaapi, search result already contains full info.
    return item;
  }
}
