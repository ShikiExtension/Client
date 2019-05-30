/**
 * @property {int} id
 * @property {int} title_id
 * @property {int} author_id
 * @property {string} author
 * @property {string} host
 * @property {string} url
 * @property {string} uploader
 * @property {string} language  original, russian, english or unknown
 * @property {number} episode
 * @property {string} quality
 * @property {string} type DUBBING, ORIGINAL or SUBTITLES
 * @property {int} watches_count
 */
class TitleVideo {
    constructor (attributes) {
        for (const name in attributes) {
            if (attributes.hasOwnProperty(name)) {
                this[name] = attributes[name];
            }
        }
    }
}