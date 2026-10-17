import React, { useState } from "react";
import "./GrandpaGrandmaConversation.scss";

type ConversationLine = {
  speaker: "Grandpa" | "Grandma";
  text: string;
};

const conversation: ConversationLine[] = [
  { speaker: "Grandpa", text: "We bought a lot of food today." },
  { speaker: "Grandma", text: "Yes, we did. What time is it?" },
  { speaker: "Grandpa", text: "It is almost three o'clock." },
  { speaker: "Grandma", text: "Next time, we should wear more comfortable shoes." },

  { speaker: "Grandpa", text: "This bus is very crowded today, isn't it?" },
  { speaker: "Grandma", text: "Yes, it is. Look, two seats are empty near the window." },
  { speaker: "Grandpa", text: "Great! Let's sit there before someone else takes them." },
  { speaker: "Grandma", text: "You sit by the window, and I will sit beside you." },
  { speaker: "Grandpa", text: "Thank you, dear. Please put the shopping bags under your seat." },
  { speaker: "Grandma", text: "I am putting them there right now." },
  { speaker: "Grandpa", text: "Are the eggs safe in that bag?" },
  { speaker: "Grandma", text: "Yes, they are. I packed them carefully." },

  { speaker: "Grandpa", text: "Look at the park outside the window." },
  { speaker: "Grandma", text: "Our grandchildren love playing there." },
  { speaker: "Grandpa", text: "Do you remember our picnic there last summer?" },
  { speaker: "Grandma", text: "Of course! The children ran around all day." },

  { speaker: "Grandpa", text: "Hey, the sky is getting dark." },
  { speaker: "Grandma", text: "I think it is going to rain soon." },
  { speaker: "Grandpa", text: "I have a small umbrella in my backpack." },
  { speaker: "Grandma", text: "Look, raindrops are falling on the window." },
  { speaker: "Grandpa", text: "Listen to the thunder. It sounds very loud." },
  { speaker: "Grandma", text: "The bus is moving slowly because of the rain." },

  { speaker: "Grandpa", text: "The driver is announcing Maple Street. That is our stop!" },
  { speaker: "Grandma", text: "Let's stand up. Hold the handrail, please." },
  { speaker: "Grandpa", text: "I am holding it tightly. Don't worry." },
  { speaker: "Grandma", text: "Wait a moment. The doors are not opening yet." },
  { speaker: "Grandpa", text: "The driver says we can get off now." },
  { speaker: "Grandma", text: "Let me open our umbrella." },
  { speaker: "Grandpa", text: "Wait! Don't open it inside the bus." },
  { speaker: "Grandma", text: "You're right. Let's go down the steps slowly." },
  { speaker: "Grandpa", text: "Be careful. The steps are wet and slippery." },

  { speaker: "Grandma", text: "The rain is getting heavier. We are getting wet!" },
  { speaker: "Grandpa", text: "Stand close to me. My shoulder is getting wet." },
  { speaker: "Grandma", text: "Don't worry. We can share the umbrella." },
  { speaker: "Grandpa", text: "Let's walk on the left side of the sidewalk. It is higher there." },
  { speaker: "Grandma", text: "Our house is just around the corner." },

  { speaker: "Grandpa", text: "Here we are! The door is opening. Come inside quickly." },
  { speaker: "Grandma", text: "Let me take off my wet shoes." },
  { speaker: "Grandpa", text: "Please leave your wet shoes by the door." },
  { speaker: "Grandma", text: "The tea is ready. Come and sit by the window." },
  { speaker: "Grandpa", text: "Look! The rain has stopped, and the sun is coming out." },
  { speaker: "Grandma", text: "How beautiful! There is a rainbow in the sky." },
  { speaker: "Grandpa", text: "What a lovely ending to a rainy day!" },
  { speaker: "Grandma", text: "Yes, dear. I am happy as long as we are together." },
];

const GrandpaGrandmaConversation = (): JSX.Element => {
  const [showGrandpa, setShowGrandpa] = useState(true);
  const [showGrandma, setShowGrandma] = useState(true);

  const filteredConversation = conversation.filter((line) => {
    if (line.speaker === "Grandpa") return showGrandpa;
    return showGrandma;
  });

  return (
    <section className="grandparents-conversation">
      <header className="conversation-header">
        <span className="conversation-icon">🌧️</span>
        <h2>A Rainy Day Adventure</h2>
        <p>
          A conversation between Grandpa and Grandma
        </p>
        <span className="conversation-tag">
          Daily Spoken English Practice
        </span>
      </header>

      <div className="conversation-controls">
        <label className="speaker-toggle grandpa-toggle">
          <input
            type="checkbox"
            checked={showGrandpa}
            onChange={(e) => setShowGrandpa(e.target.checked)}
          />
          <span>👴 Grandpa</span>
        </label>

        <label className="speaker-toggle grandma-toggle">
          <input
            type="checkbox"
            checked={showGrandma}
            onChange={(e) => setShowGrandma(e.target.checked)}
          />
          <span>👵 Grandma</span>
        </label>
      </div>

      <div className="conversation-summary">
        <span>🛍️ Shopping</span>
        <span>🚌 Bus ride</span>
        <span>🌧️ Rainy walk</span>
        <span>🏡 Home</span>
      </div>

      <div className="conversation-messages">
        {filteredConversation.map((line, index) => (
          <article
            className={`conversation-message ${
              line.speaker === "Grandpa"
                ? "message-grandpa"
                : "message-grandma"
            }`}
            key={`${line.speaker}-${index}`}
          >
            <div className="speaker-avatar" aria-hidden="true">
              {line.speaker === "Grandpa" ? "👴" : "👵"}
            </div>

            <div className="message-content">
              <span className="speaker-name">
                {line.speaker}
              </span>
              <p>{line.text}</p>
            </div>
          </article>
        ))}
      </div>

      <footer className="conversation-footer">
        <strong>English practice tip:</strong>
        <p>
          Read each sentence aloud. Take turns reading Grandpa's
          and Grandma's lines to practice everyday conversation.
        </p>
        <span>{filteredConversation.length} sentences</span>
      </footer>
    </section>
  );
};

export default GrandpaGrandmaConversation;
