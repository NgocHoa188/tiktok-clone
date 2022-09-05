import propTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    name,
    primary = false,
    outline = false,
    normal = false,
    to,
    href,
    onClick,
    icon,
    disabled = false,
    menu = false,
    separate = false,
    followDetail,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    // remove event disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classname = cx('wrapper', {
        primary,
        outline,
        normal,
        disabled,
        menu,
        separate,
        followDetail,
    });
    return (
        <Comp className={classname} {...props}>
            {icon && <span className={cx('style-icon')}>{icon}</span>}
            <span>{name}</span>
        </Comp>
    );
}

Button.propTypes = {
    name: propTypes.string,
    primary: propTypes.bool,
    outline: propTypes.bool,
    normal: propTypes.bool,
    to: propTypes.string,
    href: propTypes.string,
    onClick: propTypes.func,
    icon: propTypes.node,
    disabled: propTypes.bool,
    menu: propTypes.bool,
    separate: propTypes.bool,
};

export default Button;
