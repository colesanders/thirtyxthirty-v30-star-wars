import { GeneralsEntity } from './generals.models';
import * as GeneralsActions from './generals.actions';
import { State, initialState, reducer } from './generals.reducer';

describe('Generals Reducer', () => {
  const createGeneralsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as GeneralsEntity);

  beforeEach(() => {});

  describe('valid Generals actions', () => {
    it('loadGeneralsSuccess should return set the list of known Generals', () => {
      const generals = [
        createGeneralsEntity('PRODUCT-AAA'),
        createGeneralsEntity('PRODUCT-zzz'),
      ];
      const action = GeneralsActions.loadGeneralsSuccess({ generals });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
