import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { TickIcon } from '~/components/Icons';
import { Link } from 'react-router-dom';
import { memo } from 'react';
import propTypes from 'prop-types';

import { clientAddress } from '~/utils/client';

const cx = classNames.bind(styles);

function AccountItem({ data, searchResult, imgCustom = 'avatar', isSearch = false, handleHide = () => {} }) {
    let urlTo = isSearch ? `/search?q=${data.FullName}` : `/@${data.FullName}`;
    return (
        <Link className={cx('wrapper')} to={urlTo} onClick={() => handleHide()} state={{ data, searchResult }}>
            <img className={cx(imgCustom)} alt={data.NickName} src={clientAddress + data.Avatar} />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    {data.FullName} {data.Tick && <TickIcon />}
                </h4>

                <p className={cx('username')}>{data.NickName}</p>
            </div>
        </Link>
    );
}

AccountItem.propTypes = {
    data: propTypes.object.isRequired,
};

export default memo(AccountItem);
