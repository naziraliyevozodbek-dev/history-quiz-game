import React from 'react'

const ClassSelection = ({ classes, onSelectClass, onBack }) => {
    return (
        <div className="selection-overlay">
            <div className="main-card">
                <h1 className="main-title">Tarixiy o'yinlar</h1>
                <p className="main-subtitle">Sinfni tanlang</p>

                <div className="class-column">
                    {classes.map((cls, idx) => (
                        <button
                            key={cls.id}
                            className="class-btn purple-btn"
                            onClick={() => onSelectClass(cls)}
                        >
                            {cls.name}
                        </button>
                    ))}

                    {/* Decorative extras to match 4 buttons if we only have 2 classes, 
              or we can just list the available classes. 
              The screenshot shows 4 options: +, -, x, /. 
              We will map our classes (6-sinf, 8-sinf) to these buttons.
          */}
                </div>

                <button className="back-btn-white" onClick={onBack}>
                    ← Orqaga
                </button>
            </div>
        </div>
    )
}

export default ClassSelection
