import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import crossIcon from "../assets/icon-cross.svg";
import boardsSlice from "../redux/boardSlice";

const AddEditTaskModal = ({ type, device, setOpenAddEditTask, taskIndex, prevColIndex = 0 }) => {
    const dispatch = useDispatch();
    const [isValid, setIsValid] = useState(true);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const board = useSelector((state) => state.boards).find((board) => board.isActive);

    const columns = board.columns;
    const col = columns.find((col, index) => index === prevColIndex);
    const task = col ? col.tasks.find((task, index) => index === taskIndex) : [];
    const [status, setStatus] = useState(columns[prevColIndex].name);
    const [newColIndex, setNewColIndex] = useState(prevColIndex);

    const [subtasks, setSubtasks] = useState([
        { title: "", isCompleted: false, id: uuidv4() },
        { title: "", isCompleted: false, id: uuidv4() },
    ]);

    const onChangeStatus = (e) => {
        setStatus(e.target.value);
        setNewColIndex(e.target.selectedIndex);
    };

    const validate = () => {
        setIsValid(false);
        if (!title.trim()) {
            return false;
        }
        for (let i = 0; i < subtasks.length; i++) {
            if (!subtasks[i].title.trim()) {
                return false;
            }
        }
        setIsValid(true);
        return true;
    };

    const onChangeSubtasks = (id, newValue) => {
        setSubtasks((prevState) => {
            const newState = [...prevState];
            const subtask = newState.find((subtask) => subtask.id === id);
            subtask.title = newValue;
            return newState;
        });
    };

    const onDelete = (id) => {
        setSubtasks((prevState) => prevState.filter((el) => el.id !== id));
    };

    const onSubmit = (type) => {
        if (type === "add") {
            dispatch(
                boardsSlice.actions.addTask({
                    title,
                    description,
                    subtasks,
                    status,
                    newColIndex,
                })
            );
        } else {
            dispatch(
                boardsSlice.actions.editTask({
                    title,
                    description,
                    subtasks,
                    status,
                    taskIndex,
                    prevColIndex,
                    newColIndex,
                })
            );
        }
    };

    return (
        <div
            onClick={(e) => {
                if (e.target !== e.currentTarget) {
                    return;
                }
                setOpenAddEditTask(false);
            }}
            className={
                device === "mobile"
                    ? "  py-6 px-6 pb-40  absolute overflow-y-scroll  left-0 flex  right-0 bottom-[-100vh] top-0 dropdown "
                    : "  py-6 px-6 pb-40  absolute overflow-y-scroll  left-0 flex  right-0 bottom-0 top-0 dropdown "
            }>
            <div
                className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  my-auto  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
     shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl">
                <h3 className=" text-lg ">{type === "edit" ? "Edit" : "Add New"} Task</h3>

                <div className="mt-8 flex flex-col space-y-1">
                    <label className="  text-sm dark:text-white text-gray-500" htmlFor="task-name-input">
                        Task Name
                    </label>
                    <input
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        id="task-name-input"
                        type="text"
                        className=" bg-transparent  px-4 py-2 outline-none focus:border-0 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0  "
                        placeholder=" Task Name"
                    />
                </div>

                <div className="mt-8 flex flex-col space-y-1">
                    <label className="  text-sm dark:text-white text-gray-500" htmlFor="task-description-input">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                        id="task-description-input"
                        className=" bg-transparent outline-none min-h-[200px] focus:border-0 px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px] "
                        placeholder="Description"
                    />
                </div>

                <div className="mt-8 flex flex-col space-y-3">
                    <label className="  text-sm dark:text-white text-gray-500">Subtasks</label>

                    {subtasks.map((subtask) => (
                        <div key={subtask.id} className=" flex items-center w-full ">
                            <input
                                type="text"
                                value={subtask.title}
                                onChange={(e) => onChangeSubtasks(subtask.id, e.target.value)}
                                className=" bg-transparent outline-none focus:border-0 flex-grow px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px]  "
                                placeholder="Subtasks"
                            />
                            <img
                                onClick={() => {
                                    onDelete(subtask.id);
                                }}
                                src={crossIcon}
                                className=" m-4 cursor-pointer "
                            />
                        </div>
                    ))}

                    <button
                        onClick={() => {
                            setSubtasks((state) => [...state, { title: "", isCompleted: false, id: uuidv4() }]);
                        }}
                        className=" w-full items-center dark:text-[#635fc7] dark:bg-white  text-white bg-[#635fc7] py-2 rounded-full ">
                        + Add New Subtask
                    </button>
                </div>

                <div className="mt-8 flex flex-col space-y-3">
                    <label className="  text-sm dark:text-white text-gray-500">Current Status</label>
                    <select
                        value={status}
                        onChange={onChangeStatus}
                        className=" select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0  border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none">
                        {columns.map((column) => (
                            <option key={column.id}>{column.name}</option>
                        ))}
                    </select>
                    <button
                        onClick={() => {
                            const isValid = validate();
                            if (isValid) {
                                onSubmit(type);
                                setOpenAddEditTask(false);
                                type === "edit" && setIsTaskModalOpen(false);
                            }
                        }}
                        className=" w-full items-center text-white bg-[#635fc7] py-2 rounded-full ">
                        {type === "edit" ? " Save edit" : "Create task"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddEditTaskModal;