export default new class ToshoNZB {
  url = atob('aHR0cHM6Ly9mZWVkLmFuaW1ldG9zaG8ub3JnL2pzb24=')

  /**
   * @param {string} hash
   */
  async query (hash) {
    const res = await fetch(this.url + '?show=torrent&btih=' + hash)

    if (!res.ok) return

    /** @type {import('./types').Tosho} */
    const json = await res.json()

    return json.nzb_url
  }

  async test () {
    const res = await fetch(this.url)
    return res.ok
  }
}()
