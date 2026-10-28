import React, { useMemo, useState } from 'react';
import './ThinkWalkTalkEnglish.scss';

type Lesson = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  paragraphs?: string[];
  sentences?: string[];
  groups?: { title: string; sentences: string[] }[];
};

const lessons: Lesson[] = [
  {
    id: 'think', title: '1. Think in English', subtitle: 'Connect your thoughts directly to English.', icon: '💭',
    paragraphs: [
      'You may know many English words. You may read English and understand movies. But when someone asks you a simple question, you may suddenly become quiet.',
      'Sometimes the problem is translation. You think in your own language, translate the sentence, check the grammar, and worry about mistakes. By then, the conversation may have moved on.',
      'In your first language, you usually think and speak naturally. You do not translate every word or check every grammar rule. Build the same habit in English.',
      'Start with the English you already know. Connect each situation, thought, feeling, and action with a simple English sentence.',
      'It may feel strange at first. You may speak slowly or forget a word. That is normal. The goal is not perfection. The goal is to make a connection.',
      'Do not try to think in complicated English. Simple English is powerful English. Fluency means expressing your thoughts without getting trapped in your head.'
    ],
    sentences: ['I need to get up.', 'I need to brush my teeth.', 'What should I wear today?', 'I’m hungry.', 'I need something to eat.', 'I’m still tired.', 'I need coffee.', 'I have a lot to do today.']
  },
  {
    id: 'daily-life', title: '2. Use Your Daily Life', subtitle: 'Your ordinary day can become your English classroom.', icon: '🏡',
    paragraphs: [
      'You do not need extra hours, a long grammar lesson, or 50 new words every morning. Your daily life already gives you many chances to practice.',
      'Describe what you are doing while you get ready, cook, clean, work, travel, or relax. You can say the sentences aloud or simply think them in English.',
      'Every time you describe real life in English, you build a stronger connection between your thoughts and the language. You do not need to search for topics. Your life gives you unlimited topics.'
    ],
    groups: [
      { title: 'When you wake up', sentences: ['I just woke up.', 'I’m still tired.', 'I need to get out of bed.', 'I need to get ready.'] },
      { title: 'In the bathroom', sentences: ['I’m going to brush my teeth.', 'I need to take a shower.'] },
      { title: 'Making tea', sentences: ['I need some water.', 'The water is boiling.', 'I’ll add some sugar.', 'Where is the spoon?', 'The tea is ready.'] },
      { title: 'Cleaning and cooking', sentences: ['This room is messy.', 'I need to clean my desk.', 'Where should I put this?', 'I haven’t cleaned this area yet.', 'I need to cut the vegetables.', 'The pan is hot.', 'I think I added too much salt.'] },
      { title: 'Leaving the house', sentences: ['I need my keys.', 'Where’s my phone?', 'I think I’m ready.', 'I need to leave now.'] },
      { title: 'At work or while studying', sentences: ['I have to finish this today.', 'This lesson is difficult, but I can understand it.', 'I need to finish this first.', 'This part is difficult.', 'Let me try again.', 'I’ll take a short break after this.'] },
      { title: 'Looking around', sentences: ['I need to charge my phone.', 'The weather is nice today.', 'I need to clean this.', 'There are a lot of people outside.', 'That car is moving very slowly.'] }
    ]
  },
  {
    id: 'talk-day', title: '3. Talk About Your Day', subtitle: 'Connect one thought to another.', icon: '📅',
    paragraphs: [
      'When someone asks, “How was your day?”, your mind may go blank. You know what happened, but you start searching for perfect words.',
      'Organize your thoughts with three simple topics: what you usually do, what you are doing now, and what you did today.',
      'Start with one short sentence. As your confidence grows, add a little more information. One sentence can become a conversation.',
      'Before you go to sleep, spend two minutes talking about your day. You are not just learning English. You are learning to talk about your own life.'
    ],
    groups: [
      { title: 'What you usually do', sentences: ['I usually wake up early.', 'I have breakfast.', 'Then I start my work.'] },
      { title: 'What you are doing now', sentences: ['Right now, I’m sitting in my room.', 'I’m practicing English.', 'I’m trying to improve my speaking.'] },
      { title: 'What you did today', sentences: ['Today, I woke up late.', 'I had breakfast and answered some messages.', 'Then I worked for a few hours.', 'Today was a little different.', 'I had to get ready quickly.'] },
      { title: 'What you will do tonight', sentences: ['I’m going to finish some work.', 'I’ll have dinner.', 'I’ll probably watch something before bed.'] },
      { title: 'Tell a short story', sentences: ['I went outside.', 'I went outside because I needed fresh air.', 'I had a busy morning, but everything went well.', 'After work, I came home and relaxed for a while.'] }
    ]
  },
  {
    id: 'simple', title: '4. Choose Simple Words', subtitle: 'Communication matters more than complicated vocabulary.', icon: '🗣️',
    paragraphs: [
      'Do not wait until you can create a perfect sentence. Say the sentence you can make right now. The goal is to communicate.',
      'You do not need to know every word or every grammar rule. You do not need complicated vocabulary to sound intelligent.',
      'If you forget a word, explain what it means. Keep the conversation moving instead of giving up.'
    ],
    sentences: ['I’m tired.', 'I don’t understand.', 'Can you explain that again?', 'I don’t know the word. Let me explain.', 'When it rains, I use it to stay dry.', 'It’s the paper they give you after you buy something.', 'Beautiful is a good word.', 'Happy is a good word.', 'I’m very tired.']
  },
  {
    id: 'mistakes', title: '5. Do Not Fear Mistakes', subtitle: 'Give yourself permission to keep speaking.', icon: '🌱',
    paragraphs: [
      'Sometimes we stay silent because we worry about using the wrong word, making a grammar mistake, or being laughed at. But silence will not make you fluent.',
      'Children make mistakes while learning their first language. They keep listening, trying, and talking. With practice, speaking becomes natural.',
      'Give yourself permission to make mistakes, speak slowly, and use simple words. Fluency does not mean you never make mistakes. It means you do not let mistakes stop you.',
      'If your sentence is not perfect, finish it. If you forget a word, explain it. Every mistake can show you what to practice next.'
    ],
    sentences: ['I can explain this with the English I know.', 'Let me try again.', 'I can say it another way.', 'I don’t know the exact word, but I can explain it.', 'I can keep going.', 'I’m learning every day.']
  },
  {
    id: 'self-talk', title: '6. Talk to Yourself', subtitle: 'Practice in a safe place, without pressure.', icon: '🪞',
    paragraphs: [
      'Talking to yourself may feel strange at first, but it is a useful way to practice. When you are alone, nobody is judging your grammar or waiting for you to finish.',
      'You can speak slowly, stop, start again, and repeat a sentence. You do not need a special place to practice. Build English practice into your normal life.',
      'Ask yourself questions and answer them in English. Talk about your day, plans, dreams, and feelings. There are no perfect answers. There is only practice.'
    ],
    groups: [
      { title: 'Ask yourself', sentences: ['What am I going to do today?', 'What did I do yesterday?', 'What am I going to do tomorrow?', 'What made me happy today?', 'What was difficult today?', 'What do I want to do tomorrow?', 'What am I thinking about right now?'] },
      { title: 'Answer yourself', sentences: ['I have some work to finish.', 'I also need to go to the market.', 'Yesterday, I stayed home for most of the day.', 'I watched a movie, did some work, and talked to a friend.', 'I want to wake up early tomorrow.', 'I’m going to finish my work and practice English.'] },
      { title: 'Practice during activities', sentences: ['I’m making breakfast.', 'I need to cut these vegetables.', 'This smells really good.', 'I think I need more salt.', 'I need to finish this first.', 'I’ll take a short break after this.'] }
    ]
  },
  {
    id: 'consistency', title: '7. Practice for 10 Minutes', subtitle: 'Consistency matters more than perfection.', icon: '⏱️',
    paragraphs: [
      'Knowing what to do is one thing. Doing it every day is different. A little daily practice helps English become more automatic.',
      'You do not need to study for hours. Start with 10 minutes each day. Spend two minutes thinking in English in the morning, practice during daily activities, and talk about your day at night.',
      'The first day may feel uncomfortable. The second day may feel boring. You may feel that you are not improving. Do not stop. Progress can be hard to notice at first.',
      'Every sentence you repeat builds a stronger connection. One day, an English sentence may come to mind without translation. You may understand someone faster or answer a question more easily. These are signs that practice is helping.'
    ],
    groups: [
      { title: 'Morning — 2 minutes', sentences: ['I just woke up.', 'I’m still tired.', 'I need to get ready.'] },
      { title: 'During the day', sentences: ['Describe what you are doing.', 'Describe what you can see.', 'Say what you are thinking.'] },
      { title: 'At night', sentences: ['What did I do today?', 'What went well?', 'What was difficult?', 'What will I do tomorrow?'] }
    ]
  },
  {
    id: 'challenge', title: '8. Your 7-Day Challenge', subtitle: 'Make English part of your daily life.', icon: '🏆',
    paragraphs: ['Choose one topic each day. Speak in simple sentences. Do not stop every few seconds to check your grammar. If you do not know a word, explain it another way.'],
    groups: [
      { title: 'Day 1', sentences: ['Describe your morning.'] },
      { title: 'Day 2', sentences: ['Talk about your food and meals.'] },
      { title: 'Day 3', sentences: ['Describe your work or studies.'] },
      { title: 'Day 4', sentences: ['Talk about your family and friends.'] },
      { title: 'Day 5', sentences: ['Describe what you did yesterday.'] },
      { title: 'Day 6', sentences: ['Talk about your plans for tomorrow.'] },
      { title: 'Day 7', sentences: ['Talk freely about your entire week.'] }
    ]
  }
];

const ThinkWalkTalkEnglish: React.FC = () => {
  const [openLessons, setOpenLessons] = useState<string[]>(['think']);
  const [search, setSearch] = useState('');
  const [completed, setCompleted] = useState<string[]>([]);

  const filteredLessons = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return lessons;
    return lessons.filter((lesson) =>
      [lesson.title, lesson.subtitle, ...(lesson.paragraphs ?? []), ...(lesson.sentences ?? []), ...(lesson.groups ?? []).flatMap((group) => [group.title, ...group.sentences])]
        .some((text) => text.toLowerCase().includes(query))
    );
  }, [search]);

  const toggleLesson = (id: string) => {
    setOpenLessons((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const toggleCompleted = (id: string) => {
    setCompleted((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  return (
    <main className="think-walk-talk">
      <header className="twt-hero">
        <div className="twt-hero-icon" aria-hidden="true">💬</div>
        <p className="twt-eyebrow">DAILY SPOKEN ENGLISH PRACTICE</p>
        <h1>Think. Walk. Talk. English.</h1>
        <p className="twt-hero-copy">Think in English. Use your daily life. Speak with confidence.</p>
        <div className="twt-hero-note"><strong>Remember:</strong> Simple English is powerful English.</div>
      </header>

      <section className="twt-tools" aria-label="Lesson tools">
        <label className="twt-search">
          <span aria-hidden="true">⌕</span>
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a sentence or topic..." aria-label="Search lessons" />
          {search && <button type="button" onClick={() => setSearch('')} aria-label="Clear search">×</button>}
        </label>
        <div className="twt-progress" aria-live="polite">
          <span>Practice progress</span>
          <strong>{completed.length} / {lessons.length}</strong>
          <div className="twt-progress-track"><span style={{ width: `${(completed.length / lessons.length) * 100}%` }} /></div>
        </div>
      </section>

      <section className="twt-lessons" aria-label="English lessons">
        {filteredLessons.map((lesson) => {
          const isOpen = openLessons.includes(lesson.id) || Boolean(search.trim());
          const isDone = completed.includes(lesson.id);
          return (
            <article className={`twt-lesson ${isOpen ? 'is-open' : ''} ${isDone ? 'is-complete' : ''}`} key={lesson.id}>
              <button className="twt-lesson-heading" type="button" onClick={() => toggleLesson(lesson.id)} aria-expanded={isOpen}>
                <span className="twt-lesson-icon" aria-hidden="true">{lesson.icon}</span>
                <span className="twt-lesson-heading-text"><strong>{lesson.title}</strong><small>{lesson.subtitle}</small></span>
                {isDone && <span className="twt-done-mark" title="Completed">✓</span>}
                <span className="twt-chevron" aria-hidden="true">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && <div className="twt-lesson-body">
                {lesson.paragraphs?.map((paragraph, index) => <p className="twt-paragraph" key={`${lesson.id}-p-${index}`}>{paragraph}</p>)}
                {lesson.sentences && <div className="twt-sentence-grid">{lesson.sentences.map((sentence, index) => <div className="twt-sentence" key={`${lesson.id}-s-${index}`}><span>“</span>{sentence}</div>)}</div>}
                {lesson.groups?.map((group, groupIndex) => <section className="twt-example-group" key={`${lesson.id}-g-${groupIndex}`}>
                  <h3>{group.title}</h3>
                  <ul>{group.sentences.map((sentence, index) => <li key={`${lesson.id}-${groupIndex}-${index}`}>{sentence}</li>)}</ul>
                </section>)}
                <button className="twt-complete-button" type="button" onClick={() => toggleCompleted(lesson.id)}>
                  <span aria-hidden="true">{isDone ? '✓' : '○'}</span>{isDone ? 'Mark as not finished' : 'Mark lesson as practiced'}
                </button>
              </div>}
            </article>
          );
        })}
        {filteredLessons.length === 0 && <div className="twt-empty"><strong>No matching lesson found.</strong><p>Try searching for “morning”, “mistakes”, or “practice”.</p></div>}
      </section>

      <footer className="twt-footer">
        <span aria-hidden="true">🌱</span>
        <p>You do not need to become fluent overnight. Aim to feel a little more comfortable today than you did yesterday.</p>
        <strong>Think in English. Speak in English. Keep practicing.</strong>
      </footer>
    </main>
  );
};

export default ThinkWalkTalkEnglish;
