import React, { useState } from 'react';
import './App.css';

// Color theme: primary, secondary, accent
const COLORS = {
  primary: '#4A90E2',
  secondary: '#50E3C2',
  accent: '#F5A623',
  lightBg: '#F6F9FB'
};

// Some playful illustrations & emojis to reinforce theme
const FEAR_EMOJIS = [
  '🕷️', // spider
  '🦇', // bat
  '👻', // ghost
  '🦈', // shark
  '🐍', // snake
  '🍌', // banana (for silly effect)
  '🎈', // clown
  '🪳', // bug
  '🧟', // zombie
  '👽', // alien
];

// Mini cartoonified challenges (just fun static/silly for now)
const PHOBIA_CHALLENGES = [
  {
    name: 'Dance With a Spider',
    emoji: '🕷️',
    challenge: 'Can you dance like a spider for 10 seconds? 🕺🕷️',
  },
  {
    name: 'Laugh at a Ghost',
    emoji: '👻',
    challenge: 'Can you make your silliest ghost sound? "Boo-whohohooo!"',
  },
  {
    name: 'Tickle the Snake',
    emoji: '🐍',
    challenge: "Pretend to tickle a snake and see if it giggles. Hisssss! 😂",
  },
  {
    name: 'Sharky Smile',
    emoji: '🦈',
    challenge: "Give your biggest 'sharky' grin to the nearest friend!",
  },
  {
    name: 'Alien Greeting',
    emoji: '👽',
    challenge: "Make up a silly greeting in alien language. 'Beep beep borp!'",
  }
];

// Fun weird facts about fears
const WEIRD_FACTS = [
  "Did you know? The fear of long words is called 'hippopotomonstrosesquipedaliophobia'! (How ironic! 🦛🤓)",
  "You can't hum while holding your nose – try it! Even if you fear embarrassment.",
  "Banana phobia (bannanaphobia) is real – and bananas aren't out to get you! 🍌",
  "Cherophobia is the fear of fun. We hope you don't catch it here!",
  "Some people fear ducks watching them (anatidaephobia). Quack quack! 🦆",
  "There’s a word for fear of Friday the 13th: ‘paraskevidekatriaphobia’. Try saying that three times fast!",
];

const CALM_QUOTES = [
  "“You don’t have to control your thoughts. You just have to stop letting them control you.” — Dan Millman",
  "“If you want to conquer the anxiety of life, live in the moment, live in the breath.” — Amit Ray",
  "“Keep calm and let your fears take a nap!”",
  "“Sometimes the bravest and most important thing you can do is just show up.” — Brené Brown",
  "“Laughter is the tranquilizer with no side effects.” — Arnold Glasow"
];

// For relaxing "music", let's use a fun embed of a light, royalty-free ambient playlist (YouTube)
const CALM_MUSIC_EMBED = "https://www.youtube.com/embed/2OEL4P1Rz04?autoplay=0";

// -- Mock silly AI humor generator (replaceable by real AI call) --
function generateHumorStory(fear) {
  const emoji = FEAR_EMOJIS[Math.floor(Math.random() * FEAR_EMOJIS.length)];
  let base = `Once upon a time, a brave soul faced their greatest fear: ${fear || 'something mysterious'}!`;
  let twist = '';
  switch (fear.toLowerCase()) {
    case 'spiders':
    case 'spider':
      twist = "But these spiders wore tiny top hats and told terrible puns. Soon, both human and spider laughed so hard, their fears scurried away!";
      break;
    case 'clowns':
      twist = "The clowns turned out to be expert pie jugglers, and gave the best red-nose boops. Silliness levels soared!";
      break;
    case 'dark':
      twist = "But the dark was full of disco balls and dancing fireflies! Who knew night could party so hard?";
      break;
    default:
      twist = `It turned out ${fear} just wanted a hug and a bowl of ice cream. They became best friends forever. ${emoji}`;
  }
  return `${base} ${twist}`;
}

// Returns a random item from an array
function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// PUBLIC_INTERFACE
function App() {
  // Main state for search & content
  const [fearInput, setFearInput] = useState('');
  const [searchedFear, setSearchedFear] = useState('');
  const [showHumor, setShowHumor] = useState(false);
  const [humorStory, setHumorStory] = useState('');
  const [showCalm, setShowCalm] = useState(false);
  const [showChallenge, setShowChallenge] = useState(false);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [calmQuote, setCalmQuote] = useState(randomFromArray(CALM_QUOTES));
  const [weirdFactIdx, setWeirdFactIdx] = useState(0);

  // Handler for submitting a fear
  const handleSearch = (e) => {
    e.preventDefault();
    if (fearInput.trim()) {
      setSearchedFear(fearInput.trim());
      setShowHumor(false);
      setShowCalm(false);
      setShowChallenge(false);
      setHumorStory('');
    }
  };

  // Handler for generating humor
  const handleGenerateHumor = () => {
    setShowHumor(true);
    setHumorStory(generateHumorStory(searchedFear));
  };

  // Handler for random weird fact
  const nextWeirdFact = () => {
    setWeirdFactIdx((prev) => (prev + 1) % WEIRD_FACTS.length);
  };

  // Handler for Calm Down mode
  const handleCalmMode = () => {
    setShowCalm(true);
    setCalmQuote(randomFromArray(CALM_QUOTES));
    setShowHumor(false);
    setShowChallenge(false);
  };

  // Handler for Face the Phobia Challenge
  const handleChallengeMode = () => {
    setShowChallenge(true);
    setChallengeIdx(Math.floor(Math.random() * PHOBIA_CHALLENGES.length));
    setShowCalm(false);
    setShowHumor(false);
  };

  // Handler for Next Challenge
  const nextChallenge = () => {
    setChallengeIdx((prev) => (prev + 1) % PHOBIA_CHALLENGES.length);
  };

  // Layout sections
  return (
    <div className="app" style={{
      minHeight: '100vh',
      background: COLORS.lightBg,
      color: '#1a1a2e',
    }}>
      <nav className="navbar" style={{
        background: COLORS.primary,
        color: 'white',
        borderBottom: `3px solid ${COLORS.secondary}`,
        boxShadow: '0 2px 10px rgba(74,144,226,0.06)'
      }}>
        <div className="container" style={{ maxWidth: 1000 }}>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
            <div className="logo" style={{
              fontSize: '1.35rem',
              fontWeight: 700,
              letterSpacing: 1
            }}>
              <span style={{ color: COLORS.accent, fontSize: '2rem' }}>😄</span>
              Fearless <span style={{ color: COLORS.secondary }}>Fun</span>
            </div>
            <span style={{ color: COLORS.accent, fontWeight: 500, fontSize: '.95rem', letterSpacing: 0.5 }}>
              Laugh at Fear, Level Up!
            </span>
          </div>
        </div>
      </nav>

      <main>
        <div className="container" style={{ maxWidth: 1000, marginTop: 88, marginBottom: 48 }}>
          <section className="hero" style={{
            background: 'linear-gradient(90deg, #e3f3fd 0%, #fffcf7 100%)',
            borderRadius: 20,
            marginBottom: 28,
            padding: '40px 28px 30px 28px',
            boxShadow: '0 5px 32px 0 #50e3c222'
          }}>
            <span className="subtitle" style={{
              color: COLORS.secondary,
              fontWeight: 600,
              fontSize: '1.2rem',
              letterSpacing: 0.5
            }}>
              Welcome to Fearless Fun!
            </span>
            <h1 className="title" style={{
              color: COLORS.primary,
              lineHeight: 1.1,
              fontWeight: 800,
              margin: 0,
              marginTop: 8,
              fontFamily: 'Fredoka, Inter, Arial, sans-serif'
            }}>
              Turn Fears into Giggles<br />
              <span style={{ fontSize: '1.8rem', color: COLORS.accent, fontWeight: 600 }}>– and Relax, Too!</span>
            </h1>
            <div className="description" style={{
              fontSize: '1.18rem',
              color: COLORS.primary,
              margin: '1.2em 0 0.8em 0'
            }}>
              Playfully explore your fears, laugh at silly stories, discover weird facts, and take a calming break – all in one fun app!
            </div>
          </section>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 32,
            alignItems: 'start',
            flexWrap: 'wrap'
          }}>
            {/* Left Column: Main Interactions */}
            <div>
              {/* Search & Discover */}
              <section style={{
                background: 'white',
                borderRadius: 16,
                boxShadow: '0 2px 16px #4A90E21a',
                padding: 24,
                marginBottom: 28,
                minHeight: 130
              }}>
                <h2 style={{
                  color: COLORS.secondary,
                  textAlign: 'left',
                  fontWeight: 700,
                  fontSize: '1.3rem',
                  margin: '0 0 14px 0'
                }}>
                  🤔 Search & Discover
                </h2>
                <form onSubmit={handleSearch} style={{ display: 'flex', gap: 12 }}>
                  <input
                    aria-label="Input Your Fear"
                    type="text"
                    placeholder="What makes you jittery? (e.g., spiders, clowns, darkness...)"
                    value={fearInput}
                    onChange={e => setFearInput(e.target.value)}
                    style={{
                      flex: 1,
                      border: `2px solid ${COLORS.primary}`,
                      borderRadius: 8,
                      padding: '10px 14px',
                      fontSize: '1rem',
                      background: '#f9fbff'
                    }}
                  />
                  <button
                    className="btn"
                    type="submit"
                    style={{
                      background: COLORS.accent,
                      color: 'white',
                      borderRadius: 6,
                      fontWeight: 500,
                      fontFamily: 'inherit',
                      fontSize: '1rem'
                    }}
                  >
                    Search
                  </button>
                </form>
                {searchedFear &&
                  <div style={{
                    marginTop: 10,
                    color: COLORS.primary,
                    fontSize: '1.05rem'
                  }}>
                    Your fear: <strong>"{searchedFear}"</strong>
                  </div>
                }
              </section>

              {/* Humor Therapy & Challenge Buttons */}
              {searchedFear &&
                <section style={{
                  background: '#fffefc',
                  borderRadius: 16,
                  boxShadow: '0 2px 16px #F5A6230a',
                  padding: '18px 24px',
                  marginBottom: 20
                }}>
                  <button className="btn btn-large"
                    style={{
                      background: COLORS.secondary,
                      color: '#333',
                      marginRight: 14,
                      marginBottom: 7
                    }}
                    onClick={handleGenerateHumor}
                  >
                    😂 AI-Generated Humor Therapy
                  </button>
                  <button className="btn btn-large"
                    style={{
                      background: COLORS.accent,
                      color: '#fff'
                    }}
                    onClick={handleChallengeMode}
                  >
                    🥸 Face the Phobia Challenge
                  </button>
                </section>
              }

              {/* Humor Therapy Output */}
              {showHumor && humorStory &&
                <section style={{
                  marginBottom: 18,
                  background: '#f1f8ff',
                  borderRadius: 12,
                  padding: '18px 24px',
                  borderLeft: `7px solid ${COLORS.secondary}`,
                  boxShadow: '0 2px 12px #4A90E214'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 4,
                    fontWeight: 600,
                    color: COLORS.primary
                  }}>
                    <span style={{ fontSize: '1.3em' }}>😆</span>
                    <span>Here’s your silly story:</span>
                  </div>
                  <div style={{
                    fontStyle: 'italic', fontSize: '1.06rem', color: '#3f5e84'
                  }}>
                    {humorStory}
                  </div>
                </section>
              }

              {/* Face the Phobia Challenge */}
              {showChallenge &&
                <section style={{
                  background: '#fff9ec',
                  borderRadius: 12,
                  padding: '18px 24px',
                  borderLeft: `7px solid ${COLORS.accent}`,
                  boxShadow: '0 2px 12px #F5A62314',
                  marginBottom: 12,
                  textAlign: 'center',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    fontWeight: 700,
                    color: COLORS.accent,
                    fontSize: '1.2rem'
                  }}>
                    <span style={{ fontSize: '2.2rem' }}>{PHOBIA_CHALLENGES[challengeIdx].emoji}</span>
                    {PHOBIA_CHALLENGES[challengeIdx].name}
                  </div>
                  <div style={{
                    marginTop: 10,
                    fontSize: '1.05rem',
                    color: '#995700'
                  }}>
                    {PHOBIA_CHALLENGES[challengeIdx].challenge}
                  </div>
                  <button
                    className="btn"
                    style={{
                      background: COLORS.secondary,
                      color: '#135857',
                      marginTop: 15,
                    }}
                    onClick={nextChallenge}
                  >
                    Next Challenge!
                  </button>
                </section>
              }

              {/* Calm Down Mode Trigger */}
              <section style={{
                background: '#f6faf6',
                borderRadius: 12,
                padding: '13px 20px',
                marginTop: 16,
                marginBottom: 10
              }}>
                <button
                  className="btn btn-large"
                  style={{
                    background: COLORS.primary,
                    color: 'white'
                  }}
                  onClick={handleCalmMode}
                >
                  🧘 Calm Down Mode
                </button>
              </section>
              {showCalm &&
                <section style={{
                  marginTop: 10,
                  background: '#f3f8fe',
                  borderRadius: 10,
                  boxShadow: '0 2px 14px #4A90E216',
                  padding: '16px 20px'
                }}>
                  <div style={{
                    color: COLORS.primary,
                    fontWeight: 600,
                    fontSize: '1.04rem',
                    marginBottom: 6
                  }}>
                    <span role="img" aria-label="Lotus" style={{ fontSize: '1.4em', marginRight: 5 }}>🪷</span>
                    Take a deep breath and relax:
                  </div>
                  <blockquote style={{
                    borderLeft: `5px solid ${COLORS.secondary}`,
                    paddingLeft: 12,
                    color: COLORS.secondary,
                    fontStyle: 'italic',
                    marginBottom: 10,
                    marginTop: 4
                  }}>
                    {calmQuote}
                  </blockquote>
                  <div style={{ margin: '8px 0 12px 0', fontSize: '0.95rem', color: '#5B90CB' }}>
                    Enjoy some soothing sounds:
                  </div>
                  {/* Embedded relaxing sound via YouTube */}
                  <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}>
                    <iframe
                      title="relaxing-music"
                      width="100%"
                      height="80"
                      src={CALM_MUSIC_EMBED}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen={false}
                      style={{
                        borderRadius: 10,
                        border: '2px solid #e4f2fb',
                        filter: 'brightness(0.98)'
                      }}
                    ></iframe>
                  </div>
                  <div style={{
                    color: COLORS.secondary, margin: '8px 0 0 0', fontSize: '.95em',
                    fontWeight: 500, textAlign: 'center'
                  }}>
                    Relax and let your worries float away... 🌈
                  </div>
                </section>
              }
            </div>
            {/* Right Column: Weird Facts & Visuals */}
            <div>
              <section style={{
                background: 'white',
                borderRadius: 16,
                boxShadow: '0 2px 16px #F5A62312',
                padding: '22px 24px',
                marginBottom: 24,
                minHeight: 160
              }}>
                <h2 style={{
                  color: COLORS.accent,
                  marginTop: 0,
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  marginBottom: 7
                }}>
                  🧐 Weird Fear Facts
                </h2>
                <div style={{
                  fontSize: '1.05rem',
                  color: '#e07d24',
                  fontWeight: 500,
                  marginBottom: 10,
                }}>
                  {WEIRD_FACTS[weirdFactIdx]}
                </div>
                <button className="btn"
                  style={{
                    background: COLORS.accent,
                    color: 'white',
                    borderRadius: 6,
                    fontWeight: 500,
                    fontSize: '.95rem'
                  }}
                  onClick={nextWeirdFact}
                >
                  Next Fact
                </button>
              </section>
              {/* Visual Playful Illustration */}
              <section style={{
                background: 'linear-gradient(115deg, #e3f2fd 40%, #fffbe8 100%)',
                borderRadius: 16,
                padding: '18px 18px 18px 18px',
                textAlign: 'center',
                boxShadow: '0 2px 11px #50e3c214'
              }}>
                <div style={{ fontSize: '2.3em', marginBottom: 8, userSelect: 'none' }}>
                  {/* Cycle through fear emojis in a wavy grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, max-content)',
                    gap: 10,
                    justifyContent: 'center'
                  }}>
                    {FEAR_EMOJIS.map((em, idx) => (
                      <span
                        key={idx}
                        style={{
                          animation: 'floaty 2s infinite ease-in-out alternate',
                          animationDelay: `${idx * 0.18}s`,
                          display: 'inline-block'
                        }}
                        role="img"
                        aria-label="fear-emoji"
                      >
                        {em}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{
                  color: COLORS.primary,
                  fontWeight: 600,
                  fontSize: '1.09rem',
                  marginTop: 7
                }}>
                  Even the silliest fears can make us smile!
                </div>
              </section>
              {/* Add simple CSS animation */}
              <style>
                {`
                @keyframes floaty {
                  0% { transform: translateY(0); }
                  100% { transform: translateY(-10px); }
                }
                `}
              </style>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer style={{
        width: '100%',
        background: COLORS.primary,
        color: 'white',
        fontWeight: 500,
        padding: '18px 0 10px 0',
        textAlign: 'center',
        marginTop: 10
      }}>
        <span style={{ color: COLORS.secondary, marginRight: 8 }}>© {new Date().getFullYear()} Fearless Fun</span> | 
        <span style={{ marginLeft: 8, color: COLORS.accent }}>Made to make fears funny!</span>
      </footer>
    </div>
  );
}

export default App;
