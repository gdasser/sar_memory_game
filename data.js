/* Spaceborne SAR Memory Game — v2 deck (16 satellites)
   Values transcribed from the v2 satellite cards. The cards show
   wavelength + central frequency (no band label), and a combined
   "coverage, availability" line. */
const SATELLITES = [
  { "name":"ERS-1 & -2",        "country":"European Union", "operator":"ESA",
    "availability":"global, open archive", "operational":"1992–2001",
    "sensor":"5.6 cm / 5.3 GHz",  "revisit":"35 days",     "los":"23 degrees",            "image":"ERS.png" },

  { "name":"Radarsat-1 & -2",   "country":"Canada", "operator":"CSA / ASC",
    "availability":"global, open archive", "operational":"1998–present",
    "sensor":"5.6 cm / 5.3 GHz",  "revisit":"24 days",     "los":"18–54 degrees",         "image":"radarsat.png" },

  { "name":"ENVISAT ASAR",      "country":"European Union", "operator":"ESA",
    "availability":"global, open archive", "operational":"2002–2010",
    "sensor":"5.6 cm / 5.3 GHz",  "revisit":"35 days",     "los":"15–45 degrees",         "image":"ENVISAT.png" },

  { "name":"ALOS PALSAR-1 & -2","country":"Japan", "operator":"JAXA",
    "availability":"global, agreements", "operational":"2006–2011 & 2014–present",
    "sensor":"23 cm / 1.3 GHz",   "revisit":"14–46 days",  "los":"18–54 degrees",         "image":"ALOS.png" },

  { "name":"COSMO-SkyMed",      "country":"Italy", "operator":"ASI / e-GEOS",
    "availability":"on-demand, dual-use", "operational":"2008–present",
    "sensor":"3.1 cm / 9.6 GHz",  "revisit":"8–16 days",   "los":"20–60 degrees",         "image":"COSMO.png" },

  { "name":"Gaofen-3",          "country":"China", "operator":"CNSA / CRESDA",
    "availability":"government, unavailable", "operational":"2016–present",
    "sensor":"5.66 cm / 5.3 GHz", "revisit":"daily",       "los":"30–40 degrees",         "image":"Gaofen.png" },

  { "name":"NISAR",             "country":"India / USA", "operator":"ISRO / NASA",
    "availability":"global, open archive", "operational":"2025–present",
    "sensor":"24 cm / 1.25 GHz & 9.3 cm / 3.20 GHz", "revisit":"12 days", "los":"33–47 degrees", "image":"NISAR.png" },

  { "name":"ICEYE Constellation","country":"Finland", "operator":"ICEYE",
    "availability":"on-demand, commercial", "operational":"2019–present",
    "sensor":"3.1 cm / 9.65 GHz", "revisit":"1–22 days",   "los":"15–35 degrees",         "image":"ICEYE.png" },

  { "name":"Radarsat Constellation Mission","country":"Canada", "operator":"CSA / ASC / MDA Space",
    "availability":"government, restricted", "operational":"2019–present",
    "sensor":"5.5 cm / 5.4 GHz",  "revisit":"12 days",     "los":"20–40 degrees",         "image":"RCM.png" },

  { "name":"SAOCOM",            "country":"Argentina", "operator":"CONAE",
    "availability":"tasked, restricted", "operational":"2019–present",
    "sensor":"23.5 cm / 1.3 GHz", "revisit":"8–16 days",   "los":"21–50 degrees",         "image":"SAOCOM.png" },

  { "name":"SENTINEL-1",        "country":"European Union", "operator":"ESA",
    "availability":"global, open archive", "operational":"2014–present",
    "sensor":"5.6 cm / 5.3 GHz",  "revisit":"6–12 days",   "los":"30–46 degrees",         "image":"S1.png" },

  { "name":"LuTan-1",           "country":"China", "operator":"CNSA / CAST",
    "availability":"national, restricted", "operational":"2022–present",
    "sensor":"23.8 cm / 1.26 GHz","revisit":"4–8 days",    "los":"30 degrees",            "image":"LuTan.png" },

  { "name":"UMBRA",             "country":"USA", "operator":"Umbra",
    "availability":"on-demand, commercial", "operational":"2021–present",
    "sensor":"3.13 cm / 9.6 GHz", "revisit":"subdaily",    "los":"varying",               "image":"UMBRA.png" },

  { "name":"Capella Space",     "country":"USA", "operator":"Capella Space",
    "availability":"on-demand, commercial", "operational":"2008–present",
    "sensor":"3.11 cm / 9.65 GHz","revisit":"subdaily",    "los":"25–40 degrees",         "image":"CapellaSpace.png" },

  { "name":"StriX",             "country":"Japan", "operator":"Synspective",
    "availability":"on-demand, commercial", "operational":"2020–present",
    "sensor":"3.11 cm / 9.65 GHz","revisit":"days (increasing)", "los":"30 degrees",       "image":"StriX.png" },

  { "name":"BIOMASS",           "country":"European Union", "operator":"ESA",
    "availability":"global, open archive", "operational":"2025–present",
    "sensor":"68.9 cm / 0.44 GHz","revisit":"3 days",      "los":"23–34 degrees",         "image":"Biomass.png" }
];
const QUESTIONS = [
  { "id":1, "text":"Under which country's flag does this SAR mission fly, and who operates it?", "field":"country_operator" },
  { "id":2, "text":"What is the data acquisition strategy and availability?",                     "field":"availability" },
  { "id":3, "text":"What is the SAR mission's operational timeframe?",                            "field":"operational" },
  { "id":4, "text":"At what wavelength / central frequency does this SAR sensor operate?",       "field":"sensor" },
  { "id":5, "text":"What is the nominal revisit time of this SAR mission?",                       "field":"revisit" },
  { "id":6, "text":"What are the typical line-of-sight (LOS) incidence angles?",                  "field":"los" }
];
