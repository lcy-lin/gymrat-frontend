
const prices = {
  'free plan': 0,
  'standard plan': 49,
  'premium plan': 99,
};

export default function PricingCard({children}) {
  const isStandardPlan = children.toLowerCase() === 'standard plan';
  const isPremiumPlan = children.toLowerCase() === 'premium plan';
  const featureItems = [
    { text: 'Mobile Accessibility', iconColor: 'blue-400', textColor: 'gray-300' },
    { text: 'Weight, Workout, Calories Tracking', iconColor: 'blue-400', textColor: 'gray-300' },
    { text: 'Community and Social Features', iconColor: 'blue-400', textColor: 'gray-300' },
    { text: 'Progress Analytics', iconColor: isStandardPlan || isPremiumPlan ? 'blue-400' : 'gray-400', textColor: isStandardPlan || isPremiumPlan ? 'gray-300' : 'gray-500' },
    { text: 'Personalized Recommendations', iconColor: isStandardPlan || isPremiumPlan ? 'blue-400' : 'gray-400', textColor: isStandardPlan || isPremiumPlan ? 'gray-300' : 'gray-500' },
    { text: 'Meal Planning', iconColor: isPremiumPlan ? 'blue-400' : 'gray-400', textColor: isPremiumPlan ? 'gray-300' : 'gray-500' },
    { text: 'Challenges and Competitions', iconColor: isPremiumPlan ? 'blue-400' : 'gray-400', textColor: isPremiumPlan ? 'gray-300' : 'gray-500' },
  ];
  return (
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">{children}</h5>
        <div className="flex items-baseline text-gray-900 dark:text-white">
            <span className="text-3xl font-semibold">$</span>
            <span className="text-5xl font-extrabold tracking-tight">{prices[children.toLowerCase()]}</span>
            <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">/year</span>
        </div>
        <ul role="list" className="space-y-5 my-7">
            {featureItems.map((item, index) => (
            <li key={index} className={`flex ${item.iconColor == 'blue-600' ? '' : 'line-through decoration-gray-500'}`}>
                <svg className={`flex-shrink-0 w-4 h-4 text-${item.iconColor} dark:${item.iconColor}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                </svg>
                <span className={`text-base font-normal leading-tight text-${item.textColor} ms-3`}>{item.text}</span>
            </li>
            ))}
        </ul>
        <button type="button" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Choose plan</button>
    </div>

  );
}