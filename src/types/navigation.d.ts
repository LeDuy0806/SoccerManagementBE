import { ReactComponentElement } from 'react';

export interface IRoute {
  name: string;
  layout: string;
  icon: ReactComponentElement | string | undefined | any;
  secondary?: boolean;
  path: string;
}

export interface Title {
  name: string;
}
