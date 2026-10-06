// Gig section imagery plan - 11 gigs x 3 shots = 33 images.
// Shared source of truth for scripts/fetch-gig-images.mjs (Pollinations download
// + watermark crop) and for the `gig-*` entries in src/data/images.ts scenarioRefs.
//
// Rules encoded here (user brief + standing project rules):
//   - Subject: the GEAR IN ACTION being tested - camera in hands, LCD being
//     reviewed, flash/drone/lighting being set up. Not the job's subject matter.
//   - Exactly ONE person, a Malaysian woman content creator, behind the scenes.
//     NO groups / crowds ("no people gathered together" is a permanent rule).
//   - No text, no signage, no watermark, no logos, no cars.
//   - Documentary/photographic look, sharp focus - deliberately NOT glossy
//     studio stock, which is what read as "mass AI content" before.

const STYLE =
  ', behind the scenes, one single Malaysian woman content creator, ' +
  'documentary photojournalistic photograph, natural daylight, sharp focus, ' +
  'fine detail, realistic skin texture, 35mm lens, shallow depth of field, ' +
  'no text, no signage, no watermark, no logo, no crowd, ' +
  'no group of people, no car';

const shots = (key, prompts) =>
  prompts.map((prompt, i) => ({
    key,
    file: `${key}-${i + 1}.jpg`,
    prompt: prompt + STYLE,
    seed: 9100 + key.length * 37 + i * 11,
  }));

export const gigImages = [
  ...shots('gig-graduation', [
    'a young woman photographer holding a black DSLR camera and reviewing a photo on its rear screen on an empty university lawn, a tripod standing beside her, tropical campus buildings behind',
    'setting up a camera on a tripod under a university colonnade and adjusting the lens barrel, empty walkway, morning light',
    'carrying a camera with a long lens over one shoulder and a folded light stand across a campus courtyard at golden hour',
  ]),
  ...shots('gig-gala', [
    'testing a speedlight flash unit mounted on top of a camera in an empty banquet hall with round dinner tables and warm chandeliers',
    'adjusting camera settings and a wireless flash trigger with a dark event hall and string lights behind her',
    'checking a photo on the camera screen beside a tripod and a softbox in an empty gala ballroom',
  ]),
  ...shots('gig-portrait', [
    'holding a mirrorless camera and reviewing shots on its screen in a home studio with a large softbox and a reflector',
    'adjusting a 50mm prime lens on a camera mounted on a tripod facing a plain paper backdrop',
    'looking through the viewfinder of a camera on a tripod next to a light stand by a bright window',
  ]),
  ...shots('gig-wedding', [
    'crouching to check a camera rear screen on a hotel corridor floor with a second lens and memory cards laid out beside her',
    'testing a camera fitted with a large aperture prime lens in an empty church interior, one person, quiet light',
    'packing a camera body into a padded bag with lenses and batteries arranged on a bed',
  ]),
  ...shots('gig-video', [
    'operating a camera on a tripod rigged with an external monitor and a shotgun microphone in a small studio',
    'plugging a shotgun microphone into a camera cage rig, laptop and cables on the desk beside her',
    'balancing a gimbal-mounted camera with both hands on a wooden studio floor',
  ]),
  ...shots('gig-product', [
    'photographing a small product on a tabletop with a camera on a tripod, two softbox lights and a white sweep background',
    'leaning in to focus a macro lens on a wristwatch resting on a lit tabletop, studio lighting',
    'reviewing a product photo on the camera screen with a light panel and the product on a turntable',
  ]),
  ...shots('gig-realestate', [
    'holding a drone remote controller with a built-in screen and looking up at a quadcopter hovering outside a modern house',
    'a wide-angle lens and a camera gimbal resting on a windowsill overlooking an empty bright room interior',
    'calibrating a small drone on a landing pad on an apartment balcony, city view behind',
  ]),
  ...shots('gig-food', [
    'photographing a plate of food from directly above using a camera mounted on an overhead arm with a softbox, wooden table below',
    'adjusting a camera on a tripod angled down at a styled dish with props arranged around it',
    'reviewing a food photo on the camera screen beside a finished plate and a small LED light',
  ]),
  ...shots('gig-corporate', [
    'testing a camera fitted with a telephoto lens in an empty conference room with rows of chairs',
    'setting up a camera on a tripod at the back of a seminar hall, projector screen switched off',
    'checking a flash unit and light meter in a corporate lobby with glass walls and polished floor',
  ]),
  ...shots('gig-photobooth', [
    'assembling a photo booth rig, camera on a stand with a ring light and a small printer on a table in an empty event space',
    'adjusting a ring light and the camera aimed at a plain fabric backdrop',
    'testing a camera shutter trigger wired to a laptop on a table in front of a backdrop',
  ]),
  ...shots('gig-drone', [
    'holding a drone controller with both hands and looking up at a small quadcopter in a clear sky above an open field',
    'launching a compact drone from an open palm in a leafy park',
    'inspecting drone propeller blades with the controller and carrying case open on a wooden bench',
  ]),

  // The four extra topics /curate mixes into the same wall. They were Unsplash
  // stock too, and they double as scenarios on several gear review pages, so
  // they get the same gear-in-action treatment.
  ...shots('iphone-window-light', [
    'a young woman filming a vertical video on a smartphone clamped to a small tripod beside a bright window, tapping the phone screen',
    'holding a smartphone at arm length to check framing in front of a large window, the phone clearly visible',
    'clamping a smartphone into a tripod mount on a windowsill, soft daylight from outside',
  ]),
  ...shots('desk-setup-ring-light', [
    'adjusting a ring light on a desk beside a phone mount and a small condenser microphone, home creator workspace',
    'sitting at a creator desk testing a ring light in front of a laptop with a camera on a tripod',
    'plugging in a small LED panel light on a creator desk crowded with a microphone and phone mount',
  ]),
  ...shots('drone-aerial-malaysia', [
    'launching a compact drone from an open palm above a green tropical paddy field',
    'holding a drone controller with a screen and looking up at a quadcopter in the sky over a tropical city',
    'crouching to power on a folded drone resting on a grassy hill, controller on the ground beside it',
  ]),
  ...shots('beauty-review-setup', [
    'aiming a camera on a small tripod at cosmetics arranged on a table lit by a softbox, beauty review setup',
    'adjusting a softbox light over a makeup flat-lay being filmed by a camera on a stand',
    'checking the camera screen while filming a lipstick and skincare arrangement on a pale table',
  ]),
];
