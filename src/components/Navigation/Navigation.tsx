import { Menu } from 'antd';
import { MoneyCollectOutlined, SwapOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const navigationElements = [
  {
    icon: <MoneyCollectOutlined />,
    key: 'currencies',
    label: 'Currencies'
  },
  {
    icon: <SwapOutlined />,
    key: 'exchange',
    label: 'exchange'
  }
]

export const Navigation = () => {
  const location = useLocation()
  const activePage = location.pathname.substring(1)

  return (
    <Menu mode="horizontal" selectedKeys={[activePage]}>
      {navigationElements.map(navElement => (
        <Menu.Item key={navElement.key} icon={navElement.icon}>
          <Link to={navElement.key}>
            {navElement.label}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  )
}