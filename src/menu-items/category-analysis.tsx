// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { ChromeOutlined } from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  ChromeOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const categoryAnalysis: NavItemType = {
  id: 'category-analysis',
  title: <FormattedMessage id="category-analysis" />,
  type: 'group',
  url: '/category-analysis',
  icon: icons.ChromeOutlined
};

export default categoryAnalysis;
