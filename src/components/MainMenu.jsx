import React from 'react'

const MainMenu = ({ classes, onSelectClass }) => {
    return (
        <div className="main-menu">
            <h1>Tarix Fanidan Testlar</h1>
            <p>Boshlash uchun sinfni tanlang:</p>

            <div className="class-grid">
                {classes.map((c) => (
                    <div
                        key={c.id}
                        className="class-card"
                        onClick={() => onSelectClass(c)}
                    >
                        <h2>{c.name}</h2>
                        <p>{c.questions.length} ta savol</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MainMenu
