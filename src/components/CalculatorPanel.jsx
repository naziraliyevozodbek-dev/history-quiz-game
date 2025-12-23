import React from 'react'

const CalculatorPanel = ({ teamId, score, question, feedback, onAnswer, headerColor, title }) => {
    if (!question) return <div className="calc-panel">Tugadi!</div>

    return (
        <div className="calc-card">
            {/* Header with Color */}
            <div className="calc-header" style={{ background: headerColor }}>
                {question.text}
            </div>

            {/* White Display Box (Placeholder for visual match) */}
            <div className="calc-display-marker">
                Javobni tanlang
            </div>

            {/* Answer Grid */}
            <div className="calc-grid">
                {question.options.map((opt, idx) => {
                    let status = ''
                    if (feedback) {
                        if (idx === question.correctAnswer) status = 'calc-correct'
                        else status = 'calc-wrong'
                    }
                    return (
                        <button
                            key={idx}
                            className={`calc-btn ${status}`}
                            onClick={() => onAnswer(teamId, idx, question)}
                            disabled={!!feedback}
                        >
                            {opt}
                        </button>
                    )
                })}
            </div>

            <div className="calc-footer">
                <div className="calc-score-box">
                    To'g'ri: <span style={{ color: headerColor }}>{score}</span>/10
                </div>
            </div>
        </div>
    )
}

export default CalculatorPanel
