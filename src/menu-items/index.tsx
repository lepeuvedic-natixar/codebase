// project import
import climateChange from './climate-change';
import categoryAnalysis from './category-analysis';
import contributor from './contributor';
import dataAnalysis from './data-analysis';
import generalSettings from './general-settings';

// types
import { NavItemType } from 'types/menu';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [climateChange, categoryAnalysis, contributor, dataAnalysis, generalSettings]
};

export default menuItems;
