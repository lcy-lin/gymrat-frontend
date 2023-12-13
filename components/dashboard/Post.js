import Image from 'next/image';
import ActCard from './ActCard';
import { Button } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';

export default function Post(props) {
    const {postData} = props;
    return (
        <div className="border rounded-xl dark:bg-gray-800 dark:border-gray-800 w-full p-2 ">
            <span className="flex flex-row items-center gap-2">
                { postData?.picture != null ? (
                    <Image src={`${process.env.NEXT_PUBLIC_S3_URL}/${postData?.picture}`} height={50} width={50} alt="student avatar" className="w-12 h-12 rounded-full border dark:border-gray-800" />
                ) : (
                    <Image src="/avatar.png" height={50} width={50} alt="student avatar" className="w-12 h-12 rounded-full border dark:border-gray-800" />
                )}
                <span className="flex flex-col">
                    <p className="font-semibold">{postData?.name}</p>
                    <p className="text-xs">{postData?.created_at.replaceAll('-','/')}</p>
                </span>
            </span>
            <ActCard data={postData}></ActCard>
            <hr className="dark:border-gray-700" />
            <Button
                color="primary"
                size="large"
                variant="filled"
                startIcon={<ThumbUpIcon />}
            >
                Like
            </Button>
            <Button
                color="primary"
                size="large"
                variant="filled"
                startIcon={<MapsUgcIcon />}
            >
                Comment
            </Button>
        </div>
    );
}