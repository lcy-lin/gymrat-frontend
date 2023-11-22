import Image from "next/image";
export default function OrgCard({orgs}) {
    return (
        <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div class="flex items-center justify-between mb-4">
                <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Organizations</h5>
        </div>
        <div class="flow-root">
                <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                    {orgs?.map((item) => (
                        <li class="py-3 sm:py-4" key={item.id}>
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <Image class="w-8 h-8 rounded-full" src="/default/org.png" alt="Org image" width={8} height={8} />
                            </div>
                            <div class="flex-1 min-w-0 ms-4">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {item.name}
                                </p>
                            </div>
                        </div>
                    </li>
                    ))}
                </ul>
            </div>
        </div>

    );
}