import { useState } from "react";
import Center from "./components/Center";
import Header from "./components/Header";

function App() {
    const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
    return (
        <div className="">
            <Header isBoardModalOpen={isBoardModalOpen} setIsBoardModalOpen={setIsBoardModalOpen} />
            <Center />
        </div>
    );
}

export default App;
