import classname from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';

import { requestContent } from '~/utils/request';
import { HomeIcon, FollowingIcon, LiveIcon, TickIcon } from '~/components/Icons';
import Menu from './Menu';
import styles from './Sidebar.module.scss';
import config from '~/config';
import AccountItem from '~/components/AccountItem';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Button from '~/components/Button';
import { handleNumber } from '~/utils/handleNumber';
import { clientAddress } from '~/utils/client';

const cx = classname.bind(styles);

const MENU_ITEMS = [
    {
        title: 'For You',
        to: config.routers.home,
        icon: <HomeIcon />,
        color: 'rgb(254, 44, 85)',
    },
    {
        title: 'Following',
        to: config.routers.following,
        icon: <FollowingIcon />,
    },
    {
        title: 'LIVE',
        to: config.routers.live,
        icon: <LiveIcon />,
    },
];

function Sidebar() {
    const [account, setAccount] = useState([]);
    const [followAccount, setfollowAccount] = useState([]);
    const [display, setDisplay] = useState('none');

    useEffect(() => {
        requestContent
            .get('users/', {
                params: {
                    take: 30,
                },
            })
            .then((res) => {
                setAccount(res.data);
            });
        requestContent
            .get('users/search', {
                params: {
                    q: 'h',
                    take: 5,
                },
            })
            .then((res) => {
                setfollowAccount(res.data);
            });
    }, []);

    return (
        <aside className={cx('wrapper')}>
            <div className={cx('menu')}>
                {MENU_ITEMS.map((obj, index) => (
                    <Menu key={index} title={obj.title} to={obj.to} icon={obj.icon} titleColor={obj.color} />
                ))}
            </div>
            <div className={cx('suggest-account')}>
                <p className={cx('suggest-title')}>Suggested accounts</p>
                {account.map((obj, index) => (
                    <Tippy
                        key={index}
                        delay={[500, 0]}
                        placement={'bottom'}
                        offset={[-10, 0]}
                        interactive
                        render={(attr) => (
                            <div tabIndex="-1" {...attr}>
                                <PopperWrapper>
                                    <div className={cx('account-details')}>
                                        <div className={cx('details-header')}>
                                            <Link to={`/@${obj.FullName}`} className={cx('details-to')}>
                                                <img
                                                    alt={obj.NickName}
                                                    src={clientAddress + obj.Avatar}
                                                    className={cx('details-avatar')}
                                                ></img>
                                            </Link>
                                            <Button name="Follow" primary followDetail />
                                        </div>
                                        <Link to={`/@${obj.FullName}`}>
                                            <h4>
                                                {obj.FullName} {obj.Tick && <TickIcon />}
                                            </h4>
                                        </Link>
                                        <Link to={`/@${obj.FullName}`}>
                                            <h5>{obj.NickName}</h5>
                                        </Link>
                                        <p className={cx('details-user')}>
                                            <span className={cx('details-follower')}>
                                                {handleNumber(obj.Followers)}
                                            </span>
                                            <span className={cx('details-followerDesc')}>Followers</span>
                                            <span className={cx('details-likes')}>{handleNumber(obj.Likes)}</span>
                                            <span className={cx('details-likesDesc')}>Likes</span>
                                        </p>
                                    </div>
                                </PopperWrapper>
                            </div>
                        )}
                    >
                        <Link
                            className={cx('wrapper-account')}
                            style={{ display: index > 4 ? display : '' }}
                            to={`/@${obj.FullName}`}
                        >
                            <img className={cx('avatar-menu')} alt={obj.NickName} src={clientAddress + obj.Avatar} />
                            <div className={cx('info')}>
                                <h4 className={cx('name')}>
                                    {obj.FullName} {obj.Tick && <TickIcon />}
                                </h4>

                                <p className={cx('username')}>{obj.NickName}</p>
                            </div>
                        </Link>
                    </Tippy>
                ))}
                <p className={cx('see')} onClick={() => setDisplay(display === '' ? 'none' : '')}>
                    {display === '' ? 'See less' : 'See all'}
                </p>
            </div>
            <div className={cx('following-account')}>
                <p className={cx('suggest-title')}>Following accounts</p>
                {followAccount.map((obj) => (
                    <AccountItem key={obj.Id} data={obj} imgCustom="avatar-menu" />
                ))}
            </div>
        </aside>
    );
}

export default Sidebar;
