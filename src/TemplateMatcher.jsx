import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const templates = [
  // Alle onderstaande templates bevatten GEEN advertenties
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
    { naam: "C(2+2)A", artikelen: ["S", "S", "L", "M"], preview: "https://i.imgur.com/IYTsJHk.png", advertentie: { kolommen: 2, vorm: "vierkant", plek: "rechterpagina" } }
];

const formaten = ["XS", "S", "M", "L", "XL", "XXL"];
const formaatVolgorde = { XXL: 0, XL: 1, L: 2, M: 3, S: 4, XS: 5 };

export default function TemplateMatcher() {
  const [geselecteerd, setGeselecteerd] = useState({});
  const [aantalAdvertenties, setAantalAdvertenties] = useState(0);
  const [advertenties, setAdvertenties] = useState([]);

  const updateAantal = (formaat, aantal) => {
    setGeselecteerd((prev) => ({ ...prev, [formaat]: parseInt(aantal) || 0 }));
  };

  const updateAdvertentie = (index, veld, waarde) => {
    setAdvertenties((prev) => {
      const nieuw = [...prev];
      if (!nieuw[index]) nieuw[index] = {};
      nieuw[index][veld] = waarde;
      return nieuw;
    });
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

  const visualiseerBlokjes = (template) => {
    const teller = {};
    for (let formaat of template.artikelen) {
      teller[formaat] = (teller[formaat] || 0) + 1;
    }
    const kopie = { ...geselecteerd };
    for (let formaat in kopie) {
      teller[formaat] = (teller[formaat] || 0) - kopie[formaat];
    }

    const blokjeObjecten = template.artikelen.map((formaat) => {
      const isIngevuld = (kopie[formaat] || 0) > 0;
      if (isIngevuld) kopie[formaat]--;
      return {
        formaat,
        kleur: isIngevuld ? "bg-green-500" : "bg-[#002f6c]"
      };
    });

    blokjeObjecten.sort((a, b) => formaatVolgorde[a.formaat] - formaatVolgorde[b.formaat]);

    return (
      <div className="mt-2 flex flex-wrap">
        {blokjeObjecten.map((blok, i) => (
          <span key={i} className={`inline-block px-2 py-1 m-0.5 ${blok.kleur} text-white rounded text-sm font-bold`}>
            {blok.formaat}
          </span>
        ))}
      </div>
    );
  };

  const mogelijkeTemplates = templates.filter((template) => {
    if (aantalAdvertenties === 3) return false;
    if (aantalAdvertenties > 0) {
      if (!template.advertentie) return false;
      if (aantalAdvertenties === 1 && advertenties.length === 1) {
        const adv = advertenties[0];
        const incompleet = [adv.kolommen, adv.vorm, adv.plek].some((v) => v === "");
        // if (incompleet) return !!template.advertentie;
        return (!adv.kolommen || adv.kolommen == template.advertentie.kolommen) &&
               (!adv.vorm || adv.vorm === template.advertentie.vorm) &&
               (!adv.plek || adv.plek === template.advertentie.plek) &&
               matchesTemplate(template);
      }
      return false;
    }
    return !template.advertentie && matchesTemplate(template);
  });

  return (
    <div className="p-6 space-y-6 text-[#002f6c] min-h-screen" style={{ backgroundImage: 'linear-gradient(to bottom right, #b3cce6, #e6edf5)' }}>
      <h1 className="text-2xl font-extrabold tracking-tight">Template-tool <span className="italic">The Perfect Match</span> <span className="text-sm font-normal align-top ml-2 bg-white/40 px-2 py-0.5 rounded">BETA</span></h1>

      <div className="bg-white/40 rounded-xl p-4">
  <h2 className="text-lg font-bold mb-4">📰 Artikelen</h2>
  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-xl">
    {formaten.map((formaat) => (
      <div key={formaat} className="flex flex-col">
        <label htmlFor={formaat} className="text-sm font-semibold mb-1">
          <span className='font-bold'>{formaat}</span> <span className='font-normal'>({formaat === "XS" ? 1000 : formaat === "S" ? 1800 : formaat === "M" ? 2800 : formaat === "L" ? 4000 : formaat === "XL" ? 5400 : 7200} tekens)</span>
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
</div>

<div className="bg-white/40 rounded-xl p-4">
  <h2 className="text-lg font-bold mb-4">📢 Advertenties</h2>
  <div className="mb-6">
        <label className="text-sm font-semibold mb-1 block">Aantal advertenties</label>
        <select
          className="border border-[#002f6c] rounded p-2"
          value={aantalAdvertenties}
          onChange={(e) => {
            const aantal = Number(e.target.value);
            setAantalAdvertenties(aantal);
            setAdvertenties([...Array(aantal)].map(() => ({ kolommen: "", vorm: "", plek: "" })));
          }}
        >
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
<option value="3">3</option>
        </select>

        {aantalAdvertenties <= 2 && [...Array(aantalAdvertenties)].map((_, index) => (
  <div key={index} className="flex flex-wrap gap-1 mt-2 items-end">
    <div className="flex flex-col mr-1">
      <label className="text-sm font-semibold mb-1 block">Advertentie {index + 1}: Aantal kolommen</label>
      <select className="border border-[#002f6c] w-36 p-1 rounded" value={advertenties[index]?.kolommen || ''} onChange={(e) => updateAdvertentie(index, 'kolommen', e.target.value)}>
        {[<option key="" value="">Selecteer</option>, ...[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)]}
      </select>
    </div>
    <div className="flex flex-col mr-1">
      <label className="text-sm font-semibold mb-1 block">Vorm</label>
      <select className="border border-[#002f6c] w-36 p-1 rounded" value={advertenties[index]?.vorm || ''} onChange={(e) => updateAdvertentie(index, 'vorm', e.target.value)}>
        <option value="">Selecteer</option>
        <option value="plat">plat</option>
        <option value="rechthoek liggend">rechthoek liggend</option>
        <option value="rechthoek staand">rechthoek staand</option>
        <option value="vierkant">vierkant</option>
      </select>
    </div>
    <div className="flex flex-col">
      <label className="text-sm font-semibold mb-1 block">Plek</label>
      <select className="border border-[#002f6c] w-36 p-1 rounded" value={advertenties[index]?.plek || ''} onChange={(e) => updateAdvertentie(index, 'plek', e.target.value)}>
        <option value="">Selecteer</option>
        <option value="linkerpagina">linkerpagina</option>
        <option value="rechterpagina">rechterpagina</option>
      </select>
    </div>
  </div>
))}

{aantalAdvertenties === 3 && (
  <p className="mt-4 text-sm text-[#002f6c] bg-white/50 p-2 rounded">
    Geen templates beschikbaar met drie of meer advertenties. Pagina moet handmatig door vormgever worden opgebouwd.
  </p>
)}
        </div>
</div>

      <h2 className="text-xl font-bold mt-8">Mogelijke templates:</h2>
      {mogelijkeTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mogelijkeTemplates.map((template) => (
            <Card key={template.naam} className="border border-[#002f6c]">
              <CardContent className="p-4">
                <p className="font-bold text-[#002f6c]">{template.naam}</p>
                {visualiseerBlokjes(template)}
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
