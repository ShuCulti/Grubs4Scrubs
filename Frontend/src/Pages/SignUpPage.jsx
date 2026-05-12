import { useState } from "react"
import { useNavigate } from "react-router"
import "./SignUpPage.css"

export default function SignUpPage() {
    const navigate = useNavigate()
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [agreedToTerms, setAgreedToTerms] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()
        console.log("Sign up submitted:", { fullName, email, password, agreedToTerms })
    }

    return (
        <>
            <div className="SignUpPage">
                <SignUpNav navigate={navigate} />

                <main className="SignUpPage-main">
                    <div className="SignUpPage-container">
                        <SignUpHeader />
                        <div className="SignUpPage-card">
                            <SignUpSocials />
                            <SignUpDivider />
                            <form className="SignUpPage-form" onSubmit={handleSubmit}>
                                <SignUpNameField fullName={fullName} setFullName={setFullName} />
                                <SignUpEmailField email={email} setEmail={setEmail} />
                                <SignUpPasswordField
                                    password={password}
                                    setPassword={setPassword}
                                    showPassword={showPassword}
                                    setShowPassword={setShowPassword}
                                />
                                <SignUpTerms agreedToTerms={agreedToTerms} setAgreedToTerms={setAgreedToTerms} />
                                <button className="SignUpPage-submit" type="submit">Continue →</button>
                            </form>
                            <p className="SignUpPage-login-link">
                                Already have an account?{" "}
                                <span onClick={() => navigate("/login")}>Sign in</span>
                            </p>
                        </div>
                        <SignUpBadges />
                    </div>
                </main>
            </div>
        </>
    )
}

function SignUpNav({ navigate }) {
    return (
        <>
            <nav className="SignUpNav">
                <div className="SignUpNav-left">
                    <span className="SignUpNav-logo" onClick={() => navigate("/")}>Grubs4Scrubs</span>
                    <div className="SignUpNav-links">
                        <span onClick={() => navigate("/recipes")}>Recipes</span>
                        <span onClick={() => navigate("/meal-planning")}>Meal Planner</span>
                        <span>About</span>
                    </div>
                </div>
                <div className="SignUpNav-right">
                    <span className="SignUpNav-login" onClick={() => navigate("/login")}>Login</span>
                    <span className="SignUpNav-getstarted" onClick={() => navigate("/signup")}>Get Started</span>
                </div>
            </nav>
        </>
    )
}

function SignUpHeader() {
    return (
        <>
            <div className="SignUpPage-header">
                <div className="SignUpPage-icon">🎓</div>
                <h1 className="SignUpPage-title">Create your account</h1>
                <p className="SignUpPage-subtitle">Join thousands of students eating well on a budget</p>
                <div className="SignUpPage-progress">
                    <div className="SignUpPage-progress-dot SignUpPage-progress-dot-active"></div>
                    <div className="SignUpPage-progress-dot"></div>
                </div>
            </div>
        </>
    )
}

function SignUpSocials() {
    return (
        <>
            <div className="SignUpPage-socials">
                <button className="SignUpPage-social-btn">
                    <GoogleIcon />
                    Google
                </button>
                <button className="SignUpPage-social-btn">
                    <AppleIcon />
                    Apple
                </button>
            </div>
        </>
    )
}

function SignUpDivider() {
    return (
        <>
            <div className="SignUpPage-divider">
                <div className="SignUpPage-divider-line"></div>
                <span className="SignUpPage-divider-text">or sign up with email</span>
                <div className="SignUpPage-divider-line"></div>
            </div>
        </>
    )
}

function SignUpNameField({ fullName, setFullName }) {
    return (
        <>
            <div className="SignUpPage-field">
                <label className="SignUpPage-label" htmlFor="signup-name">Full name</label>
                <div className="SignUpPage-input-wrapper">
                    <span className="SignUpPage-input-icon">👤</span>
                    <input
                        className="SignUpPage-input"
                        id="signup-name"
                        type="text"
                        placeholder="Alex Scrub"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
            </div>
        </>
    )
}

function SignUpEmailField({ email, setEmail }) {
    return (
        <>
            <div className="SignUpPage-field">
                <label className="SignUpPage-label" htmlFor="signup-email">Email address</label>
                <div className="SignUpPage-input-wrapper">
                    <span className="SignUpPage-input-icon">✉</span>
                    <input
                        className="SignUpPage-input"
                        id="signup-email"
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

function SignUpPasswordField({ password, setPassword, showPassword, setShowPassword }) {
    return (
        <>
            <div className="SignUpPage-field">
                <label className="SignUpPage-label" htmlFor="signup-password">Password</label>
                <div className="SignUpPage-input-wrapper">
                    <span className="SignUpPage-input-icon">🔒</span>
                    <input
                        className="SignUpPage-input SignUpPage-input-password"
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span
                        className="SignUpPage-password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "🙈" : "👁"}
                    </span>
                </div>
            </div>
        </>
    )
}

function SignUpTerms({ agreedToTerms, setAgreedToTerms }) {
    return (
        <>
            <div className="SignUpPage-terms" onClick={() => setAgreedToTerms(!agreedToTerms)}>
                <div className={`SignUpPage-checkbox ${agreedToTerms ? "SignUpPage-checkbox-checked" : ""}`}>
                    {agreedToTerms && "✓"}
                </div>
                <span>
                    I agree to the <span className="SignUpPage-terms-link">Terms of Service</span> and{" "}
                    <span className="SignUpPage-terms-link">Privacy Policy</span>
                </span>
            </div>
        </>
    )
}

function SignUpBadges() {
    return (
        <>
            <div className="SignUpPage-badges">
                <span className="SignUpPage-badge SignUpPage-badge-secure">🔒 Secure</span>
                <span className="SignUpPage-badge SignUpPage-badge-nospam">🚫 No spam</span>
                <span className="SignUpPage-badge SignUpPage-badge-free">💰 Always free</span>
            </div>
        </>
    )
}

function GoogleIcon() {
    return (
        <svg className="SignUpPage-social-svg" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
    )
}

function AppleIcon() {
    return (
        <svg className="SignUpPage-social-svg" viewBox="0 0 24 24" fill="white">
            <path d="M16.365 1.43c0 0-2.083.155-3.83 1.98-1.513 1.584-1.504 3.732-1.504 3.732s2.065-.023 3.82-1.938c1.34-1.467 1.514-3.774 1.514-3.774zm-6.81 18.06c-1.07 0-1.583-.71-3.084-.71-1.54 0-2.12.72-3.14.72-1.07 0-2.434-1.29-3.87-3.32-2.16-3.06-2.9-7.53-1.12-10.64.91-1.59 2.53-2.6 4.31-2.6 1.47 0 2.82.99 3.65.99.82 0 2.45-1.13 4.22-1.13 1.83 0 3.38.86 4.25 2.15-3.6 2.13-2.99 6.89.5 8.35-1.02 2.6-2.82 5.09-4.85 5.09h-.867z"/>
        </svg>
    )
}
