import classNames from 'classnames/bind';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Search.module.scss';
import { clientAddress } from '~/utils/client';
import { handleNumber } from '~/utils/handleNumber';
import { PlayOutlineIcon } from '~/components/Icons';
import { useUserAuth } from '~/context/UserAuthContext';

const cx = classNames.bind(styles);

function Videos(props) {
    const { user } = useUserAuth();

    const data = props.data;
    const videoRef = useRef();
    const navigate = useNavigate();

    const handleHover = (e) => {
        if (e.type === 'mouseover') {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    const handleNavagate = () => {
        var dataAddTime = {
            ...data,
            video: videoRef.current.currentTime,
            userId: user ? user.uid : '',
        };
        navigate(`/video/@${data.FullName}`, { state: dataAddTime });
    };

    return (
        <div key={data.Id} className={cx('video-content')}>
            <video
                autoPlay={props.index === 0}
                muted
                ref={videoRef}
                className={cx('video')}
                src={clientAddress + data.VideoPath}
                onMouseOver={(e) => handleHover(e)}
                onMouseLeave={(e) => handleHover(e)}
                onClick={() => handleNavagate()}
            ></video>
            <div className={cx('video-des')} onClick={() => handleNavagate()}>
                <span>{data.Description}</span>
            </div>
            <div className={cx('video-info')}>
                <Link className={cx('video-author')} to={`/@${data.FullName}`}>
                    <img
                        style={{ width: '24px', height: '24px', borderRadius: '50%', marginRight: '4px' }}
                        alt={data.NickName}
                        src={clientAddress + data.Avatar}
                    ></img>
                    <span className={cx('nickname')}>{data.FullName}</span>
                </Link>
                <div className={cx('likes')}>
                    <PlayOutlineIcon /> {handleNumber(data.Likes)}
                </div>
            </div>
        </div>
    );
}

export default Videos;
