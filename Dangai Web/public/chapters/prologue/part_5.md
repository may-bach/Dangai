
# PART-5

<p class="centered">He starts the engine and rides towards the center of the city.</p>

<p class="centered">He takes his phone out and calls Kenji.</p>

**Izumi:** Kenji, where are you?

**Kenji:** I'm waiting for the elevator in the lobby, is my motorcycle oka-

**Izumi:** Get on your setup right now.

**Kenji:** Excuse me, I just reached home dude.

**Izumi:** Kenji.

<p class="centered">He notices the seriousness in his voice and knows that something is wrong.</p>

<p class="centered">The single word carried enough weight.</p>

**Kenji:** Alright.

<p class="centered">He takes the elevator up and sprints down the hall to his room.</p>

<p class="centered">Without removing his shoes, he darts past the living room and kitchen into his bedroom.</p>

<p class="centered">A soft mechanical whir. The full-length mirror rotated on silent hinges, revealing the hidden room beyond: walls lined with matte black panels, four curved monitors flickering to life, neon underglow pulsing with a blue hue. Kenji dropped into the ergonomic chair, fingers already dancing across three keyboards at once. The main screen flashed the Haya Enterprises logo, his father’s company, before dissolving into his custom OS, a sleek black and cyan interface built for speed and secrecy.</p>

<p class="centered">Kenji exhaled, voice steady now.</p>

**Kenji:** What's the situation?

**Izumi:** I sent you a number, it belongs to a girl I pawned off some work to. Now she's in trouble, kidnapped most likely. I want you to-

**Kenji:** To find her location. On it.

<p class="centered">Kenji’s eyes narrowed at the second monitor.</p>

<p class="centered">He reverse image searches her profile picture to find her Instagram.</p>

**Kenji:** (And… there. Benefits of having access to every student’s metadata. Dad’s clearance opens doors most people don’t even know exist.)

<p class="centered">Her latest story: outside a neon-lit storefront, the sign reading “Pixel Vault – Video Games Club HQ.” Timestamp: three hours ago.</p>

<p class="centered">He goes over the company’s database to figure out where it is.</p>

**Kenji:** The last story she posted was outside a video games store, in the eastern part of the central district. It belongs to the Video Games Club.

<p class="centered">Izumi’s jaw tightened. The throttle twisted further; the engine roared in response. If anything happened to them because he’d treated the fest like a joke… it was on him. All of it.</p>

<p class="centered">He twisted the throttle harder, the bike surging forward down the empty highway. Private beaches lit like daytime even at dusk could be seen in the distance. The city never slept, and right now neither could he.</p>

<p class="centered">Kenji’s fingers blurred across the main keyboard.</p>

**Kenji:** Going deeper. Pulling SOS timestamp from the messaging backend… checking the campus mesh logs with a privileged TDoA query.

<p class="centered">The third monitor bloomed with a heatmap overlay—cell towers, WiFi nodes, edge points glowing in shifting gradients.</p>

**Kenji:** Got it. When she sent the text, it pinged five nearby towers. Timing how long the signal took to reach each one, and cross-checking the last WiFi networks her phone saw… exact coords: 34.6892 N, 135.5021 E. It's an office tower in the eastern sector.

---

<p class="centered">Kenji’s Notes: Imagine your phone is like a radio station sending out a signal. When she sent the SOS text, that signal reached five different towers at slightly different times, because some towers are farther away.</p>

<p class="centered">By measuring those tiny time differences, that’s TDoA = Time Difference of Arrival, we can draw invisible circles around each tower and find the one spot where all the circles overlap, that’s where the phone was.</p>

<p class="centered">Then we double-check it with the WiFi fingerprint which is the unique list of nearby WiFi networks her phone saw right before the text. Every spot on campus has a different WiFi pattern, so it confirms the exact location.</p>

<p class="centered">Basically: phone pings towers -> time differences give rough GPS -> WiFi scan nails it down. That’s how I got the coords so fast.</p>

<p class="centered">And that’s how you track someone down with just a message and a phone number, and a bit of help from data belonging to a billion dollar company. Cool trick, right? Now quit reading my notes and get back to the chase.</p>

---

<p class="centered">Izumi was already banking toward the eastern sector, wind whipping past, but something itched at the back of his mind. Aoki’s voice from earlier echoed…</p>

**Aoki:** We’ve even had to pull emergency power from a part of the eastern city sector just to keep the construction cranes moving and light up every stage and stall. When was the last time the city committee was willing to evacuate buildings for an event?

**Izumi:** Wait, Kenji, something’s off. That tower should probably be empty. No one should’ve been inside since the reroute. If they’re really there, the cams would show something. Check them.

**Kenji:** Pulling security overlay—drone and edge feeds. Perimeter cams first.

<p class="centered">Kenji goes over the security camera footage around the sector.</p>

**Kenji:** What?!

**Izumi:** What do you see?

**Kenji:** Most perimeter cams are blocked or broken—someone’s been using this place as a hideout. But the hidden ones Dad doesn’t even tell the university about… they’re still live. They’re experienced, but not enough. My dad would never leave a place without at least one pair of eyes looking over them.

<p class="centered">He taps into the hidden cameras in the area.</p>

**Kenji:** I see someone two hours ago, a couple of students wearing masks. They’re carrying five girls.

<p class="centered">He runs a facial check.</p>

**Kenji:** Facial recognition confirms it, one of them is the girl.

**Izumi:** What about the perpetrators?

**Kenji:** Ah, I can't get a confirmation. They’re good at hiding their faces I’ll give them that.

<p class="centered">Izumi throttles to the underbridge which has exits only at the eastern and western sectors as opposed to the overbridge which only has exits at northern and southern sectors.</p>

<p class="centered">Kenji skims through the footage hoping to catch a glimpse of a face but he finds something much more disturbing as he approaches the time of the message.</p>

**Kenji:** Izumi... WAIT.

<p class="centered">Right before he enters the underbridge he hits the brakes, burning the front tyre on the asphalt.</p>

**Izumi:** What?

**Kenji:** One hour ago, a group of people exit the building with the girls.

**Izumi:** WHAT?

**Kenji:** So the message couldn’t have been sent from there.

**Izumi:** Which means the coords are bullshit. Someone spoofed the ping.

**Kenji:** Confirmed. Timestamps are off by microseconds—node injection. They faked the TDoA trail to point us at the tower. Clever, but not perfect.

**Izumi:** Trace it back.

**Kenji:** Probing the injection source… they’re pushing back—flooding my session with junk packets. They’re trying to mirror my query. These guys are not playing around. This is some serious shit.

<p class="centered">Izumi formed a fist as he tightened his hand.</p>

**Izumi:** Beat them.

<p class="centered">Kenji grins. That was all he needed to hear.</p>

**Kenji:** Already rerouting through a secure relay... there. Their spoof leaked a real node ID. Cross-ref with raw mesh pings… got it.

<p class="centered">The fourth monitor zoomed in on a new heatmap.</p>

**Kenji:** They’re closer than expected. Real location: abandoned power room, the tunnels out of the eastern sector towards the power sector, located in between the southern and eastern sectors. Old out-of-service feed line from the city core to the main grid station. Dark zone. No active surveillance, no power draw. That’s where they are.

<p class="centered">Izumi smiles and twists the throttle again, turning his motorcycle, ditching the underbridge and heading off road straight to the tunnel.</p>

**Izumi:** This motorcycle has the built-in off-road mode, right?

**Kenji:** Yeah, it does... WAIT, THAT DOESN’T MEAN YOU SHOULD USE IT. THAT’S STILL BEING TESTED.

**Izumi:** Come on, there are lives on the line.

**Kenji:** Arghh, fine.

**Kenji:** You’ve got about ten minutes if you push it. I’ll keep the mesh quiet on our end. I’ll call you if I get anything new. All the best.

**Izumi:** Also, send a couple ambulances as well.

**Kenji:** Got it.

**Izumi:** Thank you Kenji.

<p class="centered">Izumi cuts the call and smiles, as he twists the throttle again, veering through the grass and dirt toward the tunnel access. The bike’s suspension groaned as off-road mode engaged, tires thickening, engine screaming in protest. He ignored it, as the city lights faded behind him.</p>

<p class="centered">Kenji leans back in his chair stretching his hands behind his head, but brings his attention back to the monitors.</p>

**Kenji:** (Whoever that was, they were not new to cyber attacks, there is no way any student can go toe to toe with me. Which means whoever that was is either really talented or from outside this university.)

<p class="centered">He looks up with his hands behind his head, staring at the ceiling.</p>

**Kenji:** (What trouble have you gotten yourself into now Izumi.)

<p class="centered">Ten minutes pass.</p>

<p class="centered">Izumi drifts his bike and parks it outside the abandoned tunnel with power cables long out of use.</p>

<p class="centered">He stretches and enters the tunnel by the pathway on the side inside the tunnel for staff.</p>

<p class="centered">He runs for some time moving stray cables out of his way, then he hears something and slows down as he gets deeper into the tunnel.</p>

<p class="centered">After examining the area he sees the door to the power room not too far off.</p>

<p class="centered">He crouches next to the door and puts his ear next to the door.</p>

<p class="centered">He could hear the faint breath of a couple people inside.</p>

<p class="centered">Filled with rage and excitement, he kicks the door wide open.</p>

<p class="centered">He sees the five girls tied to a pole with their hands and legs.</p>

**Girl:** MMMFFFFHH.

<p class="centered">A girl shouts with a handkerchief in her mouth.</p>

<p class="centered">With no enemies in sight he walks over to her and undoes the muffle.</p>

**Girl:** AHH, AHH.

<p class="centered">She exhales deeply finally getting a breath of fresh air.</p>

<p class="centered">He quickly unties her from the pole, then moves fast to free the other four—two conscious, two unconscious.</p>

<p class="centered">The three conscious girls run into his arms crying.</p>

<p class="centered">He steadied them, quietly assuring them they were safe now.</p>

<p class="centered">Then he looks at one of the three conscious ones who happens to be the girl who he tracked.</p>

**Izumi:** What happened?

**Girl A:** It was about 10 guys, *exhales* They were wearing masks.

<p class="centered">He signals her to slow down.</p>

**Izumi:** It’s fine, you’re safe now.

**Izumi:** (But why would anyone do this.)

<p class="centered">The ambulance sirens fill the place as paramedics rush in.</p>

**Paramedic A:** Check for any other injured people in the vicinity.

<p class="centered">One of them walks up to Izumi.</p>

**Paramedic B:** Are you ok?

**Izumi:** *nods* Yeah, I’m fine, just get the girls they’re hurt.

<p class="centered">The paramedic gives him an affirming nod and takes them into the ambulance.</p>

<p class="centered">The police arrive soon after and rush towards Izumi with a sense of urgency.</p>

**Izumi:** Hey, don’t worry, I took care of the situation, unfortunately no bad guys to interrogate.

<p class="centered">They surround him as one of them tries to cuff him.</p>

**Izumi:** YO, WHAT ARE YOU DOING?

**Police A:** You are completely unharmed at the crime scene with no perpetrators and expect us to believe you’re not a suspect.

<p class="centered">As Izumi was about to have an outburst a more senior officer arrives.</p>

**Senior Officer:** Let him go.

**Police A:** What? Why?

<p class="centered">The Senior Officer sighs; folding his hands.</p>

**Senior Officer:** That’s Kurosaki Izumi.

**Police A:** What? This guy is?

<p class="centered">He says doubtfully looking towards an irritable Izumi.</p>

<p class="centered">He hesitantly lets go of him as Izumi fixes his sleeves and pulls his eyelid down with his middle finger while looking at the officer; sticking his tongue out.</p>

<p class="centered">The officer gets mad and tries to tackle him again but the senior officer holds him back.</p>

**Senior Officer:** Just let him go, it’s not worth it.

<p class="centered">The officer walks away in defeat as the senior one turns toward Izumi.</p>

**Senior Officer:** When are you gonna stop giving me trouble.

**Izumi:** Come on, Mr. Tsuruga. You oversee a district full of university students. This is probably the most entertainment you get.

<p class="centered">Tsuruga sighs as he walks away.</p>

**Tsuruga:** This is still a crime scene, I’m going to need you to leave before you contaminate the evidence further.

<p class="centered">Izumi shrugs his shoulders as he pockets his hands and walks away.</p>

<p class="centered">He gets outside and onto Kenji’s motorcycle.</p>

<p class="centered">He starts the engine, reaches his apartment complex, parks the motorcycle and gets on the elevator to his floor as he slowly walks to his suite.</p>

<p class="centered">He takes his shoes off followed by his socks and moves slowly through his house.</p>

<p class="centered">He takes a bath and lies down on his bed, looking up at the ceiling with his hand supporting his head, lost in thought the entire time.</p>

**Izumi:** (None of the girls were probably with each other. Which means whoever kidnapped them specifically wanted those five girls. And the only thing common between all of them most likely is... The only thing they had in common… was me.)

<p class="centered">His thoughts weighed heavily on him, making his eyes close slowly.</p>

**Izumi:** (So that means whoever kidnapped them only did so to get to me. They didn’t harm them in any way and gave no physical resistance either as the place was empty except for the girls. That means this was most likely a warning. Which would mean that if any harm were to befall them... it would’ve been on me.)

<p class="centered">He tightened his grip as he covered his eyes with his hand, exhaling deeply as he fell asleep.</p>

**Izumi:** (How annoying...)

---

<p style="text-align: right;">-To be continued</p>
```
