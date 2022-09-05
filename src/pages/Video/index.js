import { Fragment, useEffect, useRef, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import classnames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import TippyNormal from '@tippyjs/react';
import { Modal } from 'antd';

import styles from './Video.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Button from '~/components/Button';
import { handleNumber } from '~/utils/handleNumber';
import { requestContent } from '~/utils/request';
import {
    TwiterIcon,
    CodeIcon,
    FacebookIcon,
    TelegramIcon,
    BlackHeartIcon,
    DotIcon,
    ShareIcon,
    TickIcon,
    CommentAtIcon,
    EmojiIcon,
    DownArrowIcon,
    RedHeartIcon,
    WhatsAppIcon,
    PlayIcon,
    CloseIcon,
    MusicIcon,
} from '~/components/Icons';
import Comment from './Comments';
import { MENU_SHARED_ITEMS_MORE, EMOJI_LIST } from '~/utils/Constant';
import { useUserAuth } from '~/context/UserAuthContext';
import LoginModal from '~/components/Layout/components/Login';
import { clientAddress } from '~/utils/client';

const cx = classnames.bind(styles);
let id = 0;
let countBackspace = 0;
function Video() {
    const { user } = useUserAuth();
    const data = useLocation().state;
    const [comments, setComment] = useState([]);
    const [replyComments, setReplyComments] = useState([]);
    const [showPost, setShowPost] = useState(true);
    const [reply, setReply] = useState('');
    const [like, setLike] = useState(data.Liked > 0);
    const [showEmbed, setShowEmbed] = useState(false);
    const [play, setPlay] = useState(true);
    const [showModalLogin, setShowModalLogin] = useState(false);
    console.log(data);
    const videoRef = useRef();
    const inputRef = useRef();
    const inputContentRef = useRef();
    const contentCopyRef = useRef();
    const history = useNavigate();
    useEffect(() => {
        // Get video comment
        requestContent
            .get('comments/VideoComment', {
                params: {
                    videoId: data.Id,
                    uid: user ? data.userId : '0',
                },
            })
            .then((res) => {
                setComment(res.data);
            });
        videoRef.current.currentTime = data.video;
    }, []);

    //Get reply of comments
    const handleLoadReply = (id, event) => {
        requestContent
            .get('comments/ReplyComment', {
                params: {
                    commentId: id,
                },
            })
            .then((res) => {
                setReplyComments(res.data);
                event.target.style.display = 'none';
            });
    };

    // set show/ hide button post
    useEffect(() => {
        if (reply.length > 0) {
            setShowPost(true);
        } else {
            setShowPost(false);
        }
    }, [reply]);

    const handlePostReply = () => {
        requestContent
            .get('comments/InsertComment', {
                params: {
                    videoId: data.Id,
                    comment: reply,
                    userId: data.userId,
                    commentId: id,
                },
            })
            .then((res) => {
                setComment(res.data);
                setReply('');
                inputRef.current.textContent = '';
                if (id !== 0) {
                    var span = document.getElementsByClassName('reply-span')[0];
                    inputContentRef.current.removeChild(span);
                }
            });
    };

    // set id comment reply
    const handleIdComment = (value) => {
        id = value;
    };

    const handleEmoji = (value) => {
        inputRef.current.textContent += value;
        setReply(inputRef.current.textContent);
        moveCaretAtEnd(inputRef.current);
    };

    // remove reply to...
    const handleRemoveReply = (value, e) => {
        if (e.keyCode === 13) {
            if (value.trim().length > 0) {
                handlePostReply();
                return;
            }
        }
        const input = window.getComputedStyle(inputRef.current, ':before');
        if (value === '' && e.keyCode === 8) {
            countBackspace += 1;
        } else {
            countBackspace = 0;
        }
        if (countBackspace === 2 || (e.keyCode === 8 && input.getPropertyValue('content') === 'Add comment...')) {
            var span = document.getElementsByClassName('reply-span')[0];
            if (typeof span !== 'undefined') {
                inputContentRef.current.removeChild(span);
            }
            countBackspace = 0;
        }
        setReply(value);
    };

    const handleCopyLink = () => {
        contentCopyRef.current.style.opacity = 1;
        contentCopyRef.current.style.transition = 'opacity 500ms';
        setTimeout(function () {
            contentCopyRef.current.style.opacity = 0;
            contentCopyRef.current.style.transition = 'opacity 500ms';
        }, 1500);
        navigator.clipboard.writeText(document.getElementsByClassName(cx('link-txt'))[0].innerHTML);
    };

    // handle set carer to end when focus
    const moveCaretAtEnd = (e) => {
        var target = e;
        var range = document.createRange();
        var sel = window.getSelection();

        range.setStart(target, 1);
        range.collapse(true);

        sel.removeAllRanges();
        sel.addRange(range);
    };

    const handleLikeVideo = () => {
        if (user) {
            requestContent
                .get('videos/LikeVideo', {
                    params: {
                        videoId: data.Id,
                        userId: data.userId,
                    },
                })
                .then((res) => {
                    setLike(res.data);
                    res.data ? (data.VideoLikes += 1) : (data.VideoLikes -= 1);
                });
        } else {
            setShowModalLogin(true);
        }
    };

    const hideModel = () => {
        setShowModalLogin(false);
    };
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('video-container')}>
                    <div className={cx('video-content')}>
                        <video
                            autoPlay={true}
                            muted
                            ref={videoRef}
                            className={cx('video')}
                            src={clientAddress + data.VideoPath}
                            onClick={() => {
                                if (play) {
                                    videoRef.current.pause();
                                    setPlay(false);
                                    document.getElementsByClassName(cx('play-btn'))[0].style.display = 'block';
                                } else {
                                    videoRef.current.play();
                                    setPlay(true);
                                    document.getElementsByClassName(cx('play-btn'))[0].style.display = 'none';
                                }
                            }}
                            loop
                        />
                        <div
                            className={cx('play-btn')}
                            style={{ display: 'none' }}
                            onClick={(e) => {
                                if (play) {
                                    videoRef.current.pause();
                                    setPlay(false);
                                } else {
                                    videoRef.current.play();
                                    setPlay(true);
                                    if (e.target.localName === 'use') {
                                        e.target.parentNode.parentNode.style.display = 'none';
                                    } else {
                                        e.target.parentNode.style.display = 'none';
                                    }
                                }
                            }}
                        >
                            <PlayIcon width={70} height={70} />
                        </div>
                    </div>
                </div>
                <div className={cx('content-container')}>
                    <Tippy
                        delay={[500, 0]}
                        placement={'bottom'}
                        offset={[-10, 0]}
                        interactive
                        render={(attr) => (
                            <div tabIndex="-1" {...attr}>
                                <PopperWrapper>
                                    <div className={cx('account-details')}>
                                        <div className={cx('details-header')}>
                                            <Link to={`/@${data.FullName}`} className={cx('details-to')}>
                                                <img
                                                    alt={data.NickName}
                                                    src={clientAddress + data.Avatar}
                                                    className={cx('details-avatar')}
                                                ></img>
                                            </Link>
                                            <Button name="Follow" primary followDetail />
                                        </div>
                                        <Link to={`/@${data.FullName}`}>
                                            <h4>
                                                {data.FullName} {data.Tick && <TickIcon />}
                                            </h4>
                                        </Link>
                                        <Link to={`/@${data.FullName}`}>
                                            <h5>{data.NickName}</h5>
                                        </Link>
                                        <p className={cx('details-user')}>
                                            <span className={cx('details-follower')}>
                                                {handleNumber(data.Followers)}
                                            </span>
                                            <span className={cx('details-followerDesc')}>Followers</span>
                                            <span className={cx('details-likes')}>{handleNumber(data.Likes)}</span>
                                            <span className={cx('details-likesDesc')}>Likes</span>
                                        </p>
                                    </div>
                                </PopperWrapper>
                            </div>
                        )}
                    >
                        <div className={cx('info-container')}>
                            <Link className={cx('wrapper-account')} to={`/@${data.FullName}`}>
                                <img
                                    className={cx('avatar-menu')}
                                    alt={data.NickName}
                                    src={clientAddress + data.Avatar}
                                />
                                <div className={cx('info')}>
                                    <span className={cx('name')}>
                                        {data.FullName} {data.Tick && <TickIcon />}
                                    </span>

                                    <p className={cx('username')}>{data.NickName}</p>
                                </div>
                            </Link>
                            <Button name="Follow" outline followDetail />
                        </div>
                    </Tippy>
                    <div className={cx('main-container')}>
                        <p>{data.Description}</p>
                        <p className={cx('music')}>
                            {/* <FontAwesomeIcon icon={faMusic} className={cx('music-icon')} /> */}
                            <MusicIcon />
                            {data.Music}
                        </p>
                        <div className={cx('detail-container')}>
                            <div className={cx('share')}>
                                <div className={cx('like-share')}>
                                    <button className={cx('btn-likes')} onClick={() => handleLikeVideo()}>
                                        <span className={cx('heart-icon')}>
                                            {like ? (
                                                <RedHeartIcon width={20} height={20} />
                                            ) : (
                                                <BlackHeartIcon width={20} height={20} />
                                            )}
                                        </span>
                                        <strong className={cx('likes')}>{handleNumber(data?.VideoLikes)}</strong>
                                    </button>
                                    <button className={cx('btn-comment')}>
                                        <span className={cx('dots-icon')}>
                                            <DotIcon width={20} height={20} />
                                        </span>
                                        <strong className={cx('likes')}>{handleNumber(data?.VideoComments)}</strong>
                                    </button>
                                </div>
                                <div className={cx('icon-share')}>
                                    <TippyNormal content="Embed">
                                        <button className={cx('btnShare')} onClick={() => setShowEmbed(true)}>
                                            <CodeIcon />
                                        </button>
                                    </TippyNormal>
                                    <Modal visible={showEmbed} closable={false} width="432px" footer={null}>
                                        <div className={cx('modal-embed')}>
                                            <h3 className={cx('embed-title')}>Embed video</h3>
                                            <textarea
                                                readOnly=""
                                                rows="7"
                                                className={cx('embed-content')}
                                                defaultValue={`<blockquote class='tiktok-embed' cite='https://www.tiktok.com/@${data.FullName}/video/7124277370684493099'data-video-id='7124277370684493099' style='max-width: 605px;min-width:325px;' > <section> <a target='_blank' title='@thucnhobe'href='https://www.tiktok.com/@thucnhobe'>@thucnhobe</a> Ơ độngđất à <a title='gaixinh' target='_blank'href='https://www.tiktok.com/tag/gaixinh'>#gaixinh</a> <atitle='gaixinhtiktok' target='_blank'href='https://www.tiktok.com/tag/gaixinhtiktok'>#gaixinhtiktok</a><a title='xuhuong' target='_blank'href='https://www.tiktok.com/tag/xuhuong'>#xuhuong</a> <atitle='xuhuongtiktok' target='_blank'href='https://www.tiktok.com/tag/xuhuongtiktok'>#xuhuongtiktok</a><a target='_blank' title='♬ nhạc nền - Na Thỏ 🐇'href='https://www.tiktok.com/music/nhạc-nền-7124277270788901678'>♬nhạc nền - Na Thỏ 🐇</a> </section> </blockquote><script asyncsrc='https://www.tiktok.com/embed.js'></script>`}
                                            ></textarea>
                                            <p className={cx('embed-policy')}>
                                                By embedding this video, you confirm that you agree to our{' '}
                                                <a
                                                    href="https://www.tiktok.com/legal/terms-of-service?lang=en"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    Terms of Service
                                                </a>{' '}
                                                and acknowledge you have read and understood our{' '}
                                                <a
                                                    href="https://www.tiktok.com/legal/privacy-policy-row"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    {' '}
                                                    Privacy Policy.
                                                </a>
                                            </p>
                                            <button
                                                className={cx('embed-copy')}
                                                onClick={() => {
                                                    setShowEmbed(false);
                                                    handleCopyLink();
                                                }}
                                            >
                                                Copy code
                                            </button>
                                            <button className={cx('embed-close')} onClick={() => setShowEmbed(false)}>
                                                Close
                                            </button>
                                        </div>
                                    </Modal>
                                    <TippyNormal content="Send to friends">
                                        <button className={cx('btnShare')}>
                                            <TelegramIcon />
                                        </button>
                                    </TippyNormal>
                                    <TippyNormal content="Share to Facebook">
                                        <button className={cx('btnShare')}>
                                            <FacebookIcon />
                                        </button>
                                    </TippyNormal>
                                    <TippyNormal content="Share to WhatsApp">
                                        <button className={cx('btnShare')}>
                                            <WhatsAppIcon />
                                        </button>
                                    </TippyNormal>
                                    <TippyNormal content="Share to Twitter">
                                        <button className={cx('btnShare')}>
                                            <TwiterIcon />
                                        </button>
                                    </TippyNormal>

                                    <Tippy
                                        delay={[0, 500]}
                                        interactive
                                        placement={'bottom-end'}
                                        render={(attr) => (
                                            <div tabIndex="-1" {...attr} className={cx('')}>
                                                <PopperWrapper>
                                                    {MENU_SHARED_ITEMS_MORE.map((obj, index) => (
                                                        <div key={index} className={cx('content')}>
                                                            {obj.icon}
                                                            <span className={cx('share-text')}>{obj.title}</span>
                                                        </div>
                                                    ))}
                                                </PopperWrapper>
                                            </div>
                                        )}
                                    >
                                        <button className={cx('btnShare')}>
                                            <ShareIcon />
                                        </button>
                                    </Tippy>
                                </div>
                            </div>
                            <div className={cx('link')}>
                                <p className={cx('link-txt')}>
                                    {clientAddress}/video/@{data.FullName}
                                </p>
                                <button className={cx('copyLink')} onClick={() => handleCopyLink()}>
                                    Copy link
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('comment-container')}>
                        {comments.map((p) => (
                            <Fragment key={p.Id}>
                                <Comment
                                    key={p.Id}
                                    comment={p}
                                    userId={data.userId}
                                    inputRef={inputRef}
                                    inputContentRef={inputContentRef}
                                    handleIdComment={handleIdComment}
                                />
                                <div
                                    className={cx('more-comment', p.TotalReply <= 0 ? 'hide-more' : '')}
                                    onClick={(e) => handleLoadReply(p.Id, e)}
                                    id={p.Id}
                                >
                                    View more replies ({p.TotalReply})
                                    <div className={cx('more-icon')}>
                                        <DownArrowIcon width={14} height={14} />
                                    </div>
                                </div>
                                <div className={cx('reply-more-container')}>
                                    {replyComments.map((item) => {
                                        if (item.CommentId === p.Id) {
                                            return (
                                                <Comment
                                                    key={item.Id}
                                                    comment={item}
                                                    isParrent={false}
                                                    inputRef={inputRef}
                                                    inputContentRef={inputContentRef}
                                                    handleIdComment={handleIdComment}
                                                />
                                            );
                                        }
                                    })}
                                </div>
                            </Fragment>
                        ))}
                    </div>
                    <div className={cx('reply-container')}>
                        {user ? (
                            <div className={cx('type-comment')}>
                                <div className={cx('reply-txt-content')} ref={inputContentRef}>
                                    <div
                                        className={cx('reply-txt')}
                                        value={reply}
                                        ref={inputRef}
                                        contentEditable
                                        suppressContentEditableWarning
                                        onKeyUp={(e) => handleRemoveReply(e.target.textContent, e)}
                                    ></div>
                                </div>
                                <TippyNormal interactive content={'"@" a user to tag them in your comments'}>
                                    <div className={cx('comment-icon')}>
                                        <CommentAtIcon />
                                    </div>
                                </TippyNormal>
                                <Tippy
                                    placement={'bottom'}
                                    offset={[-170, 0]}
                                    interactive
                                    trigger="click"
                                    render={(attr) => (
                                        <div tabIndex="-1" {...attr}>
                                            <PopperWrapper>
                                                <div className={cx('comment-emoji-list')}>
                                                    <ul className={cx('emoji-suggest')}>
                                                        <li className={cx('emoji-icon-suggest')}>😀</li>
                                                    </ul>
                                                    <div className={cx('emoji-group')}>
                                                        <ul className={cx('emoji-group-ul')}>
                                                            {EMOJI_LIST.map((p, index) => (
                                                                <li
                                                                    key={index}
                                                                    className={cx('emoji-icon-group')}
                                                                    onClick={() => handleEmoji(p.title)}
                                                                >
                                                                    {p.title}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </PopperWrapper>
                                        </div>
                                    )}
                                >
                                    <TippyNormal interactive content="Click to add emojis" hideOnClick={false}>
                                        <div className={cx('emoji-icon')}>
                                            <EmojiIcon />
                                        </div>
                                    </TippyNormal>
                                </Tippy>
                            </div>
                        ) : (
                            <>
                                <div
                                    className={cx('type-comment')}
                                    style={{ color: '#fe2c55' }}
                                    onClick={() => {
                                        setShowModalLogin(true);
                                    }}
                                >
                                    Please log in to comment
                                </div>
                                <LoginModal showParent={showModalLogin} close={hideModel} />
                            </>
                        )}

                        <button
                            className={cx(showPost ? 'reply-post' : 'reply-post-dis')}
                            onClick={() => handlePostReply()}
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
            <div
                ref={contentCopyRef}
                className="notice-content"
                style={{
                    right: '30%',
                    position: 'fixed',
                    left: '30%',
                    top: '16px',
                    opacity: 0,
                    transition: 'opacity 500ms',
                }}
            >
                <div className={cx('notice-copy')}>
                    <span>Copied</span>
                </div>
            </div>
            <button
                className={cx('close-video')}
                style={{
                    background: 'rgba(255, 255, 255, 0.4)',
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    borderRadius: '50%',
                    alignItems: 'center',
                    display: 'flex',
                    padding: '8px',
                    cursor: 'pointer',
                }}
                onClick={() => history(-1)}
            >
                <CloseIcon fill="white" />
            </button>
        </>
    );
}

export default Video;
