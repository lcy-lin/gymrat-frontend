import Image from "next/image";
import Link from "next/link";

export default function StudentCard(props) {
    const { studentsData } = props;
    return (
        <div className="dark:bg-gray-800 dark:text-white border rounded-lg dark:border-gray-700 max-h-60">
            <p className="flex justify-center text-md font-semibold mb-2 dark:bg-gray-700 p-2 rounded-t-lg">Students</p>
            <div className="max-h-48 overflow-auto pl-2">
                {studentsData?.map((item) => (
                    <Link href={`/userpage/${item.id}`} key={item.id}>
                        <div className="flex flex-row mb-2 items-center gap-2">
                            { item.picture 
                                ? (
                                    <Image src={`${process.env.NEXT_PUBLIC_S3_URL}/${item.picture}`} height={50} width={50} alt="student avatar" className="rounded-full border dark:border-gray-700" />
                                )
                                :(
                                    <Image src="/avatar.png" height={50} width={50} alt="student avatar" className="rounded-full border dark:border-gray-700" />
                                )}
                            <span>{item.name}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}