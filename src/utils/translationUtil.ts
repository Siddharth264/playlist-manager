/* eslint-disable @typescript-eslint/no-explicit-any */
type TranslationValue = string | { [key: string]: TranslationValue };
type TranslationVars = Record<string, string | number>;

type DotNotation<T extends Record<string, any>, Prefix extends string = ''> = {
  [K in keyof T]: T[K] extends Record<string, any>
    ? DotNotation<T[K], `${Prefix}${string & K}.`>
    : `${Prefix}${string & K}`;
}[keyof T];

type Translations = typeof import('../locales/en.json');
export type TranslationKey = DotNotation<Translations>;

import translations from '../locales/en.json';

export class TranslationError extends Error {
  constructor(key: string) {
    super(`Translation key not found: ${key}`);
    this.name = 'TranslationError';
  }
}

export const getNestedValue = (
  obj: Record<string, TranslationValue>,
  path: string
): string | undefined => {
  const value = path.split('.').reduce<TranslationValue | undefined>(
    (acc, key) => (acc as Record<string, TranslationValue>)?.[key],
    obj
  );
  return typeof value === 'string' ? value : undefined;
};

export const interpolateVariables = (
  text: string,
  vars: TranslationVars
): string => {
  return text.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    const value = vars[key];
    return value !== undefined ? String(value) : `{{${key}}}`;
  });
};

export const t = (key: TranslationKey, vars: TranslationVars = {}): string => {
  const value = getNestedValue(translations, key);
  
  if (!value) {
    console.warn(`Translation key not found: ${key}`);
    return key;
  }

  return interpolateVariables(value, vars);
};
