"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import { DATA } from "@/lib/data";
import type { FlowNode } from "@/lib/types";

function FlowNodeEl({ node }: { node?: FlowNode }) {
  const { t, tf } = useLang();
  if (!node) return null;

  if (node.type === "pending") {
    return (
      <div className="flow-node pending">
        {tf(node, "label")}
        <span className="flow-node-code">{t("contentPendingNote")}</span>
      </div>
    );
  }

  const content = (
    <>
      {tf(node, "label")}
      {node.caseId && <span className="flow-node-code">{node.caseId}</span>}
    </>
  );

  if (node.caseId) {
    return (
      <Link href={`/case/${node.caseId}`} className="flow-node">
        {content}
      </Link>
    );
  }
  return <div className="flow-node">{content}</div>;
}

export default function FlowView() {
  const { lang, t, tf } = useLang();
  const n = (id: string) => DATA.flow.nodes.find((x) => x.id === id);
  const flowchartWI = DATA.workInstructions.filter((w) => DATA.flowchartImages && DATA.flowchartImages[w.id]);

  return (
    <div className="content-inner">
      <h1 className="page-title">{t("flowTitle")}</h1>
      <p className="page-sub">{t("flowSub")}</p>
      <div className="card">
        <div className="flow-wrap">
          <FlowNodeEl node={n("n1")} />
          <div className="flow-arrow" />
          <div className="flow-decision">{tf(n("d1")!, "label")}</div>
          <div className="flow-arrow" />
          <div className="flow-branches">
            <div className="flow-branch">
              <div className="flow-branch-label">{lang === "es" ? "Sí" : "Yes"}</div>
              <FlowNodeEl node={n("n2")} />
              <div className="flow-arrow" />
              <FlowNodeEl node={n("n4")} />
            </div>
            <div className="flow-branch">
              <div className="flow-branch-label">{lang === "es" ? "No" : "No"}</div>
              <FlowNodeEl node={n("n3")} />
            </div>
          </div>
        </div>
      </div>
      {flowchartWI.length > 0 && (
        <>
          <div className="section-label">
            {lang === "es"
              ? "Diagramas de flujo de Invoice Processing (documentos originales)"
              : "Invoice Processing Flowcharts (original documents)"}
          </div>
          {flowchartWI.map((w) => (
            <Link href={`/wi/${w.id}`} className="card" style={{ cursor: "pointer", display: "block" }} key={w.id}>
              <h4 style={{ margin: "0 0 10px", fontSize: 14 }}>{tf(w, "title")}</h4>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/${DATA.flowchartImages[w.id]}`}
                alt=""
                style={{ maxWidth: "100%", border: "1px solid var(--border)", borderRadius: 8 }}
              />
            </Link>
          ))}
        </>
      )}
    </div>
  );
}
