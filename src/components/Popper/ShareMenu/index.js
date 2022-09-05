import Tippy from '@tippyjs/react/headless';
import className from 'classnames/bind';
import { useState } from 'react';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './ShareMenu.module.scss';

const cx = className.bind(styles);

function ShareMenu({ children, items = [], itemsMore = [] }) {
    const [item, setItem] = useState(items);

    const handleOnClick = (value) => {
        switch (value) {
            case 'ShowMore':
                return handleShowMore();
            default:
                return Error('Error');
        }
    };

    const handleShowMore = () => {
        setItem((pre) => [...pre.slice(0, pre.length - 1), ...itemsMore]);
    };

    const handleRender = () => {
        return item.map((obj, index) => {
            return (
                <div
                    key={index}
                    className={cx('content')}
                    onClick={() => handleOnClick(obj.handleShow)}
                    style={{ justifyContent: obj.styles }}
                >
                    {obj.icon}
                    <span className={cx('share-text')}>{obj.title}</span>
                </div>
            );
        });
    };

    return (
        <Tippy
            delay={[0, 500]}
            offset={[90, 0]}
            interactive
            placement={'top'}
            render={(attr) => (
                <div tabIndex="-1" {...attr} className={cx('wrapper')}>
                    <PopperWrapper>{handleRender()}</PopperWrapper>
                </div>
            )}
            onHidden={() => {
                setItem(items);
            }}
        >
            {children}
        </Tippy>
    );
}

export default ShareMenu;
