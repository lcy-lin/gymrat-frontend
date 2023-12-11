import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function CoachBar(props) {
    const [coachData, setCoachData] = useState(null);
    const { coach_id, cookies } = props;
    useEffect(() => {
        if (!cookies.accessToken || !coach_id || !cookies.userId) {
            return;
        }
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${coach_id}/profile`,{
            headers: {
                Authorization: `Bearer ${cookies.accessToken}`,
            },
        }).then((res) => {
            setCoachData(res.data.data.user);
        }).catch((err) => {
            console.log(err);
        });
    }, [coach_id, cookies.accessToken, cookies.userId]);
    return (
        <div className="flex flex-col border rounded-lg dark:text-white dark:border-gray-700 dark:bg-gray-800">
            <p className="flex justify-center font-semibold mb-2 dark:bg-gray-700 rounded-t-lg p-2">My Coach</p>
            <div className="pl-2 pb-2 pr-1">
                {coachData && (
                    <Link href={`/userpage/${coachData?.id}`}>
                        <div className="flex flex-row items-center gap-2 ">
                            {coachData?.picture ? (
                                <Image src={`${coachData.picture}`} height={50} width={50} alt="coach avatar"className="rounded-full border dark:border-gray-700"/>
                            ) : (
                                <Image src="/avatar.png" height={50} width={50} alt="coach avatar"className="rounded-full border dark:border-gray-700"/>
                            
                            )}
                            <p>{coachData.name}</p>
                        </div>
                    </Link>
                    )}
            </div>
        </div>
    );
}