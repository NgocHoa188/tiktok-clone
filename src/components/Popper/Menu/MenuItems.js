import className from 'classnames/bind';
import styles from './Menu.module.scss';

import Button from '~/components/Button';

const cx = className.bind(styles);

function MenuItems({ icon, title, onClick, to, separate }) {
    return <Button menu separate={separate} to={to} icon={icon} onClick={onClick} name={title}></Button>;
}

export default MenuItems;
