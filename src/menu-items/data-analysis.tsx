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

const dataAnalysis: NavItemType = {
  id: 'data-analysis',
  title: <FormattedMessage id="data-analysis" />,
  type: 'group',
  url: '/data-analysis',
  icon: icons.ChromeOutlined
};

export default dataAnalysis;
