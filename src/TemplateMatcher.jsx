import { useState } from "react";

const templates = [
  { naam: "A(2+8)", artikelen: ["XXL", "M"], preview: "https://i.imgur.com/8rOCntH.png" },
  { naam: "F", artikelen: ["XXL"], preview: "https://i.imgur.com/vmeqTnC.png" }
];

const formaten = ["XS", "S", "M", "L", "XL", "XXL"];

export default function TemplateMatcher() {
  const [geselecteerd, setGeselecteerd] = useState({});

  const updateAantal = (formaat, aantal) => {
    setGeselecteerd((prev) => ({
      ...prev,
      [formaat]: parseInt(aantal) || 0
    }));
  };

  const matchesTemplate = (template) => {
    const kopie = [...template.artikelen];
    for (let formaat in geselecteerd) {
      let nodig = geselecteerd[formaat];
      while (nodig > 0) {
        const index = kopie.indexOf(formaat);
        if (index === -1) return false;
        kopie.splice(index, 1);
        nodig--;
      }
    }
    return true;
  };

  const mogelijkeTemplates = templates.filter(matchesTemplate);

  return (
    <div>
      <h1>Template Matcher</h1>
      {/* UI kan hier worden uitgebreid */}
    </div>
  );
}
