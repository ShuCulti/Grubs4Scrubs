import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import "./LoginPage.css"
import { loginUser } from "../services/authService"
import { AuthContext } from "../context/AuthContext"

export default function LoginPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    
    const { setToken } = useContext(AuthContext)

    function handleSubmit(e) {
        e.preventDefault()

        loginUser(email, password)
        .then(data => {
            localStorage.setItem("token", data.token);
            setToken(data.token)
            navigate("/")
        })
        .catch(err => console.error("Login Failed", err))
        
        
    }

    return (
        <>
            <div className="LoginPage">
                <LoginNav navigate={navigate} />

                <main className="LoginPage-main">
                    <div className="LoginPage-container">
                        <LoginHeader />
                        <div className="LoginPage-card">
                            <LoginSocials />
                            <LoginDivider />
                            <form className="LoginPage-form" onSubmit={handleSubmit}>
                                <LoginEmailField email={email} setEmail={setEmail} />
                                <LoginPasswordField
                                    password={password}
                                    setPassword={setPassword}
                                    showPassword={showPassword}
                                    setShowPassword={setShowPassword}
                                />
                                <LoginRemember rememberMe={rememberMe} setRememberMe={setRememberMe} />
                                <button className="LoginPage-submit" type="submit">Log in</button>
                            </form>
                            <p className="LoginPage-signup-link">
                                Don't have an account?{" "}
                                <span onClick={() => navigate("/signup")}>Create one free →</span>
                            </p>
                        </div>
                        <LoginBadges />
                    </div>
                </main>
            </div>
        </>
    )
}

function LoginNav({ navigate }) {
    return (
        <>
            <nav className="LoginNav">
                <div className="LoginNav-left">
                    <span className="LoginNav-logo" onClick={() => navigate("/")}>Grubs4Scrubs</span>
                    <div className="LoginNav-links">
                        <span onClick={() => navigate("/recipes")}>Recipes</span>
                        <span onClick={() => navigate("/meal-planning")}>Meal Planner</span>
                        <span>About</span>
                    </div>
                </div>
                <div className="LoginNav-right">
                    <span className="LoginNav-login" onClick={() => navigate("/login")}>Login</span>
                    <span className="LoginNav-getstarted" onClick={() => navigate("/signup")}>Get Started</span>
                </div>
            </nav>
        </>
    )
}

function LoginHeader() {
    return (
        <>
            <div className="LoginPage-header">
                <div className="LoginPage-icon">🍜</div>
                <h1 className="LoginPage-title">Welcome back</h1>
                <p className="LoginPage-subtitle">Sign in to your Grubs4Scrubs account</p>
            </div>
        </>
    )
}

function LoginSocials() {
    return (
        <>
            <div className="LoginPage-socials">
                <button className="LoginPage-social-btn">
                    <GoogleIcon />
                    Google
                </button>
                <button className="LoginPage-social-btn">
                    <AppleIcon />
                    Apple
                </button>
            </div>
        </>
    )
}

function LoginDivider() {
    return (
        <>
            <div className="LoginPage-divider">
                <div className="LoginPage-divider-line"></div>
                <span className="LoginPage-divider-text">or continue with email</span>
                <div className="LoginPage-divider-line"></div>
            </div>
        </>
    )
}

function LoginEmailField({ email, setEmail }) {
    return (
        <>
            <div className="LoginPage-field">
                <label className="LoginPage-label" htmlFor="login-email">Email address</label>
                <div className="LoginPage-input-wrapper">
                    <span className="LoginPage-input-icon">✉</span>
                    <input
                        className="LoginPage-input"
                        id="login-email"
                        type="email"
                        placeholder="you@university.ac.uk"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
            </div>
        </>
    )
}

function LoginPasswordField({ password, setPassword, showPassword, setShowPassword }) {
    return (
        <>
            <div className="LoginPage-field">
                <label className="LoginPage-label" htmlFor="login-password">Password</label>
                <div className="LoginPage-input-wrapper">
                    <span className="LoginPage-input-icon">🔒</span>
                    <input
                        className="LoginPage-input LoginPage-input-password"
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span
                        className="LoginPage-password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "🙈" : "👁"}
                    </span>
                </div>
                <div className="LoginPage-forgot">
                    <span>Forgot password?</span>
                </div>
            </div>
        </>
    )
}

function LoginRemember({ rememberMe, setRememberMe }) {
    return (
        <>
            <div className="LoginPage-remember" onClick={() => setRememberMe(!rememberMe)}>
                <div className={`LoginPage-checkbox ${rememberMe ? "LoginPage-checkbox-checked" : ""}`}>
                    {rememberMe && "✓"}
                </div>
                <span>Remember me for 30 days</span>
            </div>
        </>
    )
}

function LoginBadges() {
    return (
        <>
            <div className="LoginPage-badges">
                <span className="LoginPage-badge LoginPage-badge-student">🎓 Student-first</span>
                <span className="LoginPage-badge LoginPage-badge-free">Free forever</span>
            </div>
        </>
    )
}

function GoogleIcon() {
    return (
        <svg className="LoginPage-social-svg" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
    )
}

function AppleIcon() {
    return (
        <svg className="LoginPage-social-svg" viewBox="0 0 24 24" fill="white">
            <path d="M16.365 1.43c0 0-2.083.155-3.83 1.98-1.513 1.584-1.504 3.732-1.504 3.732s2.065-.023 3.82-1.938c1.34-1.467 1.514-3.774 1.514-3.774zm-6.81 18.06c-1.07 0-1.583-.71-3.084-.71-1.54 0-2.12.72-3.14.72-1.07 0-2.434-1.29-3.87-3.32-2.16-3.06-2.9-7.53-1.12-10.64.91-1.59 2.53-2.6 4.31-2.6 1.47 0 2.82.99 3.65.99.82 0 2.45-1.13 4.22-1.13 1.83 0 3.38.86 4.25 2.15-3.6 2.13-2.99 6.89.5 8.35-1.02 2.6-2.82 5.09-4.85 5.09h-.867z"/>
        </svg>
    )
}
