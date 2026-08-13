"use client";

import { Fragment } from "react";
import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import { DATA } from "@/lib/data";
import { isFlowDecisionItem } from "@/lib/types";
import type { FlowChainItem, FlowNode, FlowNodeWIStepRef } from "@/lib/types";

const DEFAULT_DIAGRAM_ID = "3way-match";

function findNode(id: string): FlowNode | undefined {
  return DATA.flow.nodes.find((x) => x.id === id);
}

function resolveRef(node: FlowNode | undefined, region: string | undefined): FlowNodeWIStepRef | undefined {
  if (!node?.wiStepRefByRegion) return undefined;
  if (region) return node.wiStepRefByRegion[region];
  // Unfiltered /flow page: show the first region (in DATA.wiRegions order) that has
  // content for this node, so the page isn't entirely pending by default.
  for (const r of DATA.wiRegions) {
    const ref = node.wiStepRefByRegion[r.id];
    if (ref) return ref;
  }
  return undefined;
}

function FlowNodeEl({ nodeId, region }: { nodeId: string; region?: string }) {
  const { t, tf } = useLang();
  const node = findNode(nodeId);
  if (!node) return null;

  const ref = resolveRef(node, region);
  if (!ref) {
    return (
      <div className="flow-node pending">
        {tf(node, "label")}
        <span className="flow-node-code">{t("contentPendingNote")}</span>
      </div>
    );
  }

  return (
    <Link href={`/wi/${ref.wiId}#step-${ref.step}`} className="flow-node">
      {tf(node, "label")}
      <span className="flow-node-code">{`${ref.wiId} · step ${ref.step}`}</span>
    </Link>
  );
}

function NodeChain({ chain, region }: { chain: FlowChainItem[]; region?: string }) {
  const { tf } = useLang();
  return (
    <>
      {chain.map((item, i) => (
        <Fragment key={isFlowDecisionItem(item) ? item.decision : item}>
          {i > 0 && <div className="flow-arrow" />}
          {isFlowDecisionItem(item) ? (
            <>
              <div className="flow-decision">{tf(findNode(item.decision)!, "label")}</div>
              <div className="flow-arrow" />
              <div className="flow-branches">
                {item.branches.map((branch) => (
                  <div className="flow-branch" key={branch.id}>
                    <div className="flow-branch-label">{tf(branch, "label")}</div>
                    <NodeChain chain={branch.chain} region={region} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <FlowNodeEl nodeId={item} region={region} />
          )}
        </Fragment>
      ))}
    </>
  );
}

export default function FlowView({
  regionFilter,
  diagramId,
}: {
  regionFilter?: string;
  diagramId?: string;
}) {
  const { lang, t, tf } = useLang();
  const diagram =
    DATA.flow.diagrams.find((d) => d.id === (diagramId ?? DEFAULT_DIAGRAM_ID)) ?? DATA.flow.diagrams[0];
  const region = regionFilter ? DATA.wiRegions.find((r) => r.id === regionFilter) : undefined;
  const flowchartWI = DATA.workInstructions.filter(
    (w) => DATA.flowchartImages && DATA.flowchartImages[w.id] && (!regionFilter || w.region === regionFilter)
  );
  const title = regionFilter ? `${t("flowTitle")} — ${regionFilter.toUpperCase()}` : t("flowTitle");

  return (
    <div className="content-inner">
      <h1 className="page-title">{title}</h1>
      <p className="page-sub">{t("flowSub")}</p>
      {diagram && (
        <div className="card">
          <div className="flow-wrap">
            <NodeChain chain={diagram.chain} region={regionFilter} />
          </div>
        </div>
      )}
      <div className="section-label">
        {lang === "es"
          ? "Diagramas de flujo de Invoice Processing (documentos originales)"
          : "Invoice Processing Flowcharts (original documents)"}
      </div>
      {flowchartWI.length > 0 ? (
        flowchartWI.map((w) => (
          <Link href={`/wi/${w.id}`} className="card" style={{ cursor: "pointer", display: "block" }} key={w.id}>
            <h4 style={{ margin: "0 0 10px", fontSize: 14 }}>{tf(w, "title")}</h4>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/${DATA.flowchartImages[w.id]}`}
              alt=""
              style={{ maxWidth: "100%", border: "1px solid var(--border)", borderRadius: 8 }}
            />
          </Link>
        ))
      ) : region ? (
        <p className="pending-note">{t("contentPendingNote")}</p>
      ) : null}
    </div>
  );
}
