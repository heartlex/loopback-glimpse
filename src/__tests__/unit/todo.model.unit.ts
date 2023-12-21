import {expect} from '@loopback/testlab';
import {Todo} from '../../models';

describe('Unit test for Todo model', () => {

  it('check infos', () => {
    const todo: Todo = new Todo({
      id: 1,
      title: 'titolo di prova',
    });

    const infos = todo.getInfos();
    expect(infos).to.equal('Title: titolo di prova' + '\n' + 'Id: 1' + '\n');
  });
});
