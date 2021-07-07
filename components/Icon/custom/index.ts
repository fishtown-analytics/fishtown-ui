export * from './faResourceTypeAnalysis';
export * from './faResourceTypeExposure';
export * from './faResourceTypeModel';
export * from './faResourceTypeSeed';
export * from './faResourceTypeSnapshot';
export * from './faResourceTypeSource';
export * from './faResourceTypeTest';

export type IconPrefix = 'fui';
export type IconPathData = string | string[];

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
}

export interface IconPack {
  [key: string]: IconDefinition;
}

export type IconName =
  | 'resource-type-exposure'
  | 'resource-type-model'
  | 'resource-type-source'
  | 'resource-type-test'
  | 'resource-type-seed'
  | 'resource-type-snapshot'
  | 'resource-type-analysis';
