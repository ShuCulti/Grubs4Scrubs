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
import RecipeView from './Pages/RecipeViewPage.jsx'
import Login from './Pages/LoginPage.jsx'
import SignUp from './Pages/SignUpPage.jsx'

import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element= {<Home/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path='/recipes' element={<Recipes/>}/>
          <Route path='/recipes/:id' element={<RecipeView/>}/>
          <Route path='/meal-planning' element={<MealPlanner/>}/>
          <Route path='shopping-list' element={<ShoppingList/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
