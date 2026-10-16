import React, { useMemo, useState } from "react";
import "./DailyEnglishPractice.scss";

type SentenceSection = {
  id: string;
  number: string;
  title: string;
  time: string;
  description: string;
  color: "sunrise" | "blue" | "teal" | "orange" | "purple" | "pink" | "indigo";
  sentences: string[];
  practice?: string;
  tip?: string;
};

const routineSections: SentenceSection[] = [
  {
    id: "morning",
    number: "01",
    title: "My Morning Routine",
    time: "5:00 AM – 8:00 AM",
    description: "Practice these sentences every morning.",
    color: "sunrise",
    sentences: [
      "I usually wake up at 5 AM every day.",
      "I freshen up after waking up.",
      "I brush my teeth and wash my face.",
      "I drink a glass of water.",
      "I meditate for a while.",
      "I spend some time in silence.",
      "I focus on positive thoughts.",
      "I get the kids ready for school.",
      "I help them get dressed.",
      "I prepare their school bags.",
      "I make sure they have everything they need.",
      "I prepare breakfast for the kids.",
      "I drop the kids off at school.",
      "I come back home after dropping them off.",
      "I start my workday after returning home.",
    ],
    practice:
      "I usually wake up at 5 AM. I meditate for a while. Then, I get the kids ready for school. I drop them off at school and come back home.",
    tip: "Say “I wake up at 5 AM,” not “I wake up 5 AM.” Say “I drop them off at school,” not “I go to drop them school.” Also, say “I come back home,” not “I come back to home.”",
  },
  {
    id: "office",
    number: "02",
    title: "Office Work and Meetings",
    time: "Morning – 1:00 PM",
    description: "Useful sentences for describing your workday.",
    color: "blue",
    sentences: [
      "I start my office work in the morning.",
      "I attend office meetings.",
      "I join conference calls.",
      "I check my emails.",
      "I respond to important messages.",
      "I review my daily tasks.",
      "I work on my assigned projects.",
      "I discuss work-related issues with my colleagues.",
      "I share updates with my team.",
      "I try to finish my important tasks on time.",
      "I take notes during meetings.",
      "I sometimes have back-to-back meetings.",
      "I stay busy with my office work.",
      "I take a short break whenever I get time.",
      "I usually have lunch around 1 PM Eastern Time.",
    ],
    practice:
      "I attend meetings and conference calls in the morning. I check my emails and work on my projects. I stay busy with office work. I usually have lunch around 1 PM Eastern Time.",
  },
  {
    id: "afternoon",
    number: "03",
    title: "My Afternoon Routine",
    time: "1:00 PM – 4:00 PM",
    description: "Talk about lunch, school pickup, and time with the kids.",
    color: "teal",
    sentences: [
      "I usually have lunch around 1 PM.",
      "I finish my lunch and get back to work.",
      "I continue working on my office tasks.",
      "I get ready to pick up the kids.",
      "I leave home to pick them up at 2:30 PM.",
      "I pick up the kids from school.",
      "I usually return home by 4 PM.",
      "I ask the kids how their day went.",
      "I ask them what they learned at school.",
      "I check whether they have any homework.",
      "I help them if they need my support.",
      "I make sure they have a snack if they are hungry.",
    ],
    practice:
      "I leave home at 2:30 PM to pick up the kids. I pick them up from school and usually get back home by 4 PM. I ask them how their day went and whether they have any homework.",
    tip: "A natural sentence is “I leave home at 2:30 PM to pick up the kids.” Remember: “drop the kids off at school” and “pick the kids up from school.”",
  },
  {
    id: "late-afternoon",
    number: "04",
    title: "My Late Afternoon Routine",
    time: "4:00 PM – 7:00 PM",
    description: "Talk about finishing work, having tea, and gardening.",
    color: "orange",
    sentences: [
      "I get back home by 4 PM.",
      "I continue working on my remaining office tasks.",
      "I try to finish my work before the evening.",
      "I hardly get any time to rest.",
      "I usually have a cup of tea around 4:30 PM.",
      "I take a short break while drinking my tea.",
      "I spend some time in the garden.",
      "I water the plants.",
      "I remove weeds from the garden.",
      "I take care of my plants.",
      "I enjoy spending time in nature.",
      "I feel refreshed when I work in the garden.",
      "I try to balance my work and personal life.",
      "I sometimes feel tired after a busy day.",
      "I remind myself to take care of my health, too.",
    ],
    practice:
      "I get back home by 4 PM and continue my office work. I usually have a cup of tea around 4:30 PM. After that, I spend some time in the garden. I water my plants and enjoy being close to nature.",
    tip: "You can say “I have a cup of tea around 4:30 PM,” “I do some gardening,” or “I work in the garden.” These all sound natural.",
  },
  {
    id: "evening",
    number: "05",
    title: "My Evening Routine",
    time: "7:00 PM – 9:30 PM",
    description: "Practice sentences about pooja, Raja Yoga, dinner, and family.",
    color: "purple",
    sentences: [
      "I perform my regular pooja at 7 PM.",
      "I pray to God every evening.",
      "I express my gratitude to God.",
      "I spend a few moments in silence.",
      "I attend my Hindi Raja Yoga class with Brahma Kumaris at 7:30 PM.",
      "I listen carefully during the class.",
      "I learn something new about meditation and spirituality.",
      "I try to apply these teachings to my daily life.",
      "I feel peaceful after the class.",
      "I prepare for dinner.",
      "I have dinner with my family.",
      "I talk to my family about our day.",
      "I go for a short walk after dinner.",
      "I enjoy walking in the fresh air.",
      "I come back home after my walk.",
      "I help the kids get ready for bed.",
      "I make sure the kids finish their bedtime routine.",
      "I put the kids to bed around 9:30 PM.",
    ],
    practice:
      "At 7 PM, I perform my regular pooja and pray to God. At 7:30 PM, I attend my Hindi Raja Yoga class with Brahma Kumaris. After the class, I have dinner with my family. Then, I go for a short walk.",
    tip: "Say “I attend a class,” not “I attain a class.” You attend a meeting, class, or training session. You attain a goal, which means you achieve it.",
  },
  {
    id: "night",
    number: "06",
    title: "My Night Routine",
    time: "After 9:30 PM",
    description: "Describe your phone and office work, letter to God, and bedtime.",
    color: "pink",
    sentences: [
      "I put the kids to bed around 9:30 PM.",
      "I check my phone after they go to sleep.",
      "I catch up on any pending office work.",
      "I respond to important messages.",
      "I finish any remaining tasks for the day.",
      "I check my schedule for the next day.",
      "I prepare a mental list of my priorities.",
      "I put my phone away when I finish my work.",
      "I sit quietly for a few minutes.",
      "I write a letter to God before going to sleep.",
      "I share my thoughts and feelings with God.",
      "I thank God for everything I have.",
      "I reflect on the things that happened during the day.",
      "I think about what I can do better tomorrow.",
      "I try to let go of my worries before sleeping.",
      "I go to bed after finishing my nightly routine.",
      "I try to get enough sleep so I can wake up early the next morning.",
    ],
    practice:
      "I put the kids to bed around 9:30 PM. After that, I sometimes use my phone to finish some pending office work. Before going to sleep, I write a letter to God. I share my thoughts, express my gratitude, and thank God for everything.",
  },
];

const officePhrases = [
  ["When a meeting starts", "I am ready for the meeting."],
  ["When someone asks about your work", "I am working on it."],
  ["When you need more time", "I need a little more time."],
  ["When you don't understand", "I didn't quite understand that."],
  ["When you need clarification", "Could you please explain that again?"],
  ["When you are busy", "I am a little busy right now."],
  ["When you finish a task", "I have completed the task."],
  ["When you need help", "Could you please help me with this?"],
  ["When you will respond later", "I will get back to you shortly."],
  ["When you agree", "That sounds good to me."],
];

const kidPhrases = [
  "I hope you had a good day at school.",
  "What did you learn today?",
  "Did you have fun with your friends?",
  "Did your teacher give you any homework?",
  "Do you have any tests coming up?",
  "Did you eat your lunch?",
  "Is there anything interesting you want to tell me?",
  "Let me know if you need any help.",
  "I am happy to see you.",
  "I am proud of you.",
];

const everydayPhrases = [
  "I am getting ready.",
  "I will be there in a few minutes.",
  "I am running a little late.",
  "I will finish it soon.",
  "I am taking a short break.",
  "I have a lot of work today.",
  "I am trying to manage my time.",
  "I will take care of it.",
  "I am not sure about that.",
  "I will check and let you know.",
  "I need to finish this first.",
  "I will do it after I finish my work.",
  "I am feeling a little tired today.",
  "I need some time to relax.",
  "I am looking forward to the weekend.",
  "I will talk to you later.",
  "I forgot to do that.",
  "I have already completed it.",
  "I am doing my best.",
  "I hope everything goes well.",
];

const gratitudePhrases = [
  "I feel grateful for everything I have.",
  "I thank God for guiding me.",
  "I feel blessed to have my family.",
  "I try to end my day with positive thoughts.",
  "I leave my worries in God's hands.",
  "I pray for peace and happiness for everyone.",
  "I hope tomorrow will be a good day.",
  "I feel peaceful when I write to God.",
];

const grammarCorrections = [
  { incorrect: "I wake up 5 AM.", correct: "I wake up at 5 AM." },
  { incorrect: "I go to drop them school.", correct: "I drop them off at school." },
  { incorrect: "I come back to home.", correct: "I come back home." },
  { incorrect: "I attain a class.", correct: "I attend a class." },
  { incorrect: "I do gardening.", correct: "I do some gardening." },
  { incorrect: "I go to pick kids.", correct: "I go to pick up the kids." },
  { incorrect: "I return by 4 PM.", correct: "I usually get back home by 4 PM." },
];

function SectionCard({
  section,
  expanded,
  onToggle,
}: {
  section: SentenceSection;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <section className={`dep-card dep-card--${section.color} ${expanded ? "is-expanded" : ""}`}>
      <button
        className="dep-card__header"
        type="button"
        aria-expanded={expanded}
        aria-controls={`panel-${section.id}`}
        onClick={onToggle}
      >
        <span className="dep-card__number">{section.number}</span>
        <span className="dep-card__heading">
          <span className="dep-card__title">{section.title}</span>
          <span className="dep-card__meta">{section.time} · {section.sentences.length} sentences</span>
        </span>
        <span className={`dep-card__chevron ${expanded ? "is-open" : ""}`} aria-hidden="true">⌄</span>
      </button>
      {expanded && (
        <div className="dep-card__content" id={`panel-${section.id}`}>
          <p className="dep-card__description">{section.description}</p>
          <ol className="dep-sentence-list">
            {section.sentences.map((sentence, index) => (
              <li key={`${section.id}-${index}`}>
                <span className="dep-sentence-list__index">{index + 1}</span>
                <span>{sentence}</span>
              </li>
            ))}
          </ol>
          {section.practice && (
            <div className="dep-practice-box">
              <span className="dep-eyebrow">SPEAKING PRACTICE</span>
              <p>{section.practice}</p>
            </div>
          )}
          {section.tip && (
            <div className="dep-tip">
              <strong>English tip</strong>
              <p>{section.tip}</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function PhraseList({ items, numbered = false }: { items: string[]; numbered?: boolean }) {
  return (
    <ol className={`dep-phrase-list ${numbered ? "dep-phrase-list--numbered" : ""}`}>
      {items.map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}
    </ol>
  );
}

export default function DailyEnglishPractice() {
  const [expandedSections, setExpandedSections] = useState<string[]>([""]);
  const [allExpanded, setAllExpanded] = useState(false);
  const [search, setSearch] = useState("");
  const [showRoutineStory, setShowRoutineStory] = useState(true);

  const toggleSection = (id: string) => {
    setExpandedSections((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
    setAllExpanded(false);
  };

  const toggleAll = () => {
    if (allExpanded) {
      setExpandedSections([]);
      setAllExpanded(false);
    } else {
      setExpandedSections(routineSections.map((section) => section.id));
      setAllExpanded(true);
    }
  };

  const filteredSections = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return routineSections;
    return routineSections.filter((section) =>
      [section.title, section.time, section.description, ...section.sentences, section.practice ?? "", section.tip ?? ""]
        .some((value) => value.toLowerCase().includes(term))
    );
  }, [search]);

  return (
    <main className="daily-english">
      <div className="dep-hero">
        <div className="dep-hero__orb dep-hero__orb--one" />
        <div className="dep-hero__orb dep-hero__orb--two" />
        <div className="dep-hero__content">
          <span className="dep-kicker">YOUR EVERYDAY SPEAKING GUIDE</span>
          <h1>Daily English Practice</h1>
          <p className="dep-hero__intro">
            Build confidence with short, natural English sentences based on your real daily routine.
            Read them aloud, repeat them, and practice a little every day.
          </p>
          <div className="dep-hero__stats">
            <div><strong>6</strong><span>daily routine sections</span></div>
            <div><strong>15 min</strong><span>daily practice plan</span></div>
            <div><strong>Simple</strong><span>everyday English</span></div>
          </div>
        </div>
      </div>

      <div className="dep-container">
        <section className="dep-start-card">
          <div className="dep-start-card__icon" aria-hidden="true">🎯</div>
          <div>
            <h2>Your practice goal</h2>
            <p>Speak slowly and clearly. You do not need to speak fast or use difficult words. Focus on correct grammar, natural expressions, and confidence.</p>
          </div>
        </section>

        <div className="dep-section-heading">
          <div>
            <span className="dep-eyebrow">FROM MORNING TO NIGHT</span>
            <h2>My daily routine</h2>
            <p>Open each section to practice the sentences for that part of your day.</p>
          </div>
          <button className="dep-button dep-button--outline" type="button" onClick={toggleAll}>
            {allExpanded ? "Collapse all" : "Expand all"}
          </button>
        </div>

        <label className="dep-search">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search sentences, e.g. meditation, meeting, gardening..."
            aria-label="Search daily routine sentences"
          />
          {search && <button type="button" onClick={() => setSearch("")} aria-label="Clear search">×</button>}
        </label>

        <div className="dep-routine-grid">
          {filteredSections.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
              expanded={expandedSections.includes(section.id) || Boolean(search.trim())}
              onToggle={() => toggleSection(section.id)}
            />
          ))}
          {filteredSections.length === 0 && (
            <div className="dep-empty">No matching sentences found. Try another word.</div>
          )}
        </div>

        <section className="dep-panel dep-panel--story">
          <button className="dep-panel__header" type="button" onClick={() => setShowRoutineStory((value) => !value)} aria-expanded={showRoutineStory}>
            <span className="dep-panel__icon">📖</span>
            <span><span className="dep-eyebrow">READ ALOUD</span><strong>My complete daily routine</strong></span>
            <span className={`dep-card__chevron ${showRoutineStory ? "is-open" : ""}`} aria-hidden="true">⌄</span>
          </button>
          {showRoutineStory && (
            <div className="dep-story">
              <p>I usually wake up at 5 AM every day.</p>
              <p>I freshen up and meditate for a while. After that, I get the kids ready for school. I help them get dressed, prepare their school bags, and make sure they have everything they need.</p>
              <p>Then, I drop them off at school and come back home.</p>
              <p>I start my office work in the morning. I attend meetings, join conference calls, check my emails, and work on my projects. I usually have lunch around 1 PM Eastern Time.</p>
              <p>At 2:30 PM, I leave home to pick up the kids. I usually get back home by 4 PM.</p>
              <p>After that, I continue working on my remaining office tasks. I hardly get any time to rest. I usually have a cup of tea around 4:30 PM.</p>
              <p>Sometimes, I spend some time in the garden. I water my plants and enjoy being close to nature.</p>
              <p>At 7 PM, I perform my regular pooja and pray to God. At 7:30 PM, I attend my Hindi Raja Yoga class with Brahma Kumaris.</p>
              <p>After the class, I have dinner with my family. Then, I go for a short walk.</p>
              <p>I put the kids to bed around 9:30 PM. After that, I sometimes use my phone to finish some pending office work.</p>
              <p>Before going to sleep, I write a letter to God. I share my thoughts, express my gratitude, and thank God for everything.</p>
              <p>Finally, I go to bed and prepare myself for another busy day.</p>
              <p>My days are usually very busy, but I try to balance my work, family, spirituality, and personal responsibilities.</p>
            </div>
          )}
        </section>

        <div className="dep-two-column">
          <section className="dep-panel dep-panel--blue">
            <div className="dep-panel__static-header">
              <span className="dep-panel__icon">💼</span>
              <div><span className="dep-eyebrow">AT WORK</span><h2>Office conversation phrases</h2></div>
            </div>
            <div className="dep-prompt-list">
              {officePhrases.map(([situation, phrase]) => (
                <div className="dep-prompt" key={situation}>
                  <span>{situation}</span><strong>{phrase}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="dep-panel dep-panel--teal">
            <div className="dep-panel__static-header">
              <span className="dep-panel__icon">🎒</span>
              <div><span className="dep-eyebrow">WITH YOUR KIDS</span><h2>Everyday family phrases</h2></div>
            </div>
            <PhraseList items={kidPhrases} />
          </section>
        </div>

        <section className="dep-panel dep-panel--coral">
          <div className="dep-panel__static-header">
            <span className="dep-panel__icon">💬</span>
            <div><span className="dep-eyebrow">USE THESE EVERY DAY</span><h2>20 everyday English sentences</h2></div>
          </div>
          <div className="dep-phrase-grid">
            {everydayPhrases.map((phrase, index) => (
              <div className="dep-phrase-chip" key={phrase}><span>{String(index + 1).padStart(2, "0")}</span>{phrase}</div>
            ))}
          </div>
        </section>

        <section className="dep-panel dep-panel--lavender">
          <div className="dep-panel__static-header">
            <span className="dep-panel__icon">✨</span>
            <div><span className="dep-eyebrow">POSITIVE THOUGHTS</span><h2>Sentences about gratitude and God</h2></div>
          </div>
          <PhraseList items={gratitudePhrases} />
        </section>

        <section className="dep-panel dep-panel--grammar">
          <div className="dep-panel__static-header">
            <span className="dep-panel__icon">✍️</span>
            <div><span className="dep-eyebrow">LEARN FROM YOUR MISTAKES</span><h2>Quick grammar corrections</h2></div>
          </div>
          <div className="dep-correction-table">
            {grammarCorrections.map(({ incorrect, correct }) => (
              <div className="dep-correction-row" key={incorrect}>
                <span className="dep-correction-row__wrong"><b aria-hidden="true">×</b>{incorrect}</span>
                <span className="dep-correction-row__right"><b aria-hidden="true">✓</b>{correct}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="dep-panel dep-panel--plan">
          <div className="dep-panel__static-header">
            <span className="dep-panel__icon">⏱️</span>
            <div><span className="dep-eyebrow">A SMALL, REALISTIC HABIT</span><h2>Your 15-minute daily practice plan</h2></div>
          </div>
          <div className="dep-plan-grid">
            <article className="dep-plan-step dep-plan-step--morning">
              <span className="dep-plan-step__time">5 MINUTES</span>
              <h3>Morning</h3>
              <p>Speak five sentences about your morning routine.</p>
              <blockquote>“I wake up at 5 AM. I meditate for a while. I get the kids ready for school.”</blockquote>
            </article>
            <article className="dep-plan-step dep-plan-step--afternoon">
              <span className="dep-plan-step__time">5 MINUTES</span>
              <h3>Afternoon</h3>
              <p>Practice office-related sentences.</p>
              <blockquote>“I have a meeting at 10 AM. I need to finish my work before lunch.”</blockquote>
            </article>
            <article className="dep-plan-step dep-plan-step--night">
              <span className="dep-plan-step__time">5 MINUTES</span>
              <h3>Night</h3>
              <p>Describe your day in English.</p>
              <blockquote>“Today was a busy day. I completed most of my tasks. I spent some time with my family. I am grateful for everything.”</blockquote>
            </article>
          </div>
        </section>

        <section className="dep-thinking-card">
          <div className="dep-thinking-card__symbol" aria-hidden="true">🧠</div>
          <div>
            <span className="dep-eyebrow">ONE IMPORTANT TIP</span>
            <h2>Try to think in English</h2>
            <p>Instead of translating every sentence from Hindi into English, describe what you are doing in the moment.</p>
            <div className="dep-thought-examples">
              <span>While watering plants: <strong>“I am watering my plants.”</strong></span>
              <span>While preparing dinner: <strong>“I am preparing dinner.”</strong></span>
              <span>While checking your phone: <strong>“I am checking my messages.”</strong></span>
            </div>
          </div>
        </section>

        <footer className="dep-footer">
          <span className="dep-footer__sparkle">✦</span>
          <p><strong>Small steps every day make a big difference.</strong><br />Practice aloud for 5–10 minutes. Speak clearly, and don't worry about making mistakes.</p>
        </footer>
      </div>
    </main>
  );
}
