import { useState, useCallback, useEffect } from "react";

export const useCopyToClipboard = text =>
{
    const copyToClipboard = str =>
    {
        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        const selected =
            document.getSelection().rangeCount > 0
                ? document.getSelection().getRangeAt(0)
                : false;
        el.select();
        const success = document.execCommand('copy');
        document.body.removeChild(el);
        if (selected)
        {
            document.getSelection().removeAllRanges();
            document.getSelection().addRange(selected);
        }
        return success;
    };

    const [copied, setCopied] = useState(false);

    const copy = useCallback(() =>
    {
        if (!copied) setCopied(copyToClipboard(text));
    }, [text]);
    useEffect(() => () => setCopied(false), [text]);

    return [copied, copy];
};

export const formatTimeAgo = (date) =>
{
    const now = new Date();
    const diffInMilliseconds = now - date;

    if (diffInMilliseconds < 3600000)
    { // Less than an hour
        const minutes = Math.floor(diffInMilliseconds / 60000);
        return `${minutes}m`;
    } else if (diffInMilliseconds < 86400000)
    { // Less than a day
        const hours = Math.floor(diffInMilliseconds / 3600000);
        return `${hours}h`;
    } else if (diffInMilliseconds < 604800000)
    { // Less than a week
        const days = Math.floor(diffInMilliseconds / 86400000);
        return `${days}d`;
    } else
    {
        const week = Math.floor(diffInMilliseconds / 604800000);
        return `${week}w`;
    }
};