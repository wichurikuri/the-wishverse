"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, RotateCcw, Sparkles, Volume2, VolumeX } from "lucide-react";

type Choice = { label: string; sub: string; next: string; flag?: string; };
type Scene = { arc: string; era: string; title: string; text: string[]; choices: Choice[]; image?: string; };

const scenes: Record<string, Scene> = {
  intro: {
    arc: "PROLOGUE · THE FIRST WISH",
    era: "HANDS UP · WISH",
    title: "The letter that knew your name",
    text: [
      "You never believed in prophecies. Stars were just distant lights, far too distant to care about the lives of ordinary people.",
      "Until a letter appeared at your doorstep. No sender. No address. Only six stars surrounding a seventh that had gone dark.",
      "Inside, a message waited: “Dear Y/N, you made a wish once. We have been paying for it ever since. Find us before the seventh star disappears again.”",
      "Six signatures rested at the bottom: Sion, Riku, Yushi, Jaehee, Ryo, and Sakuya. You had never met any of them.",
      "A knock sounded behind you. A young man stood in the doorway, rain dripping from his coat. He stared at the letter, then at you.",
      "“Please tell me you haven't opened it.” The lights went out. In the darkness, he whispered: “If they find out you remember, all of us will die.”"
    ],
    choices: [
      { label: "“Who are you? How do you know my name?”", sub: "Ask the stranger to explain himself.", next: "stranger" },
      { label: "Hide the letter and pretend nothing happened.", sub: "Trust no one until you know more.", next: "hide", flag: "cautious" },
      { label: "“Who will die? What did I do?”", sub: "Demand answers, even if they hurt.", next: "truth", flag: "bold" },
      { label: "Grab the key in his hand and run outside.", sub: "Act before he can stop you.", next: "run", flag: "reckless" }
    ]
  },
  stranger: {
    arc: "ARC I · THE AWAKENING",
    era: "WISH · SAIL AWAY",
    title: "A name swallowed by the rain",
    text: [
      "“Names are dangerous tonight,” he says. “But you can call me Riku.” His eyes flick to the seventh star on the letter.",
      "“You don't remember me. That's good. It means the spell is still holding.” He places a small red key in your palm. It is warm, almost like a heartbeat.",
      "“At midnight, go to the old observatory. If Sion asks, tell him you came alone. And Y/N?” He hesitates. “Don't let Yushi see the key.”",
      "Before you can ask why, a bell rings somewhere far away. Riku vanishes into the rain, leaving only a silver feather on the floor."
    ],
    choices: [
      { label: "Go to the observatory before midnight.", sub: "Follow Riku's clue.", next: "observatory", flag: "riku" },
      { label: "Find out why Yushi must not see the key.", sub: "The warning feels too specific to ignore.", next: "yushi", flag: "yushi" },
      { label: "Search the letter for a hidden message.", sub: "Look for what Riku didn't say.", next: "letter", flag: "curious" }
    ]
  },
  hide: {
    arc: "ARC I · THE AWAKENING",
    era: "HANDS UP",
    title: "The choice to stay silent",
    text: [
      "You fold the letter and slip it beneath your sleeve. The stranger notices, but says nothing.",
      "“Smart,” he murmurs. “Or dangerous. Sometimes they're the same thing.” He steps away from the door, revealing a symbol burned into the wood: seven stars, one crossed out.",
      "“Midnight. The old observatory. Come if you want the truth.” Then he leaves without giving you his name.",
      "When you look down, the letter has changed. A new line appears in silver ink: HE KNOWS YOU CHOSE THIS BEFORE."
    ],
    choices: [
      { label: "Go to the observatory alone.", sub: "Keep your decision private.", next: "observatory", flag: "cautious" },
      { label: "Follow the stranger from a distance.", sub: "You need to know where he goes.", next: "follow", flag: "suspicious" }
    ]
  },
  truth: {
    arc: "ARC I · THE AWAKENING",
    era: "WISH",
    title: "The price of a wish",
    text: [
      "The stranger's face changes. For one second, you see fear—not of you, but for you.",
      "“You asked the stars to save someone,” he says. “The stars answered. But wishes don't create miracles. They move the cost somewhere else.”",
      "He presses a red key into your hand. “The observatory. Midnight. There you'll learn who paid.”",
      "A distant bell tolls once. The stranger looks toward the window. “And if Sion tells you the story, remember: he only tells the parts he can live with.”"
    ],
    choices: [
      { label: "Ask who you tried to save.", sub: "The question hurts, but you need it answered.", next: "letter", flag: "bold" },
      { label: "Go straight to the observatory.", sub: "The truth can wait no longer.", next: "observatory", flag: "riku" }
    ]
  },
  run: {
    arc: "ARC I · THE AWAKENING",
    era: "HANDS UP · WE GO",
    title: "The key that remembers",
    text: [
      "You snatch the red key and run into the night. Behind you, the stranger calls your name—but not loudly enough to summon help.",
      "The key grows warmer as you move through the empty streets. It tugs toward a narrow lane that wasn't there a moment ago.",
      "At the end stands an iron gate. Six names are carved into it. The seventh space is blank, waiting for yours.",
      "A voice speaks from the other side: “You're late, Y/N.”"
    ],
    choices: [
      { label: "Unlock the gate.", sub: "Whatever waits inside knows you.", next: "observatory", flag: "reckless" },
      { label: "Call out and ask who is there.", sub: "You won't enter blindly.", next: "gate", flag: "careful" }
    ]
  },
  follow: {
    arc: "ARC I · THE AWAKENING",
    era: "SONGBIRD",
    title: "A feather in the dark",
    text: [
      "You follow the stranger through narrow streets until he stops beneath a dead tree. A small silver bird lands on his shoulder.",
      "He whispers to it. The bird turns its head toward you, though you are hidden behind a wall.",
      "A folded note drops from its beak and lands at your feet: TRUST THE ONE WHO IS AFRAID OF YOUR MEMORY.",
      "When you look up, the stranger is gone. The bird remains, watching you with eyes that look strangely human."
    ],
    choices: [
      { label: "Follow the bird.", sub: "It seems to be leading you somewhere.", next: "observatory", flag: "curious" },
      { label: "Keep the note and return home.", sub: "You need time to think.", next: "letter", flag: "cautious" }
    ]
  },
  yushi: {
    arc: "ARC I · THE AWAKENING",
    era: "SONGBIRD",
    title: "The boy who was already watching",
    text: [
      "You find Yushi beneath the clock tower, as if he has been waiting for you. His smile is calm, but his eyes drop immediately to your closed hand.",
      "“Riku gave you something,” he says. It isn't a question.",
      "“I could tell you not to trust him,” Yushi continues. “But then you'd wonder why I care. So I'll ask you something instead: do you remember the last time the sky went dark?”",
      "You don't. Yet the question leaves a strange ache behind your ribs."
    ],
    choices: [
      { label: "Show Yushi the key.", sub: "See whether he tells the truth.", next: "observatory", flag: "yushi" },
      { label: "Lie and say Riku gave you nothing.", sub: "Keep one secret for yourself.", next: "letter", flag: "suspicious" }
    ]
  },
  letter: {
    arc: "ARC I · THE AWAKENING",
    era: "WISH · SAIL AWAY",
    title: "A memory beneath the ink",
    text: [
      "You hold the letter near a candle. Hidden writing rises between the lines, like stars appearing at dusk.",
      "I WISHED FOR THEM TO FORGET ME.",
      "Beneath it, six tiny marks form a circle. One has been scratched away so violently that the paper has torn.",
      "On the back, a final sentence appears: THE FIRST PERSON WHO REMEMBERS YOU WILL BE THE FIRST PERSON YOU HURT."
    ],
    choices: [
      { label: "Take the letter to Sion.", sub: "A leader should know what is written here.", next: "observatory", flag: "sion" },
      { label: "Keep the message secret.", sub: "You don't know who the warning refers to.", next: "yushi", flag: "secret" }
    ]
  },
  gate: {
    arc: "ARC I · THE AWAKENING",
    era: "HANDS UP",
    title: "A voice from the other side",
    text: [
      "“Someone who has been waiting for you,” the voice replies. “Someone you promised you would come back for.”",
      "The gate opens a finger's width. Beyond it, six silhouettes stand beneath a sky full of unfamiliar constellations.",
      "One silhouette steps forward, but the darkness hides his face.",
      "“Choose carefully,” the voice says. “The first one you trust will change everything.”"
    ],
    choices: [
      { label: "Step through the gate.", sub: "You came here for answers.", next: "observatory", flag: "bold" },
      { label: "Ask them to reveal their faces first.", sub: "No more blind trust.", next: "observatory", flag: "careful" }
    ]
  },
  observatory: {
    arc: "ARC II · THE SEVEN SECRETS",
    era: "STEADY · WISHFUL",
    title: "The six who knew your name",
    text: [
      "At midnight, the old observatory appears at the edge of the city. Its windows glow with blue light, and constellations move across its ceiling like living things.",
      "Six young men wait around a circular table. Sion stands at its head. Jaehee holds a book chained shut. Ryo clutches a silver pendant. Sakuya looks as if he has seen a ghost.",
      "Riku's gaze finds the red key in your hand. Yushi notices that he notices.",
      "“Welcome back, Y/N,” Sion says. “Before we explain anything, you need to know one thing: one of us has already died.”",
      "A chair scrapes across the floor by itself. On it rests a crown stained with dark red ink. Your name appears across its rim."
    ],
    choices: [
      { label: "Ask Sion what he means by “welcome back.”", sub: "The leader seems to know your past.", next: "sion" },
      { label: "Confront Riku about the red key.", sub: "He has been hiding something from you.", next: "riku" },
      { label: "Ask Sakuya why he looks frightened.", sub: "His reaction feels personal.", next: "sakuya" },
      { label: "Examine the crown without telling anyone.", sub: "The object may hold the first real clue.", next: "crown" }
    ]
  },
  sion: {
    arc: "ARC II · THE SEVEN SECRETS",
    era: "STEADY",
    title: "The keeper's half-truth",
    text: [
      "Sion studies you for a long moment. “You were here once. Before the observatory was sealed. Before the seventh star disappeared.”",
      "“Why don't I remember?” you ask.",
      "“Because you asked us to make you forget.” His voice softens, but his hands tighten around the edge of the table. “I was the one who granted the wish.”",
      "From somewhere behind the wall, a clock begins to tick backward."
    ],
    choices: [
      { label: "Ask Sion what the wish cost him.", sub: "Look beyond his calm expression.", next: "cost" },
      { label: "Tell him you don't believe him.", sub: "His story has too many missing pieces.", next: "crown" }
    ]
  },
  riku: {
    arc: "ARC II · THE SEVEN SECRETS",
    era: "STEADY",
    title: "The locksmith's promise",
    text: [
      "Riku takes one look at the key and goes still. “Where did you get this?”",
      "“You gave it to me.”",
      "“Not tonight.” He looks away. “I gave it to you a long time ago. You told me to keep it until you were ready to remember.”",
      "For a second, neither of you speaks. Then he adds, almost too quietly to hear, “I hoped you would never be ready.”"
    ],
    choices: [
      { label: "Ask why he hoped you would forget.", sub: "His fear feels more honest than his answers.", next: "cost" },
      { label: "Put the key in his hand.", sub: "Let him decide what to do with it.", next: "crown" }
    ]
  },
  sakuya: {
    arc: "ARC II · THE SEVEN SECRETS",
    era: "WISHFUL",
    title: "The dream he cannot forget",
    text: [
      "Sakuya's eyes flick to your face, then to the pendant around Ryo's neck. “I've seen you in my dreams,” he says. “Every night since I was little.”",
      "“What happens in them?”",
      "“You stand beneath a red sky. You tell me to run. Then everything disappears.” His voice shakes. “Last night, for the first time, you said my name.”",
      "Jaehee's chained book rattles by itself. A page turns, revealing a drawing of you standing among six dark silhouettes."
    ],
    choices: [
      { label: "Ask Sakuya to describe the dream in detail.", sub: "The dream may be a memory.", next: "crown" },
      { label: "Ask Jaehee about the drawing.", sub: "The book reacted to your presence.", next: "cost" }
    ]
  },
  crown: {
    arc: "ARC II · THE SEVEN SECRETS",
    era: "DUNK SHOT · COLOR",
    title: "The crown with seven names",
    text: [
      "The crown is cold enough to sting your fingers. Six names are engraved around its rim. The seventh appears only when you look away.",
      "You touch the blank space. A flash of memory strikes: a tower collapsing, a hand reaching for yours, and a voice saying, “Make them forget me.”",
      "When you return to yourself, everyone is staring. The crown has left a silver mark on your palm.",
      "Jaehee opens his chained book. “The archive has recognized its missing owner,” he whispers."
    ],
    choices: [
      { label: "Ask Jaehee to open the archive.", sub: "You need to see the memory for yourself.", next: "archive" },
      { label: "Demand that everyone tell you what they remember.", sub: "No more secrets between you.", next: "cost" }
    ]
  },
  cost: {
    arc: "ARC III · THE DREAM TRAP",
    era: "POPP OP · COLOR",
    title: "The price was never paid",
    text: [
      "Ryo finally lifts the pendant from his neck. Inside is a tiny glass star, cracked down the middle.",
      "“The wish didn't erase your memories,” he says. “It moved them. Every memory you lost became a room in a place none of us can leave.”",
      "Yushi turns toward the dark window. “And someone has been living in those rooms.”",
      "Outside, the stars blink out one by one. A new door appears in the observatory wall, painted a soft, impossible blue."
    ],
    choices: [
      { label: "Enter the blue door.", sub: "The missing memories are calling.", next: "dreamcity" },
      { label: "Stay with the six and plan together.", sub: "You don't have to face this alone.", next: "archive" }
    ]
  },
  archive: {
    arc: "ARC IV · THE WISHLIST",
    era: "DREAMCATCHER · WISHLIST",
    title: "The archive of forgotten wishes",
    text: [
      "Behind the door lies a library suspended above a sea of stars. Each book contains a wish someone once made. Some glow warmly. Others have been burned from the inside.",
      "Jaehee finds a book with your name. Its final page is missing.",
      "“The page was removed after the second reset,” he says. “If we find it, we can learn who changed the wish.”",
      "A tiny silver bird lands on the shelf. It drops a page at your feet. Written across it are the words: THE PERSON YOU LOVE WILL REMEMBER LAST."
    ],
    choices: [
      { label: "Ask Jaehee to help decode the page.", sub: "Follow the evidence carefully.", next: "dreamcity", flag: "jaehee" },
      { label: "Ask who has been resetting the world.", sub: "The culprit may be closer than you think.", next: "dreamcity", flag: "suspicious" }
    ]
  },
  dreamcity: {
    arc: "ARC V · THE FATE CONTRACT",
    era: "SAME SKY · ODE TO LOVE",
    title: "A city made from your wishes",
    text: [
      "The blue door opens onto a perfect city. No one argues. No one grieves. The sky is always a gentle shade of blue, and every street seems to lead you toward something you once wanted.",
      "For one impossible moment, you see a version of your life where you never lost anyone. One of the six walks beside you, laughing as if the world has never hurt him.",
      "Then you notice the shadows. Every person in the city casts a shadow shaped like a star with its center cut out.",
      "A voice echoes from the clock tower: “You can stay here. You can have everything you wished for. You only have to forget why you came.”"
    ],
    choices: [
      { label: "Refuse the perfect life and search the clock tower.", sub: "A comforting lie is still a lie.", next: "spy" },
      { label: "Ask one of the six to stay beside you.", sub: "You need someone to anchor you to reality.", next: "bond" },
      { label: "Pretend to accept the offer and investigate quietly.", sub: "Use the illusion to find its creator.", next: "spy", flag: "cunning" }
    ]
  },
  bond: {
    arc: "ARC V · THE FATE CONTRACT",
    era: "ODE TO LOVE",
    title: "The person who stays",
    text: [
      "One of the six reaches for your hand. The city trembles at the contact, as if tenderness itself is forbidden here.",
      "“I don't know what you used to mean to me,” he admits. “But I know I don't want a world where you have to forget everything to be happy.”",
      "For the first time, the warmth between you feels real—not a spell, not a memory, but a choice made in the present.",
      "The red sky splits open. Behind it, a tower waits, its windows filled with moving silhouettes."
    ],
    choices: [
      { label: "Go to the tower together.", sub: "Whatever waits there, you will face it side by side.", next: "spy" },
      { label: "Ask him what he is afraid to tell you.", sub: "The truth matters more than comfort.", next: "spy" }
    ]
  },
  spy: {
    arc: "ARC VI · I SPY",
    era: "I SPY · THE FINAL INVESTIGATION",
    title: "Someone is watching you",
    text: [
      "At the top of the tower, you find six mirrors. Five reflect the room. The sixth reflects a night sky with seven stars.",
      "In the mirror, you see yourself standing beside the six boys—but one of them has no reflection at all.",
      "A message appears on the glass: THE PERSON WHO REMEMBERS LAST WILL DECIDE WHICH WORLD SURVIVES.",
      "Footsteps approach from the staircase. Someone has followed you. You have seconds to decide what to do with the mirror."
    ],
    choices: [
      { label: "Break the mirror before they arrive.", sub: "Destroy the evidence so no one can use it against you.", next: "ending_break" },
      { label: "Hide and watch who enters.", sub: "The watcher may reveal themselves.", next: "ending_watch" },
      { label: "Touch the seventh star in the reflection.", sub: "Risk everything to recover your memory.", next: "ending_star" }
    ]
  },
  ending_break: {
    arc: "ENDING · THE BROKEN MIRROR",
    era: "A POSSIBLE ENDING",
    title: "The truth in fragments",
    text: [
      "The mirror shatters beneath your hand. Every shard shows a different version of the past—and in each one, a different person is reaching for you.",
      "The footsteps stop. Someone whispers your name with a grief so familiar it hurts.",
      "You have prevented the mirror from choosing your future. But the truth is scattered now, and finding every piece will take another journey.",
      "ENDING UNLOCKED: THE BROKEN MIRROR. Your story is not over."
    ],
    choices: [
      { label: "Return to the beginning.", sub: "Try another path.", next: "intro" }
    ]
  },
  ending_watch: {
    arc: "ENDING · THE LAST WITNESS",
    era: "A POSSIBLE ENDING",
    title: "The one without a reflection",
    text: [
      "You hide behind a pillar. The door opens. Riku steps inside, followed by Sion. Neither looks toward the mirror.",
      "Then a seventh shadow enters the room without a person attached to it.",
      "Riku whispers, “She's close to remembering.” The shadow answers in your own voice: “Then let her.”",
      "ENDING UNLOCKED: THE LAST WITNESS. Someone has been speaking through your memories."
    ],
    choices: [
      { label: "Return to the beginning.", sub: "Try another path.", next: "intro" }
    ]
  },
  ending_star: {
    arc: "ENDING · THE SEVENTH STAR",
    era: "A POSSIBLE ENDING",
    title: "The wish you made",
    text: [
      "You touch the star. The tower vanishes, and the memory returns: six hands reaching for you as the seventh star falls from the sky.",
      "You were not the person who caused the first tragedy. You were the one who tried to stop it—and paid by erasing yourself from the world.",
      "The final voice is soft, almost kind: “Now that you remember, Y/N, you must choose whether to bring them back… or let the stars finally rest.”",
      "ENDING UNLOCKED: THE SEVENTH STAR. The final choice is still yours."
    ],
    choices: [
      { label: "Return to the beginning.", sub: "Explore another version of the truth.", next: "intro" }
    ]
  }
};

export default function Home() {
  const [sceneId, setSceneId] = useState("intro");
  const [history, setHistory] = useState<string[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [yName, setYName] = useState("Y/N");
  const [nameDraft, setNameDraft] = useState("Y/N");
  const [showName, setShowName] = useState(false);
  const [visited, setVisited] = useState<string[]>(["intro"]);
  const [soundOn, setSoundOn] = useState(false);

  const scene = scenes[sceneId];

  useEffect(() => {
    try {
      const saved = localStorage.getItem("wishverse-save");
      if (saved) {
        const data = JSON.parse(saved);
        if (data.sceneId && scenes[data.sceneId]) setSceneId(data.sceneId);
        if (Array.isArray(data.history)) setHistory(data.history);
        if (Array.isArray(data.visited)) setVisited(data.visited);
        if (data.yName) { setYName(data.yName); setNameDraft(data.yName); }
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("wishverse-save", JSON.stringify({ sceneId, history, visited, yName }));
    } catch {}
  }, [sceneId, history, visited, yName]);

  function choose(next: string) {
    setHistory((old) => [...old, sceneId]);
    setSceneId(next);
    setVisited((old) => old.includes(next) ? old : [...old, next]);
    setSelected(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    if (!history.length) return;
    const prev = history[history.length - 1];
    setHistory((old) => old.slice(0, -1));
    setSceneId(prev);
    setSelected(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function restart() {
    setSceneId("intro");
    setHistory([]);
    setVisited(["intro"]);
    setSelected(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const progress = Math.min(100, Math.round((visited.length / Object.keys(scenes).length) * 100));
  const personalizedText = (value: string) => value.replaceAll("Y/N", yName || "Y/N");

  return (
    <main className="site-shell">
      <div className="starfield" aria-hidden="true" />
      <header className="topbar">
        <a href="#" className="wordmark" onClick={(e) => { e.preventDefault(); restart(); }}>
          <span className="logo-star">✦</span> THE WISHVERSE
        </a>
        <div className="top-actions">
          <button className="icon-button" aria-label="Toggle sound" onClick={() => setSoundOn(!soundOn)} title="Sound setting">
            {soundOn ? <Volume2 size={17} /> : <VolumeX size={17} />}
          </button>
          <button className="icon-button" aria-label="Personalize protagonist name" onClick={() => setShowName(!showName)} title="Set your name">
            <Sparkles size={17} />
          </button>
        </div>
      </header>

      {showName && (
        <section className="name-panel">
          <label htmlFor="reader-name">Nama tokoh utama</label>
          <div className="name-row">
            <input id="reader-name" value={nameDraft} maxLength={24} onChange={(e) => setNameDraft(e.target.value)} placeholder="Masukkan nama kamu" />
            <button className="small-button" onClick={() => { setYName(nameDraft.trim() || "Y/N"); setShowName(false); }}>Simpan</button>
          </div>
          <p>Nama ini akan menggantikan “Y/N” di teks cerita yang ditampilkan.</p>
        </section>
      )}

      <section className="hero">
        <div className="eyebrow"><span /> AN INTERACTIVE FANTASY AU <span /></div>
        <h1>THE WISH<span>VERSE</span></h1>
        <p className="hero-subtitle">one wish. six secrets. a star that should not exist.</p>
        <div className="hero-meta"><span>MYSTERY</span><i>✦</i><span>SLOW BURN</span><i>✦</i><span>FANTASY</span></div>
        <div className="hero-orbit"><div className="orbit-ring ring-one" /><div className="orbit-ring ring-two" /><span className="orbit-core">✦</span><span className="orbit-dot dot-one" /><span className="orbit-dot dot-two" /><span className="orbit-dot dot-three" /></div>
        <p className="hero-note">A fan-made interactive story inspired by NCT WISH discography.</p>
      </section>

      <section className="story-layout">
        <aside className="sidebar">
          <div className="side-card">
            <p className="side-label">YOUR JOURNEY</p>
            <div className="progress-head"><span>Memories found</span><strong>{visited.length}</strong></div>
            <div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
            <p className="side-hint">Your choices change the path.</p>
          </div>
          <div className="side-card chapter-list">
            <p className="side-label">CHAPTERS</p>
            {[
              ["intro", "01", "The First Wish"],
              ["observatory", "02", "The Seven Secrets"],
              ["cost", "03", "The Dream Trap"],
              ["archive", "04", "The Wishlist"],
              ["dreamcity", "05", "The Fate Contract"],
              ["spy", "06", "I Spy"]
            ].map(([id, num, label]) => (
              <button key={id} className={`chapter-link ${sceneId === id ? "active" : ""} ${visited.includes(id) ? "seen" : ""}`} onClick={() => { if (visited.includes(id)) { setHistory((h) => [...h, sceneId]); setSceneId(id); setSelected(null); } }}>
                <span className="chapter-num">{visited.includes(id) ? "✦" : num}</span><span>{label}</span>
              </button>
            ))}
            <p className="side-hint">Chapters unlock as you explore.</p>
          </div>
          <button className="restart-button" onClick={restart}><RotateCcw size={15} /> Restart story</button>
        </aside>

        <article className="story-card">
          <div className="story-topline"><span>{scene.arc}</span><span className="era-pill">{scene.era}</span></div>
          <div className="story-illustration">
            <div className="illustration-stars">✦　·　✧　·　✦</div>
            <div className="illustration-moon" />
            <div className="illustration-tower"><i /><i /><i /><i /><i /></div>
            <div className="illustration-ground" />
            <div className="illustration-caption">THE SEVENTH STAR IS MISSING</div>
          </div>
          <div className="story-content">
            <p className="chapter-kicker">CHAPTER {String(Math.max(1, visited.length)).padStart(2, "0")}</p>
            <h2>{personalizedText(scene.title)}</h2>
            {scene.text.map((paragraph, index) => <p key={index}>{personalizedText(paragraph)}</p>)}
            <div className="choice-heading"><span>✦</span><p>WHAT WILL YOU DO?</p><span>✦</span></div>
            <div className="choices">
              {scene.choices.map((choice, index) => (
                <button key={`${sceneId}-${index}`} className={`choice ${selected === index ? "selected" : ""}`} onClick={() => setSelected(index)}>
                  <span className="choice-letter">{String.fromCharCode(65 + index)}</span>
                  <span className="choice-copy"><strong>{personalizedText(choice.label)}</strong><small>{personalizedText(choice.sub)}</small></span>
                  <ArrowRight className="choice-arrow" size={17} />
                </button>
              ))}
            </div>
            {selected !== null && (
              <div className="continue-row">
                <p>Your choice: <strong>{personalizedText(scene.choices[selected].label)}</strong></p>
                <button className="continue-button" onClick={() => choose(scene.choices[selected].next)}>Continue story <ArrowRight size={16} /></button>
              </div>
            )}
            <div className="story-footer">
              <button className="text-button" onClick={goBack} disabled={!history.length}><ArrowLeft size={15} /> Previous scene</button>
              <span><BookOpen size={14} /> Progress saved on this device</span>
            </div>
          </div>
        </article>
      </section>

      <footer className="footer">
        <p>THE WISHVERSE · A FAN-MADE INTERACTIVE AU</p>
        <p>Unofficial fan work. NCT WISH and related names belong to their respective owners.</p>
      </footer>
    </main>
  );
}
