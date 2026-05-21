import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { Navbar } from "../Components/Navbar.jsx"
import { G4Sfooter } from "../Components/Footer.jsx"
import { Plus, Check, Trash2, ShoppingCart, Pencil, X } from "lucide-react"
import "./HomePage.css"
import "./Components.css"
import "./ShoppingListPage.css"
import api from "../services/recipeService.js"

export default function ShoppingList() {
    const navigate = useNavigate()
    const [items, setItems] = useState([])
    const [showAddForm, setShowAddForm] = useState(false)
    const [newItem, setNewItem] = useState({ name: "", quantity: "", price: "" })
    const [editingId, setEditingId] = useState(null)
    const [editItem, setEditItem] = useState({ name: "", quantity: "", price: "" })

    useEffect(() => {
        api.get("/ShoppingItem")
            .then(res => setItems(res.data))
            .catch(err => console.error("Failed to fetch shopping items", err))
    }, [])

    function handleAdd(e) {
        e.preventDefault()
        api.post("/ShoppingItem", {
            name: newItem.name,
            quantity: newItem.quantity,
            price: Number(newItem.price) || 0,
            isChecked: false,
        })
            .then(() => {
                setNewItem({ name: "", quantity: "", price: "" })
                setShowAddForm(false)
                api.get("/ShoppingItem").then(res => setItems(res.data))
            })
            .catch(err => console.error("Failed to add item", err))
    }

    function handleToggle(item) {
        api.put(`/ShoppingItem/${item.id}`, {
            ...item,
            isChecked: !item.isChecked,
        })
            .then(() => {
                api.get("/ShoppingItem").then(res => setItems(res.data))
            })
            .catch(err => console.error("Failed to update item", err))
    }

    function handleDelete(id) {
        if (window.confirm("Remove this item from your list?")) {
            api.delete(`/ShoppingItem/${id}`)
                .then(() => {
                    api.get("/ShoppingItem").then(res => setItems(res.data))
                })
                .catch(err => console.error("Failed to delete item", err))
        }
    }

    function handleStartEdit(item) {
        setEditingId(item.id)
        setEditItem({ name: item.name, quantity: item.quantity, price: item.price })
    }

    function handleEditSave(item) {
        api.put(`/ShoppingItem/${item.id}`, {
            ...item,
            name: editItem.name,
            quantity: editItem.quantity,
            price: Number(editItem.price) || 0,
        })
            .then(() => {
                setEditingId(null)
                api.get("/ShoppingItem").then(res => setItems(res.data))
            })
            .catch(err => console.error("Failed to update item", err))
    }

    function getEstimatedTotal() {
        return items.reduce((total, item) => total + item.price, 0).toFixed(2)
    }

    return (
        <>
            <div className="Home">
                <Navbar />
                <main className="ShoppingList-main">
                    <ShoppingListHeader
                        totalItems={items.length}
                        estimatedTotal={getEstimatedTotal()}
                        onAddClick={() => setShowAddForm(!showAddForm)}
                    />

                    {showAddForm && (
                        <ShoppingListAddForm
                            newItem={newItem}
                            setNewItem={setNewItem}
                            onSubmit={handleAdd}
                            onCancel={() => setShowAddForm(false)}
                        />
                    )}

                    {items.length === 0 && !showAddForm ? (
                        <ShoppingListEmpty navigate={navigate} />
                    ) : (
                        <div className="ShoppingList-items">
                            {items.map(item => (
                                <ShoppingListItem
                                    key={item.id}
                                    item={item}
                                    onToggle={() => handleToggle(item)}
                                    onDelete={() => handleDelete(item.id)}
                                    isEditing={editingId === item.id}
                                    editItem={editItem}
                                    setEditItem={setEditItem}
                                    onStartEdit={() => handleStartEdit(item)}
                                    onEditSave={() => handleEditSave(item)}
                                    onEditCancel={() => setEditingId(null)}
                                />
                            ))}
                        </div>
                    )}

                    <ShoppingListBanner navigate={navigate} />
                </main>
                <div className="Home-footer-wrapper"></div>
                <G4Sfooter />
            </div>
        </>
    )
}

function ShoppingListHeader({ totalItems, estimatedTotal, onAddClick }) {
    return (
        <>
            <header className="ShoppingList-header">
                <div>
                    <h1 className="ShoppingList-title">Shopping List</h1>
                    <div className="ShoppingList-meta">
                        <span>{totalItems} item{totalItems !== 1 ? "s" : ""}</span>
                        <span className="ShoppingList-meta-dot"></span>
                        <span>Est. total: €{estimatedTotal}</span>
                    </div>
                </div>
                <button className="ShoppingList-add-btn" onClick={onAddClick}>
                    <Plus size={18} />
                    Add item
                </button>
            </header>
        </>
    )
}

function ShoppingListAddForm({ newItem, setNewItem, onSubmit, onCancel }) {
    return (
        <>
            <form className="ShoppingList-add-form" onSubmit={onSubmit}>
                <input
                    className="ShoppingList-add-input"
                    type="text"
                    placeholder="Item name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    required
                    autoFocus
                />
                <input
                    className="ShoppingList-add-input ShoppingList-add-input-small"
                    type="text"
                    placeholder="Qty (e.g. 500g)"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                    required
                />
                <input
                    className="ShoppingList-add-input ShoppingList-add-input-small"
                    type="number"
                    step="0.01"
                    placeholder="Price (€)"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                />
                <button className="ShoppingList-add-form-btn" type="submit">Add</button>
                <button className="ShoppingList-add-form-cancel" type="button" onClick={onCancel}>Cancel</button>
            </form>
        </>
    )
}

function ShoppingListItem({ item, onToggle, onDelete, isEditing, editItem, setEditItem, onStartEdit, onEditSave, onEditCancel }) {
    if (isEditing) {
        return (
            <>
                <div className="ShoppingList-item ShoppingList-item-editing">
                    <div className="ShoppingList-item-left" style={{ flex: 1 }}>
                        <input
                            className="ShoppingList-edit-input"
                            type="text"
                            value={editItem.name}
                            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                            autoFocus
                        />
                    </div>
                    <div className="ShoppingList-item-right">
                        <input
                            className="ShoppingList-edit-input ShoppingList-edit-input-small"
                            type="text"
                            value={editItem.quantity}
                            onChange={(e) => setEditItem({ ...editItem, quantity: e.target.value })}
                            placeholder="Qty"
                        />
                        <input
                            className="ShoppingList-edit-input ShoppingList-edit-input-small"
                            type="number"
                            step="0.01"
                            value={editItem.price}
                            onChange={(e) => setEditItem({ ...editItem, price: e.target.value })}
                            placeholder="Price"
                        />
                        <button className="ShoppingList-edit-save" onClick={onEditSave}>
                            <Check size={16} />
                        </button>
                        <button className="ShoppingList-item-delete" onClick={onEditCancel}>
                            <X size={16} />
                        </button>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="ShoppingList-item">
                <div className="ShoppingList-item-left" onClick={onToggle}>
                    <div className={`ShoppingList-item-checkbox ${item.isChecked ? "ShoppingList-item-checkbox-checked" : ""}`}>
                        {item.isChecked && <Check size={14} />}
                    </div>
                    <span className={`ShoppingList-item-name ${item.isChecked ? "ShoppingList-item-name-checked" : ""}`}>
                        {item.name}
                    </span>
                </div>
                <div className="ShoppingList-item-right">
                    <span className="ShoppingList-item-quantity">{item.quantity}</span>
                    <span className={`ShoppingList-item-price ${item.isChecked ? "ShoppingList-item-price-checked" : ""}`}>
                        €{item.price.toFixed(2)}
                    </span>
                    <button className="ShoppingList-item-edit" onClick={onStartEdit}>
                        <Pencil size={16} />
                    </button>
                    <button className="ShoppingList-item-delete" onClick={onDelete}>
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </>
    )
}

function ShoppingListEmpty({ navigate }) {
    return (
        <>
            <div className="ShoppingList-empty">
                <ShoppingCart size={48} className="ShoppingList-empty-icon" />
                <h3 className="ShoppingList-empty-title">Your shopping list is empty</h3>
                <p className="ShoppingList-empty-desc">Add items manually or grab ingredients from a recipe</p>
                <button className="ShoppingList-empty-btn" onClick={() => navigate("/recipes")}>
                    Browse Recipes
                </button>
            </div>
        </>
    )
}

function ShoppingListBanner({ navigate }) {
    return (
        <>
            <div className="ShoppingList-banner">
                <div className="ShoppingList-banner-glow"></div>
                <div className="ShoppingList-banner-content">
                    <div className="ShoppingList-banner-text">
                        <h3 className="ShoppingList-banner-title">Add ingredients from recipes</h3>
                        <p className="ShoppingList-banner-desc">
                            Visit any recipe and hit "Add to Shopping List" to automatically add all
                            ingredients. No more typing them out by hand.
                        </p>
                    </div>
                    <button className="ShoppingList-banner-btn" onClick={() => navigate("/recipes")}>
                        Browse Recipes
                    </button>
                </div>
            </div>
        </>
    )
}
