import { Injectable } from '@nestjs/common';

import { formidable } from 'formidable';
import { rename, readdir, existsSync, mkdirSync } from 'fs';
import { FileReaderPokemons } from 'app/utils/file.reader';

@Injectable()
export class UploadService {
  constructor(
    private readonly fileReader: FileReaderPokemons,
  ) { }
  async post(request: any) {

    const form = new formidable.IncomingForm();
    form.parse(request, (err: Object, fields: Object, files: Object) => {
      if (err) {
        return { message: 'Não foi possível efetuar o upload do arquivo' };
      }
      if (!existsSync('files')) {
        mkdirSync('files');
      }
      readdir('files/', (err, numberF) => {
        if (err) {
          return;
        }
        const filepath = 'files/' + numberF.length + files[''].originalFilename;
        rename(files[''].filepath, filepath, (error) => {
          if (!error) {

            this.callback(filepath);

          } else {
            console.log(error)
          }
        });
      });
    });
  }

  async callback(file: string) {
    return this.fileReader.reader(file);
  }
}
