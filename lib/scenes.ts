export interface Scene {
  id: string;
  name: string;
  emoji: string;
  prompt: string;
}

export const SCENES: Scene[] = [
  {
    id: "tacoFiesta",
    name: "Taco Fiesta",
    emoji: "🌮",
    prompt:
      "Transform this photo into a vibrant Mexican fiesta scene. The people should be wearing colorful sombreros and traditional Mexican clothing, surrounded by papel picado decorations, maracas, and delicious tacos. Background should be a festive Mexican street at golden hour with warm lighting, mariachi band in the distance, and colorful buildings. Make it joyful and celebratory.",
  },
  {
    id: "retro2000s",
    name: "Y2K Throwback",
    emoji: "📱",
    prompt:
      "Transform this photo into an early 2000s aesthetic. Give the people frosted tips or butterfly clips, low-rise jeans vibes, and chunky platform shoes. Add flip phones and portable CD players. Background should be a mall photo studio with a classic laser backdrop in pink and blue. Include some era-appropriate accessories like jelly bracelets and mood rings.",
  },
  {
    id: "disco",
    name: "Disco Fever",
    emoji: "🪩",
    prompt:
      "Transform this photo into a groovy 1970s disco scene. The people should be wearing sparkly bell-bottoms, platform shoes, and funky afros or feathered hair. Background should be a disco dance floor with a massive mirror ball, colorful lights, and a DJ booth. Add some classic disco poses and make everything shimmer and shine.",
  },
  {
    id: "wildWest",
    name: "Wild West",
    emoji: "🤠",
    prompt:
      "Transform this photo into a Wild West scene. The people should be wearing cowboy hats, boots, and frontier clothing. Background should be a dusty old western town with a saloon, tumbleweeds, and a dramatic desert sunset. Add some wanted posters and horses in the background for authenticity.",
  },
  {
    id: "space",
    name: "Space Adventure",
    emoji: "🚀",
    prompt:
      "Transform this photo into an epic space adventure scene. The people should be wearing sleek astronaut suits, floating in zero gravity. Background should be the interior of a futuristic spaceship with Earth visible through the window, surrounded by stars, planets, and maybe a friendly alien. Make it feel like a grand space exploration mission.",
  },
  {
    id: "underwater",
    name: "Under the Sea",
    emoji: "🧜",
    prompt:
      "Transform this photo into a magical underwater scene. The people should have mermaid tails or diving gear, swimming with colorful tropical fish. Background should be a beautiful coral reef with sea turtles, dolphins, and treasure chests. Add some magical underwater lighting with sun rays filtering through the water.",
  },
];
