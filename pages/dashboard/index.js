import Header from '@/components/Header';
import Title from '@/components/dashboard/Title';
import Sheet from '@/components/dashboard/Sheet';
import Weight from '@/components/dashboard/Weight';
export default function DashBoard() {
    return (
        <div className="dark:bg-gray-800 min-h-screen">
            <Header />
            <div className="flex flex-col">
                <div className="self-center">
                    <Title />
                </div>
                <Sheet />
            </div>
            {/* <Weight /> */}
        </div>
    );
}