export const handleNumber = (value) => {
    return new Intl.NumberFormat('en-US', {
        notation: 'compact',
        compactDisplay: 'short',
    }).format(value);
};

export const handleTime = (value) => {
    // let date = new Date(0);
    // date.setSeconds(value);
    // return date.toISOString().substring(14, 19);
    return '22:22';
};

export const handleTimeAgo = (value) => {
    const date = new Date(value);
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + 'y ago';
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + 'm ago';
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + 'd ago';
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + 'h ago';
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + 'm ago';
    }
    return Math.floor(seconds) + 's ago';
};
