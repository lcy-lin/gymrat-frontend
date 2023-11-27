import { useState } from 'react';
import Header from '@/components/Header';
import Title from '@/components/dashboard/Title';
import Sheet from '@/components/dashboard/Sheet';
import Weight from '@/components/dashboard/Weight';
import Meal from '@/components/dashboard/Meal';

export default function DashBoard() {
    const [records, setRecords] = useState('activity');
    return (
        <div className="dark:bg-gray-800 min-h-screen">
            <Header />
            <div className="flex flex-col">
                <div className="self-center">
                    <Title setRecords={setRecords}/>
                </div>
                {records === 'weight' && <Weight />}
                {records === 'activity' && <Sheet />}
                {records === 'meal' && <Meal />}
            </div>
        </div>
    );
}