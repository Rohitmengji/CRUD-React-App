import React, { useState } from "react";
import { emojiListsDB } from "../Utils/EmojiList";
import copy from "copy-to-clipboard";

const EmojiComponent = ({ emoji, name, code }) => {
  return (
    <h2
      onClick={() => {
        copy(code);
      }}
      className="emoji"
      title="Click to copy emoji"
    >
      {emoji}
    </h2>
  );
};

const EmojiContainer = () => {
  const [emojiList, setEmojiList] = useState(emojiListsDB);

  const handleSearch = (input) => {
    const entredInputValue = input.target.value;
    if (entredInputValue === "") {
      setEmojiList(emojiListsDB);
    } else {
      const filterdEmojis = emojiListsDB.filter(({ emojiName }) =>
        emojiName.toLowerCase().includes(entredInputValue.toLowerCase())
      );
      setEmojiList(filterdEmojis);
    }
  };

  return (
    <div>
      <input
        className="search-input"
        onChange={handleSearch}
        placeholder="Search by name"
      />
      <div className="emoji-container">
        {emojiList.length ? (
          emojiList.map(({ emojiName, unicode, code }) => (
            <EmojiComponent name={emojiName} emoji={unicode} code={code} />
          ))
        ) : (
          <h2 className="emoji-emty">No Emojis to dispaly</h2>
        )}
      </div>
    </div>
  );
};

export default EmojiContainer;
