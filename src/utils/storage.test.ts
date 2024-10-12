import { afterEach, describe, expect, it } from 'vitest';

import { clearLocalStorage, getLocalStorageItem, setLocalStorageItem } from './storage';

describe('Local storage', () => {
  afterEach(() => {
    clearLocalStorage();
  });

  describe(setLocalStorageItem.name, () => {
    describe('when a primitive value is passed', () => {
      it('should save it', () => {
        setLocalStorageItem('hello', 'Hello!');
        expect(getLocalStorageItem('hello')).toEqual('Hello!');
      });
    });

    describe('when an object value is passed', () => {
      it('should serialize and save it', () => {
        setLocalStorageItem('hello', { key: 'value' });
        expect(getLocalStorageItem('hello')).toEqual('{"key":"value"}');
      });
    });
  });

  describe(getLocalStorageItem.name, () => {
    describe('when getting a non-existing value', () => {
      it('should return null', () => {
        expect(getLocalStorageItem('missingKey')).toEqual(null);
      });
    });
  });
});
