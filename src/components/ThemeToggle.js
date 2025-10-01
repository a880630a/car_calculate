import React from 'react';

export default function ThemeToggle({ theme, setTheme }) {
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={theme === "light" ? "切換到深色模式" : "切換到淺色模式"}
        >
            <div className="theme-toggle-track">
                <div className={`theme-toggle-thumb ${theme}`}>
                    {theme === "light" ? "☀️" : "🌙"}
                </div>
            </div>
        </button>
    );
}
