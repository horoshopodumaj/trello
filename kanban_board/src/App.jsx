import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Center from "./components/Center";
import EmptyBoard from "./components/EmptyBoard";
import Header from "./components/Header";
import boardsSlice from "./redux/boardSlice";

function App() {
    const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

    const dispatch = useDispatch();
    const boards = useSelector((state) => state.boards);
    const activeBoard = boards.find((board) => board.isActive);
    if (!activeBoard && boards.length > 0) dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));

    return (
        <div className=" overflow-hidden overflow-x-scroll">
            <>
                {boards.length > 0 ? (
                    <>
                        <Header isBoardModalOpen={isBoardModalOpen} setIsBoardModalOpen={setIsBoardModalOpen} />
                        <Center />
                    </>
                ) : (
                    <>
                        <EmptyBoard type="add" />
                    </>
                )}
            </>
        </div>
    );
}

export default App;
