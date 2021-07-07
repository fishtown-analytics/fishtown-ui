/**
 * https://stackoverflow.com/questions/54417440/can-custom-icons-be-added-to-font-awesome-react
 */

import { IconDefinition, IconName, IconPack } from './custom';
import faResourceTypeAnalysis from './custom/faResourceTypeAnalysis';
import faResourceTypeExposure from './custom/faResourceTypeExposure';
import faResourceTypeModel from './custom/faResourceTypeModel';
import faResourceTypeSeed from './custom/faResourceTypeSeed';
import faResourceTypeSnapshot from './custom/faResourceTypeSnapshot';
import faResourceTypeSource from './custom/faResourceTypeSource';
import faResourceTypeTest from './custom/faResourceTypeTest';

export const PREFIX = 'fui';

const defaults = {
  ligatures: [] as string[],
  unicode: 'f778',
  svgPathData: [] as string[],
};

const capitalizeFirstLetter = (input: string) => {
  return input.charAt(0).toUpperCase() + input.slice(1);
};

const getFuiCamelCaseName = (iconName: string) => {
  return (
    PREFIX +
    iconName
      .split('-')
      .map((substring) => capitalizeFirstLetter(substring))
      .join()
  );
};

type CustomIconParams = {
  iconName: IconName;
  width: number;
  height: number;
  svgPathData: string[];
  ligatures?: string[];
  unicode?: string;
};

export const createCustomIcon = (params: CustomIconParams): IconDefinition => {
  const { iconName, width, height, svgPathData, ligatures, unicode } = {
    ...defaults,
    ...params,
  }; /*
  const definition: IconDefinition = {
    prefix: PREFIX,
    iconName,
    icon: [width, height, ligatures, unicode, svgPathData],
  };
  const faName = getFuiCamelCaseName(iconName);*/
  return {
    prefix: PREFIX,
    iconName, // NEW icon name breaks the types defined in fontawesome
    icon: [width, height, ligatures, unicode, svgPathData],
  };
};

/*
export interface IconLookup {
  prefix: IconPrefix;
  // IconName is defined in the code that will be generated at build time and bundled with this file.
  iconName: IconName;
}

export interface IconDefinition extends IconLookup {
  icon: [
    number, // width
    number, // height
    string[], // ligatures
    string, // unicode
    IconPathData // svgPathData
  ];
}*/

export const fuiIcons: IconPack = {
  faResourceTypeAnalysis,
  faResourceTypeExposure,
  faResourceTypeModel,
  faResourceTypeSeed,
  faResourceTypeSnapshot,
  faResourceTypeSource,
  faResourceTypeTest,
};
