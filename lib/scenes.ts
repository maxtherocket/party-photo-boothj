export interface Scene {
  id: string;
  name: string;
  emoji: string;
  prompt: string;
}

// Base preservation instructions to prepend to all prompts
const FACE_PRESERVATION = `CRITICAL: Preserve the person's face, facial features, skin tone, and identity EXACTLY as shown in the original photo. Do not modify face geometry, facial structure, eye shape, nose, mouth, or any facial characteristics. The person must be immediately recognizable as themselves.`;

const STYLE_INSTRUCTIONS = `Style: Photorealistic, high-quality photograph with natural lighting. The final image should look like a real photograph, not AI-generated or illustrated. Cinematic quality with professional photography aesthetics.`;

export const SCENES: Scene[] = [
  {
    id: "tacoFiesta",
    name: "Taco Fiesta",
    emoji: "🌮",
    prompt: `${FACE_PRESERVATION}

MANDATORY HAT: Add an absolutely ENORMOUS sombrero - comically oversized, at least twice the width of their shoulders. The sombrero should be hot pink with neon green embroidery, gold sequins, and tiny dangling chili pepper ornaments around the brim that catch the light. It should look like it weighs 20 pounds but they're wearing it proudly.

Scene transformation: Dress them in the most gloriously over-the-top mariachi outfit imaginable - think bedazzled jacket with gold braiding, ruffled shirt, and a bow tie made of actual tiny tacos. They should be surrounded by floating tacos, burritos, and chips with salsa raining down like confetti. Add a tiny chihuahua in a matching sombrero peeking from behind them.

Background: An explosion of papel picado banners in every color imaginable, a mariachi band of skeletons playing enthusiastically in the background, piñatas shaped like avocados hanging everywhere, and a sunset that looks like liquid cheese and salsa swirled together.

${STYLE_INSTRUCTIONS} Warm, festive golden hour lighting with the absurd elements rendered completely photorealistically - as if this ridiculous scene actually exists.`,
  },
  {
    id: "retro2000s",
    name: "Y2K Throwback",
    emoji: "📱",
    prompt: `${FACE_PRESERVATION}

MANDATORY HAIR: Give them the most EXTREME early 2000s hairstyle - we're talking chunky highlights (blonde AND pink), butterfly clips covering every available inch, tiny twist buns, AND frosted tips all at once. The hair should look like it used an entire can of hair gel and sparkle spray.

Scene transformation: Dress them in head-to-toe iridescent everything - a shiny holographic crop top, ultra low-rise bedazzled jeans with a visible whale tail, platform sneakers with goldfish in the heels, and arms STACKED with jelly bracelets from wrist to elbow. They should be holding a Motorola Razr in hot pink AND a portable CD player with oversized foam headphones.

Background: The iconic laser beam mall photo backdrop, but cranked to 11 - more lasers, more stars, more purple and teal gradient. Add floating Nokia phones, Tamagotchis, and burned CDs labeled "Summer Mix 2003" scattered around. Include an inflatable chair and a lava lamp.

${STYLE_INSTRUCTIONS} That classic early 2000s flash photography look - slightly overexposed, warm color cast, and lens flare. Make it look like an actual photo from 2002 that someone just found in a shoebox.`,
  },
  {
    id: "disco",
    name: "Disco Fever",
    emoji: "🪩",
    prompt: `${FACE_PRESERVATION}

MANDATORY HAIR: Give them a SPECTACULAR 1970s afro or feathered Farrah Fawcett hair (whichever suits them better) - absolutely massive, gravity-defying, with a jeweled headband and actual tiny disco balls woven into the hair that catch and reflect light. The hair should be majestic.

Scene transformation: Dress them in the most outrageous disco outfit possible - a sequined jumpsuit with a plunging neckline and bell-bottoms so wide you could fit a family inside. Add platform shoes at least 6 inches tall, massive gold medallion necklaces layered three-deep, and oversized tinted glasses in amber. They should be striking the classic disco point pose.

Background: A disco dance floor that's actually made of light-up tiles, with a disco ball the size of a small car overhead. Laser beams in every color shooting across the scene, silhouettes of dancers doing the hustle in the background, and glitter literally floating in the air. The whole scene should sparkle like it was dipped in diamonds.

${STYLE_INSTRUCTIONS} Rich, saturated colors with dramatic studio lighting. The disco ball should cast realistic light fragments across everything. Make it feel like Studio 54 at its absolute peak.`,
  },
  {
    id: "wildWest",
    name: "Wild West",
    emoji: "🤠",
    prompt: `${FACE_PRESERVATION}

MANDATORY HAT: Add an absolutely RIDICULOUS cowboy hat - we're talking 10-gallon hat that's actually 50 gallons. Worn white leather with bullet holes, a rattlesnake hatband (the snake looks annoyed but resigned), and sheriff's badge pinned to the front. The hat should have its own weather system.

Scene transformation: Dress them as the most legendary outlaw/sheriff hybrid - a weathered leather duster coat, bandolier filled with hot sauce bottles instead of bullets, spurred boots that are definitely impractical, and they're twirling a lasso made of beef jerky. A wanted poster in the background shows their face with "WANTED: TOO COOL" written on it.

Background: A dusty Main Street showdown scene at high noon. Tumbleweeds the size of cars rolling by, a saloon with swinging doors where a horse is ordering a drink at the bar, a water tower shaped like a cowboy boot, and the most dramatic desert sunset with cacti wearing tiny cowboy hats.

${STYLE_INSTRUCTIONS} Warm sepia tones with that classic spaghetti western cinematography feel. Dust particles visible in the dramatic lighting, lens flare from the setting sun.`,
  },
  {
    id: "space",
    name: "Space Adventure",
    emoji: "🚀",
    prompt: `${FACE_PRESERVATION}

MANDATORY HEADGEAR: Give them a retro-futuristic space helmet with a clear bubble visor (face fully visible), covered in mission stickers, with a tiny alien plushie suction-cupped to the outside, and an antenna on top with a blinking light. The helmet should look well-traveled, with space dust and small asteroid dents.

Scene transformation: Dress them in a flashy NASA-meets-disco spacesuit - silver and orange with too many unnecessary pockets, patches from "Mars Taco Bell" and "Jupiter's Best Coffee," and a cape (because why not). They should be floating in zero-g with snacks and tools orbiting around them. A space cat in its own tiny suit floats nearby looking unimpressed.

Background: A stunning view from a space station window - Earth below looking gorgeous, the Milky Way stretching across the void, a flying saucer photobombing in the distance, and the Moon with a "Humans Were Here" flag. Saturn's rings visible on the horizon. The control panel behind them has a "Days Since Accident: 3" sign.

${STYLE_INSTRUCTIONS} Cinematic space photography lighting - blue Earth-glow as key light, warm golden interior lights. Should look like a behind-the-scenes photo from a blockbuster sci-fi movie.`,
  },
  {
    id: "underwater",
    name: "Under the Sea",
    emoji: "🧜",
    prompt: `${FACE_PRESERVATION}

MANDATORY HEADPIECE: Add an absolutely MAGNIFICENT underwater crown/headpiece - a tiara made of living coral, bioluminescent jellyfish tentacles cascading down like hair decorations, pearl strings woven throughout, and a tiny seahorse perched on top looking regal. Their natural hair should float ethereally around the crown as if underwater.

Scene transformation: Give them a spectacular iridescent mermaid/merman tail in impossible colors that shift from teal to purple to gold. Add a seashell top/chest piece covered in barnacles and pearls, armfuls of sea glass bracelets, and they should be holding a trident that's also a giant fork (for eating sea spaghetti, obviously). A grumpy pufferfish floats next to them as their sidekick.

Background: An insane underwater kingdom - coral castles with sea anemone gardens, schools of tropical fish forming the shape of a heart, a treasure chest overflowing with gold coins and rubber ducks, an octopus DJ spinning records made of sand dollars, and sunbeams filtering through creating god-rays. A shark in the background wears reading glasses and looks scholarly.

${STYLE_INSTRUCTIONS} Ethereal underwater lighting with beautiful caustics. Rich, saturated coral colors with that slight blue-green underwater tint. Should look like a high-budget underwater photograph from a fantasy film.`,
  },
  {
    id: "giantFood",
    name: "Giant Food Attack",
    emoji: "🍔",
    prompt: `${FACE_PRESERVATION}

MANDATORY HAT: Add a towering chef's toque (chef hat) that's at least 2 feet tall, slightly tilted, with food splatters on it that tell a story of culinary chaos. OR give them a hat that IS food - like their head is poking through a giant donut, or they're wearing a hamburger bun as a hat with sesame seeds.

Scene transformation: They should be in a chef's outfit that's seen better days - white coat covered in colorful sauce splatters, wooden spoon tucked in pocket. Around them, ENORMOUS food is falling from the sky - pizza slices the size of surfboards, hamburgers as big as tires, french fries like baseball bats, and donuts you could hula-hoop with. They should look either delighted or hilariously overwhelmed.

Background: A chaotic commercial kitchen where everything has gone wonderfully wrong - pots boiling over with rainbows, a refrigerator door open revealing it's a portal to a cheese dimension, vegetables with cartoon faces cheering from a cutting board, and a wall clock made of a fried egg. Through the window, more giant food rains down on the city.

${STYLE_INSTRUCTIONS} Bright, appetizing food photography lighting. The giant food should look absolutely delicious and photorealistic despite being enormous. Magazine-quality food styling.`,
  },
  {
    id: "eighties",
    name: "80s Aerobics",
    emoji: "💪",
    prompt: `${FACE_PRESERVATION}

MANDATORY HAIR: Give them the ULTIMATE 80s exercise hair - massively crimped and volumized, held back by a neon sweatband (hot pink or electric blue), with a scrunchie that's definitely too big. The hair should be so big it has its own gravitational pull. Add some sweat glistening on their forehead for authenticity.

Scene transformation: Dress them in the most outrageously bright aerobics outfit imaginable - a shiny spandex leotard in clashing neon colors (think pink and green zebra print), matching leg warmers scrunched perfectly, high-top Reeboks, and wristbands on BOTH wrists. They should be mid-aerobic move - maybe a high kick or a fist pump. Add visible VHS tracking lines occasionally across the image.

Background: A wood-paneled home gym/living room straight from 1985 - a tube TV showing a workout video, a boombox the size of a suitcase, motivational posters with sunsets and eagles, shag carpet, and houseplants that are definitely fake. Mirror wall reflecting everything. Other aerobics participants in the background also in ridiculous outfits.

${STYLE_INSTRUCTIONS} That warm, slightly soft 1980s video quality - a bit grainy, oversaturated neons, with the characteristic look of a VHS recording. Should look like a freeze-frame from an actual Jane Fonda workout tape.`,
  },
  {
    id: "renaissance",
    name: "Renaissance Faire",
    emoji: "🏰",
    prompt: `${FACE_PRESERVATION}

MANDATORY HEADWEAR: Give them either a magnificent JESTER HAT with three long floppy points ending in bells that actually jingle, in clashing royal purple and gold with diamond patterns - OR an absurdly elaborate royal crown that's clearly too heavy, encrusted with gems the size of golf balls and topped with a tiny flag of their own face.

Scene transformation: Dress them in full Renaissance faire glory - we're talking puffy sleeves you could hide a turkey in, a velvet doublet or corseted gown in rich jewel tones, a ruffled collar so big it's basically a neck cloud, and tights (definitely tights). They should be holding a comically large turkey leg in one hand and a goblet overflowing with grape juice in the other.

Background: A bustling Renaissance faire castle courtyard - a jousting match happening in the background where one knight has fallen off hilariously, a dragon made of papier-mâché breathing party streamers, merchants selling "Ye Olde Funnel Cakes," a stocks/pillory where someone is stuck taking selfies, and banners with punny medieval phrases. A court fool juggles in the corner.

${STYLE_INSTRUCTIONS} Rich, painterly lighting reminiscent of Renaissance oil paintings but as a photograph. Deep shadows, warm golden hour glow, theatrical drama. Should look like a still from a comedy period film.`,
  },
  {
    id: "tropical",
    name: "Tourist Chaos",
    emoji: "🌴",
    prompt: `${FACE_PRESERVATION}

MANDATORY HAT: Add the most AGGRESSIVELY touristy sun hat imaginable - an enormous floppy straw hat covered in tacky destination pins, a tiny battery-powered fan clipped to the brim, plastic fruit decorations, and "I ❤️ VACATION" embroidered on it. Bonus points for zinc sunscreen on their nose.

Scene transformation: Dress them as the ultimate tourist disaster - a Hawaiian shirt SO loud it should be illegal (think flamingos, pineapples, AND palm trees clashing), cargo shorts with every pocket bulging, socks with sandals (mandatory), binoculars AND a camera around neck, and they're absolutely DROWNING in leis - at least 15 of them stacked up. They're holding a comically large tropical drink with 7 umbrellas.

Background: An overwhelmingly kitschy tropical tourist trap - a beach with suspiciously turquoise water, a tiki bar where the bartender is a carved coconut with sunglasses, souvenir shops selling "My Parents Went to Paradise and All I Got Was This Photo," inflatable flamingos and palm trees everywhere, and a photo-op cutout of a surfer. A seagull is actively stealing someone's fries in the background.

${STYLE_INSTRUCTIONS} Bright, oversaturated vacation photo vibes - that classic point-and-shoot tourist snapshot look. Harsh midday sun, everyone squinting slightly, maximum tropical color saturation.`,
  },
];
