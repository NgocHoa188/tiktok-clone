import { memo } from 'react';
import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Menu.moudle.scss';

const cx = classnames.bind(styles);

function Menu({ title, icon, to, titleColor }) {
    const classname = cx('title', {
        titleColor,
    });
    return (
        <Link className={cx('menu-items')} to={to}>
            {icon}
            <h2 className={cx(classname)} style={{ color: titleColor }}>
                {title}
            </h2>
        </Link>
    );
}

export default memo(Menu);
