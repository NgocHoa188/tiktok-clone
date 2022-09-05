import { ArrowLeftOutlined } from '@ant-design/icons';
import className from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = className.bind(styles);

function MenuHeader({ title, onBack }) {
    return (
        <header className={cx('header')}>
            <button className={cx('back-btn')} onClick={onBack}>
                <ArrowLeftOutlined />
                <h3 className={cx('header-title')}>{title}</h3>
            </button>
        </header>
    );
}

export default MenuHeader;
