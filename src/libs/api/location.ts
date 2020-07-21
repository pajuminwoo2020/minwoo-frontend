import {CancelTokenSource} from 'axios';
import {
  TLocation,
} from 'modules/location';
import apiClient from 'libs/api/apiClient';

export const getLocation = () => {
    return apiClient.get<TLocation>(`/intro/location`);
};