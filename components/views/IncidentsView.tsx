"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import { useIncidents } from "@/lib/incidents-context";
import { DATA } from "@/lib/data";
import WIPicker from "@/components/WIPicker";
import type { Incident, IncidentPriority, IncidentStatus } from "@/lib/types";

const PRIORITIES: IncidentPriority[] = ["red", "yellow", "green"];
const STATUSES: IncidentStatus[] = ["open", "in_progress", "resolved"];

const PRIORITY_LABEL_KEYS: Record<IncidentPriority, string> = {
  red: "priorityRedLabel",
  yellow: "priorityYellowLabel",
  green: "priorityGreenLabel",
};

const PRIORITY_NAV_KEYS: Record<IncidentPriority, string> = {
  red: "navPriorityRed",
  yellow: "navPriorityYellow",
  green: "navPriorityGreen",
};

const STATUS_LABEL_KEYS: Record<IncidentStatus, string> = {
  open: "statusOpenLabel",
  in_progress: "statusInProgressLabel",
  resolved: "statusResolvedLabel",
};

export default function IncidentsView({ priorityFilter }: { priorityFilter?: IncidentPriority }) {
  const { t } = useLang();
  const { hydrated, incidents, updateIncident, deleteIncident } = useIncidents();
  const [showForm, setShowForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState<IncidentStatus | "all">("all");

  const filtered = incidents.filter((incident) => {
    if (priorityFilter && incident.priority !== priorityFilter) return false;
    if (statusFilter !== "all" && incident.status !== statusFilter) return false;
    return true;
  });

  const title = priorityFilter
    ? `${t("incidentsTitle")} — ${t(PRIORITY_NAV_KEYS[priorityFilter])}`
    : t("incidentsTitle");

  return (
    <div className="content-inner">
      <div className="incidents-header">
        <div>
          <h1 className="page-title">{title}</h1>
          <p className="page-sub">{t("incidentsSub")}</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setShowForm((v) => !v)}>
          {showForm ? t("incidentsCancelButton") : `+ ${t("incidentsNewButton")}`}
        </button>
      </div>

      {showForm && <NewIncidentForm onCreated={() => setShowForm(false)} />}

      <div className="incidents-filter-row">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as IncidentStatus | "all")}
          className="incident-select"
          aria-label={t("incidentsFilterStatusAll")}
        >
          <option value="all">{t("incidentsFilterStatusAll")}</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {t(STATUS_LABEL_KEYS[s])}
            </option>
          ))}
        </select>
      </div>

      {hydrated && filtered.length === 0 && <p className="pending-note">{t("incidentsEmpty")}</p>}

      <div className="incident-list">
        {filtered.map((incident) => (
          <IncidentCard key={incident.id} incident={incident} onUpdate={updateIncident} onDelete={deleteIncident} />
        ))}
      </div>
    </div>
  );
}

function IncidentCard({
  incident,
  onUpdate,
  onDelete,
}: {
  incident: Incident;
  onUpdate: ReturnType<typeof useIncidents>["updateIncident"];
  onDelete: ReturnType<typeof useIncidents>["deleteIncident"];
}) {
  const { lang, t, tf } = useLang();
  const wi = incident.wiId ? DATA.workInstructions.find((w) => w.id === incident.wiId) : undefined;
  const description = tf(incident, "description");
  const dateStr = new Date(incident.createdAt).toLocaleString(lang === "es" ? "es-CO" : "en-US");

  function handleDelete() {
    if (window.confirm(t("incidentDeleteConfirmMessage"))) {
      onDelete(incident.id);
    }
  }

  return (
    <div className={`incident-card incident-priority-${incident.priority}`} id={incident.id}>
      <div className="incident-card-main">
        <span className={`incident-priority-badge incident-priority-${incident.priority}`}>
          {t(PRIORITY_LABEL_KEYS[incident.priority])}
        </span>
        <h3 className="incident-card-title">{tf(incident, "title")}</h3>
        {description && <p className="incident-card-desc">{description}</p>}
        {wi && (
          <Link href={`/wi/${wi.id}`} className="incident-card-wi-link">
            {t("incidentLinkedWiLabel")}: {tf(wi, "title")}
          </Link>
        )}
        <p className="incident-card-meta">{dateStr}</p>
        {incident.status === "resolved" && <ResolutionNotesEditor incident={incident} onUpdate={onUpdate} />}
      </div>
      <div className="incident-card-actions">
        <select
          value={incident.status}
          onChange={(e) => onUpdate(incident.id, { status: e.target.value as IncidentStatus })}
          className="incident-select"
          aria-label={t("statusOpenLabel")}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {t(STATUS_LABEL_KEYS[s])}
            </option>
          ))}
        </select>
        <select
          value={incident.priority}
          onChange={(e) => onUpdate(incident.id, { priority: e.target.value as IncidentPriority })}
          className="incident-select"
          aria-label={t("incidentFormPriorityLabel")}
        >
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {t(PRIORITY_LABEL_KEYS[p])}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="incident-delete-btn"
          onClick={handleDelete}
          aria-label={t("incidentDeleteButton")}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

function ResolutionNotesEditor({
  incident,
  onUpdate,
}: {
  incident: Incident;
  onUpdate: ReturnType<typeof useIncidents>["updateIncident"];
}) {
  const { t } = useLang();

  return (
    <div className="incident-resolution-editor">
      <label htmlFor={`res-es-${incident.id}`}>{t("incidentFormResolutionEsLabel")}</label>
      <textarea
        id={`res-es-${incident.id}`}
        className="incident-textarea"
        rows={2}
        value={incident.resolutionNotes_es ?? ""}
        onChange={(e) => onUpdate(incident.id, { resolutionNotes_es: e.target.value || undefined })}
      />
      <label htmlFor={`res-en-${incident.id}`}>{t("incidentFormResolutionEnLabel")}</label>
      <textarea
        id={`res-en-${incident.id}`}
        className="incident-textarea"
        rows={2}
        value={incident.resolutionNotes_en ?? ""}
        onChange={(e) => onUpdate(incident.id, { resolutionNotes_en: e.target.value || undefined })}
      />
    </div>
  );
}

function NewIncidentForm({ onCreated }: { onCreated: () => void }) {
  const { t } = useLang();
  const { createIncident } = useIncidents();
  const [titleEs, setTitleEs] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [descEs, setDescEs] = useState("");
  const [descEn, setDescEn] = useState("");
  const [priority, setPriority] = useState<IncidentPriority>("yellow");
  const [wiId, setWiId] = useState<string | undefined>(undefined);

  function submit() {
    if (!titleEs.trim() || !titleEn.trim()) return;
    createIncident({
      title_es: titleEs.trim(),
      title_en: titleEn.trim(),
      description_es: descEs.trim() || undefined,
      description_en: descEn.trim() || undefined,
      priority,
      wiId,
    });
    setTitleEs("");
    setTitleEn("");
    setDescEs("");
    setDescEn("");
    setPriority("yellow");
    setWiId(undefined);
    onCreated();
  }

  return (
    <div className="incident-form">
      <div className="incident-form-row">
        <label htmlFor="incident-title-es">{t("incidentFormTitleEsLabel")}</label>
        <input
          id="incident-title-es"
          className="incident-input"
          value={titleEs}
          onChange={(e) => setTitleEs(e.target.value)}
        />
      </div>
      <div className="incident-form-row">
        <label htmlFor="incident-title-en">{t("incidentFormTitleEnLabel")}</label>
        <input
          id="incident-title-en"
          className="incident-input"
          value={titleEn}
          onChange={(e) => setTitleEn(e.target.value)}
        />
      </div>
      <div className="incident-form-row">
        <label htmlFor="incident-desc-es">{t("incidentFormDescEsLabel")}</label>
        <textarea
          id="incident-desc-es"
          className="incident-textarea"
          rows={2}
          value={descEs}
          onChange={(e) => setDescEs(e.target.value)}
        />
      </div>
      <div className="incident-form-row">
        <label htmlFor="incident-desc-en">{t("incidentFormDescEnLabel")}</label>
        <textarea
          id="incident-desc-en"
          className="incident-textarea"
          rows={2}
          value={descEn}
          onChange={(e) => setDescEn(e.target.value)}
        />
      </div>
      <div className="incident-form-row">
        <span className="incident-form-label">{t("incidentFormPriorityLabel")}</span>
        <div className="incident-priority-picker">
          {PRIORITIES.map((p) => (
            <button
              type="button"
              key={p}
              className={`incident-priority-chip incident-priority-${p} ${priority === p ? "selected" : ""}`}
              onClick={() => setPriority(p)}
              aria-pressed={priority === p}
            >
              {t(PRIORITY_LABEL_KEYS[p])}
            </button>
          ))}
        </div>
      </div>
      <div className="incident-form-row">
        <span className="incident-form-label">{t("incidentFormWiLabel")}</span>
        <WIPicker value={wiId} onChange={setWiId} />
      </div>
      <button type="button" className="btn btn-primary" onClick={submit}>
        {t("incidentFormSubmitButton")}
      </button>
    </div>
  );
}
