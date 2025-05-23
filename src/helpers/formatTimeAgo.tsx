import dayjs from 'dayjs';
import 'dayjs/locale/th';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
dayjs.locale('th');


export const FormatTimeAgo = (pastTime: dayjs.ConfigType) => {
    const past = dayjs(pastTime);
    const now = dayjs();
    const diffSeconds = now.diff(past, 'second');
    const diffMinutes = now.diff(past, 'minute');
    const diffHours = now.diff(past, 'hour');
    const diffDays = now.diff(past, 'day');
    const diffMonths = now.diff(past, 'month');
    const diffYears = now.diff(past, 'year');
    if (diffSeconds < 1) {
        return 'เมื่อสักครู่';
    } else if (diffSeconds < 60) {
        return `${diffSeconds} วินาทีที่แล้ว`;
    } else if (diffMinutes < 2) {
        return `${diffMinutes} นาทีที่แล้ว`;
    } else if (diffMinutes < 60) {
        return `${diffMinutes} นาทีที่แล้ว`;
    } else if (diffHours < 2) {
        return '1 ชั่วโมงที่แล้ว';
    } else if (diffHours < 24) {
        return `${diffHours} ชม. ที่แล้ว`;
    } else if (diffDays < 2) {
        return '1 วันที่แล้ว';
    } else if (diffDays < 30) {
        return `${diffDays} วันที่แล้ว`;
    } else if (diffMonths < 2) {
        return '1 เดือนที่แล้ว';
    } else if (diffMonths < 12) {
        return `${diffMonths} เดือนที่แล้ว`;
    } else if (diffYears < 2) {
        return '1 ปีที่แล้ว';
    } else {
        return `${diffYears} ปีที่แล้ว`;
    }
}


export const calculateTimeDifference = (startDate: any, endDate: any) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInSeconds = Math.floor((end.getTime() - start.getTime()) / 1000);
    if (differenceInSeconds < 60) {
        return `${differenceInSeconds} s`;
    } else if (differenceInSeconds < 60 * 60) {
        const minutes = Math.floor(differenceInSeconds / 60);
        const remainingSeconds = differenceInSeconds % 60;
        return `${minutes} mins${remainingSeconds > 0 ? ` ${remainingSeconds} s` : ''}`;
    } else if (differenceInSeconds < 60 * 60 * 24) {
        const hours = Math.floor(differenceInSeconds / (60 * 60));
        const remainingMinutes = Math.floor((differenceInSeconds % (60 * 60)) / 60);
        return `${hours} hours${remainingMinutes > 0 ? ` ${remainingMinutes} mins` : ''}`;
    } else if (differenceInSeconds < 60 * 60 * 24 * 30) { // ประมาณ 30 วันต่อเดือน
        const days = Math.floor(differenceInSeconds / (60 * 60 * 24));
        return `${days} days`;
    } else if (differenceInSeconds < 60 * 60 * 24 * 365) { // ประมาณ 365 วันต่อปี
        const months = Math.floor(differenceInSeconds / (60 * 60 * 24 * 30));
        return `${months} months`;
    } else if (differenceInSeconds > 60 * 60 * 24 * 365) {
        const years = Math.floor(differenceInSeconds / (60 * 60 * 24 * 365));
        return `${years} years`;
    } else {
        return `-`;
    }
}
