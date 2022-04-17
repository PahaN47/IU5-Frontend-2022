import React, { useReducer, useState } from "react";

export function ToDoList() {
    const [items, editItems] = useReducer((curItems, action) => {
        console.log(action);
        if (action.type === 'remove')
            return curItems.filter((item) => !action.payload.includes(item));
        if (action.type === 'add')
            return curItems.concat(action.payload);
        return curItems;
    }, ['make a list']);

    return (
        <div>
            <h2>Yesterday you said tomorrow. So just DO it!!!! MAKE. YOUR DREAMS. COME TRUE!!!</h2>
            <div className='to-do-list'>
                <ItemList itemList={items}></ItemList>
                <ItemEdit parentListEditor={editItems}></ItemEdit>
            </div>
        </div>
    );
}

export function ItemList({ itemList, editMode }) {
    return (
        <form className='item-list'>
            {itemList.map((item) => <Item textContent={item} mode={editMode}></Item>)}
        </form>
    );
}

export function Item({ textContent, mode }) {
    const [text, setText] = useState(textContent);
    const [state, setState] = useState(false);
    console.log(`${textContent} created`);
    return (
        <div>
            <input type='checkbox' checked={state}
                onChange={() => setState((prevState) => !prevState)
                }>
            </input>
            {state ? (
                <del className='checked'>
                    {text}
                </del>) : (
                <span className='unchecked'>
                    {text}
                </span>
            )}
        </div>
    );
}

export function ItemEdit({ parentListEditor }) {
    const [value, setValue] = useState('');
    const editParent = parentListEditor;
    return (
        <div className='item-edit'>
            <input type='text' onChange={(e) => setValue(e.target.value)}></input>
            <button onClick={() => editParent({ type: 'add', payload: [value] })}>add</button>
        </div>
    );
}