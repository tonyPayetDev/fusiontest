import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import * as fal from '@fal-ai/serverless-client';
import OpenAI from 'openai';
import Subtitles from "./Subtitles";

fal.config({
  credentials: 'b742bbf6-862f-4b80-9d9a-5a54c14b2c14:24b03f413bccd9bb0670722cc58bc274'
});

const openai = new OpenAI({
  apiKey: '',
  dangerouslyAllowBrowser: true
});

const characters = [
  { id: 1, name: "Iron Man", universe: "Marvel", image: "https://akabab.github.io/superhero-api/api/images/md/346-iron-man.jpg" },
  { id: 2, name: "Captain America", universe: "Marvel", image: "https://akabab.github.io/superhero-api/api/images/md/149-captain-america.jpg" },
  { id: 3, name: "Spider-Man", universe: "Marvel", image: "https://akabab.github.io/superhero-api/api/images/md/620-spider-man.jpg" },
  { id: 4, name: "Thor", universe: "Marvel", image: "https://akabab.github.io/superhero-api/api/images/md/659-thor.jpg" },
  { id: 5, name: "Hulk", universe: "Marvel", image: "https://akabab.github.io/superhero-api/api/images/md/332-hulk.jpg" },
  { id: 6, name: "Black Panther", universe: "Marvel", image: "https://akabab.github.io/superhero-api/api/images/md/106-black-panther.jpg" },
  { id: 7, name: "Black Widow", universe: "Marvel", image: "https://akabab.github.io/superhero-api/api/images/md/316-black-widow.jpg" },
  { id: 8, name: "Doctor Strange", universe: "Marvel", image: "https://akabab.github.io/superhero-api/api/images/md/305-doctor-strange.jpg" },
  { id: 9, name: "Wolverine", universe: "Marvel", image: "https://akabab.github.io/superhero-api/api/images/md/212-wolverine.jpg" },
  { id: 10, name: "Deadpool", universe: "Marvel", image: "https://akabab.github.io/superhero-api/api/images/md/528-deadpool.jpg" },
  { id: 11, name: "Scarlet Witch", universe: "Marvel", image: "https://akabab.github.io/superhero-api/api/images/md/167-scarlet-witch.jpg" },
  { id: 12, name: "Batman", universe: "DC", image: "https://akabab.github.io/superhero-api/api/images/md/70-batman.jpg" },
  { id: 13, name: "Superman", universe: "DC", image: "https://akabab.github.io/superhero-api/api/images/md/644-superman.jpg" },
  { id: 14, name: "Wonder Woman", universe: "DC", image: "https://akabab.github.io/superhero-api/api/images/md/720-wonder-woman.jpg" },
  { id: 15, name: "Flash", universe: "DC", image: "https://akabab.github.io/superhero-api/api/images/md/263-flash.jpg" },
  { id: 16, name: "Green Lantern", universe: "DC", image: "https://akabab.github.io/superhero-api/api/images/md/306-green-lantern.jpg" },
  { id: 17, name: "Aquaman", universe: "DC", image: "https://akabab.github.io/superhero-api/api/images/md/268-aquaman.jpg" },
  { id: 18, name: "Green Arrow", universe: "DC", image: "https://akabab.github.io/superhero-api/api/images/md/395-green-arrow.jpg" },
  { id: 19, name: "Martian Manhunter", universe: "DC", image: "https://akabab.github.io/superhero-api/api/images/md/471-martian-manhunter.jpg" },
  { id: 20, name: "Cyborg", universe: "DC", image: "https://akabab.github.io/superhero-api/api/images/md/630-cyborg.jpg" },
  { id: 21, name: "Joker", universe: "DC", image: "https://akabab.github.io/superhero-api/api/images/md/151-joker.jpg" },
  { id: 22, name: "Goku", universe: "Dragon Ball", image: "https://akabab.github.io/superhero-api/api/images/md/241-goku.jpg" },
  { id: 23, name: "Vegeta", universe: "Dragon Ball", image: "https://akabab.github.io/superhero-api/api/images/md/241-vegeta.jpg" },
  { id: 24, name: "Piccolo", universe: "Dragon Ball", image: "https://akabab.github.io/superhero-api/api/images/md/241-piccolo.jpg" },
  { id: 25, name: "Frieza", universe: "Dragon Ball", image: "https://akabab.github.io/superhero-api/api/images/md/241-frieza.jpg" },
  { id: 26, name: "Gohan", universe: "Dragon Ball", image: "https://akabab.github.io/superhero-api/api/images/md/241-gohan.jpg" },
  { id: 27, name: "Trunks", universe: "Dragon Ball", image: "https://akabab.github.io/superhero-api/api/images/md/241-trunks.jpg" },
  { id: 28, name: "Cell", universe: "Dragon Ball", image: "https://akabab.github.io/superhero-api/api/images/md/241-cell.jpg" },
  { id: 29, name: "Majin Buu", universe: "Dragon Ball", image: "https://akabab.github.io/superhero-api/api/images/md/241-majin-buu.jpg" },
  { id: 30, name: "Beerus", universe: "Dragon Ball", image: "https://akabab.github.io/superhero-api/api/images/md/241-beerus.jpg" },
  { id: 31, name: "Jiren", universe: "Dragon Ball", image: "https://akabab.github.io/superhero-api/api/images/md/241-jiren.jpg" },
  { id: 32, name: "Jax Briggs", universe: "Mortal Kombat", image: "https://static.wikia.nocookie.net/mk/images/1/12/Jax_MK11.png" },
  { id: 33, name: "Reptile", universe: "Mortal Kombat", image: "https://static.wikia.nocookie.net/mk/images/a/a2/Reptile_MK11.png" },
  { id: 34, name: "Noob Saibot", universe: "Mortal Kombat", image: "https://static.wikia.nocookie.net/mk/images/a/a5/Noob_Saibot_MK11.png" },
  { id: 35, name: "Kotal Kahn", universe: "Mortal Kombat", image: "https://static.wikia.nocookie.net/mk/images/1/1a/Kotal_Khan_MK11.png" },
  { id: 36, name: "Cetrion", universe: "Mortal Kombat", image: "https://static.wikia.nocookie.net/mk/images/4/4f/CetrionMK11.png" },
  { id: 37, name: "Jacqui Briggs", universe: "Mortal Kombat", image: "https://static.wikia.nocookie.net/mk/images/f/f1/Jacqui_Briggs_MK11.png" },
  { id: 38, name: "Frost", universe: "Mortal Kombat", image: "https://static.wikia.nocookie.net/mk/images/3/32/Frost_MK11.png" },
  { id: 39, name: "Kung Lao", universe: "Mortal Kombat", image: "https://static.wikia.nocookie.net/mk/images/0/05/Kung_Lao_MK11.png" },
  { id: 40, name: "Takeda", universe: "Mortal Kombat", image: "https://static.wikia.nocookie.net/mk/images/d/d4/Takeda_MK11.png" },


  { id: 41, name: "Ryu", universe: "Street Fighter", image: "https://static.wikia.nocookie.net/streetfighter/images/4/43/Ryu_SF5.png" },
  { id: 42, name: "Ken", universe: "Street Fighter", image: "https://static.wikia.nocookie.net/streetfighter/images/1/17/Ken_SF5.png" },
  { id: 43, name: "Chun-Li", universe: "Street Fighter", image: "https://static.wikia.nocookie.net/streetfighter/images/3/32/ChunLi_SF5.png" },
  { id: 44, name: "Guile", universe: "Street Fighter", image: "https://static.wikia.nocookie.net/streetfighter/images/0/0b/Guile_SF5.png" },
  { id: 45, name: "M. Bison", universe: "Street Fighter", image: "https://static.wikia.nocookie.net/streetfighter/images/5/57/M._Bison_SF5.png" },
  { id: 46, name: "Blanka", universe: "Street Fighter", image: "https://static.wikia.nocookie.net/streetfighter/images/d/d1/Blanka_SF5.png" },
  { id: 47, name: "Zangief", universe: "Street Fighter", image: "https://static.wikia.nocookie.net/streetfighter/images/1/19/Zangief_SF5.png" },
  { id: 48, name: "Dhalsim", universe: "Street Fighter", image: "https://static.wikia.nocookie.net/streetfighter/images/6/63/Dhalsim_SF5.png" },
  { id: 49, name: "Vega", universe: "Street Fighter", image: "https://static.wikia.nocookie.net/streetfighter/images/4/4f/Vega_SF5.png" },
  { id: 50, name: "Sagat", universe: "Street Fighter", image: "https://static.wikia.nocookie.net/streetfighter/images/6/64/Sagat_SF5.png" },
  { id: 51, name: "Akuma", universe: "Street Fighter", image: "https://static.wikia.nocookie.net/streetfighter/images/3/37/Akuma_SF5.png" },
  { id: 52, name: "Cammy", universe: "Street Fighter", image: "https://static.wikia.nocookie.net/streetfighter/images/7/70/Cammy_SF5.png" },
  { id: 53, name: "Juri", universe: "Street Fighter", image: "https://static.wikia.nocookie.net/streetfighter/images/9/9b/Juri_SF5.png" },
  { id: 54, name: "Ibuki", universe: "Street Fighter", image: "https://static.wikia.nocookie.net/streetfighter/images/5/50/Ibuki_SF5.png" },
  { id: 55, name: "Cody", universe: "Street Fighter", image: "https://static.wikia.nocookie.net/streetfighter/images/7/79/Cody_SF5.png" },
  { id: 56, name: "Laura", universe: "Street Fighter", image: "https://static.wikia.nocookie.net/streetfighter/images/a/a4/Laura_SF5.png" },
  { id: 57, name: "R. Mika", universe: "Street Fighter", image: "https://static.wikia.nocookie.net/streetfighter/images/7/77/R.Mika_SF5.png" },
  { id: 58, name: "Ed", universe: "Street Fighter", image: "https://static.wikia.nocookie.net/streetfighter/images/2/29/Ed_SF5.png" },
  { id: 59, name: "Urien", universe: "Street Fighter", image: "https://static.wikia.nocookie.net/streetfighter/images/0/06/Urien_SF5.png" },
  { id: 60, name: "Gill", universe: "Street Fighter", image: "https://static.wikia.nocookie.net/streetfighter/images/c/ce/Gill_SF5.png" },

  { id: 61, name: "Scorpion", universe: "Mortal Kombat", image: "https://static.wikia.nocookie.net/mk/images/3/35/ScorpionMK11.png" },
  { id: 62, name: "Sub-Zero", universe: "Mortal Kombat", image: "https://static.wikia.nocookie.net/mk/images/4/45/Sub-Zero_MK11.png" },
  { id: 63, name: "Raiden", universe: "Mortal Kombat", image: "https://static.wikia.nocookie.net/mk/images/7/7e/RaidenMK11.png" },
  { id: 64, name: "Liu Kang", universe: "Mortal Kombat", image: "https://static.wikia.nocookie.net/mk/images/3/37/Liu_Kang_MK11.png" },
  { id: 65, name: "Johnny Cage", universe: "Mortal Kombat", image: "https://static.wikia.nocookie.net/mk/images/3/3f/Johnny_Cage_MK11.png" },
  { id: 66, name: "Sonya Blade", universe: "Mortal Kombat", image: "https://static.wikia.nocookie.net/mk/images/a/a2/Sonya_MK11.png" },
  { id: 67, name: "Shang Tsung", universe: "Mortal Kombat", image: "https://static.wikia.nocookie.net/mk/images/5/58/Shang_Tsung_MK11.png" },
  { id: 68, name: "Kano", universe: "Mortal Kombat", image: "https://static.wikia.nocookie.net/mk/images/c/c9/Kano_MK11.png" },
  { id: 69, name: "Kitana", universe: "Mortal Kombat", image: "https://static.wikia.nocookie.net/mk/images/4/4d/Kitana_MK11.png" },
  { id: 70, name: "Mileena", universe: "Mortal Kombat", image: "https://static.wikia.nocookie.net/mk/images/1/19/MileenaMK11.png" },
  { id: 71, name: "Baraka", universe: "Mortal Kombat", image: "https://static.wikia.nocookie.net/mk/images/e/ea/Baraka_MK11.png" },
  { id: 72, name: "Jax Briggs", universe: "Mortal Kombat", image: "https://static.wikia.nocookie.net/mk/images/1/12/Jax_MK11.png" },
  { id: 73, name: "Reptile", universe: "Mortal Kombat", image: "https://static.wikia.nocookie.net/mk/images/a/a2/Reptile_MK11.png" },
  { id: 74, name: "Noob Saibot", universe: "Mortal Kombat", image: "https://static.wikia.nocookie.net/mk/images/a/a5/Noob_Saibot_MK11.png" },
  { id: 75, name: "Kotal Kahn", universe: "Mortal Kombat", image: "https://static.wikia.nocookie.net/mk/images/1/1a/Kotal_Khan_MK11.png" },
  { id: 76, name: "Cetrion", universe: "Mortal Kombat", image: "https://static.wikia.nocookie.net/mk/images/4/4f/CetrionMK11.png" },
  { id: 77, name: "Jacqui Briggs", universe: "Mortal Kombat", image: "https://static.wikia.nocookie.net/mk/images/f/f1/Jacqui_Briggs_MK11.png" },
  { id: 78, name: "Frost", universe: "Mortal Kombat", image: "https://static.wikia.nocookie.net/mk/images/3/32/Frost_MK11.png" },
  { id: 79, name: "Kung Lao", universe: "Mortal Kombat", image: "https://static.wikia.nocookie.net/mk/images/0/05/Kung_Lao_MK11.png" },
  { id: 80, name: "Takeda", universe: "Mortal Kombat", image: "https://static.wikia.nocookie.net/mk/images/d/d4/Takeda_MK11.png" }



  
];


function App() {
  const [character1, setCharacter1] = useState<number | null>(null);
  const [character2, setCharacter2] = useState<number | null>(null);
  const [fusionImage, setFusionImage] = useState<string | null>(null);
  const [fusionImage2, setFusionImage2] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");


  
  const generateDescription = async (char1Name: string, char2Name: string) => {
    try {
      const prompt = `ACTION:
Generate an immersive and detailed description of a fusion between two iconic characters, inspired by Dragon Ball Z fusion techniques, The scene should capture their entire bodies, the intensity of the moment, the energy aura of the characters, and the surrounding effects, all in hyper-realistic 4K with dramatic cinematic lighting and intense shadows.

Characters to fuse: ${char1Name} and ${char2Name}

Script Description:

Stance and energy, ${char1Name} and ${char2Name} stand facing each other, their bodies tense, their eyes locked in a powerful gaze, the air around them crackling with anticipation, an intense energy aura enveloping them both, shimmering with vibrant power, each stance exuding raw strength and determination,
Dramatic tension, The silence is deafening, the weight of their power creating an almost unbearable tension between them, both characters are ready for the fusion, their muscles visibly tense, their wills stronger than ever, the very ground beneath them trembling as they prepare for the extraordinary moment ahead,
Power buildup and surroundings, Slowly, their energies begin to swirl around them, an electrifying force building, the surroundings react violently to the immense power, trees shaking, rocks levitating, and the sky above darkening, a swirling vortex of energy forms between them, crackling with intense light and power,
Moment of fusion, In a flash of light, they leap toward each other, their bodies merging in an explosion of raw energy, the fusion is instantaneous and overwhelming, the entire environment warps as the sheer force of the fusion sends shockwaves through the air, a blinding glow engulfs the scene,
Fused character, As the light dims, a single being stands in their place, the fused character radiates power and perfection, their body an awe-inspiring mix of ${char1Name}'s and ${char2Name}'s features, their movements fluid and graceful, the harmony between the two identities reflected in their flawless form,
Power and charisma, The fused character stands tall, exuding an aura of overwhelming power, their posture confident and unyielding, every muscle defined, their energy radiating outwards in waves, their charisma undeniable, the very air around them feels charged, their presence a force to be reckoned with, `;

      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Erreur lors de la génération de la description:', error);
      return "Erreur lors de la génération de la description.";
    }
  };

    const generateFusionPrompt = async (char1Name: string, char2Name: string) => {
    try {
      const prompt = `
ACTION:
Generate an immersive and coherent depiction of a fusion between two iconic characters, preserving their distinct physical and energetic attributes while ensuring a smooth integration. The result must be hyper-realistic in 4K, with dramatic cinematic lighting and intense shadows.
Mandatory fusion:
of ${char1Name} and ${char2Name}
STEPS:
Identify the two characters to be merged using the parameters provided.
Analyze their individual characteristics, including their colors, skin textures, morphology, energy, posture, and expression.
Merge their distinctive features harmoniously, ensuring that each physical and energetic element integrates naturally rather than simply being juxtaposed.
Describe their merged appearance accurately, detailing:
The resulting skin tone, which should reflect a subtle blend of the original colors.
The body structure, balancing raw power and elegance depending on the characters involved.
The face, combining the characteristic features of both heroes with an imposing and charismatic appearance.
The costume or armor, merging their iconic styles while remaining functional and aesthetic.
Explain their posture and presence, highlighting gestures that express their dominance, confidence and power.
Describe the energy they give off, integrating lighting and contrast effects to accentuate their strength and charisma.
Provide a unique name for the fusion, based on a combination of the names or characteristics of the merged characters.
PERSONA:
A cinematic and epic narrator, specializing in heroic fusions and ultra-realistic descriptions. His tone is exalted and detailed, worthy of a blockbuster or a shonen manga, capturing each element with intensity and visual coherence.

EXAMPLES:
Example Input: Superman, Hulk
Example Expected Output:
"Her skin is a blend of Hulk's vibrant green and Superman's luminous aura, radiating an irresistible energy. Her physique is a perfect fusion of gamma-ray brute strength and Kryptonian elegance, her sculpted muscles evoking both power and grace. She moves with elegant ferocity, her piercing gaze defying all who would dare oppose her. This ultimate fusion of Superman and Hulk has created a fearsome and captivating warrior—untamed, unwavering, and beyond anything the world has ever known."
Fusion Name: SuperHulk

CONTEXT:
The fusion must respect the visual and energetic balance of the two characters, creating a hybrid being whose every detail makes sense. The goal is to obtain a character that does not look like a simple superposition, but a real organic and natural fusion, integrating the morphology, energy and aura of the two heroes.

The environment must reflect the power of this fusion, with spectacular effects (seismic shocks, intense lights, energy vortex). Cinematic lighting must accentuate the dramatic contrasts, highlighting the play of light and shadow that sublimate the transformation.

CONSTRAINTS:
Preserve the coherence of the merged characters, avoiding forced or artificial combinations.
Their entire body must be visible, with a dominant and confident posture.
Hyper-realistic, 4K, highly detailed, cinematic lighting, dramatic shadows must be perceptible in the description.
The fusion must be fluid and logical, without a break in style between the original characters.
Use an immersive and cinematic narrative style, with a focus on visual effects and realism.
Name the final fusion, finding a balance between the names, characteristics or symbols of the merged characters.
TEMPLATE :
The result should be a detailed midjourney prompt that merges the two characters.

`;

   const completion = await openai.chat.completions.create({
  messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
});

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Erreur lors de la génération de la description fusion :', error);
      return "Erreur lors de la génération de la description. fusion";
    }
  };

//   const generateFaceToFacePrompt = async (char1Name: string, char2Name: string) => {
//     try {
//       const prompt = `Generate a concise, detailed description for an AI image generator of ${char1Name} and ${char2Name} standing face to face before their fusion. Focus on:
// 1. Their stance and positioning
// 2. The energy and aura they emit
// 3. The tension in the atmosphere
// 4. The visual effects and lighting
// 5. Full body 

// Keep the description under 200 words and end with: "Hyper-realistic, 4K, highly detailed, cinematic lighting, dramatic shadows."`;

//       const completion = await openai.chat.completions.create({
//         messages: [{ role: "user", content: prompt }],
//         model: "gpt-3.5-turbo",
//       });

//       return completion.choices[0].message.content;
//     } catch (error) {
//       console.error('Erreur lors de la génération du prompt face à face:', error);
//       return `${char1Name} and ${char2Name} stand face to face, their intense gazes locked, ready to engage in an epic confrontation. Their bodies radiate power, creating an electrifying atmosphere. The air between them crackles with tension, as both warriors exude dominance and confidence, prepared for the battle ahead. This powerful confrontation has created a scene of unstoppable force and unyielding will. Hyper-realistic, 4K, highly detailed, cinematic lighting, dramatic shadows.`;
//     }
//   };
    const generateFaceToFacePrompt = async (char1Name: string, char2Name: string) => {
    try {
      const prompt = `
ACTION :
Générer une description immersive et détaillée d'une fusion entre deux personnages  ${char1Name} and ${char2Name} emblématiques, inspirée des techniques de fusion de Dragon Ball Z. La scène doit capturer tout leur corps, l’intensité du moment, l’aura énergétique des personnages et les effets environnants.
Face a face :  ${char1Name} and ${char2Name}.
STEPS :
Identifier les deux personnages à fusionner en utilisant les paramètres fournis.
On doit voir tout le corps de perssonages .
Décrire leur posture initiale alors qu'ils se font face, en montrant tout leur corps et en insistant sur leur apparence et l’énergie qu’ils dégagent.
Insister sur la tension dramatique entre eux, montrant leur puissance individuelle et leur détermination.
Décrire en détail la montée en puissance, la réaction de leur environnement et l’accumulation d’énergie autour d’eux.
Dépeindre l’instant précis de la fusion, incluant les effets visuels spectaculaires et l’impact sur le décor.
Présenter le personnage fusionné en montrant tout son corps, en décrivant ses traits distinctifs et l’harmonie parfaite entre les deux identités.
Insister sur sa puissance et son charisme, mettant en avant sa posture dominante et son énergie écrasante.
PERSONA :
Un narrateur épique et cinématographique, spécialiste des descriptions héroïques et des scènes d’action spectaculaires. Son ton est exalté, détaillé et digne d’un blockbuster ou d’un manga shonen, capturant chaque instant avec intensité.

EXAMPLES :
Exemple d’entrée : Supergirl, Hulk Girl
Exemple de sortie attendue : Une description immersive où Supergirl et Hulk Girl se font face sur un champ de bataille, tout leur corps visible, alors qu’elles accumulent une énergie phénoménale. Leur fusion entraîne une transformation spectaculaire, donnant naissance à une guerrière d’une puissance inégalée, dont l’apparence et l’aura combinent les caractéristiques des deux héroïnes.

CONTEXT :
La scène se déroule sur un champ de bataille chaotique où deux personnages surpuissants se font face, tout leur corps visible, prêts à fusionner. L’objectif est d’exprimer une transformation spectaculaire, mettant en avant la puissance brute et l’aura mystique des personnages fusionnés. L’environnement doit refléter l’ampleur de cet événement épique, avec des secousses sismiques, des vents violents et des éclairs d’énergie.

CONSTRAINTS :
Toujours deux personnages face à face, créant une tension dramatique avant leur fusion.
On doit voir tout le corps de perssonages .
Leur corps entier doit être visible, avec des descriptions précises de leur posture et de leur transformation.
Le texte doit être immersif et dynamique, avec une montée en tension progressive.
Éviter les répétitions excessives et varier le vocabulaire pour amplifier l’intensité.
La fusion doit être fluide et donner naissance à un personnage harmonieux, combinant les attributs physiques et énergétiques des deux protagonistes.
Utiliser un style narratif cinématographique, avec un focus sur les effets visuels spectaculaires.
TEMPLATE :
Le résultat doit être une description narrative immersive, en format texte, avec des paragraphes bien structurés, suivant un déroulement logique de l’action (avant, pendant et après la fusion)`;

      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Erreur lors de la génération du prompt face à face:', error);

    }
  };
 // fonctionnalité a rajouter quand ca charge faire un gens de sous titre ou ca lis la fusion des deux perssonage
  const generateFusion = async () => {
    if (!character1 || !character2) return;
    const char1 = characters.find(c => c.id === character1);
    const char2 = characters.find(c => c.id === character2);

    if (!char1 || !char2) return;

    setLoading(true);
    setLogs([]);

    try {
      // Générer la description avec ChatGPT
      const generatedDescription = await generateDescription(char1.name, char2.name);
      
      setDescription(generatedDescription || "");
     console.log(description);
      // Générer le prompt face à face avec ChatGPT
      const faceToFacePrompt = await generateFaceToFacePrompt(char1.name, char2.name);

      const fusionPrompt = await generateFusionPrompt(char1.name, char2.name);
       console.log(fusionPrompt);
      const result1 = await fal.subscribe('fal-ai/flux/dev', {
        input: {
          prompt: faceToFacePrompt +" Hyper-realistic, 4K, highly detailed, cinematic lighting, dramatic shadows. ",
          image_size: "portrait_16_9",
          sync_mode: true,
          scheduler: "DDIM",
          // num_inference_steps: 50,
          // guidance_scale: 7.5,
          // strength: 0.75,
          enable_safety_checker: false
        },
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === "IN_PROGRESS") {
            const newLogs = update.logs.map((log) => log.message);
            setLogs(prev => [...prev, ...newLogs]);
          }
        }
      });

      const result2 = await fal.subscribe('fal-ai/flux/dev', {
        input: {
          prompt: fusionPrompt +" Hyper-realistic, 4K, highly detailed, cinematic lighting, dramatic shadows. ",
          image_size: "portrait_16_9",
          sync_mode: false,
          scheduler: "DDIM",
          // num_inference_steps: 50,
          // guidance_scale: 7.5,
          // strength: 0.75,
          enable_safety_checker: false
        },
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === "IN_PROGRESS") {
            const newLogs = update.logs.map((log) => log.message);
            setLogs(prev => [...prev, ...newLogs]);
          }
        }
      });

      if (result1.images?.[0]?.url) {
        setFusionImage(result1.images[0].url);
      }
      if (result2.images?.[0]?.url) {
        setFusionImage2(result2.images[0].url);
      }
    } catch (error) {
      console.error('Erreur lors de la fusion:', error);
      setLogs(prev => [...prev, 'Une erreur est survenue lors de la fusion']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 flex items-center justify-center gap-2">
          <Wand2 className="w-10 h-10" />
          Fusion de Super-Héros
        </h1>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Premier Super-Héros</h2>
            <div className="grid grid-cols-2 gap-4">
              {characters.map((char) => (
                <div
                  key={char.id}
                  className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    character1 === char.id ? 'border-blue-500 scale-105' : 'border-gray-700 hover:border-blue-400'
                  }`}
                  onClick={() => setCharacter1(char.id)}
                >
                  <div className="relative">
                    <img src={char.image} alt={char.name} className="w-full h-48 object-cover" />
                    <span className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold ${
                      char.universe === 'Marvel' ? 'bg-red-600' : 'bg-blue-600'
                    }`}>
                      {char.universe}
                    </span>
                  </div>
                  <p className="p-3 text-center bg-gray-800 font-semibold">{char.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Second Super-Héros</h2>
            <div className="grid grid-cols-2 gap-4">
              {characters.map((char) => (
                <div
                  key={char.id}
                  className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    character2 === char.id ? 'border-blue-500 scale-105' : 'border-gray-700 hover:border-blue-400'
                  }`}
                  onClick={() => setCharacter2(char.id)}
                >
                  <div className="relative">
                    <img src={char.image} alt={char.name} className="w-full h-48 object-cover" />
                    <span className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold ${
                      char.universe === 'Marvel' ? 'bg-red-600' : 'bg-blue-600'
                    }`}>
                      {char.universe}
                    </span>
                  </div>
                  <p className="p-3 text-center bg-gray-800 font-semibold">{char.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <button
            onClick={generateFusion}
            disabled={!character1 || !character2 || loading}
            className={`px-8 py-4 rounded-lg text-lg font-semibold transition-all ${
              loading || !character1 || !character2
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
            }`}
          >
            {loading ? 'Fusion en cours...' : 'Fusionner les Super-Héros'}
          </button>
        </div>

        {description && (
          <div className="mb-8 p-6 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Description de la Fusion</h3>
       <Subtitles subtitles={description} />

          </div>
        )}

        {loading && logs.length > 0 && (
          <div className="mb-8 p-4 bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Progression</h3>
            <div className="space-y-1">
              {logs.map((log, index) => (
                <p key={index} className="text-sm text-gray-300">{log}</p>
              ))}
            </div>
          </div>
        )}

        {(fusionImage || fusionImage2) && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Résultat de la Fusion</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fusionImage && (
                <div className="rounded-lg overflow-hidden border-2 border-gradient-to-r from-blue-500 to-purple-500">
                  <img
                    src={fusionImage}
                    alt="Fusion (Face à Face)"
                    className="w-full h-[600px] object-contain bg-black"
                  />
                </div>
              )}
              {fusionImage2 && (
                <div className="rounded-lg overflow-hidden border-2 border-gradient-to-r from-blue-500 to-purple-500">
                  <img
                    src={fusionImage2}
                    alt="Fusion (Résultat)"
                    className="w-full h-[600px] object-contain bg-black"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;