export interface Scene {
  id: string;
  name: string;
  emoji: string;
  prompt: string;
}

// Base preservation instructions to prepend to all prompts
const FACE_PRESERVATION = `CRITICAL: Preserve the person's face, facial features, skin tone, and identity EXACTLY as shown in the original photo. Do not modify face geometry, facial structure, eye shape, nose, mouth, or any facial characteristics. The person must be immediately recognizable as themselves. Keep hair color and style unchanged unless explicitly part of a removable accessory.`;

const STYLE_INSTRUCTIONS = `Style: Photorealistic, high-quality photograph with natural lighting. The final image should look like a real photograph, not AI-generated or illustrated.`;

export const SCENES: Scene[] = [
  {
    id: "tacoFiesta",
    name: "Taco Fiesta",
    emoji: "🌮",
    prompt: `${FACE_PRESERVATION}

Scene transformation: Place this person into a vibrant Mexican fiesta celebration. Add a colorful embroidered sombrero decorated with festive patterns sitting naturally on their head, with appropriate shadows matching the scene lighting. Dress them in a traditional Mexican outfit with bright colors and embroidery details.

Background: A festive Mexican street at golden hour with warm, celebratory lighting. Include papel picado (colorful perforated paper banners) hanging overhead, colorful colonial buildings in soft focus behind them, and hints of a mariachi celebration in the distance. Scatter some maracas and decorative elements around the scene.

${STYLE_INSTRUCTIONS} Warm color palette with rich oranges, yellows, and festive colors. The lighting should feel like golden hour sunlight with a joyful, celebratory atmosphere.`,
  },
  {
    id: "retro2000s",
    name: "Y2K Throwback",
    emoji: "📱",
    prompt: `${FACE_PRESERVATION}

Scene transformation: Transport this person to the early 2000s era. Add era-appropriate accessories like butterfly clips in their hair, chunky plastic jewelry, and have them holding a metallic flip phone or portable CD player. Dress them in iconic Y2K fashion - think iridescent fabrics, low-rise aesthetic, and platform sneakers.

Background: A classic mall photo studio with the signature laser backdrop in vibrant pink, purple, and blue gradients. Add some nostalgic early 2000s elements like inflatable furniture hints and frosted effects around the edges.

${STYLE_INSTRUCTIONS} Slightly oversaturated colors typical of early 2000s flash photography. The image should feel like an authentic photo from 2002, complete with that era's characteristic warm color cast.`,
  },
  {
    id: "disco",
    name: "Disco Fever",
    emoji: "🪩",
    prompt: `${FACE_PRESERVATION}

Scene transformation: Place this person on a 1970s disco dance floor. Add a sparkly sequined outfit with bell-bottom silhouette, platform shoes, and era-appropriate accessories like large hoop earrings or a medallion necklace. Position them in a confident disco pose.

Background: A glamorous disco club interior with a massive mirrored disco ball casting light fragments across the scene. Include colorful spotlights in purple, pink, and gold creating dramatic lighting effects, a polished dance floor with reflections, and hints of other dancers in soft focus.

${STYLE_INSTRUCTIONS} Rich, saturated colors with dramatic disco lighting. Strong contrast between the sparkly highlights from the disco ball and the darker club atmosphere. The lighting should create a glamorous, celebratory mood with light rays visible in the atmosphere.`,
  },
  {
    id: "wildWest",
    name: "Wild West",
    emoji: "🤠",
    prompt: `${FACE_PRESERVATION}

Scene transformation: Transform this into an Old West frontier portrait. Add a weathered leather cowboy hat sitting naturally on their head with realistic shadows, a bandana around their neck, and dress them in authentic frontier clothing - perhaps a worn leather vest over a period-appropriate shirt. Add subtle dust particles in the air for atmosphere.

Background: A dusty main street of an Old West frontier town at sunset. Include a wooden saloon with swinging doors, a hitching post with a horse in soft focus, wooden boardwalks, and a dramatic desert sunset with warm orange and pink hues painting the sky. Tumbleweeds and desert brush visible in the distance.

${STYLE_INSTRUCTIONS} Warm sepia-influenced color grading reminiscent of classic Western films. Dusty, atmospheric lighting with the golden hour sun creating long shadows and a nostalgic frontier feeling.`,
  },
  {
    id: "space",
    name: "Space Adventure",
    emoji: "🚀",
    prompt: `${FACE_PRESERVATION}

Scene transformation: Place this person as an astronaut aboard a futuristic space station. Add a sleek, modern astronaut suit with a clear helmet visor that fully shows their face. The suit should have realistic details like mission patches, communication equipment, and subtle wear from space travel. Position them as if floating in zero gravity with hair slightly lifted if visible.

Background: The interior of an advanced spacecraft with large observation windows showing Earth's curvature below, the deep black of space filled with stars, and perhaps a distant moon or planet. Include futuristic control panels with soft glowing lights, floating equipment, and the characteristic blue glow of Earth reflecting into the cabin.

${STYLE_INSTRUCTIONS} Clean, cinematic lighting with the blue Earth-glow as key light and warm spacecraft interior lights as fill. The image should feel like a still from a modern sci-fi film - awe-inspiring and epic in scale.`,
  },
  {
    id: "underwater",
    name: "Under the Sea",
    emoji: "🧜",
    prompt: `${FACE_PRESERVATION}

Scene transformation: Place this person in a magical underwater kingdom scene. Add an iridescent, shimmering tail starting from the waist down, with scales that catch the light beautifully. Include underwater-appropriate accessories like a seashell crown or pearl jewelry. Their upper body clothing should transition naturally into the underwater fantasy theme. Add subtle underwater effects like small bubbles rising around them and their hair floating naturally as if underwater.

Background: A breathtaking coral reef kingdom with vibrant corals in pink, purple, and orange, schools of colorful tropical fish swimming by, gentle sea turtles in the distance, and ancient underwater ruins with treasure chests. Sunbeams filter down through the crystal-clear water from above, creating beautiful caustic light patterns on the sandy ocean floor.

${STYLE_INSTRUCTIONS} Ethereal underwater lighting with god-rays filtering from the surface. Rich, saturated colors of the coral reef with a slight blue-green color cast typical of underwater photography. The scene should feel magical yet photorealistic, like a high-budget underwater photograph.`,
  },
];
