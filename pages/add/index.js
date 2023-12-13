import { useState } from 'react';
import Header from '@/components/Header';
import Title from '@/components/add/Title';
import Sheet from '@/components/add/Sheet';
import Weight from '@/components/add/Weight';
import Meal from '@/components/add/Meal';

export default function Add() {
    const [records, setRecords] = useState('activity');
    return (
        <div className="dark:bg-gray-800 min-h-screen">
            <Header />
            <div className="flex flex-col">
                <div className="self-center">
                    <Title setRecords={setRecords}/>
                </div>
                <div className="self-center">
                    {records === 'weight' && <Weight />}
                </div>
                {records === 'activity' && <Sheet />}
                <div className="w-1/2 self-center">
                    {records === 'meal' && <Meal />}
                </div>
                
            </div>
        </div>
    );
}