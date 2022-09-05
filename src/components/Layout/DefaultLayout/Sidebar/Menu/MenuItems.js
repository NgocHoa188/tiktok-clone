import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Menu.moudle.scss';

const cx = classnames.bind(styles);

function MenuItem({ title, icon, to }) {
    return (
        <Link className={cx('menu-items')} to={to}>
            {icon}
            {title}
        </Link>
    );
}

export default MenuItem;
