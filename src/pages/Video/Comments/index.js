import React, { useState } from 'react';
import classnames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';

import styles from '../Video.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Button from '~/components/Button';
import { HearOutlineIcon, TickIcon, RedHeartCommentIcon } from '~/components/Icons';
import { handleNumber, handleTimeAgo } from '~/utils/handleNumber';
import { requestContent } from '~/utils/request';
import { clientAddress } from '~/utils/client';

const cx = classnames.bind(styles);

function Comments({ comment, isParrent = true, userId, inputRef, inputContentRef, handleIdComment }) {
    const [like, setLike] = useState(comment.IsLiked);

    const handleLikedComment = (commentId) => {
        requestContent
            .get('comments/LikedComment', {
                params: {
                    commentId,
                    uid: userId,
                },
            })
            .then((res) => {
                setLike(res.data);
                res.data ? (comment.Likes += 1) : (comment.Likes -= 1);
            });
    };

    const handleReplyUser = () => {
        inputRef.current.focus();
        var span = document.getElementsByClassName('reply-span')[0];
        if (typeof span !== 'undefined') {
            inputContentRef.current.removeChild(span);
        }
        span = document.createElement('span');
        span.className = 'reply-span';
        span.innerHTML = `Reply to @${comment.NickName}: `;
        span.style.marginRight = '8px';
        inputContentRef.current.prepend(span);
        handleIdComment(comment.Id);
    };

    return (
        <>
            <div
                className={cx(
                    'content-comment-container',
                    comment.TotalReply > 0 ? 'content-comment-container-reply' : '',
                )}
            >
                <div className={cx('info-comment')}>
                    <Tippy
                        delay={[500, 0]}
                        offset={[130, -10]}
                        placement={'bottom'}
                        interactive
                        render={(attr) => (
                            <div tabIndex="-1" {...attr}>
                                <PopperWrapper>
                                    <div className={cx('account-details')}>
                                        <div className={cx('details-header')}>
                                            <Link to={`/@${comment.FullName}`} className={cx('details-to')}>
                                                <img
                                                    alt={comment.NickName}
                                                    src={clientAddress + comment.Avatar}
                                                    className={cx('details-avatar')}
                                                ></img>
                                            </Link>
                                            <Button name="Follow" primary followDetail />
                                        </div>
                                        <Link to={`/@${comment.FullName}`}>
                                            <h4>
                                                {comment.FullName} {comment.Tick && <TickIcon />}
                                            </h4>
                                        </Link>
                                        <Link to={`/@${comment.FullName}`}>
                                            <h5>{comment.NickName}</h5>
                                        </Link>
                                        <p className={cx('details-user')}>
                                            <span className={cx('details-follower')}>
                                                {handleNumber(comment.Followers)}
                                            </span>
                                            <span className={cx('details-followerDesc')}>Followers</span>
                                            <span className={cx('details-likes')}>
                                                {handleNumber(comment.UserLikes)}
                                            </span>
                                            <span className={cx('details-likesDesc')}>Likes</span>
                                        </p>
                                    </div>
                                </PopperWrapper>
                            </div>
                        )}
                    >
                        <Link className={cx('comment-account')} to={`/@${comment.FullName}`}>
                            <img
                                className={cx(isParrent ? 'avatar-menu' : 'avatar-menu-child')}
                                alt={comment.NickName}
                                src={clientAddress + comment.Avatar}
                            />
                        </Link>
                    </Tippy>
                    <div className={cx('content-comment')}>
                        <span className={cx('name')}>
                            {comment.NickName} {comment.Tick && <TickIcon />}
                        </span>

                        <p className={cx('comment-username')}>{comment.Comment}</p>
                        <p className={cx('comment-createdDate')}>
                            <span>{handleTimeAgo(comment.CreatedDate)}</span>
                            <span className={cx('reply-comment')} onClick={() => handleReplyUser()}>
                                Reply
                            </span>
                        </p>
                    </div>
                    <div className={cx('likes-comment')} onClick={() => handleLikedComment(comment.Id)}>
                        <div className="icon-comment">{like ? <RedHeartCommentIcon /> : <HearOutlineIcon />}</div>
                        <div className={cx('like-comment')}>{comment.Likes}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Comments;
