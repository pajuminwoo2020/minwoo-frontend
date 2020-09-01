import {EProjectType} from 'enums/configs.enum';


export const Configs = {
  ENV: process.env.NODE_ENV,
  PROJECT: process.env.REACT_APP_PROJECT || EProjectType.LOCAL,
  API_HOST: process.env.REACT_APP_API_HOST || 'http://localhost:8000',
  SENTRY: process.env.REACT_APP_SENTRY,
  DEBUG: process.env.REACT_APP_PROJECT === EProjectType.LOCAL,
  EDITOR_API_KEY: process.env.EDITOR_API_KEY || 'gb33xv231s3fbp7qbgts3hee4wpuj8fx6truw5eo5l4hqvq6', // TinyMCE Editor 무료버젼
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || 'AIzaSyBXgBlI2Q9YaTBUCzHTqPFJHXY7r_P9qxY',
  // google map
};

export default Configs;
