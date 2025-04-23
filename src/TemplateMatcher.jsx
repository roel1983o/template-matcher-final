import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const templates = [
  { naam: "A(2+8)", artikelen: ["XXL", "M"], preview: "https://i.imgur.com/8rOCntH.png" },
  { naam: "A(3+7)", artikelen: ["XL", "XL"], preview: "https://i.imgur.com/FDivllf.png" },
  { naam: "A(9+1)", artikelen: ["XXL", "S"], preview: "https://i.imgur.com/riKCBN6.png" },
  { naam: "B(5+2+3)", artikelen: ["XXL", "M", "L"], preview: "https://i.imgur.com/TfVRF0X.png" },
  { naam: "B(2+6+2)", artikelen: ["M", "L", "L"], preview: "https://i.imgur.com/PDlFZKE.png" },
  { naam: "B(1+7+2)", artikelen: ["S", "XXL", "M"], preview: "https://i.imgur.com/hAc8eG3.png" },
  { naam: "B(3+7)", artikelen: ["S", "XL", "S"], preview: "https://i.imgur.com/ZKuk5xW.png" },
  { naam: "B(9+1)", artikelen: ["XXL", "XS", "XS"], preview: "https://i.imgur.com/Kjttv1V.png" },
  { naam: "C(1+6+3)", artikelen: ["S", "L", "M", "S"], preview: "https://i.imgur.com/w9RqUOF.png" },
  { naam: "C(2+6+2)", artikelen: ["M", "L", "L"], preview: "https://i.imgur.com/YtEmnNn.png" },
  { naam: "C(1+7+2)", artikelen: ["XS", "XS", "XXL", "M"], preview: "https://i.imgur.com/2btyBbs.png" },
  { naam: "C(2+3/1+4)", artikelen: ["M", "L", "S", "L"], preview: "https://i.imgur.com/t4KIKUW.png" },
  { naam: "C(5+2+3)", artikelen: ["XL", "S", "L", "L"], preview: "https://i.imgur.com/cglTM9P.png" },
  { naam: "D(2+3+5)", artikelen: ["S", "L", "M", "XS", "M"], preview: "https://i.imgur.com/Av0wpif.png" },
  { naam: "D(1+6+3)", artikelen: ["XS", "XS", "L", "M", "M"], preview: "https://i.imgur.com/mGcKZaD.png" },
  { naam: "D(5/2+3)", artikelen: ["L", "S", "S", "M", "M"], preview: "https://i.imgur.com/wgm0Yeg.png" },
  { naam: "D(1+4/2+3)", artikelen: ["M", "M", "XS", "S", "L"], preview: "https://i.imgur.com/dsMImJE.png" },
  { naam: "D(3+2/1+4)", artikelen: ["S", "M", "S", "S", "L"], preview: "https://i.imgur.com/N8C3qv9.png" },
  { naam: "D(1+4/2+3tweede)", artikelen: ["XS", "XS", "L", "M", "L"], preview: "https://i.imgur.com/f4sXzEx.png" },
  { naam: "D(2+2)", artikelen: ["S", "S", "L", "M", "XS"], preview: "https://i.imgur.com/iCs0NIQ.png" },
  { naam: "E(1+4/2+3)", artikelen: ["XS", "XS", "L", "S", "S", "L"], preview: "https://i.imgur.com/WWsUAlR.png" },
  { naam: "E(1+4/2+3tweede)", artikelen: ["S", "S", "XL", "XS", "M", "S"], preview: "https://i.imgur.com/oXyFSFp.png" },
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
    <div className="p-6 space-y-6 text-[#002f6c] min-h-screen" style={{ backgroundImage: 'linear-gradient(to bottom right, #b3cce6, #e6edf5)' }}>
      <h1 className="text-2xl font-extrabold tracking-tight">Template-tool <span className="italic">The Perfect Match</span> <span className="text-sm font-normal align-top ml-2 bg-white/40 px-2 py-0.5 rounded">BETA</span></h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-xl">
        {formaten.map((formaat) => (
          <div key={formaat} className="flex flex-col">
            <label htmlFor={formaat} className="text-sm font-semibold mb-1">
              {formaat}
            </label>
            <Input
              id={formaat}
              type="number"
              min="0"
              className="border border-[#002f6c]"
              value={geselecteerd[formaat] || ""}
              onChange={(e) => updateAantal(formaat, e.target.value)}
            />
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mt-8">Mogelijke templates:</h2>
      {mogelijkeTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mogelijkeTemplates.map((template) => (
            <Card key={template.naam} className="border border-[#002f6c]">
              <CardContent className="p-4">
                <p className="font-bold text-[#002f6c]">{template.naam}</p>
                <p className="text-sm text-[#002f6c]">Artikelen: {template.artikelen.join(", ")}</p>
                {template.preview && (
                  <img
                    src={template.preview}
                    alt={`Voorvertoning van ${template.naam}`}
                    className="mt-2 rounded border border-[#002f6c]"
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-[#002f6c]">Geen passende templates gevonden.</p>
      )}
    </div>
  );
}
