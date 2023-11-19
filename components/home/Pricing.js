import PricingCard from "./PricingCard";

export default function Pricing() {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-gray-700 my-6 dark:text-white">
                Pricing Plan
            </h1>
            <div className="flex space-x-6">
                <PricingCard>Free Plan</PricingCard>
                <PricingCard>Standard Plan</PricingCard>
                <PricingCard>Premium Plan</PricingCard>
            </div>
        </div>
        
    );
}