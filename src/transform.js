/* @flow */

import path from 'path';
import through from 'through2';
import type { Transform } from 'stream';

const regex = /(?:\/\/|\/\*).*@related-file\s+([^\s*]+)/g;

export default function relateify(file: string, /* opts */): Transform {
  const files = Object.create(null);

  return through(function write(buf: Buffer, enc: string, next: () => void) {
    const str = buf.toString('utf8');
    let match;

    while ((match = regex.exec(str))) {
      let related = match[1];

      if (related && related[0] === '.') {
        related = path.resolve(path.dirname(file), related);
      }
      files[related] = true;
    }

    this.push(buf);
    next();
  }, function end(next: () => void) {

    for (const related in files) { // eslint-disable-line guard-for-in

      // docs are slim for this event, but brfs does the same thing in a very
      // similar situation:
      // https://github.com/substack/brfs/blob/feffd3de/index.js#L97
      this.emit('file', related);

    }

    next();
  });
}
