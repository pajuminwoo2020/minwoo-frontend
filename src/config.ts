import {EProjectType} from 'enums/configs.enum';


export const Configs = {
  ENV: process.env.NODE_ENV,
  PROJECT: process.env.REACT_APP_PROJECT || EProjectType.LOCAL,
  API_HOST: process.env.REACT_APP_API_HOST || 'http://localhost:8000',
  SENTRY: process.env.REACT_APP_SENTRY,
  DEBUG: process.env.REACT_APP_PROJECT === EProjectType.LOCAL,
};

export default Configs;
