import { useState } from 'react';
import classNames from 'classnames/bind';
import { GlobalOutlined, QuestionCircleOutlined, ProfileOutlined, MoreOutlined } from '@ant-design/icons';

import Button from '~/components/Button';
import styles from './Header.module.scss';
import Menu from '~/components/Popper/Menu';

import LoginModal from '../Login';

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

const cx = classNames.bind(styles);

function Login() {
    const [show, setShow] = useState(false);

    const hideModel = () => {
        setShow(false);
    };

    return (
        <>
            <Button name="Login" primary onClick={() => setShow(true)} />
            <Menu
                items={MENU_ITEMS}
                children={
                    <i className={cx('show-more')}>
                        <MoreOutlined />
                    </i>
                }
            />
            <LoginModal showParent={show} close={hideModel} />
        </>
    );
}

export default Login;
