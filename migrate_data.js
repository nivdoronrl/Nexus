const admin = require('firebase-admin');
const { GoogleGenAI } = require('@google/genai');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

// Initialize Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
    });
}
const db = admin.firestore();

// Initialize Gemini
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const updateText = `**Accomplished updates:**

*   **Pilot launched:** First custom garment orders placed with vendor Diconf (Knot Standard) in late 2025. Initial orders were processed and shipped, confirming end-to-end workflow.
*   **System integration planning:** Commercial invoice handled via current manual process; close work with RL’s customs broker ensured clearance. Plans formulated to integrate the MTM ordering system with RL’s SAP for automated purchase orders (POs) and data flow.
*   **Process optimization:** Cross-functional teams (e.g. Digital, Merchandising, Store Operations) engaged to refine in-store processes and ensure seamless customer experiences. Key dependencies (e.g. IT development, inventory management) have been identified and are being addressed.
*   **Leadership approval:** Executive support secured to transition MTM from pilot to a broader business rollout, pending final success metrics.  
    **Estimated % complete:** \~70%  
    **Status:** **Active** (Scaling phase)  
    **Next steps:**
*   Complete SAP integration for end-to-end order automation
*   Finalize training and process documentation for in-store teams
*   Expand pilot to additional stores (timeline under development)
*   Define long-term ownership and handoff plan to business units by end of FY26

**Made-to-Order (MTO) Shirt Shop**: *Digital platform for customers to customize and order personalized shirts.*  
**Accomplished updates:**

*   **Approval & planning:** North America leadership approved moving forward with an MTO online shirt program. Business case and customer experience design aligned with Digital and Merchandising teams.
*   **Resource allocation:** Dedicated project manager (Paige) assigned; Carla Fabiani covering during Deborah’s sabbatical. Cross-regional considerations (e.g. Japan/APAC e-commerce) reviewed.
*   **Timeline development:** Q4 FY26 targeted for site development and testing, with style assortment (men’s and women’s shirt options) finalized by November 2025.
*   **Marketing integration:** Coordination initiated with e-commerce marketing (Amanda B.) to plan go-to-market strategies and digital user experience.  
    **Estimated % complete:** \~30%  
    **Status:** **Active** (In development)  
    **Next steps:**
*   Complete technical build of the online customization interface and integrate with the e-commerce platform
*   Finalize product assortment and pricing for launch
*   Conduct user testing and refine the user experience in Q4 FY26
*   Prepare marketing campaign for launch in early FY27 (targeting January/February)

**TIRA (BioStretch)**: *Development of a bio-based elastane fiber (“Biostretch”) for stretch fabrics, in partnership with TIRA (Taiwan Textile Research) and multiple global mills. Aimed at delivering a recyclable, high-performance spandex alternative for use in athletic and uniform apparel.*  
**Accomplished updates:**

*   **Polymer scale-up trials:** 1L polymerization successfully replicated at Bioastra (Canada) and attempted at Shinkong (Taiwan). Shinkong’s first 1L trial encountered equipment limitations (vacuum and oxygen control) but mitigation steps were provided. Shinkong remained committed, scheduling a second 1L trial (Nov 26, 2025), which, if successful, would directly lead into a planned 100L pilot run in early Dec 2025.
*   **100L and 1000L runs:** The 100L polymerization trial at Shinkong took place in December. Its outcome determined a go/no-go for scaling to \~1000L (industrial scale). The team prepared for a **1000L run in late Dec 2025** (ultimately shifted to Feb 2026) with precautions: catalyst addition method was adjusted to suit the larger 3-tank reactor. **Raw materials for 1000L were ordered in advance** once the 100L trial showed promise.
*   **Fiber spinning and yarn:** Concurrently, a test plan was established with CyLab (CY) for spinning the resulting polymer into fiber after Chinese New Year (Feb 2026). The goal was to have the first *Biostretch yarn* ready by Feb–Mar 2026 for knitting into prototype fabrics.
*   **Wear-testing prep:** An internal wear-test program is being organized through MESH01. The first round of athlete-centric questions for wear trials has been drafted and edited. Ten prototype shirts are in production for field testing by designers and athletes once the yarn and fabrics are available.
*   **Investor and partner interest:** TIRA’s success potential has attracted external interest. Shinkong has discussed a possible **$3M investment** in the technology if scale-up succeeds. Ralph Lauren’s leadership (e.g. **Paul**, the CFO) is closely monitoring progress and funding needs, with interim SOWs and additional budget earmarked to support the final development push. Teaser videos highlighting Biostretch’s value proposition were created for both design and investor audiences. Feedback favored a cleaner, investor-focused version emphasizing the circular, high-performance story.
*   **Recognition:** The Biostretch project was selected as a finalist in external sustainable innovation programs (e.g. **Global Fashion Alliance (GFA) “Impact” competition**), validating its industry significance.  
    **Estimated % complete:** \~60%  
    **Status:** **Active** (in pilot scale-up)  
    **Next steps:**
*   **Complete fiber spinning trials at scale:** February 2026 1000L polymer run results are expected by March; fibers from 100L and 1000L batches will be spun and evaluated by CY (targeting March 2026 for initial yarn).
*   **Fabric production & testing:** Once sufficient Biostretch yarn is produced, proceed with knitting into test fabrics for *stretch, recovery,* and *durability* testing. Align with mills for any further bulk trials.
*   **Garment prototyping & wear trials:** Knit sample yardage into Olympic Villagewear prototypes and baseline performance in athletic wear. Launch the MESH01 wearer trials (target Spring 2026) to collect data on stretch, comfort, and durability.
*   **Business integration:** Continue discussions with Shinkong and others on strategic partnerships or JV funding to scale production. Target a **go/no-go commercialization decision by late FY26 Q4** (mid-2026) once 1000L results and initial wearer testing data are available.

**LA 2028 Olympics – Sustainable & Upcycled Uniform Program**: *Cross-functional initiative to infuse sustainability and circularity into Team USA’s Los Angeles 2028 Olympic and Paralympic uniforms and apparel. Encompasses innovative materials (e.g. biobased fibers, recycled content) and upcycling of excess inventory into new products.*  
**Accomplished updates:**

*   **Material integration roadmap:** Defined a portfolio of *next-gen materials* for Olympic applications, including Biostretch (for stretch uniforms), **Avalo regenerative cotton** (for natural fiber uniforms), and novel silk alternatives. These are being aligned with the uniform *Villagewear* design and development calendar (e.g. ensuring materials are qualified by mid-2026 ahead of production). *Biostretch in particular is slated for all stretch-knit village apparel and possibly some pre-Olympic capsule products.*
*   **Excess Upcycling pilot:** Completed a pilot project to refurbish and redesign leftover Team USA 2024 Olympic apparel for LA28. Collaborated with external partners (*e.g.* Guru) to successfully remove prints from unsold jerseys and add new graphics. Produced **9 refurbished prototype pieces** (5 complete, 4 in progress) from existing inventory. Documented costs and processes for patch removal, re-dyeing, re-printing, cropping, and re-embellishment. **Business case and sample products were presented on Dec 10, 2025** to R\&D and design leadership for feedback. *Result: The R\&D and merchandising teams were impressed and agreed to proceed*. Morgan Grayson (Women’s Polo) has committed to use the upcycled items to stock LA28 retail pop-up stores.
*   **Low- vs. high-lift strategy:** Defined two tracks for upcycling: *“low-lift”* (minimal modifications like adding LA28 logos or patches) and *“high-lift”* (more intensive transformations like bespoke cut-and-sew redesigns). Design and merchandising are weighing resource availability for high-lift concepts given tight timelines and store plans.
*   **Inventory secured:** \~15,000 units of unsold Tokyo 2020/Beijing 2022 Olympic inventory identified in the NC Distribution Center for potential upcycling use. Vintage/resale teams have first pass; remaining items suitable for LA28 have been earmarked (e.g. blank white jersey tees, fleece bottoms, polos). A separate cache of \~250 damaged Women’s Collection items was similarly set aside for a domestic upcycling pilot with Beyond Retro.
*   **Design involvement:** Collaborations held with internal design (e.g. *Concept Design, Polo Women’s*) to ideate creative “refurbishments” of the excess items (new graphics, patch swaps, embroidery, cropping, etc.). Enthusiasm is high, but leadership cautions that upcycling efforts must align with storytelling opportunities (e.g. *limited-edition capsule at a high-profile Olympic event*) to justify the resources.
*   **Other Olympic materials:** Advanced *regenerative & recycled fibers* for Olympic use. For example, **Avalo’s AI-optimized cotton** (drought-resistant, lower-impact cotton) is being trialed for inclusion in LA28 uniforms. Also, our **EverBloom** bio-based fibers are on track to deliver 100% and blended yarns (with cashmere) by early 2026, potentially for Olympic knitwear. These and other materials will feed into an “LA28 Sustainable Material Toolkit.”
*   **Olympic leadership engagement:** Regular syncs with Team USA design head *Jimmy* Choi to integrate innovations into the official uniform plan. *As of Feb 2026, he was “excited” about the potential of Avalo cotton, Biostretch, and upcycling for LA28.* However, concerns were raised about **timing** (Biostretch needs to be proven in time for fabric commitments) and **resources** (ensuring upcycling doesn’t strain design/production teams without clear retail storytelling).  
    **Estimated % complete:** \~55%  
    **Status:** **Active** (prototype/pilot phase)  
    **Next steps:**
*   **Finalize upcycling scale plan:** Determine which “low-lift” upcycled styles will go into production for LA28 retail (targeting a Q1 FY27 decision). Decide if “high-lift” upcycled designs will be pursued given timeline and staffing constraints.
*   **Material qualification:** Track development of key materials (Biostretch, Avalo cotton, EverBloom fibers) through Spring 2026 to confirm they meet performance standards and delivery timelines for inclusion in uniforms and merchandise.
*   **Cross-functional integration:** Align with merchandising on which innovations (e.g. Biostretch in villagewear, upcycled apparel, new fibers) will be highlighted in Olympic product assortments. Ensure these are accounted for in design calendars (noting *villagewear sample fabric orders start June 2026*).
*   **Storytelling & launch:** Coordinate with Marketing/Communications to develop consumer-facing narratives for each innovation (e.g. “circular stretch,” “regenerative cotton,” “upcycled Olympic heritage collection”). Aim to showcase first LA28 innovation prototypes internally by late 2026 and publicly by 2027.

**Rewritable (“Reprintable”) Price Tags**: *Exploration of reusable price tickets that can be reprinted multiple times to reduce paper waste and reticketing costs across regions.*  
**Accomplished updates:**

*   **Data gathering:** Worked with regional teams to quantify current reticketing volumes and costs. Confirmed annual re-ticketing of \~7 million units in HK at \~$0.07/unit, \~1 million units in North America at \~$0.50/unit, and \~4–5 million in Europe at \~$0.10/unit. Hong Kong uses blank tickets printed in-region; NA and EU replace a fraction of tickets on imported goods due to regional price differences.
*   **ROI modeling:** Built best- vs. worst-case ROI scenarios by region using preliminary estimates of the reusable ticket system costs. Variables include the price premium per NFC- or thermal rewritable tag (ranging from +$0.03 up to +$0.19 per unit) and capital costs of on-site rewriting devices (est. \~$200K each). Early analysis suggests potential strong ROI in NA (fast payback if tag costs are at low end) and longer payback or “no-go” in HK/EU unless tag costs decrease.
*   **Solution provider engagement:** Progressed discussions with **Etria** (the technology’s original developer in Japan) and global tag supplier **Avery Dennison**. However, the Japanese inventor has been wary of scaling collaboration. Our team enlisted colleagues in the RL Japan office (Phyllis Yen, Sam S., Lisa K.) to facilitate communications with Etria. We also initiated a **tri-party NDA between Etria, Avery, and RL** so detailed technical and cost information can be shared freely.
*   **Regional operations alignment:** Obtained buy-in from HK logistics leads (Keyamma) and connected with NA/EU DC operations to validate processes. Mapped current pain points (e.g. manual printing requiring staff to leave the floor for Wi-Fi access). Ensured any pilot must integrate with existing DC workflows.  
    **Estimated % complete:** \~35%  
    **Status:** **Active** (analysis stage)  
    **Next steps:**
*   **Finalize partnership and trial:** Complete NDA formalities and arrange a joint meeting with **Avery Dennison** to evaluate technical modifications needed for tags (e.g. material compatibility with our printers, durability in supply chain). Aim to secure sample rewritable tags and rewriting devices for a controlled pilot.
*   **Refine cost model:** Once Avery provides detailed pricing on rewritable tag units and printer hardware/maintenance, update the ROI models per region. Confirm any additional costs (software integration, labor for reprinting, etc.).
*   **Pilot in distribution center:** Pending favorable economics, conduct a pilot in one North American and one European distribution center in early FY27 to measure actual cost savings and operational impacts.
*   **Go/no-go decision:** By mid-FY27, decide on broader implementation based on pilot data (targeting HK as well if tag cost can be reduced). If proceeding, repurpose FY27 budget (originally slated for other initiatives) to fund tag inventory and printer roll-out.

**Silk Alternatives (Olympic Flag-Bearer Project – Bloom & AMSilk)**: *Dual-track development of bio-based silk alternatives to replace traditional silk in high-profile Olympic uniform pieces (e.g. Flag Bearer outfit) and future luxury applications.*  
**Accomplished updates:**

*   **Bloom (EverBloom) fiber:** Partnered with **EverBloom (formerly Bloom Labs)** on a cellulose-based bast fiber derived from agricultural waste, intended to mimic silk’s luster and drape when blended with natural fibers. Initial trials revealed a coarse fiber (≈10 denier/160D) – suitable for heavier yarns (sweaters, twills) but not fine silk-like fabrics. Despite this limitation, EverBloom delivered early test yarns: 80/20 (cashmere/Bloom) and 20/80 blends, and even a 100% Bloom wool-like yarn. Hand-feel improved notably in later trials, approaching the softness of cashmere or cotton/linen. Dyeing challenges (achieving a camel shade) were resolved with an Italian mill (Biagioli). A meeting in Dec 2025 set a schedule for knitting and testing: *80/20 blend knit samples due by mid-Dec; 100% Bloom by Jan 2026 for evaluation*. By Feb 2026, EverBloom reported *“100% Bloom” fiber spinning runs were successful, with knit panels expected by end of March.* LCA (life-cycle analysis) data was completed, pending updates with improved cost inputs.
*   **AMSilk (bio-engineered silk)**: Engaged **AMSilk (German biotech)** to pursue a *microbial fermentation-based* silk fibroin fiber suitable for fine fabrics. An **MTA (Material Transfer Agreement)** was reached to acquire sample yarn for trials. The project scope was refined in Feb 2026: rather than have AMSilk produce finished fabric, RL will purchase AMSilk’s bio-silk yarns and work with an Italian mill (Gentili Mosconi) to weave trial fabrics, then perform third-party lab testing (e.g. Bureau Veritas) for hand-feel and performance comparison to conventional silk. This revision gives RL more control over fabric construction and testing. The SOW and legal terms (including first-to-market intent and any exclusivity conditions) are being finalized.
*   **Olympic use case:** Given the fiber constraints, a decision was made to pursue silk alternatives for heavier knitwear or **men’s suiting** rather than fine silk blouses. Discussions held with design and merchandising (e.g. Lindsey in Women’s Collection) to identify viable product types (possibly a sportcoat/trousers or sweater for the opening ceremonies) that could use the coarse silk-like yarn.  
    **Estimated % complete:** \~40%  
    **Status:** **Active** (feasibility testing)  
    **Next steps:**
*   **Yarn & fabric trials:** Upon MTA execution, receive **AMSilk** yarn and begin weaving trials (targeting Spring 2026). Similarly, receive EverBloom’s 100% and blended yarns and produce knit and woven sample fabrics (knit panels expected \~April 2026).
*   **Performance testing:** Execute lab testing on all fabric prototypes (tensile strength, drape, hand-feel, colorfastness, etc.) and compare against traditional silk standards. Identify any performance gaps (e.g. weight, sheen, tensile strength) and iterate with partners on improvements (EverBloom is already developing a *“2.0” version* of their fiber to allow standard acid dyeing and enhanced softness).
*   **Go/no-go for LA28 Flag Bearer:** By \~February 2026, assess if a silk alternative can meet quality and timeline requirements for the limited-edition “Flag Bearer” outfit. (As of Jan 2026, leadership estimated only \~20% chance of readiness in time for Olympic uniform production.) If viable, proceed with scaled development and dyeing in Italy (Gentili Mosconi) for early 2027 pre-production; if not, pivot silk-alternative work toward longer-term luxury applications.
*   **Dual-development decision:** Decide whether to continue parallel development with both AMSilk and EverBloom beyond initial trials, or focus resources on the more promising route (target decision by Q1 FY27 after reviewing test data).

**EverBloom “Bloom Wool” (Cashmere Alternative)**: *Development of a bio-based fiber from agricultural waste (working name “Bloom”) to mimic or exceed the performance of cashmere and fine wool, in partnership with startup EverBloom.*  
**Accomplished updates:**

*   **Spinning trials:** Achieved successful spinning of **100% Bloom fiber** into yarn, with improvements in hand-feel noted. Initial 100% Bloom yarn felt slightly dry (linen-like), but recent iterations show a softer hand closer to cotton/linen blends. EverBloom also produced blended yarns (e.g. 80% cashmere/20% Bloom and vice versa) to test performance at different blend ratios.
*   **Knit & dye results:** Knit swatches from a **80/20 Cashmere/Bloom** blend and a **60/40 Bloom/Cashmere** were reviewed in November – one had a hand “like cotton-cashmere” and the other a bit dry but improved vs earlier versions. Initial dyeing challenges (achieving a desirable camel color) with Biagioli in Italy were resolved, demonstrating the fiber’s dye responsiveness. EverBloom is also developing a *“Bloom 2.0”* fiber that can be **acid-dyed** to broaden color capabilities.
*   **Sampling timeline:** The partner outlined a clear sample development schedule: **25 kg** of improved Bloom 2.0 fiber (in 100% and blended forms) to be produced Aug–Sept 2025; spinning and dyeing trials at an Italian mill by late Sept; **knitdowns** available in Italy by Oct/Nov; and in NYC by Dec 2025. Third-party performance testing (e.g. pilling, dimensional stability) planned by Jan 2026, with a **go/no-go decision by Feb 2026** on further development. *This schedule was later adjusted*: by early 2026, EverBloom indicated knit panels would arrive by end of March, with all testing data and updated cost estimates by April.
*   **Performance goals:** Targeting a fiber that equals or surpasses cashmere in softness and thermal retention but with improved durability (less pilling, machine washable). Early observations showed promise in reduced pilling and easier care, pending formal lab results.
*   **Cost & sourcing considerations:** Preliminary costing exercises (with process savings factored in) suggest the fiber will carry a cost premium (\~6–7% over conventional fine wool). Duty classification is being examined (current import duty \~32%, but exploring potential exemptions given its recycled biomass content).  
    **Estimated % complete:** \~45%  
    **Status:** **Active** (mid-development, testing phase)  
    **Next steps:**
*   **Finish performance testing:** Await results of third-party lab tests (due by end of January) on 80/20, 60/40, and 100% Bloom knit samples. Evaluate metrics like hand-feel, warmth, pilling, and dimensional stability versus premium wool/cashmere benchmarks.
*   **Go/No-go decision:** By late Q4 FY26 (March 2026), decide whether to proceed to larger-scale production or pivot. This decision will weigh test results, updated costs, and fit within product plans (an initial launch was considered for Spring 2026 but may shift to later seasons to ensure marketing support and robust storytelling).
*   **Integration if “go”:** If approved, integrate Bloom fiber yarns into Fall 2027 luxury assortments (e.g. RL Collection or higher-end Polo pieces). Focus on categories where slightly crisper drape is acceptable (knits, lightweight outerwear, perhaps suiting) and craft consumer messaging around the fiber’s provenance and performance benefits (e.g. “innovative climate-friendly cashmere”).
*   **If “no-go”:** Document key learnings (e.g. required improvements in fiber fineness or processing) for potential future revisiting, and reallocate remaining budget to other promising fiber innovations.

**“Positive Materials” Pre-Pay Development**: *A flexible R&D partnership enabling RL to pre-fund innovative material development and sample yardage in FY26, while deferring final product decisions. Envisioned as a way to utilize budget before year-end on experimental sustainable materials.*  
**Accomplished updates:**

*   **Concept approval:** Secured internal agreement to allocate \~$20–30K from FY26 budget to a “Positive Materials” development fund. The idea is to pay a chosen mill or vendor in advance (by FY26 close) for R&D work and small-batch production of an unspecified sustainable material or product, with details to be finalized later.
*   **Exploratory costing:** Initial discussions centered on producing **50–100 polo shirts** using an experimental sustainable material (e.g. a bio-based textile or a recycled fiber blend) to demonstrate viability. Rough cost quotes in the mid-5-figure range were obtained for development plus a limited run of finished garments.
*   **Finance and legal alignment:** Collaboration with finance (Keyamma, etc.) to ensure a pre-payment can be properly accrued in this fiscal year for work delivered in the next. Consulted legal to structure an open-ended SOW that secures our payment this FY but allows flexibility in the exact material or product delivered in the future.
*   **Vendor identification:** Evaluated potential partners who could execute innovative material development quickly. Leading candidates include **Positive Materials** (pseudonym for an advanced textile lab) and other mills experienced in innovation partnerships. As of early March 2026, a $20K SOW for Positive Materials and an $8K SOW for FIBe were being routed to Legal.  
    **Estimated % complete:** \~40%  
    **Status:** **Active** (in contracting phase)  
    **Next steps:**
*   **Finalize SOW & payment:** Complete the broad SOW with the selected partner, ensuring it allows creative freedom (possibly specifying a general material category but not locking into a single concept). Execute payment by fiscal year-end (March 31, 2026) to utilize allocated funds.
*   **Define development plan:** Early in FY27, decide which material or product to target with the prepaid budget. Possibilities include bio-based fibers, recycled blends, or novel finishing technologies – likely aligned with RL’s sustainability goals. Engage design and merchandising teams to choose a product (e.g. a performance polo or a sweater) that can showcase the new material in a small run.
*   **Proceed with R&D and sampling:** Once the material is defined, begin development and sample production in FY27. Aim to produce on the order of 50–100 garments for testing and internal evaluation (and potentially a limited consumer trial).
*   **Evaluate and scale:** Assess the outcomes of the development: material performance, aesthetics, consumer perception (if tested), and production scalability. If promising, plan a larger integration of the material in a future seasonal collection.

**FIBe (Linseed Fiber Initiative)**: *Collaboration to develop a linen-like fiber from flax/linseed agro-waste that can be blended with cotton. Intended to create stronger, more sustainable cotton yarns for products like knitwear (e.g. Wimbledon sweaters) while supporting agricultural waste valorization.*  
**Accomplished updates:**

*   **Laboratory trials:** Visited FIBe’s lab in London (UK) to review early knit samples made from a **20% linseed / 80% cotton** yarn blend. The 20/80 test knitdowns showed improved yarn strength, indicating the linseed fiber can reinforce cotton without significantly changing hand-feel. This suggests potential to reduce cotton breakage in fine-gauge knits (a key goal for wear like tennis sweaters).
*   **Scaling partner identified:** FIBe secured a new processing partner capable of scaling up linseed fiber extraction and spinning. They also provided a draft *“price parity pathway”* showing how, at volume, the linseed-blended yarn could reach cost-neutrality with regular cotton (initial costs are higher but expected to come down with optimization and volume).
*   **Budget planning:** An **$8,000 SOW** for a larger trial batch (\~50 kg yarn) was drafted in late FY26. The team debated whether to execute this in Q4 FY26 (to utilize remaining budget) or postpone to FY27, given other priorities. Ultimately, leadership signaled the FIBe SOW could likely be funded in FY26 alongside other material investments, and it was added to the year-end budget list.
*   **Use case alignment:** Identified a marquee use case in the Wimbledon tennis collection (heritage cricket sweaters) to apply the 20/80 linseed-cotton yarn if development is successful. Communicated with design and sourcing teams about the fiber’s story (UK-farmed flax waste, circularity angle) and the timing if we proceed.  
    **Estimated % complete:** \~45%  
    **Status:** **Active** (scaling trial phase pending)  
    **Next steps:**
*   **Execute scale trial:** If FY26 funding confirmed, kick off the $8K SOW with FIBe and their scaling partner in Q4. This will produce a larger quantity of 20/80 blended yarn and knit fabric for evaluation.
*   **Test and evaluate:** Assess the scaled yarn for spinning performance (e.g. breakage rates) and the knit fabric for strength, hand-feel, appearance, and overall quality compared to standard cotton. Engage RL Quality and Materials R&D teams to conduct this evaluation.
*   **Decision point:** Determine if results justify moving forward to product integration. If yes, plan a capsule launch (potentially in a future Wimbledon or tennis-inspired collection) highlighting the British-sourced sustainable fiber story. If not, identify whether improvements (e.g. different blend ratio or processing tweaks) could make it viable or if the project should be paused until technology advances.

**Colourizd (Heathered Yarn Innovation)**: *Evaluation of Colourizd’s innovative yarn coloration process to create heathered (multi-tonal) yarns with less dye and cost. Aims to reduce color-processing steps and costs while delivering unique heather aesthetics.*  
**Accomplished updates:**

*   **Data collection:** Compiled technical and cost data from Colourizd and our mills regarding the process. Surprisingly, initial analyses indicate the Colourizd heather yarn method could lower cost per unit compared to traditional yarn dyeing (due to fewer dye baths and more efficient color blending). This challenges the assumption that innovation comes with a cost premium.
*   **Aesthetic trials:** Received early sample yarns and fabrics from Colourizd’s process. These were distributed to internal design and materials teams for evaluation of color consistency, fastness, and visual appeal. Testing of different heather color combinations is ongoing (next round of trial results expected by end of March 2026). Thus far, the heathered look and quality have met expectations, but scale-up questions remain.
*   **ROI modeling:** Began drafting an ROI model incorporating potential savings in dye costs, water/energy usage (fewer dye cycles), and any impact on throughput. Considering the unexpected cost advantage, the team is refining this model with updated trial data and any additional costs (licensing or equipment) from Colourizd.  
    **Estimated % complete:** \~30%  
    **Status:** **Active** (early testing)  
    **Next steps:**
*   **Review March trial outcomes:** Analyze the late-March batch of heathered yarn and fabric from Colourizd for quality and appearance. Gather feedback from design (does the melange effect meet seasonal color needs?) and from mills (any issues with knitting or weaving the pre-colored yarn).
*   **Finalize cost/benefit analysis:** Incorporate latest trial data into the ROI model. Confirm all cost factors with Colourizd (including any implementation fees or special pigment costs) to validate the projected per-unit savings.
*   **Decision on pilot adoption:** If benefits hold, select a test case product (e.g. a Heathered cotton cable-knit or fleece) for a pilot using Colourizd yarn in an upcoming season. Prepare a small run in FY27 to verify factory integration and consumer acceptance, then decide on scaling to broader use.

**Jeanologia (Low-Water Denim Finishing)**: *Joint project with Spanish firm Jeanologia to combine cationic pre-treatment and H₂Zero ozone technology for near-zero water denim dyeing and finishing.*  
**Accomplished updates:**

*   **Cationic dye trials:** Initial trials at a partner mill (India) to integrate **OSM’s cationic cotton** chemistry directly in garment dyeing were unsuccessful, resulting in poor color uniformity. In response, our team facilitated a connection between Jeanologia and **Everlight** (specialty chemical supplier) through RL’s Asia team (Phyllis Y.). Everlight provided an alternative cationic treatment, which was shipped to Jeanologia’s lab in Spain for testing on our fabrics.
*   **Process adjustments:** Despite early setbacks, Jeanologia and RL refined the approach: applying the cationic treatment at the fabric stage (rather than garment stage) and using cellulosic (cotton) sewing threads to avoid contrast issues. Jeanologia’s H₂Zero system (which filters and recirculates water in a closed loop) was prepared to pair with this new approach, aiming to drastically cut water use.
*   **Ongoing trials:** As of late Nov 2025, the Everlight-enhanced chemistry had arrived in Spain and **Jeanologia was conducting new dye trials** with it. Feedback from these trials was pending but hoped to validate the combined process. RL’s plan is to move into a production pilot with a vendor (as per an existing agreement) once the lab proves out the chemistry.  
    **Estimated % complete:** \~40%  
    **Status:** **Active** (iterative testing)  
    **Next steps:**
*   **Review trial reports:** Await results from Jeanologia’s current trials with the Everlight cationic chemistry (expected in early 2026). If successful, proceed with the agreed pilot production of cationic + H₂Zero denim finishing on a selection of RL denim styles.
*   **Scale pilot production:** Coordinate with manufacturing partners (e.g. **Everest** in Spain, which received the chemistry shipment) to implement the process on a production line. Monitor for any issues in color consistency, fabric strength, or visual differences versus conventional denim finishing.
*   **Assess impact:** Measure water and chemical reductions achieved during the pilot. Compare to baseline data (from standard denim finishing) to quantify improvements in water usage and chemical discharge. If the cationic+H₂Zero process meets quality and sustainability targets, build a case to expand it to additional mills or product lines in FY27.
*   **Contingency planning:** If challenges persist (as earlier with OSM’s chemistry), consider alternative approaches (e.g. pre-dyeing fabrics with cationic treatment, or different chemical formulations). Ensure key mills (like **Prosperity, Arvind, Orta**) are looped into knowledge sharing, since multiple vendors are experimenting with similar low-water solutions.

**Fibre52 (Cotton Processing)**: *Collaboration on Fibre52, a new cotton pretreatment technology (using an alkali- and zinc-free scouring/bleaching process) aimed at reducing water, energy, and chemical use in cotton manufacturing.*  
**Accomplished updates:**

*   **Global trials:** Completed successful bulk production trials using Fibre52 at multiple partner mills in **Bangladesh and Turkey**. Both Epyllion (BD) and Yeşim (Turkey) ran 500+ kg lots with the new process, achieving required fabric quality while eliminating caustic chemicals. Early results suggested water savings and efficiency gains, though data needed validation.
*   **Performance data gathering:** Engaged an Indian mill (Shahi) and Bangladeshi mill (DBL) via RL’s local teams (Richesh S. and others) to measure water and chemical usage with Fibre52 versus conventional process. Preliminary figures from Epyllion showed a \~20% higher baseline water usage than initially reported, which actually makes water-saving innovations *more* impactful. Water usage data for a 535 kg production lot at Epyllion was collected, with analysis expected in late 2025.
*   **Supplier buy-in:** Achieved alignment with Yeşim (Turkey) and a Pakistan mill on the business case: both see potential for ROI within \~1.5 years if process improvements hold. Presented at RL’s internal *Sustainability Round Table* in Dec 2025, where Shahi’s slide highlighted Fibre52’s early results (e.g. water savings per kg of cotton). A Fibre52 representative is slated to present these findings at the RL Manufacturing Innovation Council meeting in March 2026.
*   **Scaling toolkit:** Developed a “scaling toolkit” for mills, including technical guidelines and case studies from the pilot runs. This was shared with additional suppliers (e.g. a third mill in Vietnam) to encourage wider adoption. Patent information and licensing details were also circulated so mills understand costs and IP considerations.
*   **Commercial alignment:** Reached agreement with Archroma (chemical supplier) and Yeşim on chemical pricing for larger-scale Fibre52 implementation. Turkey’s team is preparing POs, indicating intent to move forward commercially with the process.  
    **Estimated % complete:** \~50%  
    **Status:** **Active** (transitioning to scale)  
    **Next steps:**
*   **Compile and distribute trial reports:** Collect full sustainability and cost reports from Epyllion, Yeşim, and other trial sites (expected by early 2026). Convene RL Sustainability (Mitsuko) and manufacturing teams to validate the water/energy savings data per system (Epyllion uses OrgaTex monitoring; others use their own metrics).
*   **Promote industry adoption:** Following the Manufacturing Innovation Council presentation (March 2026), share results with key stakeholders and encourage other strategic mills to run Fibre52 trials. Possibly identify one mill per region (Bangladesh, Turkey, Vietnam) to target a 10% wet-processing water reduction using Fibre52 or similar tech by mid-2026.
*   **Integrate into sourcing strategy:** Work with RL regional sourcing teams to transition Fibre52 from R&D to operations. Define any needed support (e.g. dedicated F52 technicians – one was dispatched to Turkey in mid-2025 to support production) and incorporate the process into mill SOPs once validated.
*   **Continued innovation:** Explore complementary technologies to pair with Fibre52 for end-to-end water savings, such as cationic pre-treatments or advanced effluent recycling, to approach the target of 10%+ water reduction across dye/finish processes at scale.

**OSM (Low-Resource Dyeing & Heathered Effect)**: *Partnership with Open Source Matting (OSM) to reduce water use in dyeing and explore a new inline heathering technique. Involves equipment modifications (e.g. venting on continuous dye ranges) and chemical tweaks to improve dye uptake and achieve a heathered look without extra dye baths.*  
**Accomplished updates:**

*   **Water-saving dye trials:** Conducted four iterative trials at Seduno (Vietnam) to eliminate “long mark” dye streaks and improve shade evenness while using OSM’s process. By adjusting carrier chemical (CLEAR 105) concentration, exhaust levels, and machine speed, the fourth trial nearly eliminated marks, achieving uniform coloration at 5.5% owf (dye use) – a key breakthrough. Samples from the successful run were sent to OSM’s lab for validation, with plans to scale up those parameters to full production.
*   **Global scale-out:** Arranged for OSM to extend trials to Bangladesh. However, **DBL** (Bangladesh mill) faced delays due to customs issues obtaining OSM’s chemical; trials were postponed until materials arrived post-airport clearance. Meanwhile, OSM’s team initiated plans to install additional linear vents on partner machinery (cost \~$7.5K) to address uneven drying issues observed in earlier trials.
*   **Inline heather effect:** Explored using OSM’s technology in an unconventional way – venting certain dye machine chambers to create a controlled heather/“frost” effect. This initiative was paused in Vietnam after equipment constraints (only 3 of 5 chambers had vents) led to incomplete drying, requiring very slow speeds. Efforts shifted to **Yeşim (Turkey)**, whose machines and inspection practices positioned them as strong candidates for achieving the effect at scale. Mechanical adjustments were made at Yeşim to prepare for a renewed heather trial expected in early 2026.
*   **Business case:** Preliminary results indicated OSM’s process could significantly reduce water usage and chemical load in cotton dyeing (targeting >50% reduction). Yeşim’s 6-month trial data suggested a \~2% increase in first-quality yield (fewer defects reaching wet processing), equating to \~$0.01 savings per T-shirt – a small per-unit gain but meaningful at scale (10 machines could pay back in \~1.5 years). These insights have been shared with RL’s sourcing and sustainability leads.  
    **Estimated % complete:** \~60%  
    **Status:** **Active** (in extended trials)  
    **Next steps:**
*   **Bangladesh trials:** Now that DBL has received the OSM chemicals (as of early Nov 2025), support them in conducting their trial run. Compare DBL’s results with Seduno’s to see if the modified process performs consistently across different equipment.
*   **Heather effect at Yeşim:** Continue collaboration with Yeşim and OSM’s experts (including a local engineering support person) to test the vent-enhanced heathering at production scale once machine modifications are complete (likely post-Chinese New Year 2026). Evaluate fabric quality and decide whether to pursue the heather effect commercially or focus OSM purely on water savings.
*   **Transition to implementation:** If water-saving dye trials at multiple mills prove successful by mid-2026, develop standard operating procedures (SOPs) for the OSM process and engage RL’s regional mill managers to drive broader adoption. Ensure any necessary capital expenditures (e.g. additional vents or drying capacity) are scoped and budgeted in partnership with mills.
*   **Monitor & measure:** For each mill, measure actual water and energy reductions achieved. Strive to meet the target of 10% overall wet-process water reduction in at least one key mill per region (BD, TR, VN) by mid-2026, per RL’s sustainability goals.

**Smartex (Automated Fabric Inspection)**: *Pilot of Smartex AI-powered camera system in textile mills to reduce fabric defects and waste. The system detects knitting flaws in real time, preventing faulty (off-quality) material from being processed further, thereby saving resources.*  
**Accomplished updates:**

*   **Pilot at Yeşim (Turkey):** Over 6 months, Smartex cameras were installed on circular knitting machines at Yeşim to compare production runs with vs without the system. Approximately **3 tons of fabric** were produced (half under Smartex monitoring, half under standard procedures). Yeşim’s baseline efficiency was already high (they inspect grey fabric before dyeing, an uncommon practice), yet Smartex still demonstrated a **2% increase in defect-free output** per greige roll. This equated to roughly a **$0.01 savings per basic T-shirt** (assuming a $3 cost per 165gsm cotton jersey).
*   **ROI and adoption:** Though the per-garment savings seem small, Yeşim calculated that scaling Smartex to ten knitting machines would pay back in \~1.5 years via reduced waste and improved yield. Based on the pilot’s success, Yeşim’s management was convinced – they are proceeding to purchase additional Smartex units for their facilities, independent of RL subsidy.
*   **Sustainability impact:** We have requested data from Yeşim on the volume of defective greige fabric that was prevented from entering the dye/finish process thanks to Smartex. This will allow estimation of water and energy savings, since every meter of fabric detected early and removed saves the resources that would have been spent processing it further.  
    **Estimated % complete:** \~90% (initial pilot completed)  
    **Status:** **Active** (transitioned to supplier)  
    **Next steps:**
*   **Scale to other vendors:** Using the Yeşim case as proof, engage other key knitting vendors (especially ones without automated greige inspection) to consider Smartex. Highlight not just quality benefits but sustainability gains (less wasted water/energy on bad fabric).
*   **Capture sustainability metrics:** Work with Yeşim to quantify how many meters of fabric were scrapped early due to Smartex’s detection, and model the water/chemical savings achieved by not dyeing that fabric. Use these metrics in RL’s sustainability reporting and supplier negotiations (potentially tying adoption to our sourcing decisions).
*   **RL investment decision:** Determine if RL should co-invest or incentivize other strategic mills to adopt Smartex. Given Yeşim’s independent purchase, our role may simply be to recommend the technology and facilitate introductions. However, for mills where capital is a barrier, consider pilot funding or cost-sharing to drive broader implementation of this waste-reducing technology in FY27.

**Black Diamond (Bio-Resin Accessories)**: *Collaboration with Black Diamond startup to create luxury accessories (e.g. logos, hardware, jewelry) using an innovative bio-resin composite that mimics the look of polished black gemstones.*  
**Accomplished updates:**

*   **Partner progress:** Black Diamond secured a major partnership in the European luxury sector (a French conglomerate in watches and spirits), validating their technology’s appeal. Despite this, they remain committed to our smaller-scale fashion applications.
*   **Prototyping:** Black Diamond produced an **intricate RL “stacked logo” accessory sample** using their bio-resin material (a multi-layer composite). They are shipping this sample to our New York office for evaluation and to share with design leadership. (Expected arrival: Nov/Dec 2025.)
*   **Ideation of use cases:** We identified potential product applications such as bag logos, belt buckles, cufflinks, and high-end jewelry pieces that could leverage this sustainable yet luxurious-looking material. Notably, the material’s light weight and unique light-reflective quality could offer aesthetic and functional advantages over traditional metal or mineral accessories.
*   **Material insights:** Through R&D exchanges, an “incredible” property of Black Diamond’s material was discovered, hinting at additional applications or performance benefits. (For confidentiality, details are limited, but it has sparked new ideas that our team is exploring.)  
    **Estimated % complete:** \~40%  
    **Status:** **Active** (advanced prototyping)  
    **Next steps:**
*   **Internal review of sample:** Upon its arrival, convene a review with Design, Accessories, and RL Labs teams to assess the Black Diamond logo sample. Gather feedback on look, feel, and brand alignment. If it meets aesthetic and quality standards, select one or two specific product applications to pursue (e.g. a women’s handbag logo or a cufflink for Purple Label).
*   **Pilot integration:** Work with Black Diamond to develop those pilot components. This may involve design adjustments or scaling the production method to our required volumes. Aim for pilot components to be ready in time for inclusion in a **Fall 2027** accessory collection or capsule.
*   **Validate performance:** Test the bio-resin pieces for durability (scratch resistance, weathering, etc.) to ensure they meet RL quality requirements. Concurrently, evaluate the sustainability claims (bio-based content, end-of-life compostability or recyclability) for alignment with our standards.
*   **Scale decision:** If pilots are successful, negotiate a broader supply agreement or collaboration for Black Diamond material across relevant product categories. If there are significant issues (e.g. material brittleness, cost, or supply capacity), decide whether to continue development or pause.

**Gildform (3D Metal Prototyping & Accessories)**: *Collaboration with Gildform, a 3D-printing and digital manufacturing studio, to rapidly prototype and produce small metal accessories (buttons, charms, jewelry) with complex designs – initially focused on Olympic-themed pieces.*  
**Accomplished updates:**

*   **Olympic prototypes delivered:** In late 2025, Gildform manufactured multiple custom metal accessory samples for RL’s Olympic collection, including: **pictogram sport buttons** (with engraved Olympic sports icons), an **Olympic pony logo tie bar**, and various 3D-printed **bear and boot charms**. These items were designed in collaboration with RL’s men’s and women’s accessories teams (e.g. key inputs from designer Jimmy Chan on the button concept). All prototypes were completed and shipped by late November 2025 for evaluation by RL and the U.S. Olympic & Paralympic Committee (USOPP).
*   **Positive feedback & further use:** The prototypes were well-received for their detail and quality. The collaborative development process (leveraging Gildform’s 3D modeling to translate RL’s design vision into rapid prototypes) was successful, earning **praise from internal teams**. The U.S. Olympic partners reviewed the pieces (e.g. custom sports buttons for blazer sleeves) and provided favorable initial feedback.
*   **Process integration learnings:** Gildform’s digital manufacturing approach was tested in conjunction with RL’s traditional accessory supply chain in the US, UK, and Italy. The pilot uncovered efficiencies – for example, using 3D CAD models to speed up prototyping and facilitate communication between RL’s design team and conventional mold makers in our UK and Italy factories. This has sparked discussions about how to incorporate 3D printing into our regular accessory development process (beyond the Olympics).
*   **Next-level collaboration:** Buoyed by pilot success, RL and Gildform began exploring deeper supply chain integration. Gildform representatives are planning an **in-person visit/meeting** with RL’s accessory manufacturing partners to discuss scaling production and possibly using 3D-printed master patterns or direct production for small-run items.  
    **Estimated % complete:** \~60%  
    **Status:** **Active** (transitioning from pilot to scale)  
    **Next steps:**
*   **Olympic collection inclusion:** Finalize which Gildform-developed pieces will be adopted in the LA28 uniform or commemorative product line. Coordinate any needed design refinements and prepare for limited production (before the late 2027 merchandise release).
*   **Expand use cases:** Identify other high-detail, low-volume accessory needs in RL’s portfolio (e.g. limited-edition charms, logo hardware for handbags, custom buckles) that could benefit from Gildform’s rapid 3D printing and casting process. Begin at least one new pilot in a non-Olympic category in FY27 to test broader applicability.
*   **Supply chain alignment:** Host the planned cross-collaboration meeting with Gildform and RL’s accessory suppliers. Aim to outline a hybrid workflow where Gildform’s digital models and rapid prototypes can shorten development cycles for traditional manufacturing. This may include training our vendors on using 3D files or even producing final parts via Gildform to meet spikes in demand for personalization or limited drops.
*   **Evaluate ROI:** As we scale, monitor cost, quality, and lead times. Ensure the business case holds – Gildform’s process should ideally reduce development time/cost for complex metal parts without sacrificing quality or significantly raising unit cost. Summarize the findings for possible broader adoption.

**Hilos (3D-Printed Footwear Pilot)**: *Partnership with Hilos, a 3D printing footwear startup, to develop customizable, on-demand shoes using advanced manufacturing (additive manufacturing) techniques.*  
**Accomplished updates:**

*   **SOW and funding:** Executed a **$35K Statement of Work** with Hilos to kick off development (initial $25K scope plus a $10K extension for additional work). Our Procurement team (led by Dale P.) approved combining these into a single purchase order to streamline payment. Two custom 3D-printed shoe lasts were commissioned ($2,750) as the first step, indicating a focus on creating RL-specific shoe shapes for prototyping.
*   **Design concepts:** Identified two pilot shoe designs (likely one men’s and one women’s style) to focus on for 3D print development. The styles are expected to feature 3D-printed components (e.g., lattice-structured midsoles or fully printed uppers) to test aesthetic and functional viability. Design and innovation teams have been collaborating with Hilos to align on these concepts.
*   **Technical development:** Hilos has begun printing and iterating on the shoe components using our custom lasts. The 3D prints will allow rapid design tweaks – for example, adjusting fit or flexibility – which can then be quickly reprinted for testing.  
    **Estimated % complete:** \~30%  
    **Status:** **Active** (development phase)  
    **Next steps:**
*   **Prototyping:** Continue iterative prototyping of the two chosen shoe designs. Target an initial round of fully assembled prototypes in Spring 2026, incorporating 3D-printed parts and any conventional components (like outsoles or uppers) as needed.
*   **Testing:** Evaluate the prototypes for comfort, durability, and style. Engage RL footwear experts and possibly a small group of wear-testers for feedback on fit and performance. Ensure the 3D-printed material meets RL’s standards for wear (e.g. does not crack or deform with use).
*   **Manufacturing plan:** If prototypes are promising, develop a plan to scale production. This may involve using Hilos’s service bureau for small-batch manufacturing or transferring the technology to a factory. Confirm that the cost per pair and production throughput can meet RL’s requirements for a limited pilot launch.
*   **Launch strategy:** If approved, consider introducing the 3D-printed footwear as a limited release or part of a special collection in FY27. Use it as a marketing story (e.g., highlighting on-demand manufacturing and innovation). Concurrently, monitor consumer response and durability in the field to inform potential broader use of 3D printing in footwear or other product categories.

**Digital & AI Initiatives (Product Development & Knowledge Tools)**: *Various initiatives to leverage artificial intelligence and digital platforms for improving product innovation processes and customer experience.*  
**Accomplished updates:**

*   **Salesforce AI integration:** Kicked off an engagement with Salesforce’s AI team to enhance our internal **Innovation Pipeline** tool using AI capabilities. In January 2026, RL Innovation met with Salesforce to brainstorm use cases such as automated partner suggestions, external data mining for material trends, business case modeling, and even automated report generation. A follow-up working session was scheduled for mid-January, and an internal brainstorm was planned beforehand to refine our highest-value use cases. This could lead to pilots of features like AI-driven idea sourcing or evaluation within our Salesforce platform.
*   **NotebookLM for video content:** Experimented with Google’s *NotebookLM* AI to create dynamic presentation videos (e.g. Biostretch teasers) from project documentation. Results were mixed – while the AI accelerated content creation, slide design control was limited, leading to some aesthetic issues. The team is iterating with improved prompts to achieve more polished videos under 90 seconds for different audiences.
*   **“Sinfully” pattern optimization:** Explored a new AI-driven pattern-making tool (code-named “Sinfully”) that can optimize garment pattern layouts to reduce fabric waste. Initial impressions are that it performs significantly better than previous tools (e.g. Tukatech’s SXD) in maximizing material utilization. The team identified potential hurdles like preserving RL’s fit standards and digitizing existing patterns into the system, but interest is high due to potential fabric savings.
*   **Recommerce platform analysis:** Investigated digital solutions for enabling annotated recommerce of RL products. Updated a business case with data from a trial on Poshmark, including financial and customer engagement projections, and reviewed it with Finance in early 2026. Also engaged with eBay on a proposal to integrate RL’s digital product IDs for resale authentication. Ultimately, these efforts have been de-prioritized as the business focuses on higher-impact initiatives (no immediate launch planned).
*   **Virtual Try-On (VTO):** Built out a comprehensive business case for virtual try-on technology to enhance online size & fit guidance. By August 2025, collaborated with the Digital team to model various scenarios (by brand, region, product category) and estimated ROI of reducing fit-related returns. Engaged an external vendor (likely 3D/look-based try-on provider) in exploratory discussions. However, as of early 2026, the Digital team has not committed to a VTO solution – fit improvement efforts may be addressed through other tools, and **this project is on hold** pending a stronger business driver.  
    **Estimated % complete:** \~25% (ongoing exploratory initiatives)  
    **Status:** **Active** (various stages; some **on hold**)  
    **Next steps:**
*   **AI integration**: Continue the Salesforce AI use-case development. By mid-2026, aim to pilot at least one feature (e.g. an *AI model that analyzes innovation ideas and suggests relevant internal experts or external partners*). Measure time saved or quality improvements in decision-making.
*   **Pattern AI trial**: Arrange a pilot with Sinfully on a test garment in collaboration with Technical Design. Provide digital pattern files and evaluate fabric savings and pattern fidelity. If successful, involve manufacturing partners to assess real-world implementation.
*   **Revisit VTO and Recommerce**: These digital consumer-facing projects are paused as of Q1 2026, but maintain the research. Should business priorities shift (e.g. a renewed push for personalization or circular commerce), have refined proposals ready. For VTO, keep in touch with vendors and monitor competitors’ adoption; for recommerce, continue low-effort partnership opportunities (e.g. verifying RL items on established resale platforms).
*   **Internal innovation sharing**: Leverage collaborative platforms (we launched an internal “Trifecta” community on RL’s Engage intranet in Feb 2026 to share innovation and sustainability news). Use such channels, plus AI tools like MS CoPilot and ChatGPT, to enhance knowledge sharing and keep the global team aligned on innovation projects and insights.`;

async function runMigration() {
    const chunks = updateText.split(/\n(?=\*\*)/);
    console.log(`Found ${chunks.length} potential project chunks.`);

    // Initial cooldown to let quota reset
    console.log("Waiting 60s for initial quota reset...");
    await new Promise(r => setTimeout(r, 60000));

    // Fetch existing projects for context
    const snapshot = await db.collection('projects').get();
    const allProjects = snapshot.docs.map(doc => ({ id: doc.id, name: doc.get('name') }));

    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i].trim();
        if (!chunk) continue;

        console.log(`\nProcessing Chunk ${i + 1}/${chunks.length}...`);

        let retryCount = 0;
        const maxRetries = 5;
        let success = false;

        while (retryCount < maxRetries && !success) {
            try {
                const prompt = `
            You are the "Nexus Track" AI engine. Analyze the following UPDATE TEXT.
            
            UPDATE TEXT:
            """
            ${chunk}
            """

            EXISTING PROJECTS:
            ${allProjects.map(p => `- ID: ${p.id}, Name: ${p.name}`).join('\n')}

            INSTRUCTIONS:
            1. Identify projects mentioned. Use existing IDs if they match.
            2. If new, generate kebab-case ID.
            3. Return ONLY JSON:
            {
              "updates": [
                {
                  "project_id": "string",
                  "project_name": "string",
                  "updated_accomplishments": ["bullet1", "bullet2"],
                  "upcoming_steps": ["bullet1", "bullet2"],
                  "project_health": "Green",
                  "overall_progress": 70
                }
              ]
            }
          `;

                const result = await genAI.models.generateContent({
                    model: "gemini-flash-latest",
                    contents: [{ role: "user", parts: [{ text: prompt }] }],
                    config: { responseMimeType: "application/json" }
                });

                const responseText = result.candidates[0].content.parts[0].text;
                const synthesized = JSON.parse(responseText);

                for (const update of synthesized.updates) {
                    const payload = {
                        name: update.project_name,
                        accomplishments: update.updated_accomplishments || [],
                        upcoming_steps: update.upcoming_steps || [],
                        current_health: update.project_health || "Green",
                        overall_progress: update.overall_progress || 0,
                        last_update_timestamp: new Date().toISOString()
                    };

                    const projRef = db.collection("projects").doc(update.project_id);
                    await projRef.set(payload, { merge: true });
                    await projRef.collection("raw_updates").add({
                        raw_text: chunk,
                        timestamp: new Date().toISOString()
                    });
                    console.log(`  - Updated/Created: ${update.project_id}`);
                }

                success = true;
            } catch (error) {
                console.log(`  - Failed (Attempt ${retryCount + 1}):`, error.message);
                retryCount++;
                const waitTime = retryCount * 60000; // Conservative 60s per retry
                console.log(`    Waiting ${waitTime / 1000}s...`);
                await new Promise(r => setTimeout(r, waitTime));
            }
        }

        // Pacing delay to stay safe
        console.log(`  - Chunk processed. Waiting 20s for next chunk...`);
        await new Promise(r => setTimeout(r, 20000));
    }
    console.log("\nMigration completed.");
    process.exit(0);
}

runMigration().catch(err => {
    console.error("Critical Migration Error:", err);
    process.exit(1);
});
