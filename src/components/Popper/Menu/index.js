import { useState, memo } from 'react';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Tippy from '@tippyjs/react/headless';
import propTypes from 'prop-types';
import MenuItems from './MenuItems';
import MenuHeader from './MenuHeader';
import className from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = className.bind(styles);

function Menu({ children, items = [], logOut, menu }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParrent = !!item.child;
            return (
                <MenuItems
                    key={index}
                    icon={item.icon}
                    title={item.title}
                    to={item.to}
                    separate={item.separate}
                    onClick={() => {
                        if (isParrent) {
                            setHistory((prev) => [...prev, item.child]);
                        } else if (item.separate) {
                            logOut();
                            window.location.reload();
                        }
                    }}
                />
            );
        });
    };

    return (
        <Tippy
            delay={[0, 500]}
            offset={[10, 10]}
            interactive
            placement="bottom-end"
            render={(attr) => (
                <div tabIndex="-1" {...attr}>
                    <PopperWrapper>
                        {history.length > 1 && (
                            <MenuHeader
                                title="Language"
                                onBack={() => {
                                    setHistory((prev) => prev.slice(0, prev.length - 1));
                                }}
                            />
                        )}
                        <div className={cx('language-content')}>{renderItems()}</div>
                    </PopperWrapper>
                </div>
            )}
            onHidden={() => {
                setHistory((prev) => prev.slice(0, 1));
            }}
            hideOnClick="false"
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    items: propTypes.array,
};

export default memo(Menu);
