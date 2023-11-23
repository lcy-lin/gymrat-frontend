import Header from '@/components/Header';
// import ThreeButtons from '@/components/dashboar4d/ThreeButtons';
import Title from '@/components/dashboard/Title';
import Sheet from '@/components/dashboard/Sheet';
export default function DashBoard() {
    return (
        <div className="dark:bg-gray-800">
            <Header />
            <div className="flex flex-col">
                <Title />
                <Sheet />
            </div>
            
        </div>
    );
}