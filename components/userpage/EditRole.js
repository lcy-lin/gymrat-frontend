import axios from "axios";
import {useState} from "react";
import AlertMessages from "@/utils/alertMessages";
import Swal from "sweetalert2";
import roleIdConverter from "@/utils/roleIdConverter";

export default function EditRole(props) {
    const {roles, edit, setEdit, setUserData, cookies} = props;
    const [coach, setCoach] = useState(false);
    const [student, setStudent] = useState(false);
    const handleSave = () => {
        let newRoles = [2];
        if (roles.includes('admin')) {
            newRoles.push(1);
        }
        if (coach) {
            newRoles.push(3);
        }
        if (student) {
            newRoles.push(4);
        }
        axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${cookies.userId}/role`, {
            roles: newRoles,
        }, {
            headers: {
                Authorization: `Bearer ${props.cookies.accessToken}`,
            },
        }).then((res) => {
            AlertMessages.success("Roles have been updated");
            const newRoles = res.data.data.roles.map((item) => roleIdConverter(item));
            setUserData((data) => {
                return {...data, role: newRoles};
            });
        }).catch((err) => {
            console.log(err);
            AlertMessages.error("Something went wrong");
        });
        setEdit(false);
    }
    const handleCancel = () => {
        setEdit(false);
    }
    return (
        <div className="flex flex-col items-center">
            <p className="font-semibold text-xl">Edit Role</p>
            <p className="font-semibold">Current Role</p>
            <div className="flex flex-col gap-2 items-center">
                {roles
                    .filter((item) => item !== 'user')
                    .map((item) => (
                    <p className="text-gray-400" key={item.id}>{item}</p>
                ))}
                <div className="flex flex-col gap-2">
                    <p className="font-semibold">New Role</p>
                    <div className="flex flex-row items-center gap-2">
                        <input 
                            type="checkbox"
                            name="role"
                            id="coach"
                            className="rounded-full"
                            checked={coach}
                            onChange={() => setCoach(!coach)}
                        />
                        <label htmlFor="coach">Coach</label>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <input
                            type="checkbox"
                            name="role"
                            id="student"
                            className="rounded-full"
                            checked={student}
                            onChange={() => setStudent(!student)}
                        />
                        <label htmlFor="athlete">Student</label>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-end gap-2">
                <button className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700" onClick={handleCancel}>Cancel</button>
                <button className="px-4 py-2 rounded-lg bg-blue-500 text-white" onClick={handleSave}>Save</button>
            </div>
        </div>
    );
}