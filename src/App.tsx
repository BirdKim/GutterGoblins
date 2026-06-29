import { useMemo, useState } from 'react'
import './App.css'
import { calculateFrameScores, calculateScore } from './components/scoring'
import { buildFrameEntries } from './components/frames'

type GameRecord = {
  id: string
  playerName: string
  date: string
  score: number
  rolls: number[]
}

type FrameState = {
  number: number
  rolls: number[]
}

const STORAGE_KEY = 'guttergoblins-games'
const PIN_OPTIONS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function readStoredGames(): GameRecord[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as GameRecord[]) : []
  } catch {
    return []
  }
}

function App() {
  const [playerName, setPlayerName] = useState('')
  const [games, setGames] = useState<GameRecord[]>(readStoredGames)
  const [rolls, setRolls] = useState<number[]>([])
  const [frameState, setFrameState] = useState<FrameState>({ number: 1, rolls: [] })
  const [gameFinished, setGameFinished] = useState(false)
  const [status, setStatus] = useState('Enter your name and start a new game.')

  // ✅ frameEntries declared first so currentScore can depend on it
  const frameEntries = useMemo(() => buildFrameEntries(rolls), [rolls])
  const frameScores = useMemo(() => calculateFrameScores(frameEntries), [frameEntries])
  const currentScore = useMemo(() => calculateScore(frameEntries), [frameEntries])

  const averageScore = useMemo(() => {
    if (!games.length) return 0
    return Math.round(games.reduce((sum, game) => sum + game.score, 0) / games.length)
  }, [games])
  const bestScore = useMemo(() => games.reduce((best, game) => Math.max(best, game.score), 0), [games])

  const startNewGame = () => {
    setRolls([])
    setFrameState({ number: 1, rolls: [] })
    setGameFinished(false)
    setStatus(`${playerName || 'Player'} is ready to bowl.`)
  }

  const saveGame = (finalRolls: number[], finalScore: number) => {
    const record: GameRecord = {
      id: `${Date.now()}`,
      playerName: playerName || 'Player',
      date: new Date().toLocaleDateString(),
      score: finalScore,
      rolls: finalRolls,
    }
    const nextGames = [record, ...games].slice(0, 10) // Keep only the last 10 games
    setGames(nextGames)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextGames))
    setStatus(`Game saved with ${finalScore} pins.`)
  }

  const handlePinSelection = (pins: number) => {
    if (gameFinished) {
      setStatus('Start a new game to log another round.')
      return
    }

    const currentFrameNumber = frameState.number
    const currentFrameRolls = frameState.rolls
    const nextRolls = [...rolls, pins]
    const nextFrameRolls = [...currentFrameRolls, pins]

    if (currentFrameNumber < 10) {
      if (currentFrameRolls.length === 0) {
        if (pins > 10) {
          setStatus('A frame cannot exceed 10 pins.')
          return
        }

        if (pins === 10) {
          setRolls(nextRolls)
          setFrameState({ number: currentFrameNumber + 1, rolls: [] })
          setStatus(`Frame ${currentFrameNumber + 1} - Roll 1`)
          return
        }

        setRolls(nextRolls)
        setFrameState({ number: currentFrameNumber, rolls: nextFrameRolls })
        setStatus(`Frame ${currentFrameNumber} - Roll 2`)
        return
      }

      if (currentFrameRolls.length === 1) {
        const firstRoll = currentFrameRolls[0]
        if (pins > 10 - firstRoll) {
          setStatus('That roll would exceed the remaining pins for the frame.')
          return
        }

        setRolls(nextRolls)
        setFrameState({ number: currentFrameNumber + 1, rolls: [] })
        setStatus(`Frame ${currentFrameNumber + 1} - Roll 1`)
        return
      }
    }

    if (currentFrameNumber === 10) {
      if (currentFrameRolls.length === 0) {
        if (pins > 10) {
          setStatus('A frame cannot exceed 10 pins.')
          return
        }

        setRolls(nextRolls)
        setFrameState({ number: 10, rolls: nextFrameRolls })
        setStatus('Frame 10 - Roll 2')
        return
      }

      if (currentFrameRolls.length === 1) {
        const firstRoll = currentFrameRolls[0]
        if (firstRoll === 10) {
          if (pins > 10) {
            setStatus('Bonus rolls cannot exceed 10 pins.')
            return
          }

          setRolls(nextRolls)
          setFrameState({ number: 10, rolls: nextFrameRolls })
          setStatus('Frame 10 - Roll 3')
          return
        }

        if (pins > 10 - firstRoll) {
          setStatus('That roll would exceed the remaining pins for the frame.')
          return
        }

        setRolls(nextRolls)
        if (firstRoll + pins === 10) {
          setFrameState({ number: 10, rolls: nextFrameRolls })
          setStatus('Frame 10 - Roll 3')
          return
        }

        const finalScore = calculateScore(buildFrameEntries(nextRolls))
        setFrameState({ number: 10, rolls: nextFrameRolls })
        setGameFinished(true)
        saveGame(nextRolls, finalScore)
        return
      }

      if (currentFrameRolls.length === 2) {
        if (pins > 10) {
          setStatus('Bonus rolls cannot exceed 10 pins.')
          return
        }

        const finalScore = calculateScore(buildFrameEntries(nextRolls))
        setRolls(nextRolls)
        setFrameState({ number: 10, rolls: nextFrameRolls })
        setGameFinished(true)
        saveGame(nextRolls, finalScore)
      }
    }
  }

  return (
    <main className="app-shell">
      <section className="hero-card">
        <div>
          <p className="eyebrow">Phase 1 MVP</p>
          <h1>GutterGoblins</h1>
          <p className="hero-copy">
            Log games, track your score, and build a simple history of your bowling progress.
          </p>
        </div>
        <div className="hero-actions">
          <label className="field-label" htmlFor="player-name">
            Player name
            <input
              id="player-name"
              value={playerName}
              onChange={(event) => setPlayerName(event.target.value)}
              placeholder="Enter your name"
            />
          </label>
          <button type="button" onClick={startNewGame}>
            New game
          </button>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="panel score-panel">
          <div className="panel-heading">
            <h2>Current game</h2>
            <span className="status-pill">{status}</span>
          </div>
          <div className="scorecard-wrapper">
            <table className="scorecard">
              <thead>
                <tr>
                  <th className="player-col">Player</th>
                  {frameEntries.slice(0, 9).map((frame) => (
                    <th key={frame.frameNumber} colSpan={2}>
                      {frame.frameNumber}
                    </th>
                  ))}
                  <th colSpan={3}>10</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="player-cell">{playerName}</td>
                  {frameEntries.map((frame, fi) => {
                    const isTenth = fi === 9
                    const rollCount = isTenth ? 3 : 2
                    const displayRolls: Array<number | null> = [...frame.rolls]
                    while (displayRolls.length < rollCount) displayRolls.push(null)
                      return (
                        <td key={frame.frameNumber} className={`frame-cell${isTenth ? ' tenth' : ''}`} colSpan={rollCount}>
                          <div className="rolls-row">
                            {displayRolls.map((roll, i) => (
                              <span
                                key={i}
                                className={`roll-box${roll === 10 ? ' strike' : roll === null ? '' : ''}`}
                              >
                                {roll ?? ''}
                              </span>
                            ))}
                          </div>
                          <div className="score-box">{frameScores[fi] ?? ''}</div>
                        </td>
                      )
                  })}
                  <td className="totals-cell">{currentScore}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="pins-grid">
            {PIN_OPTIONS.map((value) => (
              <button key={value} type="button" className="pin-button" onClick={() => handlePinSelection(value)}>
                {value}
              </button>
            ))}
          </div>
          <div className="legend-row">
            <span>Strike = 10 pins</span>
            <span>Spare = 10 pins across two rolls</span>
          </div>
        </div>

        <div className="panel stats-panel">
          <div className="panel-heading">
            <h2>Stats snapshot</h2>
          </div>
          <div className="stat-card">
            <strong>{averageScore}</strong>
            <span>Average score</span>
          </div>
          <div className="stat-card">
            <strong>{bestScore || 0}</strong>
            <span>Best game</span>
          </div>
          <div className="stat-card">
            <strong>{games.length}</strong>
            <span>Games logged</span>
          </div>
        </div>
      </section>

      <section className="panel history-panel">
        <div className="panel-heading">
          <h2>Recent games</h2>
        </div>
        {games.length === 0 ? (
          <p className="panel-copy">No games logged yet. Start a session to track your first score.</p>
        ) : (
          <ul className="history-list">
            {games.map((game) => (
              <li key={game.id} className="history-item">
                <div>
                  <strong>{game.playerName}</strong>
                  <p>{game.date}</p>
                </div>
                <div className="history-score">{game.score}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App