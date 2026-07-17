"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Briefcase,
  Clock3,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  Phone,
  Play,
  Sparkles,
  X,
  Volume2,
  VolumeX,
  Loader2,
} from "lucide-react";
import type { Locale, TeamMember } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import { team } from "@/data/team";
import { SITE } from "@/lib/constants";
import { t, tList, cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";

const ease = [0.22, 1, 0.36, 1] as const;

function IconZalo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 3.2C7.05 3.2 3 6.7 3 11c0 2.4 1.25 4.55 3.2 6l-.7 3.3 3.55-1.15c.9.25 1.85.4 2.95.4 4.95 0 9-3.5 9-7.8S16.95 3.2 12 3.2zm4.35 10.55h-2.1l-2.35-3.05v3.05H9.65V8.9h2.1l2.35 3.05V8.9h2.25v4.85z" />
    </svg>
  );
}

function memberTel(member: TeamMember) {
  const raw = member.phone || SITE.phoneE164 || SITE.phone;
  return raw.replace(/[^\d+]/g, "") || raw;
}

function memberZalo(member: TeamMember) {
  return member.zalo || SITE.social.zalo;
}

function photoList(member: TeamMember): string[] {
  if (member.photoCandidates?.length) return [...member.photoCandidates];
  if (member.photo) return [member.photo];
  return [];
}

function hasVideo(member: TeamMember) {
  return Boolean(member.video || member.videoCandidates?.length);
}

/**
 * Section Nhân sự
 * · Ảnh tĩnh luôn hiển thị
 * · Video chỉ mount khi user bấm Play → modal
 * · Layout: roster rail + photo + profile
 */
export function HomeTeam({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [videoMember, setVideoMember] = useState<TeamMember | null>(null);

  const member = team[active] ?? team[0];

  const openVideo = useCallback((m: TeamMember) => {
    setVideoMember(m);
  }, []);

  const closeVideo = useCallback(() => {
    setVideoMember(null);
  }, []);

  return (
    <Section
      className="team-section home-stage-fill flex h-full min-h-0 flex-col border-0 py-0"
      contained={false}
    >
      <Container className="flex h-full min-h-0 w-full max-w-none flex-col px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-5">
        {/* Header */}
        <header className="mb-3 flex shrink-0 flex-col gap-1 sm:mb-4 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <p className="text-[11px] font-medium tracking-[0.2em] text-violet-300/90 uppercase sm:text-xs">
              02 · {locale === "de" ? "Personal" : "Nhân sự"}
            </p>
            <h2 className="mt-0.5 text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
              {dict.home.teamTitle}
            </h2>
            {dict.home.teamSubtitle && (
              <p className="mt-1 max-w-xl text-sm text-white/50 sm:text-[15px]">
                {dict.home.teamSubtitle}
              </p>
            )}
          </div>
          <p className="hidden shrink-0 font-mono text-[10px] tracking-wider text-white/35 uppercase sm:block">
            Berlin · {team.length} {locale === "de" ? "Personen" : "thành viên"}
          </p>
        </header>

        {/* Main: roster rail + photo + profile */}
        <div className="team-roster flex min-h-0 flex-1 flex-col gap-3 lg:flex-row lg:gap-5">
          {/* Crew rail — chọn người, không mở video */}
          <nav
            className="flex shrink-0 gap-2 overflow-x-auto no-scrollbar lg:w-[10.5rem] lg:flex-col lg:overflow-visible"
            aria-label={locale === "de" ? "Team wählen" : "Chọn nhân sự"}
          >
            {team.map((m, i) => {
              const on = i === active;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "group flex min-w-[9.5rem] items-center gap-2.5 border px-2 py-2 text-left transition-all sm:min-w-[10.5rem] lg:min-w-0 lg:w-full",
                    on
                      ? "border-violet-400/45 bg-white/[0.09] text-white"
                      : "border-white/10 bg-white/[0.02] text-white/55 hover:border-white/20 hover:bg-white/[0.05] hover:text-white/85"
                  )}
                >
                  <span className="relative h-11 w-11 shrink-0 overflow-hidden border border-white/10 sm:h-12 sm:w-12">
                    <MiniPortrait member={m} />
                    {on && (
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-accent" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[9px] tracking-wider text-white/40">
                      {m.code}
                    </span>
                    <span className="block truncate text-sm font-semibold">
                      {m.name}
                    </span>
                    <span className="mt-0.5 block truncate text-[11px] text-white/40">
                      {t(m.role, locale)}
                    </span>
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Detail: photo | profile */}
          <AnimatePresence mode="wait">
            <motion.div
              key={member.id}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.32, ease }}
              className="grid min-h-0 min-w-0 flex-1 gap-3 sm:gap-4 lg:grid-cols-12 lg:gap-5"
            >
              {/* Portrait — chỉ ảnh; Play overlay mở modal video */}
              <div className="relative flex min-h-0 flex-col lg:col-span-5 xl:col-span-4">
                <div className="team-roster__photo relative mx-auto aspect-[5/7] w-full max-h-[42vh] overflow-hidden border border-white/10 sm:max-h-[48vh] sm:aspect-[4/5] lg:mx-0 lg:max-h-none lg:aspect-auto lg:min-h-0 lg:h-full lg:flex-1">
                  <TeamPortrait member={member} />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/25" />

                  <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-1.5 sm:left-4 sm:top-4">
                    <span className="bg-black/55 px-2 py-1 font-mono text-[10px] tracking-wider text-white/90 backdrop-blur-sm">
                      {member.code}
                    </span>
                    {member.department && (
                      <span className="bg-violet-500/25 px-2 py-1 font-mono text-[10px] text-violet-100 backdrop-blur-sm">
                        {t(member.department, locale)}
                      </span>
                    )}
                  </div>

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-4 pr-16 sm:p-5 sm:pr-20">
                    <p className="text-[11px] font-medium tracking-wide text-accent uppercase sm:text-xs">
                      {t(member.role, locale)}
                    </p>
                    <h3 className="mt-1 text-2xl font-semibold leading-none tracking-tight text-white sm:text-3xl md:text-4xl">
                      {member.name}
                    </h3>
                    {member.fullName && (
                      <p className="mt-1.5 text-sm text-white/55">
                        {t(member.fullName, locale)}
                      </p>
                    )}
                  </div>

                  {hasVideo(member) && (
                    <button
                      type="button"
                      onClick={() => openVideo(member)}
                      className="absolute bottom-3 right-3 z-20 flex h-11 w-11 items-center justify-center border border-white/35 bg-black/60 text-white shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:border-accent hover:bg-accent sm:bottom-4 sm:right-4 sm:h-12 sm:w-12"
                      aria-label={
                        locale === "de"
                          ? `Video von ${member.name} abspielen`
                          : `Xem video ${member.name}`
                      }
                      title={
                        locale === "de"
                          ? "Profilvideo abspielen"
                          : "Xem video hồ sơ"
                      }
                    >
                      <Play className="h-5 w-5 fill-current" />
                    </button>
                  )}
                </div>
              </div>

              {/* Profile panel */}
              <div className="flex min-h-0 min-w-0 flex-col border border-white/10 bg-transparent lg:col-span-7 xl:col-span-8">
                <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4 no-scrollbar sm:space-y-3.5 sm:p-5">
                  {member.focus && (
                    <p className="text-base font-medium leading-snug text-violet-200/90 sm:text-lg">
                      {t(member.focus, locale)}
                    </p>
                  )}

                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {member.experienceYears != null && (
                      <Stat
                        label={locale === "de" ? "Erfahrung" : "Kinh nghiệm"}
                        value={
                          locale === "de"
                            ? `${member.experienceYears}+ J.`
                            : `${member.experienceYears}+ năm`
                        }
                      />
                    )}
                    {member.joinYear != null && (
                      <Stat
                        label={locale === "de" ? "Seit" : "Gia nhập"}
                        value={String(member.joinYear)}
                      />
                    )}
                    {member.code && <Stat label="ID" value={member.code} />}
                    {member.location && (
                      <Stat
                        label={locale === "de" ? "Standort" : "Cơ sở"}
                        value={member.location}
                      />
                    )}
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2">
                    {member.email && (
                      <ContactRow
                        icon={Mail}
                        href={`mailto:${member.email}`}
                        text={member.email}
                      />
                    )}
                    <ContactRow
                      icon={Phone}
                      href={`tel:${memberTel(member)}`}
                      text={member.phoneDisplay || member.phone || SITE.phone}
                    />
                    <ContactRow
                      icon={MapPin}
                      text={
                        member.basedIn
                          ? t(member.basedIn, locale)
                          : member.location ?? "Berlin"
                      }
                    />
                    {member.workMode && (
                      <ContactRow
                        icon={Briefcase}
                        text={t(member.workMode, locale)}
                      />
                    )}
                  </div>

                  {member.languages && (
                    <div>
                      <Label icon={Languages}>
                        {locale === "de" ? "Sprachen" : "Ngôn ngữ"}
                      </Label>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {tList(member.languages, locale).map((l) => (
                          <Chip key={l}>{l}</Chip>
                        ))}
                      </div>
                    </div>
                  )}

                  {member.skills && (
                    <div>
                      <Label icon={Briefcase}>
                        {locale === "de" ? "Skills" : "Kỹ năng"}
                      </Label>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {tList(member.skills, locale).map((s) => (
                          <Chip key={s} outline>
                            {s}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid gap-3 sm:grid-cols-2">
                    {member.expertise && (
                      <div>
                        <Label icon={Sparkles}>
                          {locale === "de" ? "Fokus" : "Chuyên môn"}
                        </Label>
                        <ul className="mt-1.5 space-y-1">
                          {tList(member.expertise, locale).map((e) => (
                            <li key={e} className="text-sm text-white/65">
                              · {e}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {member.education && (
                      <div>
                        <Label icon={GraduationCap}>
                          {locale === "de" ? "Background" : "Nền tảng"}
                        </Label>
                        <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                          {t(member.education, locale)}
                        </p>
                      </div>
                    )}
                  </div>

                  {member.availability && (
                    <p className="flex items-center gap-2 text-sm text-white/50">
                      <Clock3 className="h-4 w-4 shrink-0 text-accent" />
                      {t(member.availability, locale)}
                    </p>
                  )}

                  <div>
                    <Label>
                      {locale === "de" ? "Profil" : "Giới thiệu"}
                    </Label>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/60 sm:text-[15px]">
                      {t(member.bio, locale)}
                    </p>
                  </div>
                </div>

                {/* Quick actions — không mount video */}
                <div className="flex shrink-0 flex-wrap gap-2 border-t border-white/10 px-4 py-3 sm:px-5">
                  <a
                    href={`tel:${memberTel(member)}`}
                    className="inline-flex min-h-10 items-center gap-2 border border-white/15 px-3 py-2 text-sm text-white/75 transition-colors hover:border-accent hover:text-accent"
                  >
                    <Phone className="h-4 w-4" />
                    {locale === "de" ? "Anrufen" : "Gọi"}
                  </a>
                  <a
                    href={memberZalo(member)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center gap-2 border border-white/15 px-3 py-2 text-sm text-white/75 transition-colors hover:border-accent hover:text-accent"
                  >
                    <IconZalo className="h-4 w-4" />
                    Zalo
                  </a>
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="inline-flex min-h-10 items-center gap-2 border border-white/15 px-3 py-2 text-sm text-white/75 transition-colors hover:border-accent hover:text-accent"
                    >
                      <Mail className="h-4 w-4" />
                      Email
                    </a>
                  )}
                  {hasVideo(member) && (
                    <button
                      type="button"
                      onClick={() => openVideo(member)}
                      className="ml-auto inline-flex min-h-10 items-center gap-2 bg-accent px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    >
                      <Play className="h-4 w-4 fill-current" />
                      {locale === "de" ? "Video ansehen" : "Xem video"}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>

      {/* Video chỉ render khi user đã click Play */}
      {videoMember && (
        <TeamVideoModal
          member={videoMember}
          locale={locale}
          onClose={closeVideo}
        />
      )}
    </Section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/[0.04] px-2.5 py-2 sm:px-3 sm:py-2.5">
      <p className="font-mono text-[8px] tracking-[0.12em] text-white/35 uppercase sm:text-[9px]">
        {label}
      </p>
      <p className="mt-0.5 truncate text-sm font-semibold text-white sm:text-[15px]">
        {value}
      </p>
    </div>
  );
}

function Chip({
  children,
  outline,
}: {
  children: React.ReactNode;
  outline?: boolean;
}) {
  return (
    <span
      className={cn(
        "px-2 py-1 text-xs text-white/70",
        outline ? "border border-white/12" : "bg-white/[0.06]"
      )}
    >
      {children}
    </span>
  );
}

function Label({
  children,
  icon: Icon,
}: {
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <p className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.14em] text-white/40 uppercase sm:text-[10px]">
      {Icon && <Icon className="h-3 w-3 text-accent" />}
      {children}
    </p>
  );
}

function ContactRow({
  icon: Icon,
  text,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  href?: string;
}) {
  const className =
    "flex items-center gap-2 bg-white/[0.03] px-2.5 py-2 text-sm text-white/70 transition-colors hover:text-accent";
  const inner = (
    <>
      <Icon className="h-4 w-4 shrink-0 text-accent" />
      <span className="truncate">{text}</span>
    </>
  );
  if (href) {
    return (
      <a href={href} className={className}>
        {inner}
      </a>
    );
  }
  return <div className={className}>{inner}</div>;
}

/** Ảnh tĩnh — không bao giờ load video */
function TeamPortrait({ member }: { member: TeamMember }) {
  const candidates = photoList(member);
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(candidates.length === 0);
  const src = !failed && candidates[idx] ? candidates[idx] : null;

  useEffect(() => {
    setIdx(0);
    setFailed(candidates.length === 0);
  }, [member.id, candidates.length]);

  const onError = useCallback(() => {
    setIdx((i) => {
      if (i + 1 < candidates.length) return i + 1;
      setFailed(true);
      return i;
    });
  }, [candidates.length]);

  return (
    <div
      className={cn(
        "absolute inset-0 bg-gradient-to-br",
        member.gradient ?? "from-violet-950 to-black"
      )}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={member.name}
          className="absolute inset-0 h-full w-full object-cover object-top"
          onError={onError}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-20 w-20 items-center justify-center border border-white/20 bg-black/40 text-2xl font-semibold text-white">
            {member.initials}
          </span>
        </div>
      )}
    </div>
  );
}

function MiniPortrait({ member }: { member: TeamMember }) {
  const candidates = photoList(member);
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(candidates.length === 0);
  const src = !failed && candidates[idx] ? candidates[idx] : null;

  useEffect(() => {
    setIdx(0);
    setFailed(candidates.length === 0);
  }, [member.id, candidates.length]);

  if (!src) {
    return (
      <span className="flex h-full w-full items-center justify-center bg-white/10 text-[10px] font-semibold text-white/70">
        {member.initials}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      className="h-full w-full object-cover object-top"
      onError={() => {
        if (idx + 1 < candidates.length) setIdx((i) => i + 1);
        else setFailed(true);
      }}
    />
  );
}

/**
 * Modal video — chỉ mount khi user click Play trên card.
 * Trong modal: bấm Play lần nữa mới load + phát (tránh autoplay ồn).
 */
function TeamVideoModal({
  member,
  locale,
  onClose,
}: {
  member: TeamMember;
  locale: Locale;
  onClose: () => void;
}) {
  const titleId = useId();
  const videoRef = useRef<HTMLVideoElement>(null);
  const candidates =
    member.videoCandidates?.length
      ? member.videoCandidates
      : member.video
        ? [member.video]
        : [];
  const avatar = member.photo || member.photoCandidates?.[0];
  const [srcIndex, setSrcIndex] = useState(0);
  const [videoMissing, setVideoMissing] = useState(candidates.length === 0);
  const [loading, setLoading] = useState(false);
  const [muted, setMuted] = useState(false);
  const [mounted, setMounted] = useState(false);
  /** false = chỉ poster; true = mount <video> và phát */
  const [started, setStarted] = useState(false);
  const reduce = useReducedMotion();
  const videoSrc =
    !videoMissing && candidates[srcIndex] ? candidates[srcIndex] : null;

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  useEffect(() => {
    setSrcIndex(0);
    setVideoMissing(candidates.length === 0);
    setLoading(false);
    setStarted(false);
  }, [member.id, candidates.length]);

  const startPlayback = () => {
    setLoading(true);
    setStarted(true);
  };

  useEffect(() => {
    if (!started || !videoRef.current) return;
    void videoRef.current.play().catch(() => {
      /* browser may still block; controls remain */
    });
  }, [started, videoSrc]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        aria-label="Close"
        onClick={onClose}
      />
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease }}
        className="relative z-[1] flex w-full max-w-3xl flex-col overflow-hidden border border-white/15 bg-[#060b14] shadow-[0_32px_80px_rgba(0,0,0,0.65)]"
      >
        <div className="flex items-start justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <p className="font-mono text-[9px] tracking-[0.18em] text-accent uppercase">
              {member.code} · Video
            </p>
            <h3
              id={titleId}
              className="mt-0.5 truncate text-lg font-semibold text-white"
            >
              {member.name}
            </h3>
            <p className="truncate text-xs text-white/50">
              {t(member.role, locale)} · {member.location ?? "Berlin"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/15 text-white/70 hover:border-accent hover:text-accent"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Portrait-friendly stage */}
        <div className="relative mx-auto aspect-[5/8] w-full max-h-[min(72vh,640px)] max-w-md bg-black sm:max-h-[min(75vh,720px)]">
          {videoSrc && !videoMissing ? (
            <>
              {started ? (
                <>
                  <video
                    key={videoSrc}
                    ref={videoRef}
                    className="absolute inset-0 h-full w-full object-cover object-top bg-black"
                    src={videoSrc}
                    poster={avatar}
                    controls
                    playsInline
                    muted={muted}
                    onLoadedData={() => setLoading(false)}
                    onCanPlay={() => {
                      setLoading(false);
                      void videoRef.current?.play();
                    }}
                    onError={() => {
                      if (srcIndex + 1 < candidates.length) {
                        setSrcIndex((i) => i + 1);
                        setLoading(true);
                      } else {
                        setVideoMissing(true);
                        setLoading(false);
                      }
                    }}
                  />
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <Loader2 className="h-8 w-8 animate-spin text-white/70" />
                    </div>
                  )}
                </>
              ) : (
                <button
                  type="button"
                  onClick={startPlayback}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                >
                  {avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={avatar}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover object-top opacity-55"
                    />
                  ) : (
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-br",
                        member.gradient ?? "from-violet-950 to-black"
                      )}
                    />
                  )}
                  <span className="absolute inset-0 bg-black/40" />
                  <span className="relative z-[1] flex h-16 w-16 items-center justify-center border border-white/30 bg-accent text-white shadow-lg">
                    <Play className="h-7 w-7 fill-current" />
                  </span>
                  <p className="relative z-[1] text-sm text-white/70">
                    {locale === "de" ? "Video abspielen" : "Phát video"}
                  </p>
                </button>
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-sm text-white/50">
              <Play className="h-8 w-8 text-white/30" />
              {locale === "de" ? "Video folgt" : "Video sẽ gắn sau"}
            </div>
          )}
        </div>

        {started && videoSrc && (
          <div className="flex items-center justify-end gap-2 border-t border-white/10 px-3 py-2">
            <button
              type="button"
              onClick={() => {
                const next = !muted;
                setMuted(next);
                if (videoRef.current) videoRef.current.muted = next;
              }}
              className="flex h-8 w-8 items-center justify-center text-white/60 hover:text-white"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>
          </div>
        )}
      </motion.div>
    </div>,
    document.body
  );
}
