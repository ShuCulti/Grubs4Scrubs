import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes,Route } from 'react-router'

import './index.css'
import App from './App.jsx'
import Home from './Pages/HomePage.jsx'
import Dashboard from './Pages/DashboardPage.jsx'
import Recipes from './Pages/RecipesPage.jsx'
import MealPlanner from './Pages/MealPlannerPage.jsx'
import ShoppingList from './Pages/ShoppingListPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path="/" element= {<Home/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path='/recipes' element={<Recipes/>}/>
        <Route path='/meal-planning' element={<MealPlanner/>}/>
        <Route path='shopping-list' element={<ShoppingList/>}/>
        
        
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
