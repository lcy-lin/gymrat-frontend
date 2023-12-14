import Image from "next/image";

export default function StudentButton (props) {
    const { user_id, picture, name, onClick } = props;

    return (
        <div role="button" tabIndex="0" className={`flex items-center w-full p-3 font-semibold rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none dark:text-white`} 
            onClick={onClick}
        >
            <div className="grid place-items-center mr-4">
            {picture 
                ? <Image src={`${process.env.NEXT_PUBLIC_S3_URL}/${picture}`} alt={name} width={40} height={40} className="object-cover w-12 h-12 rounded-full" />
                : <Image src="/avatar.png" alt={name} width={40} height={40} className="object-cover w-12 h-12 rounded-full" />
            }
            </div>
            {name}
        </div>
    )
}