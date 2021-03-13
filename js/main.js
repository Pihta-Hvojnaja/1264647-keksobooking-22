import './project_modules/map.js';
import { rollBackMap } from './project_modules/map.js';

import './project_modules/form-ad.js';
import { passRollBackMap } from './project_modules/form-ad.js';

import './project_modules/form-filter.js';

//Передаем функцию rollBackMap из модуля map.js в модуль form-ad
passRollBackMap(rollBackMap);
