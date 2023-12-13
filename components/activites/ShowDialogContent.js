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
                                    <div className="w-full">
                                        {updatedActivityData.description.trim() === '' && (
                                            <p style={{ color: 'red' }}>Please enter a description</p>
                                        )}
                                        <input
                                            type="text"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required
                                            value={updatedActivityData.description}
                                            onChange={(e) => setUpdatedActivityData({ ...updatedActivityData, description: e.target.value })}
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
                </div>
            )}
        </DialogContent>
    </ThemeProvider>
  );
}
