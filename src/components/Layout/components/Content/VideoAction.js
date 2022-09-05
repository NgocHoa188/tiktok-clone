import classNames from 'classnames/bind';
import { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { BlackHeartIcon, RedHeartIcon, DotIcon, ShareIcon } from '~/components/Icons';
import { handleNumber } from '~/utils/handleNumber';
import styles from './Content.module.scss';
import ShareMenu from '~/components/Popper/ShareMenu';
import { useUserAuth } from '~/context/UserAuthContext';
import { requestContent } from '~/utils/request';
import LoginModal from '../Login';
import { MENU_SHARED_ITEMS, MENU_SHARED_ITEMS_MORE } from '~/utils/Constant';

const cx = classNames.bind(styles);

function VideoAction({ data, videoRef }) {
    let navigate = useNavigate();
    const { user } = useUserAuth();
    const [like, setLike] = useState(data.Liked > 0);
    const [show, setShow] = useState(false);

    const handleLike = (id) => {
        if (user) {
            requestContent
                .get('videos/LikeVideo', {
                    params: {
                        videoId: id,
                        userId: user.uid,
                    },
                })
                .then((res) => {
                    setLike(res.data);
                });
        } else {
            setShow(true);
        }
    };

    const handleComment = (id) => {
        if (user) {
            var dataAddTime = {
                ...data,
                video: videoRef.current.currentTime,
                userId: user.uid,
            };
            navigate(`/video/@${data.FullName}`, { state: dataAddTime });
        } else {
            setShow(true);
        }
    };

    const hideModel = () => {
        setShow(false);
    };

    return (
        <div className={cx('video-action')}>
            <button className={cx('btn-likes')} onClick={() => handleLike(data.Id)}>
                <span className={cx('heart-icon')}>{like ? <RedHeartIcon /> : <BlackHeartIcon />}</span>
                <strong className={cx('likes')}>{handleNumber(data?.VideoLikes)}</strong>
            </button>
            <button className={cx('btn-comment')} onClick={() => handleComment(data.Id)}>
                <span className={cx('dots-icon')}>
                    <DotIcon />
                </span>
                <strong className={cx('coments')}>{handleNumber(data?.VideoComments)}</strong>
            </button>

            <ShareMenu
                items={MENU_SHARED_ITEMS}
                itemsMore={MENU_SHARED_ITEMS_MORE}
                children={
                    <button className={cx('btn-shared')}>
                        <span className={cx('shared-icon')}>
                            <ShareIcon />
                        </span>
                        <strong className={cx('shared')}>{handleNumber(data?.VideoShared)}</strong>
                    </button>
                }
            />
            <LoginModal showParent={show} close={hideModel} />
        </div>
    );
}

export default memo(VideoAction);
