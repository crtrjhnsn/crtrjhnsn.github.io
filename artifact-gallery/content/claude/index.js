import { useState } from "react";

const data = {
  businessLines: [
    { name: "Innovative Medicine", pct: "~60%", desc: "Pharmaceuticals across oncology, immunology, neuroscience, cardiovascular, and other therapeutic areas." },
    { name: "MedTech", pct: "~40%", desc: "Surgery, cardiovascular devices (Abiomed, Shockwave), and vision products." },
  ],
  therapeuticAreas: [
    {
      name: "Oncology",
      color: "#B91C1C",
      bg: "#FEF2F2",
      goal: "Goal: #1 oncology company by 2030 — $50B target",
      drugs: [
        {
          name: "Darzalex / Darzalex Faspro",
          generic: "Daratumumab / Daratumumab + hyaluronidase-fihj",
          phase: "Approved (expanding indications)",
          moleculeType: "Monoclonal Antibody (mAb), IgG1κ",
          target: "CD38",
          moa: "Binds CD38 on myeloma cell surface → triggers immune-mediated cell death via complement-dependent cytotoxicity (CDC), antibody-dependent cellular cytotoxicity (ADCC), antibody-dependent cellular phagocytosis (ADCP), and direct apoptosis. Faspro is a subcutaneous formulation co-formulated with hyaluronidase for faster delivery (~5 min vs hours IV).",
          indication: "Multiple myeloma (newly diagnosed and relapsed/refractory); multiple line combinations",
          administration: "IV infusion (Darzalex) or subcutaneous injection (Faspro)",
          tam: "Multiple myeloma: ~180,000 new cases globally/yr. Darzalex 2025 revenue: $14.4B. J&J targeting $25B+ in MM by 2030.",
          renewalLength: "Ongoing treatment — typically continues until disease progression. Dosing transitions from weekly → biweekly → monthly maintenance.",
          insurance: "Covered under medical benefit (Part B for Medicare). Buy-and-bill through oncology practices. Specialty pharmacy/infusion center required for IV form. Major commercial payers cover broadly given NCCN Category 1 status.",
          prescribers: "Hematologist-oncologists are sole prescribers. Academic centers drive initial adoption; community oncology now maturing. High prescriber loyalty due to deep clinical data.",
          salesPoints: "Backbone of nearly every myeloma regimen now. Faspro's sub-Q format saves infusion time and chair costs. Phase 3 data in combination with Tecvayli (MajesTEC-3) showing 83% reduction in progression/death risk. First-line through relapsed coverage.",
          trialPipeline: "CEPHEUS (frontline transplant-ineligible), AURIGA (MRD-guided), MajesTEC-3 (w/ Tecvayli combo). Expanding into amyloidosis."
        },
        {
          name: "Tecvayli",
          generic: "Teclistamab-cqyv",
          phase: "Approved (full conversion from accelerated to regular approval, Mar 2026)",
          moleculeType: "Bispecific T-cell Engager Antibody (IgG4)",
          target: "BCMA × CD3",
          moa: "Simultaneously binds BCMA on myeloma cells and CD3 on T cells → redirects T cells to kill myeloma cells. Does not require genetic modification of patient T cells (off-the-shelf, unlike CAR-T).",
          indication: "Relapsed/refractory multiple myeloma (≥1 prior line, now approved with Darzalex combo)",
          administration: "Subcutaneous injection; step-up dosing schedule in-hospital, then weekly maintenance",
          tam: "Part of J&J's $25B MM franchise target. Tecvayli Q4 2025 sales: $176M, growing 21% YoY. Peak potential >$5B.",
          renewalLength: "Ongoing until disease progression or unacceptable toxicity. Weekly dosing after step-up.",
          insurance: "Medical benefit; specialty oncology. REMS program for CRS monitoring. Payers requiring prior authorization with failure of ≥1 prior line.",
          prescribers: "Hematologist-oncologists exclusively. Currently concentrated at academic/tertiary centers due to CRS monitoring requirements; spreading to community oncology.",
          salesPoints: "Off-the-shelf bispecific — no manufacturing wait time unlike CAR-T. MajesTEC-9 showed 71% reduction in progression risk. Now approved in combo with Darzalex. Fixed-duration potential being studied. Bridges to Carvykti CAR-T if needed.",
          trialPipeline: "MajesTEC-9 (post-Darzalex population), Monumental-6 (Tecvayli + Talvey combo), PERSEUS-2 (frontline)."
        },
        {
          name: "Carvykti",
          generic: "Ciltacabtagene autoleucel (cilta-cel)",
          phase: "Approved (expanded to 1L relapse, 2024)",
          moleculeType: "CAR-T Cell Therapy (autologous, lentiviral vector)",
          target: "BCMA (two distinct epitopes via llama-derived nanobody domains)",
          moa: "Patient's T cells are extracted via leukapheresis → genetically modified ex vivo with a lentiviral vector encoding a CAR with two BCMA-targeting single-domain antibodies + 4-1BB costimulatory domain + CD3-ζ signaling domain → expanded, cryopreserved, and infused back. Modified T cells recognize BCMA on myeloma cells → activation, expansion, and tumor cell destruction.",
          indication: "Relapsed/refractory multiple myeloma after ≥1 prior line (including PI and IMiD, lenalidomide-refractory)",
          administration: "Single IV infusion at REMS-certified treatment center. Requires leukapheresis → 4-5 weeks manufacturing → lymphodepleting chemo → infusion. Patients must stay near center ≥14 days post-infusion.",
          tam: "Q4 2025 sales: $555M (up 66% YoY). Peak potential >$5B. Frontline studies (CARTITUDE-5, -6) could dramatically expand TAM.",
          renewalLength: "Single infusion — one-time treatment. No maintenance dosing. Long-term monitoring for secondary malignancies per REMS.",
          insurance: "One of the highest-cost therapies (~$465,000 WAC per treatment). Covered under medical benefit with prior authorization. CMS and commercial payers cover at REMS-certified centers. Outcomes-based contracting being explored.",
          prescribers: "Hematologist-oncologists at certified CAR-T centers only. Limited to ~100+ certified sites in US. Academic medical centers are primary drivers. Community oncologists refer patients.",
          salesPoints: "98% overall response rate in CARTITUDE-1. First BCMA-targeted therapy approved as early as first relapse. Single infusion — no ongoing treatment burden. Dual-epitope binding reduces antigen escape. CARTITUDE-4 Phase 3 showed superior PFS vs standard of care. J&J investing $1B in PA manufacturing facility to expand capacity.",
          trialPipeline: "CARTITUDE-5 (transplant-ineligible frontline), CARTITUDE-6 (vs. autologous transplant in eligible patients). Moving toward newly diagnosed."
        },
        {
          name: "Talvey",
          generic: "Talquetamab-tgvs",
          phase: "Approved (2023, accelerated)",
          moleculeType: "Bispecific T-cell Engager Antibody",
          target: "GPRC5D × CD3",
          moa: "Binds GPRC5D (a receptor on myeloma cells distinct from BCMA) and CD3 on T cells → T cell-mediated killing. Offers a non-BCMA target for patients who progressed on BCMA-directed therapies.",
          indication: "Relapsed/refractory MM after ≥4 prior lines including PI, IMiD, anti-CD38",
          administration: "Subcutaneous injection; step-up dosing then biweekly maintenance",
          tam: "Early commercial stage. Peak potential >$5B per J&J guidance. Unique value in post-BCMA therapy landscape.",
          renewalLength: "Ongoing until progression. Biweekly after step-up.",
          insurance: "Medical benefit. REMS program. Prior auth requiring demonstration of ≥4 prior lines (may broaden with confirmatory trials).",
          prescribers: "Hematologist-oncologists at experienced centers. Step-up dosing requires hospital/clinic monitoring.",
          salesPoints: "Only GPRC5D-targeted therapy on market. Non-overlapping target with Tecvayli/Carvykti — enables sequencing. Novel MOA for BCMA-refractory patients. Being studied in combination with Tecvayli (Monumental-6).",
          trialPipeline: "Monumental-6 (Talvey + Tecvayli combo), MonumenTAL-5 (earlier lines)."
        },
        {
          name: "Rybrevant + Lazcluze",
          generic: "Amivantamab-vmjw + Lazertinib",
          phase: "Approved combo (2024)",
          moleculeType: "Bispecific antibody (Rybrevant: EGFR × MET) + 3rd-gen EGFR TKI (Lazcluze)",
          target: "EGFR, MET, and EGFR kinase domain",
          moa: "Rybrevant simultaneously binds EGFR and MET on tumor cells → blocks ligand binding, receptor degradation, and immune-mediated cell killing via ADCC. Lazcluze is an oral brain-penetrant EGFR tyrosine kinase inhibitor that blocks signaling even at the T790M resistance mutation. Combination provides dual extracellular and intracellular EGFR blockade.",
          indication: "First-line EGFR-mutated locally advanced/metastatic NSCLC",
          administration: "Rybrevant: IV infusion (sub-Q formulation pending approval). Lazcluze: oral daily pill",
          tam: "NSCLC ~235,000 new US cases/yr; EGFR-mutated ~15-20% of NSCLC. Competing with AstraZeneca's Tagrisso ($6B+ market). Combined peak potential >$5B.",
          renewalLength: "Continuous until progression. Rybrevant Q2W then Q3W; Lazcluze daily oral.",
          insurance: "Medical benefit (Rybrevant IV) + pharmacy benefit (Lazcluze oral). Specialty oncology prior auth. NCCN preferred regimen status.",
          prescribers: "Medical oncologists; lung cancer specialists. Academic centers adopting first; community oncology following.",
          salesPoints: "MARIPOSA trial: 40% reduction in death risk vs. Tagrisso monotherapy. First bispecific + TKI combo in 1L NSCLC. CNS penetration via Lazcluze addresses brain metastases. Sub-Q formulation will reduce infusion burden.",
          trialPipeline: "MARIPOSA-2 (2L+), PALOMA-3 (w/ chemo), sub-Q Rybrevant filing expected 2026."
        },
        {
          name: "Erleada",
          generic: "Apalutamide",
          phase: "Approved",
          moleculeType: "Small molecule — androgen receptor (AR) inhibitor",
          target: "Androgen receptor",
          moa: "Binds directly to the ligand-binding domain of the androgen receptor → prevents AR nuclear translocation and DNA binding → inhibits AR-mediated transcription → slows prostate cancer growth.",
          indication: "Non-metastatic castration-resistant prostate cancer (nmCRPC) and metastatic castration-sensitive prostate cancer (mCSPC)",
          administration: "Oral tablet, 240mg once daily",
          tam: "Prostate cancer: ~290,000 new US cases/yr. Erleada competes with Pfizer/Astellas Xtandi (enzalutamide). 2025 sales strong and growing.",
          renewalLength: "Continuous daily oral until progression. Typically years-long treatment courses.",
          insurance: "Pharmacy benefit with specialty tier. Prior auth common — must demonstrate castrate-resistant or castrate-sensitive status. Medicare Part D covered with formulary placement.",
          prescribers: "Urologists and medical oncologists. Urologists are key early prescribers in nmCRPC. Oncologists drive mCSPC.",
          salesPoints: "SPARTAN trial: 2-year improvement in metastasis-free survival vs placebo in nmCRPC. TITAN trial: 48% reduction in death risk in mCSPC. Oral convenience. Better rash/fatigue profile vs some competitors. Earlier treatment positioning (pre-metastatic).",
          trialPipeline: "Combinations with PARP inhibitors and novel agents under investigation."
        },
        {
          name: "Inlexzo (TAR-200)",
          generic: "Erdafitinib intravesical system",
          phase: "Approved (Sep 2025)",
          moleculeType: "Drug-eluting intravesical device",
          target: "FGFR (via sustained local erdafitinib delivery)",
          moa: "A miniaturized device is inserted into the bladder through a catheter and slowly releases erdafitinib (an FGFR inhibitor) directly into the bladder tissue over ~3 weeks → provides sustained local drug exposure while minimizing systemic side effects. Erdafitinib blocks FGFR signaling that drives tumor growth in bladder cancer.",
          indication: "High-risk non-muscle invasive bladder cancer (NMIBC), BCG-unresponsive",
          administration: "Intravesical insertion via catheter by urologist. Device replaced every ~3 weeks for treatment cycles.",
          tam: "Bladder cancer ~83,000 new US cases/yr; ~75% are NMIBC. BCG-unresponsive subset is a high unmet need. Peak potential >$5B per J&J.",
          renewalLength: "Treatment course of ~12 cycles (device changes). Not indefinite maintenance.",
          insurance: "Medical benefit — procedure-based. Prior auth likely requiring BCG-unresponsive documentation. Covered by major commercial and Medicare plans.",
          prescribers: "Urologists exclusively. Community urology practices are primary prescribers. 82% complete response rate is a strong selling point.",
          salesPoints: "First-of-its-kind drug-releasing system for bladder cancer. Avoids radical cystectomy (bladder removal) — major quality-of-life advantage. 82% complete response without reinduction. Local delivery = minimal systemic toxicity. Fills massive unmet need in BCG-unresponsive population.",
          trialPipeline: "Expanding into muscle-invasive bladder cancer and combination studies."
        }
      ]
    },
    {
      name: "Immunology",
      color: "#1D4ED8",
      bg: "#EFF6FF",
      goal: "Rebuilding post-Stelara LOE — Tremfya + Icotyde franchise",
      drugs: [
        {
          name: "Tremfya",
          generic: "Guselkumab",
          phase: "Approved (expanding into IBD)",
          moleculeType: "Monoclonal Antibody (mAb), IgG1λ",
          target: "IL-23 (specifically the p19 subunit)",
          moa: "Binds the p19 subunit of IL-23 → prevents IL-23 from engaging its receptor on T cells → blocks downstream activation of Th17 cells and production of pro-inflammatory cytokines (IL-17A, IL-17F, IL-22). Reduces the inflammatory cascade responsible for psoriatic plaques, joint destruction, and intestinal inflammation.",
          indication: "Moderate-to-severe plaque psoriasis, psoriatic arthritis, ulcerative colitis (newly approved), Crohn's disease (pending)",
          administration: "Subcutaneous injection; loading doses then Q8W maintenance (psoriasis), IV induction → SC maintenance (IBD)",
          tam: "Psoriasis market >$20B globally. Competing with AbbVie Skyrizi. Tremfya expanding into IBD ($15B+ addressable). 2026 consensus Q1 estimate: $1.42B.",
          renewalLength: "Ongoing — Q8W injections for psoriasis. Chronic disease management requiring indefinite treatment.",
          insurance: "Pharmacy benefit (specialty). Step therapy often required — fail topicals first, sometimes an older biologic. Major PBMs cover with prior auth. J&J patient assistance programs available.",
          prescribers: "Dermatologists (psoriasis), rheumatologists (PsA), gastroenterologists (IBD). Derms are highest volume. GI expansion is a key growth driver.",
          salesPoints: "IL-23 class is outperforming IL-17 in long-term data. Superior durability vs. Stelara (which J&J is transitioning away from). IBD expansion (UC approval, Crohn's pending) dramatically increases addressable market. Subcutaneous convenience. VOYAGE and ECLIPSE trial data.",
          trialPipeline: "Crohn's disease filing expected 2026. Subcutaneous induction for UC. Head-to-head studies vs. Skyrizi."
        },
        {
          name: "Icotyde",
          generic: "Icotrokinra",
          phase: "Approved (Mar 2026)",
          moleculeType: "Macrocyclic Peptide (oral)",
          target: "IL-23 Receptor (IL-23R)",
          moa: "An orally bioavailable macrocyclic peptide that selectively binds the IL-23 receptor on immune cells → blocks IL-23 from engaging its receptor → prevents downstream Th17 pathway activation and pro-inflammatory cytokine release. Unlike Tremfya which neutralizes the IL-23 cytokine itself, Icotyde blocks the receptor side — same pathway, different approach. First oral drug to achieve injectable-biologic-level efficacy in IL-23 blockade.",
          indication: "Moderate-to-severe plaque psoriasis in adults and adolescents ≥12 years weighing ≥40kg",
          administration: "Oral tablet, 200mg once daily on empty stomach",
          tam: "~8M Americans and ~125M globally with psoriasis; ~25% moderate-to-severe. J&J projects >$5B peak sales. G7 market forecast: $1.5B by 2031 (psoriasis alone). Additional IBD indications could multiply TAM.",
          renewalLength: "Continuous daily oral therapy. Chronic condition — long-term/indefinite use expected.",
          insurance: "Pharmacy benefit (oral specialty). Likely Tier 4-5 specialty tier. Prior auth requiring moderate-to-severe disease documentation and failure of topicals. Copay assistance programs expected. Price not yet publicly disclosed but likely positioned below injectable biologics (~$100K/yr) to drive adoption.",
          prescribers: "Dermatologists are primary target. PCPs/family medicine for patients cycling on topicals who need escalation. Rheumatologists and GIs if/when PsA, UC, Crohn's indications arrive.",
          salesPoints: "GAME-CHANGER talking point: First oral IL-23R targeted therapy. 70% achieved clear/almost clear skin at 16 weeks — beats BMS Sotyktu head-to-head. Oral convenience eliminates injection burden and needle anxiety. Adolescent labeling from launch (age ≥12). Only 30-40% of psoriasis market is penetrated — huge expansion opportunity in patients avoiding injectables. Safety profile within 1.1% of placebo through Week 16.",
          trialPipeline: "ICONIC-ASCEND (vs. Stelara), Psoriatic arthritis (Phase 3), Ulcerative colitis (Phase 3), Crohn's disease (Phase 3). These indications could make it a multi-blockbuster franchise."
        },
        {
          name: "Imaavy",
          generic: "Nipocalimab-aahu",
          phase: "Approved (Apr 2025, gMG); expanding indications",
          moleculeType: "Monoclonal Antibody (mAb) — fully human, aglycosylated, effectorless IgG1",
          target: "Neonatal Fc Receptor (FcRn)",
          moa: "Binds FcRn with extremely high affinity at both acidic (endosomal, pH 6) and neutral (extracellular, pH 7.6) pH → prevents FcRn from recycling IgG antibodies from endosomes back to circulation → unbound IgG (including pathogenic autoantibodies) is routed to lysosomes for degradation. Selectively lowers IgG without affecting IgA, IgM, IgE, or albumin. Also blocks placental transfer of maternal IgG alloantibodies to the fetus.",
          indication: "Generalized myasthenia gravis (gMG) in adults — first approved indication. Under study in lupus, Sjögren's, HDFN, warm autoimmune hemolytic anemia, and others.",
          administration: "IV infusion, Q2W (every 2 weeks) or Q4W depending on indication",
          tam: "gMG: ~70,000-100,000 US patients. Competing with Argenx Vyvgart. FcRn blocker class expanding into many autoimmune diseases — total FcRn market potentially $10B+. J&J projects >$5B peak for nipocalimab across indications.",
          renewalLength: "Ongoing maintenance — chronic autoimmune condition requires continued IgG suppression. Q2W or Q4W infusions indefinitely.",
          insurance: "Medical benefit (Part B). Specialty pharmacy/infusion center. Prior auth requiring confirmed gMG diagnosis (AChR+ or MuSK+). Payer coverage improving as FcRn class gains acceptance.",
          prescribers: "Neurologists (gMG) — both academic neuromuscular specialists and community neurologists. Rheumatologists for lupus/RA indications if approved. MFM specialists for HDFN.",
          salesPoints: "First and only fully human FcRn blocker — unique selectivity (preserves albumin unlike some competitors). Fast Track designation for lupus (March 2026). First FcRn option for MuSK+ gMG patients. Broadest pipeline across autoimmune segments. Immunoselective — preserves IgA, IgM, IgE and innate immune function.",
          trialPipeline: "Phase 3: Lupus (SLE), Sjögren's, HDFN, warm autoimmune hemolytic anemia. Phase 2: RA, idiopathic inflammatory myopathy. Fast Track for lupus granted March 2026."
        }
      ]
    },
    {
      name: "Neuroscience",
      color: "#7C3AED",
      bg: "#F5F3FF",
      goal: "Long-term growth pillar — anchored by $14.6B Intra-Cellular acquisition",
      drugs: [
        {
          name: "Caplyta",
          generic: "Lumateperone tosylate",
          phase: "Approved (schizophrenia, bipolar depression, adjunct MDD)",
          moleculeType: "Small molecule — atypical antipsychotic",
          target: "Serotonin 5-HT2A, dopamine D2, serotonin reuptake transporter (SERT), glutamate (D-serine pathway)",
          moa: "Multi-receptor modulator: potent 5-HT2A antagonist → anti-hallucinatory; moderate D2 partial agonist at mesolimbic dopamine → antipsychotic without heavy sedation; serotonin reuptake inhibition → antidepressant effect; glutamatergic modulation via D-serine transporter inhibition → cognitive and mood benefits. Unique multi-target profile at therapeutic dose results in favorable metabolic and movement side-effect profile.",
          indication: "Schizophrenia (adults), bipolar I/II depression (mono/adjunct), major depressive disorder (adjunct, approved Nov 2025)",
          administration: "Oral capsule, 42mg once daily at bedtime",
          tam: "Schizophrenia: ~3.5M US patients. Bipolar depression: ~7M US patients. MDD: ~21M US adults. MDD adjunct label massively expands addressable market. Caplyta was the only drug approved for bipolar I and II depression prior to the MDD expansion.",
          renewalLength: "Continuous daily oral. Chronic psychiatric conditions — long-term/indefinite treatment. Monthly Rx refills.",
          insurance: "Pharmacy benefit. Specialty/non-preferred brand tier. Step therapy common — PCPs may need to trial generic antidepressants/antipsychotics first. Prior auth for some payers. J&J patient assistance available.",
          prescribers: "Psychiatrists are primary prescribers. PCPs/family medicine increasingly prescribing for MDD adjunct (massive volume opportunity). Neuropsychiatrists for complex cases.",
          salesPoints: "Only drug approved across schizophrenia + bipolar I + bipolar II depression + MDD adjunct — broadest CNS label. Favorable metabolic profile (weight, glucose, lipids) vs. older atypicals. Low movement disorder risk. Once-daily dosing. MDD adjunct approval (Nov 2025) driving rapid new patient starts. Phase 3 showed significantly greater remission rates in MDD when combined with antidepressant vs. placebo + antidepressant.",
          trialPipeline: "Neurodegenerative conditions under exploration. Label expansion within existing indications."
        },
        {
          name: "Spravato",
          generic: "Esketamine nasal spray",
          phase: "Approved",
          moleculeType: "Small molecule — NMDA receptor antagonist (S-enantiomer of ketamine)",
          target: "NMDA glutamate receptor",
          moa: "Blocks NMDA receptors → triggers a cascade of neuroplastic changes including increased BDNF release and synaptogenesis → rapid antidepressant effect within hours to days (vs. weeks for SSRIs). The S-enantiomer has ~4x higher affinity for NMDA receptors than R-ketamine.",
          indication: "Treatment-resistant depression (TRD), major depressive disorder with acute suicidal ideation/behavior (MDSI)",
          administration: "Nasal spray administered under healthcare supervision in certified REMS centers. Self-administered under observation; patients monitored for ≥2 hours post-dose.",
          tam: "TRD affects ~5-7M US adults. MDSI: acute psychiatric populations. Growing. Spravato continuing to build primary care and psychiatry adoption.",
          renewalLength: "Induction: twice weekly for 4 weeks. Maintenance: weekly or Q2W. Ongoing as clinically needed.",
          insurance: "Medical + pharmacy benefit hybrid (drug is pharmacy, administration is medical). Prior auth requiring documented treatment resistance (≥2 failed adequate antidepressant trials). REMS certification required for treatment centers.",
          prescribers: "Psychiatrists primarily. Some certified PCPs and psychiatric NPs. Must be at REMS-certified treatment center.",
          salesPoints: "Rapid onset — hours not weeks. Only FDA-approved therapy for active suicidal ideation. Addresses massive TRD unmet need. Growing REMS network improving access. Insurance coverage expanding annually.",
          trialPipeline: "Ongoing real-world evidence studies. Expanded access protocols."
        }
      ]
    },
    {
      name: "Cardiovascular & Other",
      color: "#0F766E",
      bg: "#F0FDFA",
      goal: "Supporting franchises — Xarelto, Opsumit, Uptravi",
      drugs: [
        {
          name: "Xarelto",
          generic: "Rivaroxaban",
          phase: "Approved (mature asset)",
          moleculeType: "Small molecule — direct Factor Xa inhibitor",
          target: "Coagulation Factor Xa",
          moa: "Selectively and reversibly inhibits Factor Xa → blocks conversion of prothrombin to thrombin → prevents fibrin clot formation. Does not require antithrombin III as a cofactor (unlike heparin). Oral bioavailability.",
          indication: "DVT/PE treatment/prevention, stroke prevention in AFib, post-ACS, pediatric VTE",
          administration: "Oral tablet, once or twice daily depending on indication",
          tam: "One of the largest-selling anticoagulants globally. Facing generic entry pressures in some markets. J&J co-markets with Bayer.",
          renewalLength: "Varies: AFib = indefinite; post-surgical DVT prophylaxis = 12-35 days; VTE treatment = 3-12+ months.",
          insurance: "Pharmacy benefit. Broad formulary coverage as established DOAC. Generics emerging in some markets — price pressure increasing.",
          prescribers: "Cardiologists, hematologists, internal medicine, hospitalists, vascular surgeons. Broad prescriber base.",
          salesPoints: "Established, well-understood safety profile. Broad indication range. Pediatric formulation advantage. Subject to IRA Medicare negotiation — $2B estimated sales impact.",
          trialPipeline: "Pediatric VTE real-world data collection ongoing through 2026."
        }
      ]
    }
  ],
  glossary: [
    { term: "ADCC", cat: "bio", def: "Antibody-Dependent Cellular Cytotoxicity — an immune defense mechanism where an antibody coats a target cell, and natural killer (NK) cells recognize the antibody's tail and destroy the coated cell. One of Darzalex's kill mechanisms.", sub: "NK cells = immune cells that kill virus-infected/cancerous cells without prior sensitization. Antibody = a Y-shaped protein the immune system uses to tag foreign invaders." },
    { term: "ADCP", cat: "bio", def: "Antibody-Dependent Cellular Phagocytosis — similar to ADCC, but macrophages physically engulf and digest the antibody-coated target cell rather than NK cells killing it. Another Darzalex mechanism.", sub: "Macrophages = large immune 'eater' cells (from Greek: macro=large, phage=eater). Phagocytosis = the process of engulfing and digesting." },
    { term: "AChR", cat: "bio", def: "Acetylcholine Receptor — a protein at the neuromuscular junction where nerve signals transmit to muscles. In myasthenia gravis, autoantibodies attack AChR, blocking nerve-muscle communication. Imaavy reduces these pathogenic antibodies.", sub: "Neuromuscular junction = connection point between a nerve ending and a muscle fiber. Acetylcholine = chemical messenger (neurotransmitter) that tells muscles to contract." },
    { term: "Androgen Receptor (AR)", cat: "bio", def: "A protein inside prostate cells activated by male hormones (testosterone, DHT). When activated, AR enters the cell nucleus and turns on genes driving prostate cancer growth. Erleada blocks this receptor.", sub: "Testosterone = primary male sex hormone. DHT = dihydrotestosterone, a more potent form. Nucleus = the cell's control center containing DNA." },
    { term: "Apoptosis", cat: "bio", def: "Programmed cell death — a natural, orderly process where a cell self-destructs when damaged, old, or signaled. Many cancer drugs work by triggering apoptosis in tumor cells.", sub: "Unlike necrosis (chaotic death from injury), apoptosis is clean and controlled — the cell packages its contents for recycling without causing inflammation." },
    { term: "Autoantibody", cat: "bio", def: "An antibody that mistakenly targets the body's own healthy tissue instead of foreign invaders. Root cause of autoimmune diseases like myasthenia gravis, lupus, and RA. Imaavy clears autoantibodies from circulation.", sub: "Autoimmune disease = condition where the immune system attacks the body's own cells. 'Auto' = self." },
    { term: "BCMA", cat: "bio", def: "B-Cell Maturation Antigen — a protein overexpressed on myeloma cancer cells (and normal plasma cells). Ideal myeloma target. Carvykti (CAR-T) and Tecvayli (bispecific) both home in on BCMA.", sub: "B cells = immune cells that mature into plasma cells (antibody factories). Overexpressed = present in abnormally high amounts on cancer cells. Antigen = any molecule that can trigger an immune response." },
    { term: "BDNF", cat: "bio", def: "Brain-Derived Neurotrophic Factor — a protein supporting neuron survival and growth of new synaptic connections. Low BDNF is associated with depression. Spravato triggers BDNF release, possibly explaining its rapid antidepressant effect.", sub: "Synaptogenesis = formation of new synapses (connections between neurons). Neurotrophic = 'nerve-nourishing.'" },
    { term: "Bispecific Antibody", cat: "bio", def: "An engineered antibody that simultaneously binds two different targets. In oncology, one arm grabs a tumor antigen (BCMA, GPRC5D) while the other grabs CD3 on T cells, physically linking cancer cell to immune cell and forcing a kill. Tecvayli, Talvey, and Rybrevant are bispecifics.", sub: "Traditional (monospecific) antibodies bind only one target. 'Bi' = two, 'specific' = targeted binding." },
    { term: "Biosimilar", cat: "bio", def: "A biological product highly similar to an approved reference biologic with no clinically meaningful differences. Not 'generic biologics' — biologics are too complex to copy exactly. Stelara now faces 8+ biosimilar competitors.", sub: "Biologic = drug derived from living cells/organisms (vs. small molecules made by chemical synthesis). Generic = exact chemical copy of a small-molecule drug. Biosimilar approval is more rigorous than generic approval." },
    { term: "CAR-T", cat: "bio", def: "Chimeric Antigen Receptor T-cell therapy — patient's T cells are extracted, genetically reprogrammed in a lab with a synthetic receptor (CAR) that recognizes a cancer protein, expanded to billions, and infused back. Carvykti is J&J's CAR-T targeting BCMA.", sub: "Chimeric = made from parts of different organisms. Leukapheresis = blood-draw to collect T cells. Lentiviral vector = disabled virus that inserts the CAR gene. Lymphodepletion = brief chemo to 'make room' for new CAR-T cells." },
    { term: "CD3", cat: "bio", def: "A protein on all T cells essential for activation. Bispecific antibodies like Tecvayli and Talvey use one arm to bind CD3, engaging the patient's T cells and redirecting them toward cancer.", sub: "T cells = white blood cells that directly kill infected/cancerous cells. CD = 'Cluster of Differentiation' — a numbering system for cell surface proteins." },
    { term: "CD38", cat: "bio", def: "A glycoprotein on myeloma cell surfaces (and some normal blood cells). Target of Darzalex. When Darzalex binds CD38, it triggers ADCC, ADCP, CDC, and direct apoptosis.", sub: "Glycoprotein = a protein with sugar molecules attached. These sugars help cells communicate and recognize each other." },
    { term: "CDC", cat: "bio", def: "Complement-Dependent Cytotoxicity — antibodies on a cell's surface activate the complement system (a cascade of blood proteins) that punches holes in the target cell's membrane, causing it to burst. One of Darzalex's four kill mechanisms.", sub: "Complement system = ~30 blood proteins that amplify immune responses in a 'cascade' (each protein activates the next). Lyse = rupture a cell membrane." },
    { term: "CRS", cat: "bio", def: "Cytokine Release Syndrome — a potentially severe inflammatory reaction when T-cell-engaging therapies cause massive simultaneous T-cell activation. Ranges from fever to life-threatening organ dysfunction. Primary safety concern with Carvykti, Tecvayli, Talvey. Managed with tocilizumab and steroids.", sub: "Cytokines = small signaling proteins released by immune cells. Tocilizumab (Actemra) = anti-IL-6 antibody used as CRS antidote." },
    { term: "EGFR", cat: "bio", def: "Epidermal Growth Factor Receptor — cell surface receptor that promotes growth/division. Frequently mutated in NSCLC, causing uncontrolled tumor growth. Rybrevant targets EGFR from outside the cell; Lazcluze blocks it from inside.", sub: "Receptor = protein receiving chemical signals from outside the cell. Mutation = DNA change altering protein function. In cancer, EGFR mutations act like a stuck 'on' switch." },
    { term: "FcRn", cat: "bio", def: "Neonatal Fc Receptor — an intracellular receptor that rescues IgG antibodies from degradation, recycling them back to the bloodstream and maintaining their ~21-day half-life. Imaavy blocks FcRn, causing all IgG (including disease-causing autoantibodies) to be rapidly degraded. Also transports IgG across the placenta.", sub: "Fc = 'Fragment crystallizable' — antibody tail. Half-life = time for half of a substance to clear. Endosome = intracellular sorting compartment. Lysosome = cell's 'recycling center' that breaks down waste." },
    { term: "FGFR", cat: "bio", def: "Fibroblast Growth Factor Receptor — receptor tyrosine kinases controlling cell growth and blood vessel formation. Altered in ~15-20% of bladder cancers. Inlexzo releases erdafitinib (FGFR inhibitor) directly into the bladder.", sub: "Fibroblast = cell producing connective tissue. Tyrosine kinase = enzyme adding phosphate groups to proteins to activate signaling. Receptor tyrosine kinase = surface receptor that acts as a tyrosine kinase when activated." },
    { term: "GPRC5D", cat: "bio", def: "G Protein-Coupled Receptor Class C Group 5 Member D — protein on myeloma cells distinct from BCMA. Talvey targets GPRC5D, providing a non-overlapping option for BCMA-refractory patients.", sub: "GPCR = the largest family of cell surface receptors, transmitting signals via G proteins. GPCRs are the most common drug targets in all of medicine." },
    { term: "gMG", cat: "bio", def: "Generalized Myasthenia Gravis — chronic autoimmune neuromuscular disease where autoantibodies (anti-AChR or anti-MuSK) attack the neuromuscular junction, causing fluctuating muscle weakness. 'Generalized' = multiple muscle groups affected. Imaavy is approved for gMG.", sub: "Chronic = long-lasting. MuSK = Muscle-Specific Kinase, another NMJ protein. Imaavy is notably effective in MuSK+ patients." },
    { term: "IgG", cat: "bio", def: "Immunoglobulin G — most abundant antibody in blood (~75% of total). Has uniquely long ~21-day half-life due to FcRn recycling. Imaavy selectively lowers IgG while sparing IgA, IgM, and IgE.", sub: "Immunoglobulin = another word for antibody. Five classes: IgG, IgA (mucosal), IgM (first responder), IgD, IgE (allergic)." },
    { term: "IL-23 / IL-23R", cat: "bio", def: "IL-23 = pro-inflammatory cytokine activating Th17 cells, driving psoriasis and IBD. Tremfya blocks IL-23 itself (p19 subunit). Icotyde blocks the IL-23 receptor on T cells — same pathway, opposite side.", sub: "Interleukin = 'between white blood cells' — 40+ known interleukins. Th17 cells = helper T cells driving autoimmune inflammation. Cytokine = small signaling protein for cell communication." },
    { term: "Leukapheresis", cat: "bio", def: "Blood-collection procedure where blood is drawn, white blood cells (T cells for CAR-T) are separated by machine, and remaining components returned to the patient. First step in making Carvykti.", sub: "Apheresis = any procedure separating blood into components. 'Leuk-' = white (leukocyte = white blood cell)." },
    { term: "Macrocyclic Peptide", cat: "bio", def: "A medium-sized ring-shaped molecule made of amino acid building blocks. Combines biologic-level selectivity with small-molecule oral bioavailability. Icotyde's drug class.", sub: "Peptide = short chain of amino acids. Cyclic = ring shape, increasing stability and resistance to stomach acid. Oral bioavailability = fraction reaching systemic circulation when taken by mouth." },
    { term: "MET", cat: "bio", def: "Mesenchymal-Epithelial Transition factor — receptor tyrosine kinase promoting growth and migration. MET amplification is a common resistance mechanism when EGFR-mutated NSCLC escapes therapy. Rybrevant targets both EGFR and MET.", sub: "Amplification = cancer cells make extra gene copies, producing excess protein. Resistance mechanism = how cancer evolves to survive drug treatment." },
    { term: "Monoclonal Antibody (mAb)", cat: "bio", def: "Laboratory-made antibody designed to bind a single specific target with high precision, produced by identical clones of a single parent cell. Most J&J biologics (Darzalex, Tremfya, Imaavy) are mAbs.", sub: "Monoclonal = from a single clone. mAb naming: -umab = fully human, -ximab = chimeric (part mouse), -zumab = humanized." },
    { term: "MRD", cat: "bio", def: "Minimal Residual Disease — detection of tiny amounts of remaining cancer cells after treatment. MRD-negative at 10⁻⁵ (1 cancer cell per 100,000) is a key deep-response indicator in myeloma.", sub: "Higher sensitivity = deeper disease assessment. Carvykti achieves high MRD-negativity rates." },
    { term: "NMDA Receptor", cat: "bio", def: "N-Methyl-D-Aspartate receptor — a glutamate receptor crucial for synaptic plasticity, learning, and memory. Spravato blocks NMDA → triggers BDNF release and synaptogenesis → rapid antidepressant effect (hours vs. weeks for SSRIs).", sub: "Glutamate = brain's main excitatory neurotransmitter. Synaptic plasticity = synapses strengthening/weakening over time. SSRI = Selective Serotonin Reuptake Inhibitor (Prozac, Zoloft) — traditional antidepressants taking 4-6 weeks." },
    { term: "NSCLC", cat: "bio", def: "Non-Small Cell Lung Cancer — ~85% of all lung cancers. Includes adenocarcinoma, squamous cell, and large cell subtypes. ~15-20% harbor EGFR mutations, making them candidates for Rybrevant + Lazcluze.", sub: "Adenocarcinoma = cancer from gland-forming cells (most common subtype). Squamous cell = cancer from flat cells lining airways." },
    { term: "PASI 90/100", cat: "bio", def: "Psoriasis Area and Severity Index improvement of 90% or 100% — key efficacy endpoints in psoriasis trials measuring skin clearance. Icotyde achieved PASI 100 in 41-49% of patients by Week 24-52.", sub: "IGA 0/1 = Investigator's Global Assessment score of clear (0) or almost clear (1) — another key endpoint. PASI 75 = older, lower bar." },
    { term: "Th17 Cells", cat: "bio", def: "A subset of helper T cells producing IL-17 and other inflammatory cytokines. Major drivers of autoimmune inflammation in psoriasis, IBD, and psoriatic arthritis. IL-23 activates Th17 cells — which is why blocking IL-23 (Tremfya, Icotyde) is so effective.", sub: "Helper T cells = T cells that coordinate immune responses (vs. cytotoxic T cells that directly kill). IL-17 = a downstream inflammatory cytokine produced by Th17 cells." },
    { term: "TKI", cat: "bio", def: "Tyrosine Kinase Inhibitor — small molecule blocking enzyme activity of receptor tyrosine kinases inside the cell. Lazcluze is a 3rd-generation EGFR TKI that penetrates the brain and works on T790M resistance mutations.", sub: "1st-gen TKI = gefitinib/erlotinib. 2nd-gen = afatinib. 3rd-gen = osimertinib (Tagrisso), lazertinib (Lazcluze). Each generation overcomes resistance to the prior." },
    { term: "Buy-and-Bill", cat: "sales", def: "Physician purchases the drug, administers it to the patient, then bills the payer for drug cost + administration fee. Standard for IV/infused drugs (Darzalex, Tecvayli, Imaavy, Carvykti). Under Medicare Part B, reimbursed at ASP+6%.", sub: "ASP = Average Sales Price after manufacturer rebates. ASP+6% = physician's margin for purchasing/handling." },
    { term: "IRA / Part D Redesign", cat: "sales", def: "Inflation Reduction Act (2022) allows Medicare to negotiate drug prices, caps Part D out-of-pocket at $2,000/yr, and requires manufacturer rebates if prices rise faster than inflation. ~$2B impact on J&J. Xarelto, Stelara, Imbruvica among first 10 negotiated drugs.", sub: "Medicare Part B = physician-administered drugs (infused). Part D = pharmacy prescription drugs. PBM = Pharmacy Benefit Manager, the middleman negotiating drug prices." },
    { term: "LOE", cat: "sales", def: "Loss of Exclusivity — when patents and regulatory exclusivity expire, allowing biosimilar/generic competition. Typically triggers 30-80% revenue decline within 2-3 years for biologics. Stelara LOE is J&J's biggest current headwind.", sub: "Patent = legal right for exclusive commercial use (~20 years from filing). Data exclusivity = additional period where competitors can't reference originator's clinical data." },
    { term: "NCCN Guidelines", cat: "sales", def: "Treatment recommendations from the National Comprehensive Cancer Network (33 top US cancer centers). Category 1 status = gold standard, heavily influences payer coverage and prescriber behavior. Darzalex has Category 1 across multiple myeloma settings.", sub: "Category 1 = high-level evidence + uniform consensus. Category 2A = lower-level evidence + uniform consensus (still very strong)." },
    { term: "PFS", cat: "sales", def: "Progression-Free Survival — time from treatment start until disease worsens or patient dies. Most common primary endpoint in oncology trials. Longer PFS = drug keeping cancer at bay longer.", sub: "Overall Survival (OS) = time until death from any cause — ultimate gold standard but takes longer. Endpoint = measurable outcome a clinical trial is designed to assess." },
    { term: "Prior Authorization", cat: "sales", def: "Insurance requirement for prescriber to get payer approval before a drug is covered. Standard for specialty drugs. Typically requires documentation of diagnosis, severity, and sometimes failure of cheaper alternatives.", sub: "Turnaround: 24-72 hrs electronic, up to 2 weeks manual. Denial rates for specialty drugs: 10-30%. J&J provides hub services to assist." },
    { term: "REMS", cat: "sales", def: "Risk Evaluation and Mitigation Strategy — FDA-required safety program for drugs with serious risks. Can include mandatory certification, restricted distribution, specific monitoring. Carvykti, Tecvayli, Talvey, Spravato all have REMS.", sub: "REMS limits distribution to certified sites (~100+ for CAR-T in US), restricting prescriber base but ensuring proper safety monitoring." },
    { term: "Step Therapy / Fail First", cat: "sales", def: "Insurance policy requiring patients to try cheaper/older drugs before insurer covers a newer, expensive therapy. Common in immunology — patients often must fail topicals before Tremfya/Icotyde approval.", sub: "'Fail' = prior drug was ineffective, caused intolerable side effects, or is medically inappropriate. Some states have step therapy reform laws." },
    { term: "TAM", cat: "sales", def: "Total Addressable Market — total revenue opportunity across approved indications (eligible patients × price × treatment duration). TAM is aspirational — actual penetration is a fraction due to competition and access barriers.", sub: "SAM = Serviceable Addressable Market — the realistic portion a company can target given its distribution and competitive position." },
    { term: "WAC", cat: "sales", def: "Wholesale Acquisition Cost — manufacturer's list price before rebates, discounts, or negotiations. The 'sticker price' — actual prices paid are typically 20-60% lower after rebates. Carvykti WAC: ~$465,000.", sub: "Rebate = discount paid by manufacturer back to payer/PBM after sale (often confidential). Net price = WAC minus all rebates — actual revenue the manufacturer receives." },
    { term: "ADC", cat: "bio", def: "Antibody-Drug Conjugate — an antibody linked to a cytotoxic (cell-killing) drug via a chemical linker. The antibody delivers the toxic payload directly to cancer cells expressing the target antigen, sparing normal tissue. J&J acquired Ambrx's ADC platform in 2024.", sub: "Linker = chemical bridge connecting antibody to drug payload. Payload = the toxic drug (often too toxic to give systemically). Conjugate = chemically joined together." },
    { term: "Factor Xa", cat: "bio", def: "A serine protease (enzyme) in the coagulation cascade that converts prothrombin to thrombin, which then creates fibrin clots. Xarelto (rivaroxaban) directly inhibits Factor Xa to prevent clot formation.", sub: "Coagulation cascade = a chain-reaction series of enzyme activations that ultimately forms a blood clot. Serine protease = an enzyme that cuts other proteins." },
    { term: "DOAC", cat: "sales", def: "Direct Oral Anticoagulant — class of blood thinners (including Xarelto) that directly inhibit specific clotting factors without requiring routine blood monitoring (unlike warfarin). More convenient but more expensive than warfarin.", sub: "Warfarin = older blood thinner requiring frequent INR blood tests and dietary restrictions. INR = International Normalized Ratio — a measure of blood clotting time." },
    { term: "Biosimilar Pricing Spread", cat: "sales", def: "The percentage discount at which a biosimilar is priced vs. the reference biologic. Stelara biosimilars launched at 15-40% discounts, with spreads widening as more competitors enter and payers demand deeper discounts.", sub: "Formulary = payer's approved drug list. Preferred position = covered at lower cost-sharing tier." },
    { term: "Part B vs. Part D", cat: "sales", def: "Part B covers drugs administered in clinical settings (infused/injected in office) — Darzalex, Carvykti, Imaavy. Part D covers self-administered prescriptions at pharmacies — Erleada, Icotyde, Caplyta. IRA Part D redesign primarily impacts Part D drugs.", sub: "Part B reimbursement = typically ASP+6% to provider. Part D involves PBMs, formulary tiers, and complex rebate structures." },
  ]
};

const sectionStyle = (color) => ({
  borderLeft: `4px solid ${color}`,
  marginBottom: 12,
  padding: "12px 14px",
  borderRadius: 8,
  background: "#FFFFFF",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
});

const tagStyle = (bg, color) => ({
  display: "inline-block",
  padding: "2px 10px",
  borderRadius: 20,
  fontSize: 11,
  fontWeight: 700,
  background: bg,
  color: color,
  marginRight: 6,
  marginBottom: 4,
  letterSpacing: 0.3,
});

const fieldLabel = {
  fontSize: 11,
  fontWeight: 700,
  color: "#64748B",
  textTransform: "uppercase",
  letterSpacing: 0.8,
  marginTop: 10,
  marginBottom: 3,
};

const fieldVal = {
  fontSize: 13,
  color: "#1E293B",
  lineHeight: 1.55,
  marginBottom: 2,
};

export default function JNJPipelineReference() {
  const [activeTA, setActiveTA] = useState(0);
  const [activeDrug, setActiveDrug] = useState(null);
  const [view, setView] = useState("pipeline");
  const [glossarySearch, setGlossarySearch] = useState("");
  const [glossaryCat, setGlossaryCat] = useState("all");

  const ta = data.therapeuticAreas[activeTA];
  const drug = activeDrug !== null ? ta.drugs[activeDrug] : null;

  const filteredGlossary = data.glossary.filter(
    (g) =>
      (glossaryCat === "all" || g.cat === glossaryCat) &&
      (g.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      g.def.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      (g.sub && g.sub.toLowerCase().includes(glossarySearch.toLowerCase())))
  );

  return (
    <div style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif", maxWidth: 900, margin: "0 auto", padding: "24px 16px", background: "#F8FAFC", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#DC2626", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>CONFIDENTIAL — INTERNAL SALES REFERENCE</div>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", margin: 0, lineHeight: 1.2 }}>Johnson & Johnson</h1>
        <h2 style={{ fontSize: 15, fontWeight: 500, color: "#475569", margin: "4px 0 0" }}>Innovative Medicine Pipeline & Mechanisms — 2026</h2>
        <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 4 }}>DRAFT — For Sales Team Review Only — Not for External Distribution</div>
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, justifyContent: "center", flexWrap: "wrap" }}>
        {["pipeline", "overview", "risks", "glossary"].map((v) => (
          <button
            key={v}
            onClick={() => { setView(v); setActiveDrug(null); }}
            style={{
              padding: "8px 14px",
              borderRadius: 20,
              border: view === v ? "2px solid #1D4ED8" : "1px solid #CBD5E1",
              background: view === v ? "#1D4ED8" : "#FFFFFF",
              color: view === v ? "#FFFFFF" : "#475569",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {v === "pipeline" ? "Pipeline" : v === "overview" ? "Overview" : v === "risks" ? "Headwinds & Tailwinds" : "Glossary"}
          </button>
        ))}
      </div>

      {/* BUSINESS OVERVIEW */}
      {view === "overview" && (
        <div>
          <div style={{ ...sectionStyle("#0F172A"), borderLeft: "4px solid #1D4ED8" }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", margin: "0 0 8px" }}>J&J 2026 at a Glance</h3>
            <div style={fieldVal}>
              <strong>2026 Revenue Target:</strong> $100–101B (up from $94.2B in 2025, guided on Jan 21 earnings call)
            </div>
            <div style={fieldVal}>
              <strong>Growth Rate Target:</strong> 5–7% annual, with potential for double digits in the 2030s
            </div>
            <div style={fieldVal}>
              <strong>Six Key Businesses:</strong> Oncology, Immunology, Neuroscience, Cardiovascular, Surgery, Vision
            </div>
            <div style={fieldVal}>
              <strong>Stelara LOE Impact:</strong> First full year of biosimilar competition. 2023 peak: ~$11B. 2025 Q4 already declining ~41%. J&J absorbing the hit via Tremfya + Icotyde + Darzalex growth.
            </div>
            <div style={fieldVal}>
              <strong>10 Pipeline Assets with $5B+ Peak Potential:</strong> Talvey, Tecvayli, Imaavy, Caplyta, Inlexzo, Rybrevant + Lazcluze, Icotyde, and more
            </div>
            <div style={fieldVal}>
              <strong>Major 2026 Catalyst:</strong> Icotyde (icotrokinra) FDA approval March 17, 2026 — first oral IL-23R therapy
            </div>
            <div style={fieldVal}>
              <strong>Oncology Goal:</strong> #1 oncology company by 2030, $50B target (CEO Joaquin Duato, JPM 2026)
            </div>
          </div>

          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", margin: "16px 0 8px" }}>Business Segments</h3>
          {data.businessLines.map((bl, i) => (
            <div key={i} style={{ ...sectionStyle("#475569"), marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: "#0F172A" }}>{bl.name}</span>
                <span style={tagStyle("#E2E8F0", "#334155")}>{bl.pct} of revenue</span>
              </div>
              <div style={{ fontSize: 13, color: "#475569", marginTop: 4 }}>{bl.desc}</div>
            </div>
          ))}

          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", margin: "16px 0 8px" }}>Key Headwinds to Acknowledge</h3>
          <div style={{ ...sectionStyle("#EF4444") }}>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: "#1E293B", lineHeight: 1.7 }}>
              <li><strong>Stelara LOE:</strong> Multiple biosimilars launched in 2025 (Amgen, Teva, Samsung Bioepis/Sandoz). Revenue declining rapidly.</li>
              <li><strong>Part D Redesign / IRA:</strong> ~$2B negative sales impact estimated. Affects Stelara, Imbruvica, Erleada, Tremfya.</li>
              <li><strong>Imbruvica Decline:</strong> Rising competitive pressure from next-gen BTK inhibitors.</li>
              <li><strong>Upcoming LOEs:</strong> Opsumit and Simponi face exclusivity loss in coming years.</li>
              <li><strong>MedTech China:</strong> Volume-based procurement (VBP) continues to pressure device pricing.</li>
              <li><strong>Talc Litigation:</strong> 70,000+ lawsuits pending. Bankruptcy settlement plan rejected in 2024.</li>
            </ul>
          </div>
        </div>
      )}

      {/* DRUG PIPELINE */}
      {view === "pipeline" && (
        <div>
          {/* TA Tabs */}
          <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
            {data.therapeuticAreas.map((t, i) => (
              <button
                key={i}
                onClick={() => { setActiveTA(i); setActiveDrug(null); }}
                style={{
                  padding: "7px 14px",
                  borderRadius: 8,
                  border: activeTA === i ? `2px solid ${t.color}` : "1px solid #CBD5E1",
                  background: activeTA === i ? t.bg : "#FFFFFF",
                  color: activeTA === i ? t.color : "#64748B",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  flex: "1 1 auto",
                  textAlign: "center",
                }}
              >
                {t.name}
              </button>
            ))}
          </div>

          {/* TA Header */}
          <div style={{ padding: "10px 14px", background: ta.bg, borderRadius: 8, marginBottom: 12, borderLeft: `4px solid ${ta.color}` }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: ta.color }}>{ta.name}</div>
            <div style={{ fontSize: 12, color: "#475569", marginTop: 2 }}>{ta.goal}</div>
          </div>

          {/* Drug List */}
          {activeDrug === null && (
            <div>
              {ta.drugs.map((d, i) => (
                <div
                  key={i}
                  onClick={() => setActiveDrug(i)}
                  style={{
                    ...sectionStyle(ta.color),
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.12)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)"; }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 4 }}>
                    <div>
                      <span style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>{d.name}</span>
                      <span style={{ fontSize: 12, color: "#64748B", marginLeft: 8 }}>({d.generic})</span>
                    </div>
                    <span style={tagStyle(ta.bg, ta.color)}>{d.phase}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#475569", marginTop: 4 }}>{d.moleculeType} · Target: {d.target}</div>
                  <div style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>{d.indication}</div>
                  <div style={{ fontSize: 11, color: ta.color, fontWeight: 600, marginTop: 6 }}>Tap for full detail →</div>
                </div>
              ))}
            </div>
          )}

          {/* Drug Detail */}
          {drug && (
            <div>
              <button
                onClick={() => setActiveDrug(null)}
                style={{ background: "none", border: "none", color: ta.color, fontWeight: 700, fontSize: 13, cursor: "pointer", padding: "4px 0", marginBottom: 8 }}
              >
                ← Back to {ta.name} drugs
              </button>

              <div style={sectionStyle(ta.color)}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", margin: "0 0 2px" }}>{drug.name}</h3>
                <div style={{ fontSize: 13, color: "#64748B" }}>{drug.generic}</div>
                <div style={{ marginTop: 6, display: "flex", flexWrap: "wrap", gap: 4 }}>
                  <span style={tagStyle(ta.bg, ta.color)}>{drug.phase}</span>
                  <span style={tagStyle("#F1F5F9", "#334155")}>{drug.moleculeType}</span>
                </div>
              </div>

              {[
                ["MECHANISM OF ACTION", drug.moa],
                ["MOLECULAR TARGET", drug.target],
                ["APPROVED / STUDIED INDICATION(S)", drug.indication],
                ["ADMINISTRATION", drug.administration],
                ["TOTAL ADDRESSABLE MARKET & REVENUE", drug.tam],
                ["PRESCRIPTION RENEWAL / TREATMENT DURATION", drug.renewalLength],
                ["INSURANCE & COVERAGE", drug.insurance],
                ["PRESCRIBER MIX & UPTAKE", drug.prescribers],
                ["KEY SALES TALKING POINTS", drug.salesPoints],
                ["TRIAL PIPELINE & UPCOMING CATALYSTS", drug.trialPipeline],
              ].map(([label, val], idx) => (
                <div key={idx} style={{ marginBottom: 2 }}>
                  <div style={{ ...sectionStyle(idx < 3 ? ta.color : idx < 6 ? "#0F766E" : idx < 8 ? "#D97706" : "#7C3AED"), padding: "10px 14px" }}>
                    <div style={fieldLabel}>{label}</div>
                    <div style={fieldVal}>{val}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* HEADWINDS & TAILWINDS */}
      {view === "risks" && (
        <div>
          <div style={{ padding: "10px 14px", background: "#FEF2F2", borderRadius: 8, marginBottom: 6, borderLeft: "4px solid #047857" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#047857" }}>BREAKING: Q1 2026 Earnings (April 14, 2026)</div>
            <div style={{ fontSize: 12, color: "#1E293B", marginTop: 3, lineHeight: 1.5 }}>Revenue $24.1B (+9.9% YoY), beat by $450M. Adj. EPS $2.70 (beat $0.02). Innovative Medicine +11.2% to $15.4B. Darzalex $4.0B, Tremfya $1.6B. 2026 guidance RAISED: $100.8B rev / $11.55 EPS. Dividend raised to $1.34/share — 64th consecutive year.</div>
          </div>

          <div style={{ padding: "10px 14px", background: "#FEF2F2", borderRadius: 8, marginBottom: 12, borderLeft: "4px solid #B91C1C" }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#B91C1C" }}>HEADWINDS</div>
            <div style={{ fontSize: 11, color: "#64748B" }}>What should keep you up at night</div>
          </div>
          {[
            { t: "1. Stelara Patent Cliff", body: "Stelara peaked at ~$11B (2023). FY2025 sales collapsed 41.3% to $6.1B as 8+ biosimilars launched. Q1 2026: sales fell ~60% YoY to ~$656M. The negative impact was ~10.4% on worldwide Innovative Medicine operational sales in 2025. Management says it's 'in the rearview mirror' — but revenue replacement math is being proven quarter by quarter.", src: "J&J 10-K FY2025 (SEC), Q1 2026 8-K (April 14, 2026), Bloomberg" },
            { t: "2. IRA / Medicare Part D Redesign", body: "Caps Part D out-of-pocket at $2K/yr and shifts more financial liability to manufacturers. ~$2B negative impact on J&J in 2025. Xarelto, Stelara, Imbruvica among first 10 drugs negotiated. Structural pricing headwind that doesn't go away — more drugs selected each cycle.", src: "J&J Q3 2025 call, HHS fact sheet, J&J 10-K" },
            { t: "3. Talc Litigation — 90,000+ Lawsuits", body: "Three 'Texas Two-Step' bankruptcy attempts all failed (2021, 2023, 2024). $8-9B settlement rejected March 2025. Since then: $1.5B verdict (Baltimore, Dec 2025), $966M California verdict (reduced to $16M on appeal), $250K Philadelphia verdict (Jan 2026). Federal bellwether trial being scheduled. Mediator appointed. Plaintiffs' lawyers say 2026 is 'the year it starts acting like a real mass tort again.' Total exposure potentially tens of billions.", src: "MDL-2738 docket, drugwatch.com, Darrow.ai, J&J 10-K risk factors" },
            { t: "4. Imbruvica Decline", body: "Rising competitive pressure from next-gen BTK inhibitors: AstraZeneca's Calquence (acalabrutinib), BeiGene's Brukinsa (zanubrutinib). Improved safety profiles pulling share. Compounded by Part D redesign impact.", src: "J&J Q1 2026, Zacks equity research" },
            { t: "5. Upcoming LOEs — Opsumit & Simponi", body: "Beyond Stelara, Opsumit (PAH) and Simponi/Simponi Aria (autoimmune) face exclusivity loss in coming years. Individually smaller but cumulative revenue replacement pressure.", src: "J&J 10-K, Fierce Pharma LOE analysis" },
            { t: "6. Competitive Intensity Across Every Franchise", body: "ONCOLOGY: AstraZeneca's Tagrisso ($6B+) trialing combos to defend NSCLC share vs. Rybrevant. BMS Abecma CAR-T in myeloma. Pfizer's elranatamab bispecific. IMMUNOLOGY: AbbVie's Skyrizi holds >60% 1L psoriasis share (per AbbVie at JPM 2026). Rinvoq expanding into UC, Crohn's, lupus, alopecia. AbbVie says 'no degradation' in Skyrizi new patient starts from Tremfya. AbbVie fell ~4% on Icotyde approval day. NEUROSCIENCE: Argenx Vyvgart has first-mover advantage in gMG vs. Imaavy. Oral psoriasis space will see Takeda & Alumis TYK2 inhibitors.", src: "AbbVie JPM 2026, Fierce Pharma, Seeking Alpha, BNP Paribas" },
            { t: "7. MedTech China VBP & Tariff Risk", body: "China's Volume-Based Procurement continues pressuring device pricing. MedTech China weak for multiple quarters. Tariff dynamics create supply chain and pricing uncertainty.", src: "J&J Q1 2026 earnings, MedTech commentary" },
            { t: "8. FDA Manufacturing Compliance", body: "FDA warning letters for manufacturing issues can delay approvals, trigger supply disruptions, or erode confidence. Complex biologic and CAR-T manufacturing requires constant operational excellence.", src: "FDA warning letter database, competitive intel" },
          ].map((h, i) => (
            <div key={i} style={{ ...sectionStyle("#B91C1C"), marginBottom: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#B91C1C" }}>{h.t}</div>
              <div style={{ fontSize: 12, color: "#1E293B", marginTop: 4, lineHeight: 1.55 }}>{h.body}</div>
              <div style={{ fontSize: 10, color: "#94A3B8", marginTop: 4, fontStyle: "italic" }}>Sources: {h.src}</div>
            </div>
          ))}

          <div style={{ padding: "10px 14px", background: "#F0FDF4", borderRadius: 8, marginBottom: 12, marginTop: 16, borderLeft: "4px solid #047857" }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#047857" }}>TAILWINDS</div>
            <div style={{ fontSize: 11, color: "#64748B" }}>The case for optimism</div>
          </div>
          {[
            { t: "1. Q1 2026 Beat — Momentum Is Real (TODAY)", body: "Revenue $24.1B (+9.9% YoY), beat by $450M. Adj. EPS $2.70. Innovative Medicine +11.2% to $15.4B. Darzalex $4.0B, Tremfya $1.6B. Guidance RAISED: $100.8B / $11.55 EPS. Dividend +3.1% to $1.34/share — 64th consecutive year. JNJ +15% YTD vs S&P ~flat.", src: "J&J 8-K April 14, 2026 (SEC), press release, Blockonomi" },
            { t: "2. Morgan Stanley Upgrade — Street Turning Bullish", body: "Jan 28, 2026: upgraded to Overweight, PT $200→$262 (17% upside). Analyst Terence Flynn: 'One of the most robust new product cycle offerings in Biopharma.' Projects 2026-2030 CAGRs of ~5.5% rev / ~12% EPS, placing JNJ in 'higher growth' cohort. ~20% above consensus estimates. Raised forecasts for Tremfya, Icotyde, Tecvayli, Darzalex.", src: "Morgan Stanley research (Jan 28, 2026), CNBC, Investing.com" },
            { t: "3. Icotyde Approval — Franchise-Defining", body: "FDA approved March 17, 2026 — first oral IL-23R therapy. 70% clear/almost clear skin at Week 16, beating BMS Sotyktu head-to-head. Adolescent labeling from launch (12+). Only 30-40% psoriasis market penetrated → massive oral option expansion. J&J: >$5B peak. Truist Securities: ~$10B peak across all indications. Pipeline: PsA, UC, Crohn's. AbbVie fell ~4% on approval day.", src: "FDA announcement, BioSpace, Nature Reviews Drug Discovery, Truist Securities" },
            { t: "4. Tremfya — Stelara Replacement Working", body: "FY2025 sales surged 40.5% to $5.2B (Q4 up 65%). GlobalData forecasts $9B by 2031. First IL-23 with SC + IV dosing from induction through IBD maintenance — ahead of Skyrizi, Omvoh, Stelara. J&J's 'switch strategy' pre-emptively moves patients from Stelara to Tremfya, front-running its own patent cliff.", src: "J&J 10-K, Labiotech, GlobalData, JPM 2026 fireside chat" },
            { t: "5. 10 Assets with $5B+ Peak Potential", body: "Talvey, Tecvayli, Imaavy, Caplyta, Inlexzo, Rybrevant + Lazcluze, Icotyde. If even half hit peak, that's $25B+ incremental — more than replacing Stelara. Deepest new product cycle in J&J history.", src: "J&J investor presentations, Zacks, multiple analyst reports" },
            { t: "6. Myeloma Multi-Modality Dominance", body: "~80% patient coverage: Darzalex (anti-CD38) + Tecvayli (BCMA bispecific) + Talvey (GPRC5D bispecific) + Carvykti (CAR-T). No competitor matches this breadth. Darzalex $14.4B in 2025, $4.0B Q1 2026. Carvykti +66% Q4. CEO targets $50B oncology by end of decade.", src: "J&J FY2025, ApexOnco, JPM 2026 oncology presentation" },
            { t: "7. Caplyta MDD Expansion", body: "$14.6B Intra-Cellular acquisition adds schizophrenia + bipolar I/II + MDD adjunct. MDD = ~21M US adults — massive TAM unlock. PCPs now prescribing (vs. psychiatrists only). New patient starts accelerating.", src: "FDA MDD approval Nov 2025, Zacks equity research" },
            { t: "8. $55B US Manufacturing Investment", body: "$1B cell therapy facility in Montgomery County, PA (Feb 2026). Addresses #1 CAR-T bottleneck — manufacturing capacity. Part of $55B US investment through early 2029.", src: "J&J press release Feb 18, 2026, Pharmaceutical Technology" },
            { t: "9. Valuation Discount", body: "JNJ trades at ~3x P/E discount to S&P 500 (per Morgan Stanley). For a company with 64 years of dividend growth, $100B+ revenue, and this pipeline depth — room for re-rating as catalysts materialize.", src: "Morgan Stanley Jan 2026, GuruFocus" },
          ].map((tw, i) => (
            <div key={i} style={{ ...sectionStyle("#047857"), marginBottom: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#047857" }}>{tw.t}</div>
              <div style={{ fontSize: 12, color: "#1E293B", marginTop: 4, lineHeight: 1.55 }}>{tw.body}</div>
              <div style={{ fontSize: 10, color: "#94A3B8", marginTop: 4, fontStyle: "italic" }}>Sources: {tw.src}</div>
            </div>
          ))}
        </div>
      )}

      {/* GLOSSARY */}
      {view === "glossary" && (
        <div>
          <input
            type="text"
            placeholder="Search glossary…"
            value={glossarySearch}
            onChange={(e) => setGlossarySearch(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: 8,
              border: "1px solid #CBD5E1",
              fontSize: 14,
              marginBottom: 8,
              boxSizing: "border-box",
              outline: "none",
            }}
          />
          <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
            {[["all","All"],["bio","Biology / Science"],["sales","Sales / Cost / Insurance"]].map(([k,l])=>(
              <button key={k} onClick={()=>setGlossaryCat(k)} style={{ padding:"5px 12px", borderRadius:16, border: glossaryCat===k?"2px solid #1D4ED8":"1px solid #CBD5E1", background:glossaryCat===k?"#1D4ED8":"#FFF", color:glossaryCat===k?"#FFF":"#475569", fontSize:11, fontWeight:600, cursor:"pointer" }}>{l}</button>
            ))}
          </div>
          <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 8 }}>{filteredGlossary.length} terms</div>
          {filteredGlossary.map((g, i) => (
            <div key={i} style={{ padding: "10px 12px", borderBottom: "1px solid #E2E8F0", background: i % 2 === 0 ? "#FFFFFF" : "#F8FAFC" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#1D4ED8" }}>{g.term}</span>
                <span style={tagStyle(g.cat==="bio"?"#FEF2F2":"#FFFBEB", g.cat==="bio"?"#B91C1C":"#D97706")}>{g.cat==="bio"?"Biology":"Sales/Cost"}</span>
              </div>
              <div style={{ fontSize: 12, color: "#334155", marginTop: 4, lineHeight: 1.5 }}>{g.def}</div>
              {g.sub && <div style={{ fontSize: 11, color: "#64748B", marginTop: 4, paddingLeft: 10, borderLeft: "2px solid #E2E8F0", lineHeight: 1.45, fontStyle: "italic" }}>Sub-definitions: {g.sub}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: 24, paddingTop: 12, borderTop: "1px solid #E2E8F0" }}>
        <div style={{ fontSize: 10, color: "#94A3B8", lineHeight: 1.5 }}>
          ROUGH DRAFT — Data sourced from public filings, FDA approvals, and published clinical data as of April 2026.
          <br />Market projections are estimates subject to change. Not for external distribution. Prepared for internal sales team review.
          <br />Verify all claims against current PI and approved labeling before use in promotional materials.
        </div>
      </div>
    </div>
  );
}
