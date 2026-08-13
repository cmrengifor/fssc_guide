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

function resolveDiagram(regionFilter: string | undefined, diagramId: string | undefined) {
  if (diagramId) {
    return DATA.flow.diagrams.find((d) => d.id === diagramId);
  }
  if (regionFilter) {
    const forRegion = DATA.flow.diagrams.find((d) => d.regions?.includes(regionFilter));
    if (forRegion) return forRegion;
  }
  return DATA.flow.diagrams.find((d) => d.id === DEFAULT_DIAGRAM_ID) ?? DATA.flow.diagrams[0];
}

export default function FlowView({
  regionFilter,
  diagramId,
}: {
  regionFilter?: string;
  diagramId?: string;
}) {
  const { t, tf } = useLang();
  const diagram = resolveDiagram(regionFilter, diagramId);
  const title = regionFilter ? `${t("flowTitle")} — ${regionFilter.toUpperCase()}` : t("flowTitle");

  return (
    <div className="content-inner">
      <h1 className="page-title">{title}</h1>
      <p className="page-sub">{t("flowSub")}</p>
      {diagram && (
        <div className="card">
          {(diagram.title_es || diagram.title_en) && (
            <h2 className="flow-diagram-title">{tf(diagram, "title")}</h2>
          )}
          <div className="flow-wrap">
            <NodeChain chain={diagram.chain} region={regionFilter} />
          </div>
        </div>
      )}
    </div>
  );
}
