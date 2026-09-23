"use client";
/* eslint-disable @next/next/no-img-element -- supplied host media is served directly */

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Map as MapIcon, Send, ShoppingBag, Sparkles, Volume2 } from "lucide-react";
import { track } from "@/lib/analytics";
import { resolvePinkSlipQuestion, type PinkSlipAnswer } from "@/lib/pink-slip";
import { evidenceLabel } from "@/lib/public-language";
import { EntityCards } from "@/components/EntityShowcase";

export function PinkSlipHost({ compact = false }: { compact?: boolean }) {
  const introVideo = useRef<HTMLVideoElement>(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [ready, setReady] = useState(compact);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<PinkSlipAnswer | null>(null);
  const [platform, setPlatform] = useState("PS5");
  const [need, setNeed] = useState("Storage");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || compact) { const timer = window.setTimeout(() => { setVideoFailed(true); setReady(true); }, 0); return () => window.clearTimeout(timer); }
    const fallback = window.setTimeout(() => setReady(true), 6600);
    return () => window.clearTimeout(fallback);
  }, [compact]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) { const timer = window.setTimeout(() => { setQuestion(q); setAnswer(resolvePinkSlipQuestion(q)); setReady(true); }, 0); return () => window.clearTimeout(timer); }
  }, []);

  const recommendation = useMemo(() => need === "Storage"
    ? platform === "PS5" ? "Choose a PS5-compatible M.2 NVMe SSD for your wider library. GTA VI’s final install size is still unknown, so don’t buy from a rumor." : "For direct play of optimized Xbox Series X|S games, use internal storage or an official Storage Expansion Card."
    : need === "Headset" ? `Choose verified ${platform} compatibility and long-session comfort before branding.`
      : platform === "PS5" ? "Sony's GTA VI Black and White Limited Edition DualSense controllers are $84.99 each. Preorders open September 10; keep your current controller if the design is not worth replacing working hardware." : `Keep your current ${platform} controller unless comfort, drift, or a missing feature gives you a real reason to replace it.`, [need, platform]);

  const submit = (value = question) => {
    const clean = value.trim();
    if (!clean) return;
    setQuestion(clean);
    setAnswer((current) => resolvePinkSlipQuestion(clean, current));
    setReady(true);
    track("pink_slip_question", { question: clean });
    window.history.replaceState(null, "", `/cipher?q=${encodeURIComponent(clean)}`);
  };

  const hostArt = answer && answer.hostState !== "general" ? {
    news: ["/pink-slip/states/news.webp", "Pink Slip checking the latest news on his phone"],
    map: ["/pink-slip/states/map.webp", "Pink Slip at the GameplayAddict map wall"],
    buying: ["/pink-slip/states/buying.webp", "Pink Slip with a controller in his gaming setup"],
    vehicle: ["/pink-slip/states/vehicles.webp", "Pink Slip beside a stylized car in GameplayAddict brand artwork"],
  }[answer.hostState] : undefined;

  return <section className={`pink-host ${compact ? "pink-host--compact" : ""} ${ready ? "pink-host--ready" : ""}`}>
    <div className="pink-host-scene" aria-label="Pink Slip welcomes you to GameplayAddict">
      {!videoFailed && !compact ? <>
        <video ref={introVideo} className="active" autoPlay muted playsInline preload="metadata" poster="/pink-slip/idle-poster.jpg" onTimeUpdate={(event) => { if (event.currentTarget.currentTime >= 6.04) setReady(true); }} onEnded={() => setVideoEnded(true)} onError={() => { setVideoFailed(true); setReady(true); }}><source src="/pink-slip/introduction.mp4" type="video/mp4" /></video>
      </> : null}
      {(videoFailed || videoEnded || compact) ? <img src="/pink-slip/idle-poster.jpg" alt="Pink Slip, GameplayAddict host" /> : null}
      <div className="pink-host-shade" />
      {!videoFailed && !videoEnded && !compact ? <button className="pink-host-sound" onClick={() => { setSoundOn(true); if (introVideo.current) { introVideo.current.muted = false; introVideo.current.play(); } }}><Volume2 size={16} /> {soundOn ? "Sound on" : "Hear Pink Slip"}</button> : null}
    </div>

    <div className="pink-host-panel">
      <span>PINK SLIP</span>
      <h1>You looking for something? Ask me.</h1>
      <div className="pink-host-input"><label className="sr-only" htmlFor={compact ? "pink-question-home" : "pink-question"}>Ask Pink Slip anything about GTA VI</label><input id={compact ? "pink-question-home" : "pink-question"} value={question} onChange={(event) => setQuestion(event.target.value)} onKeyDown={(event) => event.key === "Enter" && submit()} placeholder="Ask Pink Slip anything about GTA VI…" /><button onClick={() => submit()} aria-label="Ask Pink Slip"><Send size={18} /></button></div>
      {!answer ? <div className="pink-host-starters"><button onClick={() => submit("What’s new?")}><Sparkles size={15} /> What’s new?</button><button onClick={() => submit("Find Vice City") }><MapIcon size={15} /> Find something</button><button onClick={() => submit("Help me buy storage") }><ShoppingBag size={15} /> Help me buy</button></div> : null}

      {answer ? <article className={`pink-answer pink-answer--${answer.intent}`} aria-live="polite">
        <h2>{answer.text}</h2>
        {answer.context ? <p className="pink-answer-context">{answer.context}</p> : null}
        {answer.record && !answer.buying ? <span>{evidenceLabel(answer.record.evidence)}</span> : null}
        {answer.entities.length ? <EntityCards entities={answer.entities} compact /> : null}
        {hostArt ? <figure className="pink-host-state-art"><img src={hostArt[0]} width="1229" height="1536" loading="lazy" alt={hostArt[1]} /><figcaption>GameplayAddict host artwork</figcaption></figure> : null}
        {answer.buying ? <div className="pink-buying"><div><label>What do you play on?<select value={platform} onChange={(e) => setPlatform(e.target.value)}><option>PS5</option><option>Xbox Series X|S</option></select></label><label>What do you need?<select value={need} onChange={(e) => setNeed(e.target.value)}><option>Storage</option><option>Headset</option><option>Controller</option></select></label></div><p>{recommendation}</p><Link href={need === "Storage" ? "/gta-6/best-storage" : need === "Headset" ? "/gta-6/best-headset" : "/gta-6/best-controller"}>See my picks <ArrowRight size={15} /></Link></div> : null}
        {answer.action ? <div className="pink-answer-actions"><Link className="primary" href={answer.action.href}>{answer.action.label} <ArrowRight size={16} /></Link></div> : null}
      </article> : null}
    </div>
  </section>;
}
