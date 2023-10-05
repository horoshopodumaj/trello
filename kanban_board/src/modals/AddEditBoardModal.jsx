import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AddEditBoardModal = ({ setBoardModalOpen, type }) => {
    const [name, setName] = useState("");
    const [newColumns, setNewColumns] = useState([
        { name: "Todo", task: [], id: uuidv4() },
        { name: "Doing", task: [], id: uuidv4() },
    ]);

    const onChange = (id, newValue) => {
        setNewColumns((prevState) => {
            const newState = [...prevState];
            const column = newState.find((col) => col.id === id);
            column.name = newValue;
            return newState;
        });
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
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddEditBoardModal;
