import React, { useRef, useState } from "react";

const SpeackUI = () => {
  const txtInput = useRef(null);
  const [voices, setVoices] = useState([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(0);
  const populateVoiceList = () => {
    setVoices(window.speechSynthesis.getVoices());
    return voices;
  };

  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  setTimeout(() => {
    let _v = window.speechSynthesis.getVoices()
    if (_v.length === 0) _v = window.speechSynthesis.getVoices()
    if (voices.length !== _v.length) {
      populateVoiceList();
    }
  }, 1000);

  const voiceDetailList = voices.map((v, i) => (
    <option key={i} data-name={v.name} value={v.lang}>
      {v.lang} - {v.name}
    </option>
  ));

  const speakHandler = event => {
    const sync = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(txtInput.current.value);
    utterance.voice = voices[selectedVoiceIndex];
    sync.speak(utterance);
  };

  const selectVoiceHandler = event => {
    setSelectedVoiceIndex(event.target.selectedIndex);
  };

  return (
    <>
      <p>Total voices found : {voices.length}</p>
      Language: <select onChange={selectVoiceHandler}>{voiceDetailList}</select>
      <div>
        <label>Text</label>
        <input type="text" ref={txtInput} />
      </div>
      <div>
        <button onClick={speakHandler}>Speak!</button>
      </div>
    </>
  );
};

export default SpeackUI;
