import React, { useState, useEffect } from 'react';
import { Card } from "@aws-amplify/ui-react";
import './rulebook.css';

const Rulebook = () => {
  const [text, setText] = useState('');
  const fullText = `Ihr dachtet bestimmt hier steht jetzt das Regelbuch, aber nein. Leider nein. Es ist nicht fertig. Aber es wird bestimmt bald fertig werden. 
Vielleicht ja auch nicht. Mal schauen. Was sind Regeln überhaupt? Sie sind wie unsichtbare Fäden, die das Gewebe unserer Gesellschaft zusammenhalten, uns Struktur geben und gleichzeitig unsere Freiheit begrenzen - 
ein faszinierendes Paradoxon menschlichen Zusammenlebens. Und doch brauchen wir sie. Sonst hätten wir Max niemals in den Griff bekommen. Aber vielleicht wäre es gut gewesen keine Regeln zu machen.
Das war mit der Geburt Katschings dann aber eh gegessen. Mal schauen wann wir das Buch fertigstellen. Bis dahin kennen wir die Regeln ja im Kopf.. `;

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText((prevText) => {
        if (index < fullText.length) {
          index++;
          return fullText.slice(0, index);
        }
        clearInterval(timer);
        return prevText;
      });
    }, 50); // Adjust this value to change typing speed

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rulebook-container">
      <Card className="rules-card">
        <div className="rules-text">
          {text}
        </div>
      </Card>
    </div>
  );
};

export default Rulebook;
