import classname from 'classnames/bind';
import styles from './Popper.module.scss';

const cx = classname.bind(styles);

function Wrapper({ children })
{
    return (
        <div className={cx('wrapper')}>
            {children}
        </div>
    );
}

export default Wrapper;