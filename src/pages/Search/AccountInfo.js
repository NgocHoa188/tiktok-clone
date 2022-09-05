import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { TickIcon } from '~/components/Icons';
import styles from './Search.module.scss';
import { handleNumber } from '~/utils/handleNumber';
import { clientAddress } from '~/utils/client';

const cx = classNames.bind(styles);

function AccountInfo(props) {
    return (
        <Link className={cx('account')} to={`/@${props.data.FullName}`}>
            <div className={cx('avatar')}>
                <img
                    style={{ borderRadius: '50%', width: '60px', height: '60px' }}
                    src={clientAddress + props.data.Avatar}
                    alt={props.data.FullName}
                ></img>
            </div>
            <div className={cx('account-title')}>
                <p className={cx('title')}>
                    {props.data.FullName} {props.data.Tick && <TickIcon />}
                </p>
                <div style={{ display: 'flex' }}>
                    <p className={cx('nickname')}>{props.data.NickName} &middot;</p>
                    <p style={{ fontWeight: '600', margin: '0px 3px 0px 3px' }}>{handleNumber(props.data.Followers)}</p>
                    Followers
                </div>
                <p
                    style={{
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        fontWeight: '400',
                    }}
                >
                    {props.data.Description}
                </p>
            </div>
        </Link>
    );
}

export default AccountInfo;
