import { useRef, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import TippyHeadless from '@tippyjs/react/headless';
import { CloseOutlined, Loading3QuartersOutlined } from '@ant-design/icons';

import { requestContent } from '~/utils/request';
import AccountItem from '~/components/AccountItem';
import { useDebounced } from '~/hooks';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Search.module.scss';
import { SearchIcon } from '~/components/Icons';
const cx = classNames.bind(styles);

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [valueSearch, setvalueSearch] = useState('');
    const [show, setShow] = useState(true);
    const [loading, setLoading] = useState(false);
    const ref = useRef();
    const debounced = useDebounced(valueSearch, 500);

    useEffect(() => {
        if (!debounced.trim()) {
            return;
        }

        setLoading(true);
        requestContent
            .get('users/search', {
                params: {
                    q: encodeURIComponent(debounced),
                    take: 5,
                },
            })
            .then((res) => {
                setSearchResult(res.data);
                setLoading(false);
            });
    }, [debounced]);

    const handleSearch = (value) => {
        if (value.trim() !== '') {
            setvalueSearch(value);
            setShow(true);
        } else {
            setvalueSearch('');
            setSearchResult([]);
            setShow(false);
            return;
        }
    };

    const handleHide = () => {
        setShow(false);
    };

    return (
        <TippyHeadless
            interactive
            visible={searchResult.length > 0 && show}
            render={(attr) => (
                <div tabIndex="-1" {...attr} className={cx('search-result')}>
                    <PopperWrapper>
                        <h5 className={cx('account')}>Accounts</h5>
                        {searchResult.map((obj) => (
                            <AccountItem
                                key={obj.Id}
                                data={obj}
                                searchResult={searchResult}
                                isSearch
                                handleHide={handleHide}
                            />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHide}
            interactiveDebounce
        >
            <div className={cx('search-content')}>
                <input
                    ref={ref}
                    value={valueSearch}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search accounts and videos"
                    className={cx('txtSearch')}
                    onFocus={() => setShow(true)}
                />
                {!loading && !!valueSearch && (
                    <div>
                        <button
                            onClick={() => {
                                setSearchResult([]);
                                setvalueSearch('');
                                ref.current.focus();
                            }}
                            className={cx('clear-btn')}
                        >
                            <CloseOutlined />
                        </button>
                    </div>
                )}

                {loading && <Loading3QuartersOutlined />}

                <button className={cx('search-btn')}>
                    <SearchIcon />
                </button>
            </div>
        </TippyHeadless>
    );
}

export default Search;
