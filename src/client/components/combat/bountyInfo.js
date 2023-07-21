
// { "timestamp":"2021-04-15T05:21:15Z", "event":"ShipTargeted", "TargetLocked":true, "Ship":"anaconda", "ScanStage":0 }

// { "timestamp":"2021-04-15T05:21:16Z", "event":"ShipTargeted", "TargetLocked":true, "Ship":"anaconda", "ScanStage":1, "PilotName":"$npc_name_decorate:#name=Stephen Macrae;", "PilotName_Localised":"Stephen Macrae", "PilotRank":"Dangerous" }

// { "timestamp":"2021-04-15T05:21:18Z", "event":"ShipTargeted", "TargetLocked":true, "Ship":"anaconda", "ScanStage":2, "PilotName":"$npc_name_decorate:#name=Stephen Macrae;", "PilotName_Localised":"Stephen Macrae", "PilotRank":"Dangerous", "ShieldHealth":100.000000, "HullHealth":100.000000 }

// { "timestamp":"2021-04-15T05:21:20Z", "event":"ShipTargeted", "TargetLocked":true, "Ship":"anaconda", "ScanStage":3, "PilotName":"$npc_name_decorate:#name=Stephen Macrae;", "PilotName_Localised":"Stephen Macrae", "PilotRank":"Dangerous", "ShieldHealth":100.000000, "HullHealth":100.000000, "Faction":"Phra Mool Patrons of Law", "LegalStatus":"Clean" }



/*Generate random weight (in kilograms)*/
const randomWeight = Math.floor(Math.random() * 551) + 100; //45 kilograms (~100 lbs) to 250 kilograms (~551 lbs)
const weight = Math.round(randomWeight / 2.2); //Converts to kilograms

/*Generate random height (in meters)*/
const randomHeight = Math.floor(Math.random() * 120) + 48; //48 inches (4ft) to 120 inches (10ft)
const height = Math.round(randomHeight * 0.0254); //converts inches to meters
const heightFeet = Math.round(randomHeight / 12); //converts inches to feet

/*Generate random hair/eye color*/
const color = [
"Blue", "Red", "Green", "Yellow", "Blue", "Grey", "Brown", "Amber", "Hazel", "Orange", "Black", "Copper", "Silver", "Gold", "White", "Light Blue", "Light Red", "Light Green", "Light Yellow", "Light Blue", "Light Grey", "Light Brown", "Light Amber", "Light Hazel", "Light Orange", "Dark Blue", "Dark Red", "Dark Green", "Dark Yellow", "Dark Blue", "Dark Grey", "Dark Brown", "Dark Amber", "Dark Hazel", "Dark Orange"
];

/*Randomize elements*/
// randomHair = color[Math.floor(Math.random() * color.length)];
// randomEye = color[Math.floor(Math.random() * color.length)];



const crimes = ['Accomplice to Murder','Aiding and Abetting Known Criminals','Aiding and Abetting Known Rebels','Assault with Intent to Injure','Assaulting an Alliance Official','Assaulting an Imperial Official','Assaulting an Federation Official','Assaulting an Official','Breaking into / out of an Official Alliance Installation','Breaking into / out of an Official Federation Installation','Breaking into / out of an Official Imperial Installation','Breaking into / out of an Official Installation','Bribery or Attempted Bribery','Bribery or Attempted Bribery of an Imperial Official','Conspiracy','Criminal Trespass','Destruction of Alliance Property','Destruction of Federation Property','Destruction of Imperial Property','Destruction of Property','Disruption of Trade','Failure to Pay Debt','Falsification of Alliance Documents','Falsification of Federation Documents','Falsification of Imperial Documents','Flight to Avoid Prosecution','Forgery','High Treason','Impersonating an Alliance Official','Impersonating a Federation Official','Impersonating an Imperial Official','Impersonating an Official','Industrial Espionage','Industrial Sabotage','Jamming Official Alliance Communications','Jamming Official Federation Communications','Jamming Official Communications','Jamming Official Imperial Communications','Kidnapping','Murder','Obstruction of Imperial Justice','Obstruction of Alliance Justice','Obstruction of Federation Justice','Obstruction of Justice','Operating an Illegally Modified Starship','Possession / Distribution of Restricted / Stolen Goods','Possession of a Cloaking Device','Sedition','Smuggling','Theft of Alliance Property',,'Theft of Federation Property','Theft of Imperial Property','Theft of Property','Transportation of Illegal Aliens','Treason','Treason','Unauthorized Review of Official Alliance Data Files','Unauthorized Review of Official Federation Data Files','Unauthorized Review of Official Data Files','Unauthorized Review of Official Imperial Data Files','Unlawful Operation of a Starship','Possession of an Illegal Weapon','Violation of Customs Regulations','Treason']


export const getCrimes = (name) => {
  console.log(name)

  const nameVar = name.split(" ");
  const crimeVar = nameVar[nameVar.length - 1];

  const numOfCrimes = crimeVar.length / 2
  ;

  const crimeList = crimeVar.split('').slice(0, numOfCrimes).map(c =>{
    const code = c.toLowerCase().charCodeAt(0) - 96
    return crimes[code]
  })

  return [...new Set(crimeList)]
}