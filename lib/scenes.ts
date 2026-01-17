export interface Scene {
  id: string;
  name: string;
  emoji: string;
  prompt: string;
  isCustom?: boolean;
}

// Base preservation instructions to prepend to all prompts
export const FACE_PRESERVATION = `CRITICAL: Preserve the person's face, facial features, skin tone, and identity EXACTLY as shown in the original photo. Do not modify face geometry, facial structure, eye shape, nose, mouth, or any facial characteristics. The person must be immediately recognizable as themselves.`;

export const STYLE_INSTRUCTIONS = `Style: Photorealistic, high-quality photograph with natural lighting. The final image should look like a real photograph, not AI-generated or illustrated. Cinematic quality with professional photography aesthetics.`;

// Helper to build a custom prompt with proper instructions
export function buildCustomPrompt(userPrompt: string): string {
  return `${FACE_PRESERVATION}

Scene transformation: ${userPrompt}

Add an interesting, fun, or ridiculous hat, headpiece, or hairstyle that matches the vibe of the scene. Make it memorable and photo-worthy.

${STYLE_INSTRUCTIONS}`;
}

export const SCENES: Scene[] = [
  {
    id: "tacoFiesta",
    name: "Taco Fiesta",
    emoji: "🌮",
    prompt: `${FACE_PRESERVATION}

MANDATORY HAT: Slap an absolutely UNHINGED sombrero on their head - we're talking 4 feet wide minimum, glowing LED trim, loaded with fake chili pepper christmas lights, tiny tequila bottles dangling off the brim, and a live-action hot sauce fountain somehow built into the top. This hat is a STATEMENT. It says "I peaked at this party."

Scene transformation: Dress them in the most gloriously unhinged mariachi-meets-Vegas-showgirl outfit - a sequined jacket that would blind a pilot, gold chains with tiny taco pendants, and boots made of what appears to be solidified nacho cheese. They're being showered in a rain of flying tacos, burritos, and lime wedges while a Chihuahua wearing a matching sombrero photobombs with pure chaotic energy.

Background: Maximum chaos - papel picado made of holographic material, a mariachi band of skeletons doing a coordinated dance number, piñatas shaped like margarita glasses exploding everywhere, and a sunset that's definitely breaking physics with its intensity. There's a lowrider bouncing in the background. A neon sign says "NO REGRETS" in Spanish.

${STYLE_INSTRUCTIONS} Golden hour lighting cranked to 11. Every sequin catches the light. This photo should make someone say "I need to know the story behind this."`,
  },
  {
    id: "tranceCover",
    name: "Trance Album",
    emoji: "💿",
    prompt: `${FACE_PRESERVATION}

MANDATORY STYLING: Give them absolutely TRANSCENDENT rave hair - think cyber-goth meets extraterrestrial DJ. Towering neon-colored hair extensions, possibly dreads with UV-reactive wraps, cyber goggles pushed up on forehead, and LED strip lights woven through. Their face should have subtle UV face paint accents (dots, tribal patterns) that glow. Maybe some chrome/metallic temporary tattoos visible.

Scene transformation: This is a 2003 Tiësto compilation CD cover come to life. Dress them in peak Y2K rave fashion - vinyl pants, a mesh top or furry bra top, platform cyber boots, and arms absolutely STACKED with kandi bracelets up to the elbow. They're mid-dance move, hands up, eyes closed in pure euphoric bliss, surrounded by laser beams cutting through artificial fog.

Background: A massive outdoor festival at night - think Ibiza beach party meets alien landing. Enormous LED totems, fire dancers as silhouettes, a massive DJ booth with impossible amounts of lasers and pyrotechnics. The crowd is just visible as a sea of glow sticks. The sky has northern lights that are definitely not natural. Text floating in the aesthetic: just vibes, no actual words needed.

${STYLE_INSTRUCTIONS} That classic early-2000s CD cover aesthetic - heavy contrast, oversaturated cyans and magentas, lens flares for DAYS. This should look like it belongs in a DJ Mag top 100 feature.`,
  },
  {
    id: "disco",
    name: "Disco Fever",
    emoji: "🪩",
    prompt: `${FACE_PRESERVATION}

MANDATORY HAIR: Give them the most LEGENDARY disco hair ever witnessed - a gravity-defying afro that could house a family of birds OR a feathered Farrah flip that moves in slow motion. The hair should contain at least one hidden disco ball, be dusted with actual glitter, and have a small bird or butterfly that seems to have gotten lost in there. This hair has its own agent.

Scene transformation: Peak Studio 54 excess - a sequined jumpsuit with a neckline that goes to the navel, bell-bottoms so wide they qualify as a fire hazard, platform shoes that add 8 inches of pure confidence, and enough gold chains to set off a metal detector from space. They're mid-move on the light-up floor, one finger pointing to heaven, the other holding a martini that somehow hasn't spilled.

Background: The most legendary disco club that never existed - a disco ball the size of a Volkswagen raining light everywhere, the floor is pure illuminated tiles, there's a live tiger on a leash in the background (very 70s), velvet ropes, silhouettes of dancers doing the hustle, and enough cocaine-era glamour to fuel a documentary. Burt Reynolds is definitely here somewhere.

${STYLE_INSTRUCTIONS} Peak 1970s film grain aesthetic with rich, warm colors. The disco ball reflections should look absolutely real bouncing off every surface.`,
  },
  {
    id: "wildWest",
    name: "Wild West",
    emoji: "🤠",
    prompt: `${FACE_PRESERVATION}

MANDATORY HAT: The most OUTRAGEOUS cowboy hat in the West - we're talking so big it has its own zip code, made of exotic (fake) leather with actual bullet holes telling a story, a rattlesnake hatband where the snake looks like it's judging everyone, a sheriff's badge AND an outlaw star pinned on simultaneously, and possibly smoking slightly from a recent gunfight.

Scene transformation: They're the most legendary outlaw-sheriff-antihero the West has ever seen. A weathered duster coat that's seen some things, a bandolier but instead of bullets it's filled with whiskey shooters, spurs that are comically oversized, and they're dual-wielding - one hand has a pistol, the other has a bottle of whiskey. A wanted poster in frame shows their face with "REWARD: ONE HELL OF A STORY" written on it.

Background: High noon showdown vibes in a town that time forgot - the saloon's swinging doors are mid-swing, a horse at the bar is ordering its usual, tumbleweeds the size of Smart cars roll through, and the MOST dramatic sunset ever painted by nature (or Photoshop). There's a standoff happening but everyone seems chill about it. A clock tower shows exactly 12:00. Someone has graffiti'd "YOLO" on a water tower in old-timey font.

${STYLE_INSTRUCTIONS} Sergio Leone cinematography - that golden, dusty, epic spaghetti western look. Dramatic shadows, lens flare from the setting sun, visible dust particles.`,
  },
  {
    id: "burningMan",
    name: "Burning Man",
    emoji: "🔥",
    prompt: `${FACE_PRESERVATION}

MANDATORY HEADPIECE: The most TRANSCENDENT playa headwear imaginable - could be a towering LED headdress that cycles through sacred geometry patterns, a crown made of found desert objects and fairy lights, elaborate goggles with kaleidoscope lenses pushed up on forehead, or a combination of feathers, chains, and things that definitely came from a vision quest. Dust-covered but make it fashion.

Scene transformation: Peak desert radical self-expression - they're wearing something that's either high fashion or completely insane (or both). Think: iridescent bodysuit with strategic cutouts, faux fur coat despite it being 100 degrees, platform boots caked in playa dust, and body paint/glitter covering any visible skin. They're posed in front of art, mid-moment of pure transcendence - arms possibly raised, expression of absolute presence and joy.

Background: The playa at golden hour/blue hour - massive art installations visible (a giant metal flower, impossible geometric sculptures, something definitely on fire in a controlled way). Art cars rolling by in the distance, one is a giant octopus shooting flames. The Man or Temple visible on the horizon. Other burners in various states of creative expression dot the landscape. Dust storm slightly visible in the distance but vibes are immaculate. Deep playa magic is palpable.

${STYLE_INSTRUCTIONS} That specific golden-hour-on-the-playa magic - dusty atmosphere, warm sunset tones, the way the dust catches the light. This should feel like a moment of genuine magic and self-expression.`,
  },
  {
    id: "space",
    name: "Space Cadet",
    emoji: "🚀",
    prompt: `${FACE_PRESERVATION}

MANDATORY HEADGEAR: A retro-futuristic space helmet situation - think 1960s sci-fi meets actual NASA meets rave. Clear bubble helmet (face fully visible) covered in mission stickers from places that don't exist ("First Mars Rave 2087", "Jupiter's Best Tacos"), a little alien plushie suction-cupped to the outside waving, LED strips around the rim, and maybe some holographic stars floating inside.

Scene transformation: Space but make it fashion - a metallic spacesuit that's giving more "intergalactic disco" than "actual astronaut." Silver and hot pink with unnecessary buckles, patches from imaginary space programs, and a cape (capes in zero-g are impractical but WHO CARES). They're floating with snacks and random objects orbiting around them - a pizza slice, some beer cans, a rubber duck. A space cat in a tiny helmet floats nearby looking completely unbothered.

Background: The most stunning view from orbit - Earth below looking gorgeous, the Milky Way being extra, a UFO photobombing in the corner that might be friendly, Saturn visible just chilling. The space station interior behind them has a "Days Without Incident: 0" sign. There's definitely a disco ball floating somewhere. Someone has duct-taped a plant to the wall and it's thriving.

${STYLE_INSTRUCTIONS} Cinematic as hell - that blue Earth-glow lighting, lens flares, the works. This should look like a still from the best sci-fi comedy never made.`,
  },
  {
    id: "underwater",
    name: "Under the Sea",
    emoji: "🧜",
    prompt: `${FACE_PRESERVATION}

MANDATORY HEADPIECE: The most EXTRA underwater royalty look - a crown made of living bioluminescent coral, jellyfish tentacles cascading down like the most avant-garde hair extensions, pearls and shells woven throughout, a tiny seahorse perched on top acting as their royal advisor. Their natural hair floats ethereally, possibly with some strands that have turned into kelp (in a cool way).

Scene transformation: Full mermaid/merman FANTASY - an iridescent tail in impossible colors that shift from deep purple to electric teal to gold, scales that catch light like a disco ball underwater. Chest covered in artistic shell/pearl arrangement. Arms dripping with sea glass jewelry. They're holding a trident that's definitely also a cocktail accessory. Their expression is "I'm the hot one in this ocean and I know it." A dramatically grumpy pufferfish serves as their reluctant sidekick.

Background: An absolutely UNREAL underwater kingdom - coral castles with rooms you can see into, schools of tropical fish forming a heart shape (they're fans), a treasure chest overflowing with gold AND modern items (is that an iPhone?), an octopus DJ spinning sand dollar records, a shark in the background wearing a tiny bow tie looking fancy. Sunbeams create god-rays. Everything glows slightly. There might be an underwater rave happening in the distance.

${STYLE_INSTRUCTIONS} Ethereal underwater photography magic - beautiful caustics, rich saturated coral colors, that slight blue-green tint. Fantasy but BELIEVABLE fantasy.`,
  },
  {
    id: "eighties",
    name: "80s Aerobics",
    emoji: "💪",
    prompt: `${FACE_PRESERVATION}

MANDATORY HAIR: The ULTIMATE 80s fitness hair - we're talking crimped to the heavens, teased to Jesus, held back by a sweatband that means BUSINESS. The hair should be so voluminous it needs its own zip code, possibly with a scrunchie that's aggressively neon, and DEFINITELY some sweat glistening because this workout is INTENSE. Bonus: a headband that says something like "NO PAIN NO GAIN" or just aggressive geometric shapes.

Scene transformation: Peak Jane Fonda energy - a spandex leotard in the most aggressively clashing neon colors possible (think hot pink and lime green leopard print), matching leg warmers bunched perfectly, high-top Reeboks that have never seen dirt, and wristbands on both wrists because symmetry. They're frozen mid-aerobic move - maybe a high kick that defies physics, or the classic fist-pump. Their expression says "I WILL OUT-CARDIO GOD."

Background: The most 80s home gym/living room combo ever - wood paneling, a tube TV showing a workout VHS (tracking lines visible), a boombox the size of a small child, motivational posters with eagles and sunsets, definitely some shag carpet, fake houseplants, and a mirror wall reflecting the chaos. Other aerobics participants in the background are equally committed to the bit.

${STYLE_INSTRUCTIONS} VHS aesthetic - slightly soft, oversaturated neons, maybe some subtle tracking lines. This should look like a freeze-frame from an actual workout tape that was in everyone's mom's collection.`,
  },
  {
    id: "renaissance",
    name: "Renaissance Faire",
    emoji: "🏰",
    prompt: `${FACE_PRESERVATION}

MANDATORY HEADWEAR: Either a MAGNIFICENT jester hat with three impossibly long floppy points, each ending in a bell that definitely jingles, in clashing purple and gold with diamond patterns and maybe a hidden flask - OR an absolutely ABSURD royal crown that's clearly too heavy, encrusted with gems the size of golf balls, tilted because it's literally too much crown, with a tiny flag on top featuring their own face as the royal crest.

Scene transformation: Full Renaissance faire COMMITMENT - we're talking puffy sleeves you could hide multiple turkey legs in, a velvet doublet or dramatically corseted gown in jewel tones, a ruffled collar so large it's basically a neck satellite dish, and DEFINITELY tights (the tights are non-negotiable). They're holding a comically oversized turkey leg in one hand like a scepter and a goblet that's overflowing with... let's say grape juice... in the other. Their expression says "I am the main character of this entire century."

Background: The most CHAOTIC Renaissance faire moment ever - a jousting match where one knight has hilariously yeeted off their horse, a dragon made of papier-mâché that's actually breathing party streamers, merchants selling "YE OLDE FUNNEL CAKES" and "MEAD (it's just Monster Energy)", someone enthusiastically stuck in the stocks but they're taking selfies about it, a court jester dabbing in the corner, and banners with anachronistic phrases.

${STYLE_INSTRUCTIONS} Rich, painterly lighting like a Renaissance oil painting but photographed - deep shadows, golden hour glow, theatrical drama. Comedy and grandeur.`,
  },
  {
    id: "extremeVacation",
    name: "Extreme Vacation",
    emoji: "🤪",
    prompt: `${FACE_PRESERVATION}

MANDATORY HEADGEAR: The most CHAOTIC vacation headwear - either a helmet covered in GoPros pointing in every direction, a backwards cap with "SEND IT" embroidered, a completely inappropriate hat for the activity they're doing (like a top hat while skydiving), OR their hair is just WRECKED from whatever extreme thing just happened - windswept, possibly on fire slightly, definitely tells a story.

Scene transformation: They're mid-RIDICULOUS vacation activity - maybe they're somehow surfing, skydiving, AND riding a jet ski simultaneously. Wearing a combination of vacation clothes that makes no sense - Hawaiian shirt tucked into a wetsuit, ski goggles with flip-flops, life jacket over a tuxedo. Their expression is somewhere between "this was a terrible idea" and "I've never felt more alive." They're clutching an umbrella drink that has somehow survived the chaos.

Background: An impossible vacation mashup - they're at the beach but also a ski mountain but also a jungle? A volcano is erupting but not in a dangerous way, more festive. A shark is visible but it's wearing a party hat. There's a cruise ship in the distance where something is definitely on fire. A banner being pulled by a plane says "YOLO" or "NO REFUNDS." Other tourists in the background are experiencing various levels of vacation chaos.

${STYLE_INSTRUCTIONS} That action-shot vacation photo energy - slightly motion-blurred background, perfect timing, the "we got THE shot" moment. Bright, saturated travel photography vibes.`,
  },
  {
    id: "custom",
    name: "Custom Scene",
    emoji: "✨",
    prompt: "", // Will be filled in by user
    isCustom: true,
  },
];
