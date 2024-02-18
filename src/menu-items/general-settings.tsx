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

const generalSettings: NavItemType = {
  id: 'general-settings',
  title: <FormattedMessage id="general-settings" />,
  type: 'group',
  url: '/general-settings',
  icon: icons.ChromeOutlined,
  divider: true,
};

export default generalSettings;
