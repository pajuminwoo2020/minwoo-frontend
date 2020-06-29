import {get} from 'lodash';

function checkLocalStorage() {
  try {
    localStorage.setItem('bs', 'bs');
    localStorage.removeItem('bs');
    return true;
  } catch (e) {
    return false;
  }
}

class FallbackStorage {
  fallbackStorage: {
    [key: string]: string;
  } = {};

  valid: boolean = checkLocalStorage();

  setItem(key: string, value: any) {
    key = `BS_${key}`;
    const string = JSON.stringify(value);

    if (this.valid) {
      localStorage.setItem(key, string);
      return;
    }
    this.fallbackStorage[key] = string;
  }

  getItem(key: string) {
    key = `BS_${key}`;
    let value = this.valid ? localStorage.getItem(key) : this.fallbackStorage[key];

    try {
      return JSON.parse(value || '');
    } catch (e) {
      return null;
    }
  }

  removeItem(key: string) {
    key = `BS_${key}`;

    if (this.valid) {
      localStorage.removeItem(key);
      return;
    }
    delete this.fallbackStorage[key];
  }
}

const storage = new FallbackStorage();

export default storage;
