import React, { useReducer, useState } from "react";

export function ToDoList() {
    const [items, editItems] = useReducer((curItems, action) => {
        if (action.type === 'remove')
            return curItems.filter((item) => !action.payload.includes(item));
        if (action.type === 'add')
            return curItems.concat(action.payload.reduce((result, item) => {
                let lastId = result.length === 0 ?
                    curItems[curItems.length - 1].id : result[result.length - 1].id;
                lastId++;
                result.push({ text: item, id: lastId });
                return result;
            }, []));
        if (action.type === 'edit') {
            let index =
                curItems.findIndex((item) => action.payload[0].id === item.id);
            curItems[index].text = action.payload[0].text;
            return curItems;
        }
        return curItems;
    }, [{ text: 'make a list', id: 0 }]);

    return (
        <div>
            <h2>Yesterday you said tomorrow. So just DO it!!!! MAKE. YOUR DREAMS. COME TRUE!!!</h2>
            <div className='to-do-list'>
                <ItemList itemList={items} parentListEditor={editItems}></ItemList>
                <ItemEdit parentListEditor={editItems}></ItemEdit>
            </div>
        </div>
    );
}

export function ItemList({ itemList, parentListEditor }) {
    return (
        <form className='item-list'>
            {itemList.map((item) =>
                <Item itemId={item.id} textContent={item.text} parentListEditor={parentListEditor}>
                </Item>)}
        </form>
    );
}

export function Item({ itemId, textContent, parentListEditor }) {
    const [id, setId] = useState(itemId);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState(textContent);
    const [state, setState] = useState(false);
    const editParent = parentListEditor;
    return (
        <div className='item'>
            {!edit ? (
                <input type='checkbox' checked={state}
                    onChange={() => setState((prevState) => !prevState)}></input>
            ) : (<></>)}
            {!edit ?
                state ? (
                    <del className='checked'>
                        {text}
                    </del>) : (
                    <span className='unchecked' onClick={() => setEdit(true)}>
                        {text}
                    </span>
                ) : (
                    <span className='editted'>
                        <input type='text' value={text} onChange={(e) => setText(e.target.value)}>
                        </input>
                        <button onClick={() => {
                            setEdit(false);
                            editParent({ type: 'edit', payload: [{ text: text, id: id }] })
                        }}>
                            ok
                        </button>
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