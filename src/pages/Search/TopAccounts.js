import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { RightOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

import styles from './Search.module.scss';
import { requestContent } from '~/utils/request';
import Videos from './Videos';
import AccountInfo from './AccountInfo';

const cx = classNames.bind(styles);

function TopAccount({ showUser }) {
    const [video, setVideo] = useState([]);
    const data = useLocation().state.data;

    useEffect(() => {
        requestContent
            .get('videos/getvideos', {
                params: {
                    skip: 0,
                    take: 12,
                },
            })
            .then((res) => {
                setVideo(res.data);
            });
    }, []);

    return (
        <div className={cx('wrapper-account')}>
            {showUser && (
                <>
                    <div className={cx('header-title')}>
                        <h4 style={{ fontWeight: '700', fontSize: '1.6rem', flex: 1 }}>Accounts</h4>
                        <h4 style={{ cursor: 'pointer' }}>
                            See more <RightOutlined style={{ fontSize: '9px' }} />
                        </h4>
                    </div>
                    <AccountInfo data={data} />
                    <h3 style={{ fontWeight: '700', paddingTop: '20px' }}>Videos</h3>
                </>
            )}
            <div className={cx('video-list')}>
                {video.map((p, index) => (
                    <Videos key={p.Id} data={p} index={index}></Videos>
                ))}
            </div>
        </div>
    );
}

export default TopAccount;
