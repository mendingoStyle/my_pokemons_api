
import { Injectable } from '@nestjs/common'
import { readFile, utils } from 'xlsx'
import { PokemonsService } from '../pokemons/pokemons.service'
import { FormatterService } from './formatter.service'

@Injectable()
export class FileReaderPokemons {
  constructor(
    private readonly formatter: FormatterService,
    private readonly pokemonsService: PokemonsService,
  ) { }
  async reader(file_name: string) {
    const file = readFile(file_name)
    const sheets = file.SheetNames

    for (let i = 0; i < sheets.length; i++) {
      const temp = utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])
      temp.forEach(async (res) => {
        const pokemonPayload = {
          'row': this.formatter.integerOrZero(res['Row']),
          'familyId': this.formatter.integerOrZero(res['FamilyID']),
          'evolution_stage': this.formatter.integerOrZero(res['Evolution Stage']),
          'name': this.formatter.nullifyEmpty(res['Name']),
          'pokedex_number': this.formatter.integerOrZero(res['Pokedex Number']),
          'img_name': this.formatter.integerOrZero(res['Img name']),
          'generation': this.formatter.integerOrZero(res['Generation']),
          'evolved': this.formatter.boolean(res['Evolved']),
          'cross_gen': this.formatter.boolean(res['Cross Gen']),
          'type_1': this.formatter.nullifyEmpty(res['Type 1']),
          'type_2': this.formatter.nullifyEmpty(res['Type 2']),
          'weather_1': this.formatter.nullifyEmpty(res['Weather 1']),
          'weather_2': this.formatter.nullifyEmpty(res['Weather 2']),
          'status_total': this.formatter.integerOrZero(res['STAT TOTAL']),
          'atk': this.formatter.integerOrZero(res['ATK']),
          'def': this.formatter.integerOrZero(res['DEF']),
          'sta': this.formatter.integerOrZero(res['STA']),
          'legendary': this.formatter.boolean(res['Legendary']),
          'aquireable': this.formatter.boolean(res['aquireable']),
          'spaws': this.formatter.boolean(res['Spaws']),
          'regional': this.formatter.boolean(res['Regional']),
          'raidable': this.formatter.integerOrZero(res['Raidable']),
          'hatchble': this.formatter.integerOrZero(res['Hatchble']),
          'shiny': this.formatter.boolean(res['Shiny']),
          'nest': this.formatter.boolean(res['Nest']),
          'new': this.formatter.boolean(res['New']),
          'not_gettable': this.formatter.boolean(res['Not-Gettable']),
          'future_evolve': this.formatter.boolean(res['Future Evolve']),
          'max_cp_40': this.formatter.integerOrZero(res['100% CP @ 40']),
          'max_cp_39': this.formatter.integerOrZero(res['100% CP @ 39'])
        }
        await this.sendToLine(pokemonPayload);


      })
    }
  }
  async sendToLine(data: any) {
    return await this.pokemonsService.create(data);
  }


}
