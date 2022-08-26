import { DataGroups } from '../dataUtils/DataTypes';

export enum Categories {
  SMILEYS_PEOPLE = 'smileys_people',
  ANIMALS_NATURE = 'animals_nature',
  FOOD_DRINK = 'food_drink',
  TRAVEL_PLACES = 'travel_places',
  ACTIVITIES = 'activities',
  OBJECTS = 'objects',
  SYMBOLS = 'symbols',
  FLAGS = 'flags'
}

const categoriesOrdered: Categories[] = [
  Categories.SMILEYS_PEOPLE,
  Categories.ANIMALS_NATURE,
  Categories.FOOD_DRINK,
  Categories.TRAVEL_PLACES,
  Categories.ACTIVITIES,
  Categories.OBJECTS,
  Categories.SYMBOLS,
  Categories.FLAGS
];

const configByCategory: Record<Categories, CategoryConfig> = {
  [Categories.SMILEYS_PEOPLE]: {
    category: Categories.SMILEYS_PEOPLE,
    name: 'Smileys & People'
  },
  [Categories.ANIMALS_NATURE]: {
    category: Categories.ANIMALS_NATURE,
    name: 'Animals & Nature'
  },
  [Categories.FOOD_DRINK]: {
    category: Categories.FOOD_DRINK,
    name: 'Food & Drink'
  },
  [Categories.TRAVEL_PLACES]: {
    category: Categories.TRAVEL_PLACES,
    name: 'Travel & Places'
  },
  [Categories.ACTIVITIES]: {
    category: Categories.ACTIVITIES,
    name: 'Activities'
  },
  [Categories.OBJECTS]: {
    category: Categories.OBJECTS,
    name: 'Objects'
  },
  [Categories.SYMBOLS]: {
    category: Categories.SYMBOLS,
    name: 'Symbols'
  },
  [Categories.FLAGS]: {
    category: Categories.FLAGS,
    name: 'Flags'
  }
};

export const baseCategoriesConfig = categoriesOrdered.map(
  category => configByCategory[category]
);

export function categoryFromCategoryConfig(category: CategoryConfig) {
  return category.category;
}

export function categoryNameFromCategoryConfig(category: CategoryConfig) {
  return category.name;
}

export type CategoriesConfig = CategoryConfig[];

export type CategoryConfig = {
  category: Categories;
  name: string;
};

export type UserCategoryConfig = Array<Categories | CategoryConfig>;

export function mergeCategoriesConfig(
  userCategoriesConfig: UserCategoryConfig = []
): CategoriesConfig {
  const base = baseCategoriesConfig;
  if (!userCategoriesConfig?.length) {
    return base;
  }

  return userCategoriesConfig.map(category => {
    if (typeof category === 'string') {
      return getBaseConfigByCategory(category);
    }

    return {
      ...getBaseConfigByCategory(category.category),
      ...category
    };
  });
}

function getBaseConfigByCategory(category: DataGroups) {
  return configByCategory[category];
}