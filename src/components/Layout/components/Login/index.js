import { useState, useEffect } from 'react';
import { Modal } from 'antd';

import 'antd/dist/antd.min.css'; // or 'antd/dist/antd.less'
import classNames from 'classnames/bind';

import styles from '../Header/Header.module.scss';
import {
    GoogleIcon,
    FacebookIcon,
    TwiterIcon,
    LineIcon,
    KakaotalkIcon,
    AppleIcon,
    InstagramIcon,
    CloseIcon,
    PeopleIcon,
    BackIcon,
    CloseEyesIcon,
    OpenEyesIcon,
} from '~/components/Icons';

import { useUserAuth } from '~/context/UserAuthContext';

const cx = classNames.bind(styles);
const LOGIN_ITEMS = [
    {
        title: 'Email / username',
        icon: <PeopleIcon />,
        handle: () => {},
    },
    {
        title: 'Continue with Google',
        icon: <GoogleIcon />,
    },
    {
        title: 'Continue with Facebook',
        icon: <FacebookIcon width={20} height={20} />,
    },
    {
        title: 'Continue with Twiter',
        icon: <TwiterIcon width={20} height={20} />,
    },
    {
        title: 'Continue with Line',
        icon: <LineIcon width={20} height={20} />,
    },
    {
        title: 'Continue with KakaoTalk',
        icon: <KakaotalkIcon />,
    },
    {
        title: 'Continue with Apple',
        icon: <AppleIcon />,
    },
    {
        title: 'Continue with Instagram',
        icon: <InstagramIcon />,
    },
];
function Login({ showParent, close }) {
    const { logInNoAuthen, logIn } = useUserAuth();
    const [login, setLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [message, setMessage] = useState('');
    const [btnLogin, setBtnLogin] = useState(true);

    const handleLogin = async () => {
        await logInNoAuthen(email, password).then((res) => {
            if (res.data) {
                logIn(res.data.Email, password);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                setMessage('Invalid account!');
            }
        });
    };
    useEffect(() => {
        if (email.trim().length > 0 && password.trim().length > 0) {
            setBtnLogin(false);
        } else {
            setBtnLogin(true);
        }
    }, [email, password]);

    return (
        <>
            <Modal
                visible={showParent}
                footer={null}
                closable={false}
                bodyStyle={{ height: '650px', borderRadius: '8px' }}
                destroyOnClose
                getContainer={false}
            >
                <div className={cx('login-modal')}>
                    <div
                        className={cx('close-btn')}
                        onClick={() => {
                            close();
                            setLogin(false);
                        }}
                    >
                        <CloseIcon />
                    </div>
                    <div className={cx('back-btn')} hidden={!login} onClick={() => setLogin(false)}>
                        <BackIcon />
                    </div>
                    <div className={cx('login-container')}>
                        <div className={cx('login-button')} hidden={login}>
                            <div className={cx('model-title')}>Log in to Hello</div>
                            {LOGIN_ITEMS.map((p, index) => (
                                <div
                                    key={index}
                                    className={cx('login-content')}
                                    onClick={() => p.handle && setLogin(true)}
                                >
                                    <div className={cx('login-icon')}>{p.icon}</div>
                                    {p.title}
                                </div>
                            ))}
                        </div>
                        <div className={cx('login-form')} hidden={!login}>
                            <div className={cx('model-title')}>Log in</div>
                            <div className={cx('login-des')}>Email or username</div>
                            <div>
                                <input
                                    value={email}
                                    placeholder="Email or username"
                                    className={cx('email')}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                            </div>
                            <div className={cx('password-block')}>
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    value={password}
                                    placeholder="Password"
                                    className={cx('password')}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                                <div className={cx('showpass-icon')} onClick={() => setShowPass(!showPass)}>
                                    {showPass ? <OpenEyesIcon /> : <CloseEyesIcon />}
                                </div>
                            </div>
                            <div className={cx('error-message')}>{message}</div>
                            <div>
                                <button
                                    className={cx(!btnLogin ? 'login-btn' : 'login-btn-dis')}
                                    onClick={() => handleLogin()}
                                >
                                    Log In
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            {/* <Modal
                className={cx('modal')}
                centered
                show={showParent}
                onHide={() => close()}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body className="modal-login">
                    <div className={cx('login-modal')}>
                        <div
                            className={cx('close-btn')}
                            onClick={() => {
                                close();
                                setLogin(false);
                            }}
                        >
                            <CloseIcon />
                        </div>
                        <div className={cx('back-btn')} hidden={!login} onClick={() => setLogin(false)}>
                            <BackIcon />
                        </div>
                        <div className={cx('login-container')}>
                            <div className={cx('login-button')} hidden={login}>
                                <div className={cx('model-title')}>Log in to Hello</div>
                                {LOGIN_ITEMS.map((p, index) => (
                                    <div
                                        key={index}
                                        className={cx('login-content')}
                                        onClick={() => p.handle && setLogin(true)}
                                    >
                                        <div className={cx('login-icon')}>{p.icon}</div>
                                        {p.title}
                                    </div>
                                ))}
                            </div>
                            <div className={cx('login-form')} hidden={!login}>
                                <div className={cx('model-title')}>Log in</div>
                                <div className={cx('login-des')}>Email or username</div>
                                <div>
                                    <input
                                        value={email}
                                        placeholder="Email or username"
                                        className={cx('email')}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className={cx('password-block')}>
                                    <input
                                        type={showPass ? 'text' : 'password'}
                                        value={password}
                                        placeholder="Password"
                                        className={cx('password')}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                    />
                                    <div className={cx('showpass-icon')} onClick={() => setShowPass(!showPass)}>
                                        {showPass ? <OpenEyesIcon /> : <CloseEyesIcon />}
                                    </div>
                                </div>
                                <div className={cx('error-message')}>{message}</div>
                                <div>
                                    <button
                                        className={cx(!btnLogin ? 'login-btn' : 'login-btn-dis')}
                                        onClick={() => handleLogin()}
                                    >
                                        Log In
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal> */}
        </>
    );
}

export default Login;
