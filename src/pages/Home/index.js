import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { requestContent } from '~/utils/request';
import Content from '~/components/Layout/components/Content';
import { LoadingIcon } from '~/components/Icons';
import { useUserAuth } from '~/context/UserAuthContext';
let skip = 2;
function Home() {
    const [videos, setVideos] = useState([]);
    const [hasMore, sethasMore] = useState(true);
    const { user } = useUserAuth();

    const fetchMoreData = () => {
        if (videos.length > 20) {
            sethasMore(false);
            return;
        }
        setTimeout(() => {
            requestContent
                .get('videos/GetVideos', {
                    params: {
                        skip,
                        take: 2,
                        userId: user !== null ? user.uid : '',
                    },
                })
                .then((res) => {
                    if (res.data.length === 0) {
                        sethasMore(false);
                        return;
                    }
                    setVideos([...videos, ...res.data]);
                });
            skip = videos.length + 2;
        }, 1000);
    };

    useEffect(() => {
        requestContent
            .get('videos/GetVideos', {
                params: {
                    skip: 0,
                    take: 2,
                    userId: user !== null ? user.uid : '',
                    // userId: 'Ba5yXarZkpMAGqwzqqxjO1spmsU2',
                },
            })
            .then((res) => {
                setVideos(res.data);
            });
    }, [user]);

    return (
        <InfiniteScroll
            dataLength={videos.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<LoadingIcon />}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            {videos.map((res, index) => (
                <Content key={index} data={res} />
            ))}
        </InfiniteScroll>
    );
}

export default Home;
