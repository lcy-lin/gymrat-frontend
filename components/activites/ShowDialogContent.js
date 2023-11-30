import { DialogContent } from "@mui/material";
import TagBadge from "../TagBadge";
import { ThemeProvider } from "@mui/material";
export default function ShowDialogContent({activityData, preferredTheme, darkTheme, lightTheme}) {
    const shadow = "min-w-16 border p-2 rounded-lg dark:border-gray-600 dark:bg-gray-600"
    return(
        <ThemeProvider theme={preferredTheme === 'dark' ? darkTheme : lightTheme}>
            <DialogContent sx={{ paddingTop: "0", backgroundColor: preferredTheme === 'dark' ? "rgb(17 24 39)": "inherit" }}>
                {activityData && (
                <div className="dark:bg-gray-900">
                    <div className="m-2">
                       <div className="flex flex-wrap justify-between items-center">
                            <div className="flex gap-2 items-center mb-2">
                                <span className="w-16 font-semibold">ID:</span>
                                <p>{activityData.id}</p>
                            </div>
                            <div className="flex gap-2 items-center mb-2">
                                <span className="w-16 font-semibold">Date:</span>
                                <p>{activityData.created_at.split(' ')[0].replaceAll('-', '/')}</p>
                            </div>
                            <div className="flex gap-2 items-center mb-2">
                                <span className="w-16 font-semibold">Tags:</span>
                                <div className="flex gap-1">
                                {activityData.tags &&
                                    activityData.tags.map((tag) => (
                                    <TagBadge key={tag} tag={tag} />
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-2 items-center mb-2">
                                <span className="w-16 font-semibold">Public:</span>
                                <p>{activityData.publicity === 1 ? '✅' : '🔒'}</p>
                            </div>
                            <span className="flex gap-2 items-center mb-2">
                                <span className="w-fit font-semibold">Description:</span>
                                <p>{activityData.description}</p>
                            </span>
                        </div>

 
                        
                    </div>
                    <h3 className={`${shadow}`}>Movements</h3>
                    {activityData.movements && activityData.movements.map((movement, index) => (
                        <div key={movement.id} className=" flex flex-row p-2 rounded-xl dark:bg-gray-800 mb-4">
                            <span className="p-2">#{index+1}</span>
                            <div className="w-full">
                                <div className="flex flex-wrap justify-between mb-2">
                                    <span className="flex items-center gap-2">
                                        <span className={`${shadow}`}>Name</span>
                                        <p>{movement.name}</p>
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <span className={`${shadow}`}>Number of Sets</span>
                                        <p>{movement.num_of_sets}</p>
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <span className={`${shadow}`}>Reps Goal</span>
                                        <p>{movement.reps_goal}</p>
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <span className={`${shadow}`}>Weight</span>
                                        <p>{movement.weight}</p>
                                    </span> 
                                    <span className="flex items-center gap-2">
                                            <span className={`${shadow}`}>Description</span>
                                            <p>{movement.description}</p>
                                        </span> 
                                </div>
                                
                                <div className="flex flex-row mt-4">
                                    {/* <div> */}
                                        {/* <span className={`${shadow}`}>Sets</span> */}
                                        <table className="border border-collapse table-auto">
                                            <thead>
                                                <tr>
                                                    <th className="p-2 border border-gray-300 bg-gray-600">Set #</th>
                                                    <th className="p-2 border border-gray-300 bg-gray-600">Reps Done</th>
                                                    <th className="p-2 border border-gray-300 bg-gray-600">Strength Left</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {movement.sets &&
                                                movement.sets.sort((a, b) => a.set_num - b.set_num).map((set) => (
                                                <tr key={set.set_num}>
                                                    <td className="border border-gray-300 p-2 ">{set.set_num}</td>
                                                    <td className="border border-gray-300 p-2 ">{set.reps_achieved}</td>
                                                    <td className="border border-gray-300 p-2">{set.str_left}</td>
                                                </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </DialogContent>
    </ThemeProvider>
  );
}
