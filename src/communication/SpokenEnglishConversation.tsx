import { useMemo, useState } from "react";
import transcript from "./spokenEngldocument.txt?raw";
import "./SpokenEnglishConversation.scss";
type Speaker = "David" | "Alice" | "Note" | "Other";
type Line = { id: number; speaker: Speaker; text: string };

function parseTranscript(source: string): Line[] {
  return source
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const match = line.match(/^(David|Alice):\s*(.*)$/i);
      if (match) {
        const speaker = match[1][0].toUpperCase() + match[1].slice(1).toLowerCase();
        return { id: index, speaker: speaker as Speaker, text: match[2] };
      }
      if (/^\(Note:/i.test(line)) {
        return { id: index, speaker: "Note" as Speaker, text: line };
      }
      return { id: index, speaker: "Other" as Speaker, text: line };
    });
}
const SpokenEnglishConversation = () => {

  const [search, setSearch] = useState("");
  const [speakerFilter, setSpeakerFilter] = useState<"All" | "David" | "Alice">("All");
  const [showNotes, setShowNotes] = useState(true);

  const lines = useMemo(() => parseTranscript(transcript), []);
  const filteredLines = useMemo(() => {
    const query = search.trim().toLowerCase();
    return lines.filter((line) => {
      if (!showNotes && line.speaker === "Note") return false;
      if (speakerFilter !== "All" && line.speaker !== speakerFilter) return false;
      return !query || line.text.toLowerCase().includes(query) || line.speaker.toLowerCase().includes(query);
    });
  }, [lines, search, speakerFilter, showNotes]);

  return (
    <main className="spoken-page">
      <header className="spoken-header">
        <div className="spoken-eyebrow">ENGLISH LISTENING PRACTICE</div>
        <h1>A Friendly Conversation</h1>
        <p>Follow David and Alice as they talk about everyday life, travel, food, feelings, and learning English.</p>
        <div className="spoken-legend" aria-label="Speaker colors">
          <span className="legend-person david"><i />David</span>
          <span className="legend-person alice"><i />Alice</span>
        </div>
      </header>

      <section className="spoken-toolbar" aria-label="Conversation controls">
        <label className="spoken-search">
          <span className="sr-only">Search conversation</span>
          <span aria-hidden="true" className="search-icon">⌕</span>
          <input
            type="search"
            placeholder="Search words or phrases..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          {search && <button className="clear-search" onClick={() => setSearch("")} aria-label="Clear search">×</button>}
        </label>
        <div className="spoken-filters">
          <label className="filter-label">
            <span>Speaker</span>
            <select value={speakerFilter} onChange={(event) => setSpeakerFilter(event.target.value as typeof speakerFilter)}>
              <option value="All">Everyone</option>
              <option value="David">David</option>
              <option value="Alice">Alice</option>
            </select>
          </label>
          <label className="notes-toggle">
            <input type="checkbox" checked={showNotes} onChange={(event) => setShowNotes(event.target.checked)} />
            <span>Show transcript notes</span>
          </label>
        </div>
      </section>

      <div className="spoken-result-count" aria-live="polite">
        Showing {filteredLines.length.toLocaleString()} of {lines.length.toLocaleString()} lines
      </div>

      <section className="conversation-list" aria-label="Conversation transcript">
        {filteredLines.map((line) => (
          <article key={line.id} className={`conversation-line ${line.speaker.toLowerCase()}`}>
            {line.speaker === "Note" ? (
              <div className="transcript-note"><span aria-hidden="true">ⓘ</span>{line.text}</div>
            ) : line.speaker === "Other" ? (
              <p className="transcript-other">{line.text}</p>
            ) : (
              <>
                <div className="speaker-avatar" aria-hidden="true">{line.speaker[0]}</div>
                <div className="speech-content">
                  <div className="speaker-name">{line.speaker}</div>
                  <p>{line.text}</p>
                </div>
              </>
            )}
          </article>
        ))}
        {filteredLines.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">⌕</div>
            <h2>No matching lines</h2>
            <p>Try another word or choose “Everyone” in the speaker filter.</p>
            <button onClick={() => { setSearch(""); setSpeakerFilter("All"); setShowNotes(true); }}>Reset filters</button>
          </div>
        )}
      </section>
      <footer className="spoken-footer">Keep practicing — slowly but surely.</footer>
    </main>
  );
}

export default SpokenEnglishConversation;