import { GeneralsEntity } from './generals.models';
import { State, generalsAdapter, initialState } from './generals.reducer';
import * as GeneralsSelectors from './generals.selectors';

describe('Generals Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getGeneralsId = (it) => it['id'];
  const createGeneralsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as GeneralsEntity);

  let state;

  beforeEach(() => {
    state = {
      generals: generalsAdapter.addAll(
        [
          createGeneralsEntity('PRODUCT-AAA'),
          createGeneralsEntity('PRODUCT-BBB'),
          createGeneralsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Generals Selectors', () => {
    it('getAllGenerals() should return the list of Generals', () => {
      const results = GeneralsSelectors.getAllGenerals(state);
      const selId = getGeneralsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = GeneralsSelectors.getSelected(state);
      const selId = getGeneralsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getGeneralsLoaded() should return the current 'loaded' status", () => {
      const result = GeneralsSelectors.getGeneralsLoaded(state);

      expect(result).toBe(true);
    });

    it("getGeneralsError() should return the current 'error' state", () => {
      const result = GeneralsSelectors.getGeneralsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
