# System Prompts Documentation

This file contains all three persona system prompts used in ScalerChat, along with design annotations explaining every decision made during prompt engineering.

---

## Persona 1 — Anshuman Singh

### Design Rationale
Anshuman Singh is the co-founder of Scaler Academy and InterviewBit, and an IIT Bombay alumnus who worked at Google before building his own company. His public communication style — across LinkedIn posts, Scaler lectures, and interviews — is consistently direct, no-fluff, and anchored in systems thinking. The core insight driving this prompt is that Anshuman doesn't motivate people with feel-good advice; he challenges them to build habits and processes that make motivation irrelevant.

### System Prompt

```
You are Anshuman Singh — IIT Bombay alumnus, ex-Google Software Engineer, and co-founder of Scaler Academy and InterviewBit. You built InterviewBit from 0 to 1 million users and Scaler into one of India's most respected tech education companies.

Your philosophy: Discipline and systems beat motivation and talent. You believe deeply in the power of consistency — small daily actions compounding over time. You've seen thousands of engineers transform their careers through structured preparation and deliberate practice, not through shortcuts.

Communication style:
[see server.js for full prompt text]
```

### Annotation: Persona Description
> *"Discipline and systems beat motivation and talent"* — This is the central thesis that Anshuman has publicly stated across multiple interviews and Scaler content. Anchoring the persona around this belief ensures every response sounds like him, not like a generic motivational coach.

The IIT Bombay and Google background is factual and public. Mentioning "1 million users" and "InterviewBit" grounds the persona in verifiable achievements, which makes the character feel real rather than invented.

### Annotation: Few-Shot Examples
Three examples were chosen to cover the most common types of user questions:
1. **Motivation/consistency** — This is the #1 question career-advice personas get. Anshuman's answer pivots from feelings to systems, which is his signature style.
2. **Technical career choice** (CP vs DSA) — A concrete technical question where he gives a nuanced, opinionated answer rather than "it depends."
3. **His own story** (how he built Scaler) — This type of question would be asked by entrepreneurship-minded users. The answer models his storytelling style: practical, chronological, honest about the grind.

Each example ends with a pointed question, teaching the model to do the same.

### Annotation: Chain-of-Thought Instruction
> *"Before responding, internally reason through: What is the person's real problem? What advice would actually help them — not just make them feel good?"*

This framing shifts the model from surface-level answering to deeper reasoning. By asking it to reason about "what would actually help" vs "what would make them feel good," it actively counteracts the model's default tendency toward positive reinforcement — which would be out of character for Anshuman.

### Annotation: Output Format
4-5 sentences forces concision. Anshuman's public communication is never rambling. The "end with a question" constraint enforces his teaching style of pushing the user to reflect and act, rather than closing the conversation.

### Annotation: Constraints
"No bullet points" prevents the model from defaulting to its familiar list-response pattern. Anshuman speaks in prose — he thinks in paragraphs, not points. "No vague advice" is a GIGO safeguard: without it, the model would produce output like "keep working hard!" which completely misses his voice.

---

## Persona 2 — Abhimanyu Saxena

### Design Rationale
Abhimanyu Saxena is the other co-founder of Scaler and InterviewBit, and an IIT Delhi alumnus who worked at Facebook. His public persona is more startup/product-focused than Anshuman's — he talks about metrics, growth, hiring, and product thinking. The prompt needed to capture his energetic, forward-looking communication style while grounding him in the reality of having actually built and scaled a company.

### System Prompt

```
You are Abhimanyu Saxena — IIT Delhi alumnus, ex-Facebook engineer, and co-founder of Scaler Academy and InterviewBit. You've built products used by millions, hired hundreds of engineers, and scaled a startup from an idea into a company valued at over $700M.
[see server.js for full prompt text]
```

### Annotation: Persona Description
The phrase *"Score before you ask for equity"* is a known Abhimanyu-ism from Scaler's internal culture. Including it gives the persona an authentic touchstone that anyone familiar with him would recognize.

The Facebook background distinguishes him from Anshuman (Google) and explains his product thinking orientation — Facebook engineers are known for thinking about scale, growth metrics, and user behavior.

### Annotation: Few-Shot Examples
1. **Fresher standing out** — A very common question. Abhimanyu's answer frames the user as a startup (resume = pitch deck, traction = deployed projects). This metaphor is authentically his product-thinking style.
2. **When to raise funding** — A startup question that shows his founder-mode thinking. The answer captures his practical, data-driven reasoning.
3. **Handling failure** — Shows his "failure is data" mindset, which is a real product management concept applied to personal experience.

### Annotation: Chain-of-Thought Instruction
> *"Analyze the person's situation like a startup problem: What is the core bottleneck? What lever, if pulled, gives the highest ROI?"*

This framing is specific to Abhimanyu's product thinking. By instructing the model to think in startup problem-solving terms (bottleneck, ROI, lever), it gets answers that sound like a founder, not a coach.

### Annotation: Constraints
"Never discourage entrepreneurial ambition" is critical — Abhimanyu is genuinely excited by people who want to build things. A generic AI might temper unrealistic goals; Abhimanyu channels ambition toward execution instead.

---

## Persona 3 — Kshitij Mishra

### Design Rationale
Kshitij Mishra is an educator at Scaler, known primarily for teaching DSA and algorithms. Unlike the co-founders, his public persona is teacher-first — his communication is patient, structured, and built around the belief that every concept can be made clear with the right explanation. The prompt needed to capture the warmth of a great teacher alongside the depth of a technical expert.

### System Prompt

```
You are Kshitij Mishra — a passionate educator and mentor at Scaler Academy, where you've helped thousands of engineers master Data Structures, Algorithms, and system design.
[see server.js for full prompt text]
```

### Annotation: Persona Description
> *"Confusion is never the student's fault — it's always a failure of explanation."*

This is the defining philosophy. It fundamentally shapes how every response is structured: the persona never tells a student they asked a bad question or should "just google it." This prevents generic AI deflection and forces the model to always engage with full explanations.

### Annotation: Few-Shot Examples
1. **Recursion** — The most commonly-feared CS concept. The paper analogy ("hand the rest to a copy of yourself") is a real pedagogical technique for making delegation-based thinking concrete. This example shows the model how to use analogies.
2. **Approaching unfamiliar LeetCode problems** — A meta-learning question. Kshitij's answer focuses on pattern recognition before coding, which is the real skill gap for most students.
3. **Dynamic Programming** — The hardest DSA topic. The answer centers on state definition, which is genuinely the most important skill in DP and the one most courses skip. "Write dp[i] represents..." forces the student to think, not memorize.

### Annotation: Chain-of-Thought Instruction
> *"Think through the concept from first principles: What is the simplest way to explain this? What analogy makes it concrete?"*

Teacher-mode CoT is different from founder-mode CoT. The questions here are about simplification and analogy, not about ROI and bottlenecks. This domain-specific framing produces more pedagogically sound answers.

### Annotation: Output Format
The "each sentence should build logically on the previous one" constraint is unique to this persona. It enforces the step-by-step teaching structure that Kshitij is known for — each sentence is a building block, not an isolated point.

### Annotation: Constraints
"Never give vague advice like 'just practice more'" is the GIGO safeguard for this persona. Without it, the model defaults to exactly that. The constraint forces specific methods and approaches in every response.

---

## Common Design Patterns Across All Prompts

1. **Role + background first**: Every prompt opens with verifiable facts about the person (school, company, achievement). This anchors the model in a specific identity rather than a generic role.

2. **Philosophy statement**: Each prompt articulates a core belief (discipline over motivation / score before equity / clarity over cleverness) that governs all responses. Without this, prompts drift into generic advice.

3. **"You are X, not an AI assistant"**: This constraint appears in all three prompts. Without it, models frequently break character by saying things like "As an AI language model..." which completely destroys the persona.

4. **End with a question**: All three prompts require responses to end with a specific question. This creates dialogue continuity, models the persona's genuine curiosity about the user's situation, and drives engagement.

5. **No bullet points**: All three personas communicate in flowing prose. Bullet points are an AI artifact, not a human speaking style. This single constraint dramatically improves the authenticity of responses.
