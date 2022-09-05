import classNames from 'classnames/bind';
import {
    GlobalOutlined,
    QuestionCircleOutlined,
    ProfileOutlined,
    UserOutlined,
    EuroCircleOutlined,
    SettingOutlined,
    LogoutOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import Tippy from '@tippyjs/react';
import { Link } from 'react-router-dom';

import routesConfig from '~/config/routes';
import { MessageIcon, InboxIcon } from '~/components/Icons';
import 'tippy.js/dist/tippy.css';
import Button from '~/components/Button';
import styles from './Header.module.scss';
import image from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import SearchA from '../Search';
import Login from './Login';
import { useUserAuth } from '~/context/UserAuthContext';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <GlobalOutlined />,
        title: 'English',
        child: {
            title: 'Language',
            data: [
                {
                    title: 'Viet Nam',
                },
                {
                    title: 'English',
                },
                {
                    title: 'Korea',
                },
            ],
        },
    },
    {
        icon: <QuestionCircleOutlined />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <ProfileOutlined />,
        title: 'Keyboard shortcuts',
    },
];

const MENU_USER_ITEMS = [
    {
        icon: <UserOutlined />,
        title: 'View profile',
    },
    {
        icon: <EuroCircleOutlined />,
        title: 'Get coins',
    },
    {
        icon: <SettingOutlined />,
        title: 'Settings',
    },
    ...MENU_ITEMS,
    {
        icon: <LogoutOutlined />,
        title: 'Logout',
        separate: true,
    },
];

function Header() {
    const { user, logOut } = useUserAuth();

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={routesConfig.home} className={cx('logo')}>
                    <img src={image.logo} alt="hello" />
                </Link>
                <SearchA />
                <div className={cx('actions')}>
                    {user ? (
                        <Link to="/upload" className={cx('upload-btn')}>
                            <PlusOutlined /> Upload
                        </Link>
                    ) : (
                        <Button name="Upload" normal icon={<PlusOutlined />}>
                            Upload
                        </Button>
                    )}

                    {user ? (
                        <>
                            <Tippy content="Message">
                                <button className={cx('message')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy content="Inbox">
                                <button className={cx('inbox')}>
                                    <InboxIcon />
                                </button>
                            </Tippy>
                            <Menu logOut={logOut} items={MENU_USER_ITEMS} children={<i className={cx('user')}></i>} />
                        </>
                    ) : (
                        <>
                            <Login />
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
