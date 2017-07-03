/* @flow */

import {
  describe,
  it,
} from 'mocha';

import { expect } from 'chai';
import relateify from '../src/transform';
import through from 'through2';

describe('relateify', () => {

  const transform = async(base: string, input: string) => {
    const src = through();
    const dst = relateify(base);
    let file;
    let result = '';

    src.pipe(dst);

    await new Promise((resolve: () => void, reject: (Error) => void) => {
      dst.on('data', (buf: Buffer) => {
        result += buf.toString('utf8');
      });
      dst.on('error', reject);
      dst.on('end', () => resolve());
      dst.on('file', (value: string) => { file = value; });
      src.on('error', reject);
      src.end(input);
    });

    return { result, file };
  };

  it('emits file events for line comments', async() => {
    const { file } = await transform(
      '/path/to/file.js',
      '// @related-file ./rel.txt'
    );

    expect(file).to.eql('/path/to/rel.txt');
  });

  it('emits file events for block comments', async() => {
    const { file } = await transform(
      '/path/to/file.js',
      '/* @related-file ./rel.txt */'
    );

    expect(file).to.eql('/path/to/rel.txt');
  });

  it('does not resolve absolute paths', async() => {
    const { file } = await transform(
      '/path/to/file.js',
      '// @related-file /rel.txt'
    );

    expect(file).to.eql('/rel.txt');
  });

  it('does not resolve non-relative paths', async() => {
    const { file } = await transform(
      '/path/to/file.js',
      '// @related-file rel.txt'
    );

    expect(file).to.eql('rel.txt');
  });
});
