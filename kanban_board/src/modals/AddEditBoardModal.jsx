import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import crossIcon from "../assets/icon-cross.svg";
import boardsSlice from "../redux/boardSlice";

const AddEditBoardModal = ({ setBoardModalOpen, type }) => {
    const dispatch = useDispatch();
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [name, setName] = useState("");
    const [newColumns, setNewColumns] = useState([
        { name: "Todo", task: [], id: uuidv4() },
        { name: "Doing", task: [], id: uuidv4() },
    ]);
    const [isValid, setIsValid] = useState(true);

    if (type === "edit" && isFirstLoad) {
        setNewColumns(
            board.columns.map((col) => {
                return { ...col, id: uuidv4() };
            })
        );
        setName(board.name);
        setIsFirstLoad(false);
    }

    const validate = () => {
        setIsValid(false);
        if (!name.trim()) {
            return false;
        }
        for (let i = 0; i < newColumns.length; i++) {
            if (!newColumns[i].name.trim()) {
                return false;
            }
        }
        setIsValid(true);
        return true;
    };

    const onChange = (id, newValue) => {
        setNewColumns((prevState) => {
            const newState = [...prevState];
            const column = newState.find((col) => col.id === id);
            column.name = newValue;
            return newState;
        });
    };

    const onDelete = (id) => {
        setNewColumns((prevState) => prevState.filter((el) => el.id !== id));
    };

    const onSubmit = (type) => {
        setBoardModalOpen(false);
        if (type === "add") {
            dispatch(boardsSlice.actions.addBoard({ name, newColumns }));
        } else {
            dispatch(boardsSlice.actions.editBoard({ name, newColumns }));
        }
    };

    return (
        <div
            className=" fixed right-0 left-0 top-0 bottom-0 px-2 scrollbar-hide py-2 overflow-scroll z-50 justify-center items-center flex bg-[#00000080]"
            onClick={(e) => {
                if (e.target !== e.currentTarget) {
                    return;
                }
                setBoardModalOpen(false);
            }}>
            <div className=" scrollbar-hide overflow-y-scroll max-h-[95vh] bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl">
                <h3 className=" text-lg">{type === "edit" ? "Edit" : "Add New"} Board</h3>
                <div className="mt-8 flex flex-col space-y-3">
                    <label htmlFor="board-name-input" className=" text-sm dark:text-white text-gray-500">
                        Board Columns
                    </label>
                    <input
                        type="text"
                        name=""
                        id="board-name-input"
                        className=" bg-transparent px-4 py-2 rounded-md text-sm border border-gray-600 outline-none focus:outline-[#635fc7] outline-1 ring-0"
                        placeholder="Board Name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </div>
                <div className=" mt-8 flex flex-col space-y-3">
                    <label htmlFor="" className=" text-sm dark:text-white text-gray-500">
                        Board Columns
                    </label>
                    {newColumns.map((column) => (
                        <div className=" flex items-center w-full" key={column.id}>
                            <input
                                type="text"
                                className=" bg-transparent flex-grow px-4 py-2 rounded-md text-sm border border-gray-600 outline-none focus:outline-[#735fc7]"
                                value={column.name}
                                onChange={(e) => onChange(column.id, e.target.value)}
                            />
                            <img
                                src={crossIcon}
                                onClick={() => {
                                    onDelete(column.id);
                                }}
                                className=" m-4 cursor-pointer "
                            />
                        </div>
                    ))}
                    <div>
                        <button
                            className=" w-full items-center hover:opacity-70 dark:text-[#635fc7] dark:bg-white  text-white bg-[#635fc7] py-2 rounded-full "
                            onClick={() => {
                                setNewColumns((state) => [...state, { name: "", tasks: [], id: uuidv4() }]);
                            }}>
                            + Add New Column
                        </button>
                        <button
                            onClick={() => {
                                const isValid = validate();
                                if (isValid === true) onSubmit(type);
                            }}
                            className=" w-full items-center hover:opacity-70 dark:text-white dark:bg-[#635fc7] mt-8 relative  text-white bg-[#635fc7] py-2 rounded-full">
                            {type === "add" ? "Create New Board" : "Save Changes"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEditBoardModal;
