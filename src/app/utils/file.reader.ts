
import { Injectable } from '@nestjs/common';
import { readFile, utils } from 'xlsx'

@Injectable()
export class FileReader {
  constructor() { }
  async reader(file_name: string) {
    const file = readFile('./test.xlsx')
    const sheets = file.SheetNames

    for(let i = 0; i < sheets.length; i++)
    {
       const temp = utils.sheet_to_json(
            file.Sheets[file.SheetNames[i]])
       temp.forEach((res) => {
          console.log(res)
       })
    }
  }


}
