import React, { useState, useEffect } from 'react'
import ClassSelection from './components/ClassSelection' // New Component
import GameSelection from './components/GameSelection'
import GameRunner from './components/GameRunner'

function App() {
    const [gameState, setGameState] = useState('loading')
    const [classes, setClasses] = useState([])
    const [selectedClass, setSelectedClass] = useState(null)
    const [selectedMode, setSelectedMode] = useState(null)

    useEffect(() => {
        fetch(import.meta.env.BASE_URL + 'questions.json')
            .then(res => res.json())
            .then(data => {
                setClasses(data.classes)
                setGameState('game-select') // Start with Game Mode selection (as per request "boshidan ochilish sahifasida uchta uyin turibdi")
            })
            .catch(err => {
                console.error("Failed to load questions:", err)
                setGameState('error')
            })
    }, [])

    // Flow: Game Selection -> Class Selection -> Playing

    const handleModeSelect = (mode) => {
        setSelectedMode(mode)
        setGameState('class-select')
    }

    const handleClassSelect = (classData) => {
        setSelectedClass(classData)
        setGameState('playing')
    }

    const backToGameSelect = () => {
        setGameState('game-select')
        setSelectedMode(null)
    }

    const backToClassSelect = () => {
        setGameState('class-select')
        setSelectedClass(null)
    }

    // Actually onExit from Game should probably go to Mode select or Class select?
    // Let's go to Mode Select for full reset.
    const exitGame = () => {
        setGameState('game-select')
        setSelectedMode(null)
        setSelectedClass(null)
    }

    if (gameState === 'loading') return <div className="loading">Yuklanmoqda...</div>
    if (gameState === 'error') return <div className="error">Xatolik yuz berdi.</div>

    return (
        <div className="app-container" style={{ display: 'flex', width: '100%', height: '100%' }}>

            {gameState === 'game-select' && (
                <GameSelection onSelectMode={handleModeSelect} onBack={() => { }} />
            )}

            {gameState === 'class-select' && (
                <ClassSelection
                    classes={classes}
                    onSelectClass={handleClassSelect}
                    onBack={backToGameSelect}
                />
            )}

            {gameState === 'playing' && selectedClass && selectedMode && (
                <GameRunner
                    classData={selectedClass}
                    gameMode={selectedMode}
                    onExit={exitGame}
                />
            )}
        </div>
    )
}

export default App
