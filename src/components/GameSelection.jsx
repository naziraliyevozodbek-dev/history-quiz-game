import React from 'react'

const GameSelection = ({ onSelectMode, onBack }) => {
    return (
        <div className="selection-overlay">
            <div className="main-card">
                <h1 className="main-title">Tarix o'yinlari</h1>
                <p className="main-subtitle">O'yin mavzusini tanlang</p>

                <div className="modes-column">
                    {/* Arqon Tortish - Red */}
                    <button
                        className="mode-card red-card"
                        onClick={() => onSelectMode('tug-of-war')}
                    >
                        <div className="mode-circle-container">
                            <span className="emoji-fallback">🪢</span>
                        </div>
                        <div className="mode-text-content">
                            <span className="mode-name">Arqon tortish</span>
                        </div>
                    </button>

                    {/* Silliq Ustun - Green */}
                    <button
                        className="mode-card green-card"
                        onClick={() => onSelectMode('climbing')}
                    >
                        <div className="mode-circle-container">
                            <span className="emoji-fallback">🎋</span>
                        </div>
                        <div className="mode-text-content">
                            <span className="mode-name">Silliq ustunga<br />chiqish</span>
                        </div>
                    </button>

                    {/* Sack Poygasi - Pink */}
                    <button
                        className="mode-card pink-card"
                        onClick={() => onSelectMode('sack-race')}
                    >
                        <div className="mode-circle-container">
                            <span className="emoji-fallback">🦘</span>
                        </div>
                        <div className="mode-text-content">
                            <span className="mode-name">Sack poygasi</span>
                        </div>
                    </button>
                </div>
            </div>

            <div className="footer-copyright">
                © Ozodbek Naziraliyev 2025 <br />
                Ozodbek Naziraliyev tomonidan yaratilgan
            </div>
        </div>
    )
}

export default GameSelection
