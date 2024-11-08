import { useState } from "react";

function App() {
    const [items, setItems] = useState([]);

    function handleAddItem(item) {
        setItems((items) => [...items, item]);
    }

    function handleDeleteItem(id) {
        setItems((items) => items.filter((item) => item.id !== id));
    }

    /* function handleDeleteItem(id) {
        setItems(function (items) {
            return items.filter(function (item) {
                return item.id !== id;
            });
        });
    } */

    return (
        <div className="app">
            <Logo />
            <Form onAddItems={(item) => handleAddItem(item)} />
            <PackingList items={items} onDeleteItem={(id) => handleDeleteItem(id)} />
            <Stats />
        </div>
    );
}

function Logo() {
    return <h1>🌴 Far Away 🌴</h1>;
}

function Form({ onAddItems }) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);

    function handleSubmit(event) {
        event.preventDefault();
        if (!description) {
            return;
        }

        const newItem = { description, quantity, packed: false, id: Date.now() };
        console.log(newItem);

        onAddItems(newItem);
        setDescription("");
        setQuantity(1);
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your 😍 trip?</h3>
            <select value={quantity} onChange={(event) => setQuantity(Number(event.target.value))}>
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                    <option value={num} key={num}>
                        {num}
                    </option>
                ))}
            </select>
            <input type="text" placeholder="item ..." value={description} onChange={(event) => setDescription(event.target.value)} />
            <button>Add</button>
        </form>
    );
}

function PackingList({ items, onDeleteItem }) {
    return (
        <div className="list">
            <ul>
                {items.map(item => (
                    <Item key={item.id} item={item} onDeleteItem={(id) => onDeleteItem(id)} />
                ))}
            </ul>
        </div>
    );
}

function Item({ item, onDeleteItem }) {
    return (
        <li>
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
        </li >
    );
}

function Stats() {
    return (
        <footer className="stats">
            <em>🎒 You have X items in your list, and you already packed X (X%).</em>
        </footer>);
}

export default App;
