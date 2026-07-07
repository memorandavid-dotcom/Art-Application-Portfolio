import { StyleSection, ArtPiece } from "./types";

export const STYLE_SECTIONS: StyleSection[] = [
  {
    id: "minimalism",
    name: "Minimalism",
    tagline: "The Art of Absence and Pure Void",
    description: "Stripping away all superfluous noise to let space, weight, and canvas texture breathe. A quiet, disciplined exploration of silent form where negative space speaks louder than paint.",
    materialsUsed: ["Raw unprimed linen", "Carbon black gouache", "Natural beeswax binder", "Graphite shavings"],
    keyCharacteristics: ["Extreme negative space", "Subtle line weights", "Textured raw canvas", "Geometric composure"],
    themeColor: {
      primary: "bg-stone-900 hover:bg-stone-800",
      text: "text-stone-900",
      accent: "bg-stone-500",
      lightBg: "bg-stone-50",
      border: "border-stone-200",
      accentBg: "bg-stone-100",
    },
    learningObjectives: "Mastering balance between physical medium and empty void, finding profound weight in silent negative space."
  },
  {
    id: "journey",
    name: "Journey",
    tagline: "A Chronological Pilgrimage of Lifetime Exploration",
    description: "This phase maps our transformation across time and space. Art is not a static object; it is an active trail of sketches, struggles, mistakes, and ultimate breakthroughs. Follow our progression from inception to release.",
    materialsUsed: ["Distressed heavy watercolor paper", "Terracotta pigment paste", "Prussian blue ink wash", "Expedition journals"],
    keyCharacteristics: ["Chronological progression", "Rough process sketches", "Interactive timeline trail", "Earthy topographic contours"],
    themeColor: {
      primary: "bg-amber-700 hover:bg-amber-600",
      text: "text-amber-800",
      accent: "bg-amber-500",
      lightBg: "bg-amber-50/20",
      border: "border-amber-200",
      accentBg: "bg-amber-100/40",
    },
    learningObjectives: "Tracing the evolution of a concept from raw sketch to final canvas, mapping personal growth, and documenting the active physical process of creation."
  },
  {
    id: "museum",
    name: "Museum",
    tagline: "Curated Galleries of Fine Art & Live Motion",
    description: "Step inside a classical, sophisticated museum experience. Styled with gilded frames, brass plaques, and dim spotlit galleries, this exhibition integrates traditional oil painting, sculpture study, and cinematic motion-capture video reels.",
    materialsUsed: ["Heavy oils on panel", "Lapis lazuli glazes", "Ornate gilded gold leafing", "16mm film projections"],
    keyCharacteristics: ["Gilded gold-frame borders", "Spotlit focus planes", "Classic brass museum labels", "Cinematic motion recordings"],
    themeColor: {
      primary: "bg-red-800 hover:bg-red-700",
      text: "text-red-800",
      accent: "bg-yellow-500",
      lightBg: "bg-red-50/10",
      border: "border-red-200",
      accentBg: "bg-red-100/30",
    },
    learningObjectives: "Synthesizing classical visual presentation with modern media, understanding lighting focus, and curation of physical space."
  },
  {
    id: "reflection",
    name: "Reflection",
    tagline: "Syllabus Presentations & Critical Syntheses",
    description: "Evaluating the philosophical frameworks, slide summaries, and interactive materials that anchor our academic exploration. An inspection of cultural impact, student advocacy, and structural reviews.",
    materialsUsed: ["Academic presentation slides", "Interactive document templates", "Critical essays", "Video recordings"],
    keyCharacteristics: ["Academic inquiry", "Syllabus mapping", "Self-reflective analysis", "Interactive slides"],
    themeColor: {
      primary: "bg-stone-800 hover:bg-stone-700",
      text: "text-stone-800",
      accent: "bg-stone-600",
      lightBg: "bg-stone-50",
      border: "border-stone-300",
      accentBg: "bg-stone-100",
    },
    learningObjectives: "Articulating creative themes, evaluating socio-political factors, and defending academic findings through multimedia presentations."
  },
  {
    id: "theater",
    name: "Theater",
    tagline: "Dramatic Storytelling & Stage Magic",
    description: "Immerse yourself in deep velvet drapery, stage lighting, and powerful live-performance memoirs. An exploration of non-verbal narrative, pacing, physical movement, and theatrical wonder.",
    materialsUsed: ["Chiaroscuro stage lights", "Velvet theater drapes", "Live production memoirs", "Performative photography"],
    keyCharacteristics: ["Spotlight central focus", "Rich velvet coloring", "Non-verbal storytelling", "Immersive theatrical sets"],
    themeColor: {
      primary: "bg-red-950 hover:bg-red-900",
      text: "text-yellow-500",
      accent: "bg-yellow-500",
      lightBg: "bg-stone-950",
      border: "border-yellow-500/20",
      accentBg: "bg-red-950/40",
    },
    learningObjectives: "Understanding the mechanics of immersive stage design, chiaroscuro lighting, and capturing transient emotional moments of live performing arts."
  }
];

export const INITIAL_ART_PIECES: ArtPiece[] = [
  {
    id: "minimal_1",
    title: "Defining Minimalism: Simplicity & Restraint",
    style: "minimalism",
    medium: "Sumi ink on handmade mulberry paper",
    imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600",
    reflection: "An exercise in finding the absolute limit of form. Stripping away all extra ornamentation to capture pure, unadulterated space. It is a style that uses the smallest or minimal amount of elements as much as possible, leaving only what matters.",
    emotion: "Absolute Clarity & Restraint",
    date: "October 2025",
    description: "Minimalism is simplicity, setting the limits, avoiding all the extras, and the bare minimum. It is a style that uses the smallest or minimal amount of elements as much as possible, leaving only what matters.",
    analysis: "The composition places a single black horizontal strip of ink on an off-white canvas. The weight of the line creates an anchor, while the surrounding 95% empty void dictates the flow. By using high-contrast black and white, the eye is forced to meditate only on what is present.",
    interpretation: "This piece is about letting go. By removing the clutter of daily worries, noise, and expectations, we are left with the quiet simplicity of the present moment. It mirrors our internal psychological need to clear out the extras to see what genuinely matters.",
    evaluation: "An incredibly successful study in compositional discipline. The clean boundary of the line demonstrates superb physical control of the brush, and the lack of texture ensures that nothing distracts from the core shape.",
    professorCritique: {
      grade: "A",
      formalCritique: "A classic, elegant display of minimalist restraint. Your spatial distribution is impeccable, forcing the viewer to confront the stark weight of the central line.",
      emotionalResonance: "Captures a heavy, quiet focus. The void feels intentional and refreshing rather than empty.",
      creativeSuggestion: "Try using different dilutions of sumi ink to introduce a faint atmospheric gray wash behind the grid.",
      materialsInsight: "Mulberry paper absorbs the ink instantly, meaning every brush stroke is final and requires absolute physical resolve."
    }
  },
  {
    id: "minimal_2",
    title: "Minimalist History: Rejection of Expressionism",
    style: "minimalism",
    medium: "Sculptural graphite study on heavy board",
    imageUrl: "https://images.unsplash.com/photo-1508898578281-774ac4893c0c?auto=format&fit=crop&q=80&w=600",
    reflection: "An exploration of historical minimalist roots. Moving away from the chaotic personal symbolism of Abstract Expressionism towards clean, manufactured geometric shapes influenced by Russian Constructivism.",
    emotion: "Geometric Order",
    date: "November 2025",
    description: "Developed in the late 1950s and early 60s as a reaction against Abstract Expressionism, rejecting personal expression and symbolism in favor of simple geometric forms. Influenced by Russian Constructivism and the work of Marcel Duchamp, Minimalists used industrial materials and factory-like production methods.",
    analysis: "The piece consists of hard-edged graphite rectangles rendered with mathematical precision. By blurring the lines between painting and sculpture, the drawings project an intense physical scale and presence in the room, mirroring Donald Judd's structures.",
    interpretation: "A critique of individualistic emotional overflow. The artwork suggests that by turning to industrial precision and shared geometry, we can find a universal language that doesn't rely on personal ego.",
    evaluation: "The rendering is exceptionally crisp. However, the use of purely hard edges can feel sterile, which is itself a traditional critique of early minimalist movements.",
    professorCritique: {
      grade: "A-",
      formalCritique: "The geometric precision is highly commendable. You have successfully captured the rigid, industrial spirit of Sol LeWitt and Robert Morris.",
      emotionalResonance: "While intellectually stimulating, the emotional tone is distant and cold—which perfectly aligns with your historical prompt.",
      creativeSuggestion: "Consider using an industrial steel ruler to score the board physically, adding a relief element to the drawing.",
      materialsInsight: "The 9H graphite pencil allows for incredibly fine, light-impervious guidelines that do not smear during heavy charcoal applications."
    }
  },
  {
    id: "minimal_3",
    title: "Socio-Political Critique of Minimalism",
    style: "minimalism",
    medium: "Scraped gesso and raw charcoal on linen",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
    reflection: "A visual exploration of the social critiques of minimalism—evaluating it as a symbol of economic privilege that allows some to afford quality over quantity, while ignoring underlying systemic inequality.",
    emotion: "Skepticism & Awareness",
    date: "December 2025",
    description: "Minimalism is a response to consumerism, becoming a symbol of privilege to afford quality over quantity. It promotes sustainability and mindful consumption, but critics say it ignores systemic economic inequality, placing the responsibility solely onto an individual.",
    analysis: "A beautiful, textured white surface of gesso is violently scraped away in sections to reveal the raw, dark linen underneath. The contrast between the clean, pristine surface (symbolizing privileged aesthetic minimalism) and the rough under-layer (representing systemic struggles) is stark.",
    interpretation: "The artwork questions whether the clean 'minimalist lifestyle' is merely a luxury of those who already have abundance. It challenges the viewer to look beneath the polished surface of mindful consumption and recognize those who are left with the bare minimum not by choice, but by circumstance.",
    evaluation: "An excellent conceptual shift. By introducing physical scraping and distress, the piece moves past purely formal minimalism into active social commentary.",
    externalLink: "https://drive.google.com/file/d/1kQC4lqdgxuQzmK1480fiTZeDhepZ4Z0c/view",
    professorCritique: {
      grade: "A+",
      formalCritique: "A powerful, complex execution. The distressed gesso creates a captivating tactile tension that disrupts the typical perfection of the minimalist genre.",
      emotionalResonance: "Deeply resonant. It forces the viewer to think about what is being hidden beneath the clean, curated facade.",
      creativeSuggestion: "Incorporate actual shredded consumer barcodes or receipts into the gesso paste before scraping.",
      materialsInsight: "Raw linen has a natural warm elasticity that contrasts beautifully with the brittle, chalky nature of dried gesso."
    }
  },
  {
    id: "journey_1",
    title: "The Mapúan Journey (Wackiness & Heart)",
    style: "journey",
    medium: "Digital Memory Collage & Graphic Assets",
    imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=600",
    reflection: "Through the bridges I've built and the ones I've let burn, I found myself. This journey—with every lesson learned and every friend gained or lost—has carved out the person I am today. It represents more than just an education; it is a piece of my soul that I will carry forever. This is my Mapúan Heart.",
    emotion: "Nostalgic Resonance & Resolve",
    date: "October 2025",
    description: "A vivid mixed-media collage documenting collegiate life at Mapúa. It captures the chaotic brilliance of late-night study sessions, lifelong friends, student radio broadcasts (Mapúa Radio Cardinal), and the emotional peaks of growing up.",
    analysis: "The artwork utilizes high-contrast warm yellow accents (reminiscent of the Mapúan colors) paired with raw, candid snapshots of student group smiles and college architecture. Text blocks are tilted at dynamic angles to reflect energy, and hand-drawn doodles connect the disparate elements.",
    interpretation: "This represents the dual nature of student life: 'wackiness'—the silly, joyful, unpolished moments of youth—and 'heart'—the heavy, transformational struggles of self-discovery, defining paths, and building the strength to let unproductive bridges burn to move forward.",
    evaluation: "The composition succeeds through its intense emotional honesty. It avoids the polished stiffness of traditional portfolios to embrace the beautiful, chaotic, messy truth of personal development.",
    professorCritique: {
      grade: "A+",
      formalCritique: "The graphic energy here is absolutely infectious. The dynamic placement of sienna tones and yellow lightning vectors creates a wonderful, high-vibrational layout.",
      emotionalResonance: "Unusually warm and honest. Your quote about 'bridges let burn' strikes a profound chord, demonstrating deep personal maturity.",
      creativeSuggestion: "Try using physical textures like scanned notebook pages or actual student ID lanyard pieces to enrich the collage layers.",
      materialsInsight: "Combining high-resolution digital shapes with raw, grainy smartphone photos captures the contemporary student condition perfectly."
    }
  },
  {
    id: "journey_2",
    title: "Whatever You Do at the Crossroads",
    style: "journey",
    medium: "Digital Expressionism on Canvas",
    imageUrl: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=600",
    reflection: "Dedicated to the Minecraft ARG 'Destroying A World That Doesn't Exist' by Crumpet099. It depicts Avery being suited up with armor by the mysterious Derek. Even as Derek remains a mystery, all Avery has is the warm feeling of being protected, driving him onward.",
    emotion: "Protection, Security & Relief",
    date: "November 2025",
    description: "A digital visual analysis study inspired by the narrative of Avery and Derek in a cryptic singleplayer world. Avery's head is tilted back, feeling the sun and breeze, symbolizing freedom and relief as he moves forward into the real world.",
    analysis: "The piece features a striking color palette of warm orange-red sunset tones juxtaposed against a vast, deep Prussian blue sky. A delicate, glowing golden outline traces the protective helmet armor, creating a brilliant, glowing highlight over the organic silhouette.",
    interpretation: "The sunset symbolizes both a sunset (a tragic end in the virtual world) and a sunrise (a warm, hopeful new beginning in the real world). It explores how we are guided, protected, and healed by the memory of those we've lost, urging us to 'Keep going forward.'",
    evaluation: "An outstanding blend of digital brushwork and narrative depth. The glowing outline is perfectly balanced, keeping the focus on Avery's upward expression.",
    professorCritique: {
      grade: "A",
      formalCritique: "The color contrast is breathtaking. Your choice of a highly saturated orange-red silhouette against the cool blue background creates a powerful focal point.",
      emotionalResonance: "There is an exquisite sense of nostalgia and quiet triumph. It feels like emerging from a long, dark cavern into the sunlight.",
      creativeSuggestion: "Try introducing faint, pixelated textures near the borders to pay visual homage to the Minecraft ARG origin of the story.",
      materialsInsight: "Digital brushes mimicking heavy oil layers give a beautiful tactile depth to the sky, adding visual weight to the twilight clouds."
    }
  },
  {
    id: "journey_3",
    title: "The Way of Flowers (Ikebana / Kado)",
    style: "journey",
    medium: "Living Botanical Installation & Raw Wood Bowl",
    imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=600",
    reflection: "Practicing Ikebana has taught me to value the quiet, overlooked spaces in my own life, helping me realize that my moments of stillness are just as important as my moments of productivity. This patience has completely shifted how I see others, allowing me to listen more deeply.",
    emotion: "Stillness & Deep Mindfulness",
    date: "December 2025",
    description: "An exploration of Japanese flower arrangement, known as Kado ('the way of flowers'). It centers on depicting harmony, rhythm, and minimal design, often arranged to represent seasonal changes and a profound connection to nature.",
    analysis: "A single white iris stands elegantly alongside dry, curving willow branches arranged in an asymmetrical, sweeping arc. The elements are grounded in a shallow wooden vessel filled with river stones, creating a beautiful organic rhythm and utilizing extensive negative space.",
    interpretation: "This installation serves as a wordless bridge of intercultural understanding. By focusing on impermanence, respect for nature, and quiet mindfulness, the arrangement communicates deep cultural values that transcend spoken language, building empathy across diverse communities.",
    evaluation: "Brilliant three-dimensional balance. The line weights of the branches are clean and powerful, while the delicate white petals provide a perfect soft counterpoint.",
    cultureStudy: "Title: Intercultural Bridges: Quiet Mindfulness & Asymmetry in Japanese Kado\n\nAbstract:\nThis study explores the botanical discipline of Ikebana (specifically the Sogetsu school) as a practice of mindfulness and non-verbal intercultural communication. By analyzing the physical principles of Shin (heaven), Soe (man), and Hikae (earth), we examine how asymmetric space fosters a unique focus on impermanence (mono no aware) and active listening.\n\nKey Concepts:\n1. Spatial Restraint: In contrast to western floral arrangements which prioritize symmetrical mass, Ikebana utilizes negative space (Ma) to invite the viewer's contemplation. This negative space represents the silent gaps in human relationships that make genuine connections possible.\n2. Three Element Principle:\n   - Shin (Main Branch / Heaven): Reaches upward, symbolizing aspiration.\n   - Soe (Secondary Branch / Man): Placed at an angle, representing humanity's place in nature.\n   - Hikae (Tertiary Branch / Earth): Low and stable, anchoring the composition.\n\nReflection & Intercultural Dialogue:\nAs an international student, arranging flowers is a wordless language. The asymmetric lines form a bridge of empathy that communicates peace and quiet respect, demonstrating that true beauty lies in imperfection and slow, mindful observation.",
    professorCritique: {
      grade: "A+",
      formalCritique: "An absolute masterclass in spatial restraint. Your branches carve beautiful, dynamic lines through the gallery space, creating a mesmerizing physical rhythm.",
      emotionalResonance: "Deeply meditative. Standing before this arrangement forces a sudden, calming deceleration—a rare feat in contemporary art exhibitions.",
      creativeSuggestion: "Document the lifecycle of the iris over sixteen days through a daily photographic grid to emphasize the theme of impermanence.",
      materialsInsight: "Using real botanical materials introduces time and biological decay as active mediums, adding a profound layer of depth."
    }
  },
  {
    id: "museum_1",
    title: "The Acropolis Museum Exhibit: Classical Grace",
    style: "museum",
    medium: "Oil on canvas in gilded neoclassical frame",
    imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=600",
    reflection: "A neoclassical gallery showcase that host historical masterworks, combining traditional oil glazing with rich museum framing. It pays homage to the ancient architectures and classical proportion systems.",
    emotion: "Reverence & Grandeur",
    date: "December 2025",
    description: "A neoclassical oil study inspired by classical gallery layouts. It features glowing golden light reflecting off classical sculptural forms, presented in a heavy double-gilded frame to bridge historic grandeur with digital preservation.",
    analysis: "Masterful chiaroscuro lighting. Strong warm spotlighting from the upper-left illuminates the soft curves of the subject, leaving the rest of the canvas to recede into deep, warm shadow, creating a dramatic focal plane.",
    interpretation: "A reflection on history and preservation. The piece suggests that in our fast-paced modern world, the heavy, silent, and glowing galleries of our ancestors offer an essential anchor for reflection and spiritual centering.",
    evaluation: "The glazing is flawless, creating a stunning porcelain-like glow. The ornate frame perfectly elevates the physical presence of the canvas.",
    professorCritique: {
      grade: "A+",
      formalCritique: "The application of warm amber under-glazes is stellar. Your light handling mirrors the techniques of Caravaggio and the neoclassical masters.",
      emotionalResonance: "Evokes an intense, quiet majesty. It feels like standing in a sacred cathedral at dusk.",
      creativeSuggestion: "Try mixing real lapis lazuli pigment into your final oil glaze to achieve an authentic historical blue tone.",
      materialsInsight: "Walnut paneling provides an ultra-stable base that permits dozens of translucent glaze layers without the risk of canvas sagging."
    }
  },
  {
    id: "museum_2",
    title: "Living Stillness (Ikebana Exhibition)",
    style: "museum",
    medium: "Botanical arrangement on marble pedestal",
    imageUrl: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=600",
    reflection: "A physical exhibition of the Japanese Way of Flowers. Placed inside a neoclassical museum gallery, this live sculpture brings the silent, organic energy of Kado into direct dialogue with classical stone architecture.",
    emotion: "Harmony & Connection",
    date: "December 2025",
    description: "A gallery installation combining living willow branches, a seasonal winter iris, and smooth black river pebbles in a heavy bronze tray. Spotlit by a narrow ceiling projector in a dark, silent exhibition room.",
    analysis: "The spotlight creates stark, poetic shadows of the branches on the gallery wall behind it, turning the static sculpture into a multi-dimensional light installation that changes with the viewer's position.",
    interpretation: "The contrast between the warm, living flowers and the cold, eternal museum marble highlights the beauty of transient life. It suggests that our temporary journeys are illuminated by the permanent structures of history and art.",
    evaluation: "Excellent integration of lighting. The shadow play on the background wall effectively doubles the spatial impact of the arrangement.",
    professorCritique: {
      grade: "A",
      formalCritique: "A very successful curation of spatial volume. The shadow outline is just as compelling as the physical installation itself.",
      emotionalResonance: "Creates a profound island of peace. It acts as an active breathing space within the busy gallery layout.",
      creativeSuggestion: "Project a soft, ambient nature recording to accompany the physical installation to engage multiple senses.",
      materialsInsight: "Bronze ages with a beautiful, natural dark patina that perfectly matches the earthy, minimalist tone of the branches."
    }
  },
  {
    id: "museum_3",
    title: "Interactive Memory: The Mapúan Wall",
    style: "museum",
    medium: "Digital projection & cinematic recording loop",
    imageUrl: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&q=80&w=600",
    reflection: "Bringing the raw, chaotic energy of 'The Mapúan Experience' into the grand museum gallery through a high-definition video loop. It bridges physical memories with classical curation.",
    emotion: "Dynamic Wonder",
    date: "December 2025",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-paint-swirling-in-water-43306-large.mp4",
    isVideo: true,
    description: "A digital cinematic installation projected onto a textured plaster wall inside a dark gilded gallery. The looping video showcases fluid crimson and golden paint swirling in suspension, mirroring the collegiate colors and expressive vitality of our journey.",
    analysis: "The motion loop features smooth, high-frame-rate transitions. Projected at a grand scale, the swirling colors create a hypnotic, ambient light source that actively colors the surrounding gallery room and gilded gold frames.",
    interpretation: "A fusion of the personal with the classical. By presenting our messy, personal memories through the medium of pure flowing color inside a prestigious museum space, we validate the student experience as high art.",
    evaluation: "The fluid motion is beautifully captured, and the project scale is perfect, transforming the physical room into an immersive color-therapy capsule.",
    professorCritique: {
      grade: "A+",
      formalCritique: "A groundbreaking synthesis of technology and traditional curation. The reflection of the video on the gold leaf of the surrounding frames is brilliant.",
      emotionalResonance: "Hypnotic, energetic, yet calming. It is impossible to look away from the organic ebb and flow of the pigments.",
      creativeSuggestion: "Experiment with mapping the projection precisely to the contours of an empty gilded frame on the wall.",
      materialsInsight: "Digital light projection operates without the physical limits of canvas, creating a purely luminous and interactive experience."
    }
  },
  {
    id: "museum_4",
    title: "Arts, Humanities, and Economic Utility",
    style: "museum",
    medium: "Academic Critical Essay Submission",
    imageUrl: "",
    reflection: "This paper serves as an inquiry into the non-economic dimensions of arts and humanities education, challenging the prevailing neoliberal metrics that attempt to measure the value of culture purely through financial profitability.",
    emotion: "Intellectual Resolve & Advocacy",
    date: "December 2025",
    description: "A comprehensive critical essay examining how the arts and humanities provide essential noneconomic benefits, such as critical inquiry, historical consciousness, and democratic empathy, advocating for a broader definition of educational utility.",
    analysis: "The argument is structured around three core pillars:\n1. The Fallacy of Instrumentalism: Reaffirming that art's worth cannot be captured in currency.\n2. Human Capital vs. Human Values: Detailing how qualitative learning fosters resilience and cross-cultural dialogue.\n3. A Plea to Decision Makers: Arguing that funding cultural infrastructure is an investment in societal health.",
    interpretation: "Arts, Humanities, and Economic Utility\n\nThe economic utility of the arts is a common defense, yet measuring creative disciplines solely through the lens of financial profitability misses their true intrinsic value. The arts and humanities foster critical thinking, historical perspective, self-reflection, and cultural empathy—qualities that cannot be quantified in a corporate ledger.\n\nIndeed, the reduction of human expression to market output undercuts the foundation of liberal arts education. By forcing academic institutions to justify themselves through direct financial feedback loops, we risk starving the very projects that cultivate democratic maturity and individual enlightenment.\n\nThe article serves as a plea to those who hold the purse-strings to see beyond the financial bottom line. True educational excellence lies in fostering a deep appreciation of beauty, expression, and humanistic inquiry, which collectively enrich the societal soul.",
    evaluation: "An incredibly articulate and cogent defense of the humanities. The prose is elegant, persuasive, and supported by robust educational theory, making a vital plea for institutional support.",
    professorCritique: {
      grade: "A+",
      formalCritique: "An exceptionally well-written and passionately argued paper. Your defense of the noneconomic utility of the humanities is both timely and intellectually rigorous.",
      emotionalResonance: "Instills a powerful sense of purpose and intellectual dignity, urging the reader to defend cultural spaces.",
      creativeSuggestion: "Consider adapting this written work into a series of spoken-word recordings or interactive audio guides placed throughout the gallery space.",
      materialsInsight: "Written language acts as a highly refined conceptual medium, carving out mental spaces and challenging institutional power with absolute clarity."
    }
  }
];
