import Header from '~/components/Layout/components/Header';
import classname from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Sidebar from './Sidebar';

const cx = classname.bind(styles);

function DefaultLayout({ children, isHeader = true, isSidebar = true, backgroud }) {
    return (
        <div className={cx('wrapper')} style={{ backgroundColor: backgroud }}>
            {isHeader && <Header />}
            <div className={cx('container')}>
                <div className={cx('sidebar')}>{isSidebar && <Sidebar />}</div>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
