import React, { useEffect, useState } from "react";

const Subtitles = ({ subtitles }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [displayedWords, setDisplayedWords] = useState([]);

  useEffect(() => {
    if (subtitles.length > 0) {
      const words = subtitles[subtitleIndex]?.split(" ") || []; // Séparer les mots par espace

      // Si tous les mots sont déjà affichés, passe au sous-titre suivant
      if (wordIndex < words.length) {
        const timeoutId = setTimeout(() => {
          // Ajouter un mot entier, sans caractères indésirables
          setDisplayedWords((prev) => [...prev, words[wordIndex]]);
          setWordIndex((prev) => prev + 1);
        }, 400); // délai entre chaque mot
        return () => clearTimeout(timeoutId);
      } else if (subtitleIndex < subtitles.length - 1) {
        // Passage au sous-titre suivant après un délai
        const timeoutId = setTimeout(() => {
          setSubtitleIndex((prev) => prev + 1);
          setWordIndex(0); // Réinitialiser l'index des mots
          setDisplayedWords([]); // Réinitialiser les mots affichés
        }, 1000); // délai entre les sous-titres
        return () => clearTimeout(timeoutId);
      }
    }
  }, [wordIndex, subtitleIndex, subtitles]);

  return (
    <div id="subtitleContainer" className="text-white text-center text-xl mt-4">
      {/* Assurer que les mots sont bien séparés par un espace */}
      {displayedWords.join(" ")}
    </div>
  );
};

export default Subtitles;
