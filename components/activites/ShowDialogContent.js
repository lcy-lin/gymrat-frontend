import { DialogContent, TextField } from "@mui/material";
import TagBadge from "../TagBadge";
import MultiSelect from "../dashboard/Select";
import { ThemeProvider } from "@mui/material";
import DetailTable from "./DetailTable";
export default function ShowDialogContent({activityData, editMode, setEditMode, updatedActivityData, setUpdatedActivityData, preferredTheme, darkTheme, lightTheme}) {
    const shadow = "min-w-16 mb-2 border p-2 rounded-lg dark:border-gray-600 dark:bg-gray-600"
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
                                    {editMode ? (
                                        <MultiSelect setTags={(tags) => setUpdatedActivityData({ ...updatedActivityData, tags })} />
                                    ) : (
                                        activityData.tags &&
                                            activityData.tags.map((tag) => (
                                            <TagBadge key={tag} tag={tag} />
                                        )))
                                    }

                                </div>
                            </div>
                            <div className="flex gap-2 items-center mb-2">
                                <span className="w-16 font-semibold">Public:</span>
                                {editMode ? (
                                    <TextField
                                        id="outlined-select-currency-native"
                                        select
                                        value={updatedActivityData.publicity}
                                        onChange={(e) => setUpdatedActivityData({ ...updatedActivityData, publicity: e.target.value })}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        >
                                        <option value={1}>✅</option>
                                        <option value={0}>🔒</option>
                                    </TextField>
                                ) : (
                                    <p>{activityData.publicity === 1 ? '✅' : '🔒'}</p>
                                )}
                            </div>
                            <div className="flex gap-2 items-center mb-2 w-full">
                                <span className="w-fit font-semibold">Description:</span>
                                {editMode ? (
                                    <div>
                                        {updatedActivityData.description.trim() === '' && (
                                            <p style={{ color: 'red' }}>Please enter a description</p>
                                        )}
                                        <TextField
                                            value={updatedActivityData.description}
                                            onChange={(e) => setUpdatedActivityData({ ...updatedActivityData, description: e.target.value })}
                                            multiline
                                            fullWidth
                                            variant="standard"
                                            size="small"
                                        />
                                    </div>
                                    ) : (
                                        <p>{activityData.description}</p>
                                    )}
                             </div>
                        </div>
                    </div>
                    <h3 className={`${shadow}`}>Movements</h3>
                    <DetailTable
                        movements={activityData.movements}
                        updatedActivityData={updatedActivityData}
                        setUpdatedActivityData={setUpdatedActivityData}
                        editMode={editMode}
                        preferredTheme={preferredTheme}
                        lightTheme={lightTheme}
                        darkTheme={darkTheme}
                    />
                    {/* {activityData.movements && activityData.movements.map((movement, index) => (
                        <div key={movement.id} className=" flex flex-row p-2 rounded-xl dark:bg-gray-800 mb-4">
                            <span className="p-2">#{index+1}</span>
                            <div className="w-full">
                                <div className="flex flex-wrap justify-between mb-2">
                                    <span className="flex items-center gap-2">
                                        <span className={`${shadow}`}>Name</span>
                                        {editMode ? (
                                            <TextField
                                                value={updatedActivityData.movements[index].name}
                                                onChange={(e) => setUpdatedActivityData({ ...updatedActivityData, movements: updatedActivityData.movements.map((m, i) => i === index ? { ...m, name: e.target.value } : m) })}
                                                multiline
                                                variant="standard"
                                                size="small"
                                                sx={{ width: "8rem"}}
                                            />
                                        ) : (
                                        <p>{movement.name}</p>
                                        )}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <span className={`${shadow}`}>Number of Sets</span>
                                        {editMode ? (
                                            <TextField
                                                value={updatedActivityData.movements[index].num_of_sets}
                                                onChange={(e) => setUpdatedActivityData({ ...updatedActivityData, movements: updatedActivityData.movements.map((m, i) => i === index ? { ...m, num_of_sets: e.target.value } : m)})}
                                                multiline
                                                variant="standard"
                                                size="small"
                                                sx={{ width: "3rem"}}
                                            />
                                        ) : (
                                            <p>{movement.num_of_sets}</p>
                                        )}
                                        
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <span className={`${shadow}`}>Reps Goal</span>
                                        {editMode ? (
                                            <TextField
                                                value={updatedActivityData.movements[index].reps_goal}
                                                onChange={(e) => setUpdatedActivityData({ ...updatedActivityData, movements: updatedActivityData.movements.map((m, i) => i === index ? { ...m, reps_goal: e.target.value } : m) })}
                                                multiline
                                                variant="standard"
                                                size="small"
                                                sx={{ width: "3rem"}}
                                            />
                                        ) : (
                                            <p>{movement.reps_goal}</p>
                                        )}
                                        
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <span className={`${shadow}`}>Weight</span>
                                        {editMode ? (
                                            <TextField
                                                value={updatedActivityData.movements[index].weight}
                                                onChange={(e) => setUpdatedActivityData({ ...updatedActivityData, movements: updatedActivityData.movements.map((m, i) => i === index ? { ...m, weight: e.target.value } : m) })}
                                                multiline
                                                variant="standard"
                                                size="small"
                                                sx={{ width: "5rem"}}
                                            />
                                        ) : (
                                            <p>{movement.weight}</p>
                                        )} 
                                        
                                    </span> 
                                    <span className="flex items-center gap-2 w-full">
                                            <span className={`${shadow}`}>Description</span>
                                            {editMode ? (
                                                <TextField
                                                    value={updatedActivityData.movements[index].description}
                                                    onChange={(e) => setUpdatedActivityData({ ...updatedActivityData, movements: updatedActivityData.movements.map((m, i) => i === index ? { ...m, description: e.target.value } : m) })}
                                                    multiline
                                                    variant="standard"
                                                    size="small"
                                                    fullWidth
                                                />
                                                ) : (
                                                    <p>{movement.description}</p>
                                                )} 
                                            
                                        </span> 
                                </div>
                                
                                
                                <div className="flex flex-row mt-4">
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
                    ))} */}
                </div>
            )}
        </DialogContent>
    </ThemeProvider>
  );
}
