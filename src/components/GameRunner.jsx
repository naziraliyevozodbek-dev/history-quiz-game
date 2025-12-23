import React, { useState, useEffect } from 'react'
import CalculatorPanel from './CalculatorPanel'

// Utility to shuffle array
const shuffle = (array) => {
    return [...array].sort(() => Math.random() - 0.5)
}

const GameRunner = ({ classData, gameMode, onExit }) => {
    const TARGET_SCORE = 10

    // Game State
    const [isPlaying, setIsPlaying] = useState(false)
    const [countdown, setCountdown] = useState(3)

    const [questions1, setQuestions1] = useState([])
    const [questions2, setQuestions2] = useState([])

    const [qIndex1, setQIndex1] = useState(0)
    const [qIndex2, setQIndex2] = useState(0)

    const [score1, setScore1] = useState(0)
    const [score2, setScore2] = useState(0)

    const [feedback1, setFeedback1] = useState(null)
    const [feedback2, setFeedback2] = useState(null)

    const [winner, setWinner] = useState(null)

    useEffect(() => {
        const allQuestions = classData.questions
        const shuffled = shuffle([...allQuestions, ...allQuestions, ...allQuestions])

        const mid = Math.floor(shuffled.length / 2)
        setQuestions1(shuffled.slice(0, mid))
        setQuestions2(shuffled.slice(mid))

        // Start Countdown
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev === 1) {
                    // Show "BOSHLADIK" (represented as 0 or handling inside render)
                    return 0
                }
                if (prev === 0) {
                    clearInterval(timer)
                    setIsPlaying(true)
                    return -1 // Hide overlay
                }
                return prev - 1
            })
        }, 800) // Reverted to faster speed

        return () => clearInterval(timer)
    }, [classData])

    const handleAnswer = (team, selectedIndex, currentQuestion) => {
        if (!isPlaying || winner) return
        if (team === 1 && feedback1) return
        if (team === 2 && feedback2) return

        const isCorrect = selectedIndex === currentQuestion.correctAnswer

        if (team === 1) {
            if (isCorrect) {
                setFeedback1('correct')
                const newScore = score1 + 1
                setScore1(newScore)
                checkWin(newScore, team)
                setTimeout(() => { setFeedback1(null); setQIndex1(prev => prev + 1) }, 800)
            } else {
                setFeedback1('wrong')
                setTimeout(() => setFeedback1(null), 800)
            }
        } else {
            if (isCorrect) {
                setFeedback2('correct')
                const newScore = score2 + 1
                setScore2(newScore)
                checkWin(newScore, team)
                setTimeout(() => { setFeedback2(null); setQIndex2(prev => prev + 1) }, 800)
            } else {
                setFeedback2('wrong')
                setTimeout(() => setFeedback2(null), 800)
            }
        }
    }

    const checkWin = (score, team) => {
        if (score >= TARGET_SCORE) setWinner(team)
    }

    // --- Center Visual Logic ---
    const renderCenterStage = () => {
        return (
            <div className="center-stage">
                <div className="game-title-overlay">
                    {gameMode === 'tug-of-war' && 'Arqon tortish o\'yini'}
                    {gameMode === 'climbing' && 'Ustunga Chiqish'}
                    {gameMode === 'sack-race' && 'Qopda Poyga'}
                </div>

                {/* 
                   Tug of War Visual:
                   Now using separate assets: boy_blue.png, rope.png, boy_red.png.
                   Movement logic:
                   The whole container or just the rope/boys shift?
                   Let's shift the "center point".
                */}
                {/* Center line - fixed in center, doesn't move */}
                {gameMode === 'tug-of-war' && <div className="center-line-fixed"></div>}

                {gameMode === 'tug-of-war' && (
                    <div className="tug-war-scene" style={{ transform: `translateX(${(score2 - score1) * 15}px)` }}>
                        <img src={import.meta.env.BASE_URL + "tug_of_war_full.png"} className="tug-war-full-img" alt="Tug of War" />
                    </div>
                )}

                {gameMode !== 'tug-of-war' && gameMode !== 'climbing' && (
                    <div style={{ fontSize: '100px' }}>
                        {score1 > score2 ? '🔵' : (score2 > score1 ? '🔴' : '⚖️')}
                    </div>
                )}

                {/* Pole Climbing Visual - Two Separate Poles */}
                {gameMode === 'climbing' && (
                    <div className="pole-climbing-scene">
                        {/* Left Pole - Blue Team */}
                        <div className="pole-unit">
                            <div className="pole-container-climbing">
                                <img src={import.meta.env.BASE_URL + "pole.png"} className="pole-img" alt="Pole" />
                                <div className="climber climber-solo climber-blue" style={{ bottom: `${score1 === 0 ? 5 : 10 + (score1 * 8)}%` }}>
                                    <img
                                        src={score1 === 0 ? import.meta.env.BASE_URL + "boy_blue_standing.png" : import.meta.env.BASE_URL + "climbing_boy_blue.png"}
                                        className="climber-image"
                                        alt="Blue Climber"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Pole - Red Team */}
                        <div className="pole-unit">
                            <div className="pole-container-climbing">
                                <img src={import.meta.env.BASE_URL + "pole.png"} className="pole-img" alt="Pole" />
                                <div className="climber climber-solo climber-red" style={{ bottom: `${score2 === 0 ? 5 : 10 + (score2 * 8)}%` }}>
                                    <img
                                        src={score2 === 0 ? import.meta.env.BASE_URL + "boy_red_standing.png" : import.meta.env.BASE_URL + "climbing_boy_red.png"}
                                        className="climber-image"
                                        alt="Red Climber"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="game-shell">
            {/* Countdown Overlay */}
            {countdown >= 0 && (
                <div className="countdown-overlay">
                    <div className="countdown-number" style={countdown === 0 ? { fontSize: '8rem' } : {}}>
                        {countdown === 0 ? 'BOSHLADIK!' : countdown}
                    </div>
                    {countdown > 0 && <div className="countdown-text">TAYYOR BO'LING...</div>}
                </div>
            )}

            {/* Left Panel */}
            <div className="side-panel">
                <CalculatorPanel
                    teamId={1}
                    score={score1}
                    question={questions1[qIndex1]}
                    feedback={feedback1}
                    onAnswer={handleAnswer}
                    headerColor="#1a237e" // Dark Blue
                />
            </div>

            {/* Center Visuals */}
            {renderCenterStage()}

            {/* Right Panel */}
            <div className="side-panel">
                <CalculatorPanel
                    teamId={2}
                    score={score2}
                    question={questions2[qIndex2]}
                    feedback={feedback2}
                    onAnswer={handleAnswer}
                    headerColor="#b71c1c" // Dark Red
                />
            </div>


            {winner && (
                <>
                    {/* Confetti Container */}
                    <div className="confetti-container">
                        {[...Array(600)].map((_, i) => (
                            <div
                                key={i}
                                className="confetti-piece"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 5}s`,
                                    backgroundColor: ['#FF6B9D', '#FFC75F', '#845EC2', '#00D2FC', '#4FFBDF', '#FF9671', '#F9F871'][Math.floor(Math.random() * 7)]
                                }}
                            />
                        ))}
                    </div>

                    {/* Victory Popup */}
                    <div className="victory-overlay">
                        <div className="victory-card">
                            <h1 className="victory-title">
                                {winner === 1 ? 'Ko\'k jamoa' : 'Qizil jamoa'} g'alaba qozondi!
                            </h1>
                            <p className="victory-message">
                                Tabriklaymiz! Siz arqonni marra chizig'iga muvaffaqiyatli tortdingiz!
                            </p>
                            <button className="victory-btn" onClick={onExit}>
                                Qayta o'ynang
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Control Buttons */}
            <button className="control-btn home-btn" onClick={onExit} title="Bosh sahifa">
                🏠
            </button>
            <button className="control-btn fullscreen-btn" onClick={() => {
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen();
                } else {
                    document.exitFullscreen();
                }
            }} title="To'liq ekran">
                ⛶
            </button>
        </div>
    )
}

export default GameRunner
