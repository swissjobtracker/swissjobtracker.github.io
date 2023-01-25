export const cantons = [
  {
    label: "Aargau",
    value: "ag",
  },
  {
    label: "Appenzell Innerrhoden",
    value: "ai",
  },
  {
    label: "Appenzell Ausserrhoden",
    value: "ar",
  },
  {
    label: "Bern",
    value: "be",
  },
  {
    label: "Basel-Landschaft",
    value: "bl",
  },
  {
    label: "Basel-Stadt",
    value: "bs",
  },
  {
    label: "Fribourg",
    value: "fr",
  },
  {
    label: "Genève",
    value: "ge",
  },
  {
    label: "Glarus",
    value: "gl",
  },
  {
    label: "Graubünden",
    value: "gr",
  },
  {
    label: "Jura",
    value: "ju",
  },
  {
    label: "Luzern",
    value: "lu",
  },
  {
    label: "Neuchâtel",
    value: "ne",
  },
  {
    label: "Nidwalden",
    value: "nw",
  },
  {
    label: "Obwalden",
    value: "ow",
  },
  {
    label: "St. Gallen",
    value: "sg",
  },
  {
    label: "Schaffhausen",
    value: "sh",
  },
  {
    label: "Solothurn",
    value: "so",
  },
  {
    label: "Schwyz",
    value: "sz",
  },
  {
    label: "Thurgau",
    value: "tg",
  },
  {
    label: "Ticino",
    value: "ti",
  },
  {
    label: "Uri",
    value: "ur",
  },
  {
    label: "Vaud",
    value: "vd",
  },
  {
    label: "Valais",
    value: "vs",
  },
  {
    label: "Zug",
    value: "zg",
  },
  {
    label: "Zürich",
    value: "zh",
  },
].sort((a, b) => (a.value > b.value ? 1 : -1));

export const getCantonByCode = (code) => {
  return (
    cantons.find(({ value }) => value == code.toLowerCase())?.label || undefined
  );
};

export default cantons;
