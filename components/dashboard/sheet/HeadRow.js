export default function HeadRow() {
    return (
      <div className="flex flex-row p-4 gap-2 rounded-xl bg-gray-100">
        <p className="w-10 border-r pr-2">#</p>
        <p className="w-48 border-r pr-2">name</p>
        <p className="w-20 border-r pr-2"># of sets</p>
        <p className="w-20 border-r pr-2"># of reps</p>
        <p className="w-20 border-r pr-2">weight</p>
        <p className="flex-grow">description</p>
      </div>
    );
  }
  