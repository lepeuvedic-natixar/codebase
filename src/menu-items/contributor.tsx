// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { RocketOutlined } from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  RocketOutlined
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const contributor: NavItemType = {
  id: 'group-pages',
  type: 'group',
  children: [
    {
      id: 'contributor',
      title: <FormattedMessage id="contributor" />,
      type: 'collapse',
      icon: icons.RocketOutlined,
      children: [
        {
          id: 'contributor-analysis',
          title: <FormattedMessage id="contributor-analysis" />,
          type: 'item',
          url: '/contributor/analysis',
          target: true
        },
        {
          id: 'contributor-dashboard',
          title: <FormattedMessage id="contributor-dashboard" />,
          type: 'item',
          url: '/contributor/dashboard',
          target: true
        },
        {
          id: 'contributor-category-analysis',
          title: <FormattedMessage id="contributor-category-analysis" />,
          type: 'item',
          url: '/contributor/category-analysis',
          target: true
        }
      ]
    }
  ]
};

export default contributor;
