import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import iconDown from "../assets/icon-chevron-down.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import ellipsis from "../assets/icon-vertical-ellipsis.svg";
import logo from "../assets/logo-mobile.svg";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import DeleteModal from "../modals/DeleteModal";
import boardsSlice from "../redux/boardSlice";
import ElipsisMenu from "./ElipsisMenu";
import HeaderDropdown from "./HeaderDropdown";

function Header({ boardModalOpen, setBoardModalOpen }) {
    const dispatch = useDispatch();

    const [openDropDown, setOpenDropDown] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [openAddEditTask, setOpenAddEditTask] = useState(false);
    const [isElipsionOpen, setIsElipsionOpen] = useState(false);

    const [boardType, setBoardType] = useState("add");

    const boards = useSelector((state) => state.boards);

    const board = boards.find((board) => board.isActive);

    const setOpenEditModal = () => {
        setBoardModalOpen(true);
        setIsElipsionOpen(false);
    };

    const setOpenDeleteModal = () => {
        setIsDeleteModalOpen(true);
        setIsElipsionOpen(false);
    };

    const onDeleteBtnClick = (e) => {
        if (e.target.textContent === "Delete") {
            dispatch(boardsSlice.actions.deleteBoard());
            dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
            setIsDeleteModalOpen(false);
        } else {
            setIsDeleteModalOpen(false);
        }
    };

    return (
        <div className="p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0">
            <header className="flex justify-between dark:text-white items-center">
                <div className=" flex items-center space-x-2 md:space-x-4">
                    <img src={logo} alt="logo" className="h-6 w-6 " />
                    <h3 className=" hidden md:inline-block font-bold font-sans md:text-4xl">Kanban</h3>
                    <div className=" flex items-center">
                        <h3 className=" truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans">{board.name}</h3>
                        <img src={openDropDown ? iconUp : iconDown} alt="dropdown icon" className=" w-3 ml-2 cursor-pointer md:hidden" onClick={() => setOpenDropDown((state) => !state)} />
                    </div>
                </div>

                <div className=" flex space-x-4 items-center md:space-x-6">
                    <button className=" hidden md:block button">+ Add New Task</button>
                    <button
                        className=" button py-1 px-3 md:hidden"
                        onClick={() => {
                            setOpenAddEditTask((state) => !state);
                        }}>
                        +
                    </button>
                    <img
                        src={ellipsis}
                        onClick={() => {
                            setBoardType("edit");
                            setOpenDropDown(false);
                            setIsElipsionOpen((state) => !state);
                        }}
                        alt="ellipsis"
                        className=" cursor-pointer h-6"
                    />

                    {isElipsionOpen && <ElipsisMenu type="Boards" setOpenEditModal={setOpenEditModal} setOpenDeleteModal={setOpenDeleteModal} />}
                </div>
            </header>

            {openDropDown && <HeaderDropdown setOpenDropDown={setOpenDropDown} setBoardModalOpen={setBoardModalOpen} />}

            {boardModalOpen && <AddEditBoardModal setBoardModalOpen={setBoardModalOpen} type={boardType} />}
            {openAddEditTask && <AddEditTaskModal device="mobile" setOpenAddEditTask={setOpenAddEditTask} type="add" />}

            {isDeleteModalOpen && <DeleteModal setIsDeleteModalOpen={setIsDeleteModalOpen} type="board" title={board.name} onDeleteBtnClick={onDeleteBtnClick} />}
        </div>
    );
}

export default Header;
