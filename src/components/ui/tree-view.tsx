"use client";

import {
  type KeyboardEvent,
  type ReactNode,
  useMemo,
  useRef,
  useState,
} from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TreeNode {
  id: string;
  label: ReactNode;
  children?: TreeNode[];
}

export interface TreeViewProps {
  data: TreeNode[];
  defaultExpanded?: string[];
  onSelect?: (id: string) => void;
  className?: string;
  "aria-label"?: string;
}

interface FlatItem {
  node: TreeNode;
  level: number;
  hasChildren: boolean;
  parentId: string | null;
}

function flatten(
  nodes: TreeNode[],
  expanded: Set<string>,
  level = 1,
  parentId: string | null = null,
  out: FlatItem[] = [],
) {
  for (const node of nodes) {
    const hasChildren = !!node.children?.length;
    out.push({ node, level, hasChildren, parentId });
    if (hasChildren && expanded.has(node.id)) {
      flatten(node.children!, expanded, level + 1, node.id, out);
    }
  }
  return out;
}

/**
 * TreeView — an accessible disclosure tree (role="tree" with nested groups).
 * Only the focused item is tabbable; ↑/↓ move through the visible rows,
 * → expands (then steps in), ← collapses (then steps out to the parent),
 * Home/End jump to the ends, and Enter/Space selects.
 */
export function TreeView({
  data,
  defaultExpanded = [],
  onSelect,
  className,
  ...aria
}: TreeViewProps) {
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(defaultExpanded),
  );
  const [selected, setSelected] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(
    () => data[0]?.id ?? null,
  );
  const refs = useRef<Map<string, HTMLLIElement>>(new Map());

  const visible = useMemo(() => flatten(data, expanded), [data, expanded]);
  const tabId = visible.some((v) => v.node.id === focusedId)
    ? focusedId
    : (visible[0]?.node.id ?? null);

  const focusId = (id: string) => {
    setFocusedId(id);
    refs.current.get(id)?.focus();
  };

  const toggle = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const activate = (item: FlatItem) => {
    setSelected(item.node.id);
    setFocusedId(item.node.id);
    onSelect?.(item.node.id);
    if (item.hasChildren) toggle(item.node.id);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLLIElement>, item: FlatItem) => {
    if (e.target !== e.currentTarget) return; // ignore keys bubbled from nested items
    const idx = visible.findIndex((v) => v.node.id === item.node.id);
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (idx < visible.length - 1) focusId(visible[idx + 1].node.id);
        break;
      case "ArrowUp":
        e.preventDefault();
        if (idx > 0) focusId(visible[idx - 1].node.id);
        break;
      case "ArrowRight":
        e.preventDefault();
        if (item.hasChildren) {
          if (!expanded.has(item.node.id)) toggle(item.node.id);
          else if (idx < visible.length - 1) focusId(visible[idx + 1].node.id);
        }
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (item.hasChildren && expanded.has(item.node.id)) toggle(item.node.id);
        else if (item.parentId) focusId(item.parentId);
        break;
      case "Home":
        e.preventDefault();
        if (visible[0]) focusId(visible[0].node.id);
        break;
      case "End":
        e.preventDefault();
        if (visible.length) focusId(visible[visible.length - 1].node.id);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        activate(item);
        break;
    }
  };

  const renderNodes = (
    nodes: TreeNode[],
    level: number,
    parentId: string | null,
    root: boolean,
  ): ReactNode => (
    <ul
      role={root ? "tree" : "group"}
      aria-label={root ? aria["aria-label"] : undefined}
      className={cn(
        root ? cn("text-sm", className) : "ml-2.5 border-l border-border pl-1.5",
      )}
    >
      {nodes.map((node) => {
        const hasChildren = !!node.children?.length;
        const isExpanded = expanded.has(node.id);
        const isSelected = selected === node.id;
        const item: FlatItem = { node, level, hasChildren, parentId };
        return (
          <li
            key={node.id}
            ref={(el) => {
              if (el) refs.current.set(node.id, el);
              else refs.current.delete(node.id);
            }}
            role="treeitem"
            aria-expanded={hasChildren ? isExpanded : undefined}
            aria-selected={isSelected}
            tabIndex={tabId === node.id ? 0 : -1}
            onKeyDown={(e) => onKeyDown(e, item)}
            onClick={(e) => {
              e.stopPropagation();
              activate(item);
            }}
            className="block rounded-md outline-none [&:focus-visible>div]:ring-2 [&:focus-visible>div]:ring-brand/50"
          >
            <div
              className={cn(
                "flex items-center gap-1.5 rounded-md py-1.5 pl-1.5 pr-2 transition-colors",
                isSelected
                  ? "bg-brand/15 text-foreground"
                  : "text-muted hover:bg-background hover:text-foreground",
              )}
            >
              {hasChildren ? (
                <ChevronRight
                  className={cn(
                    "size-4 shrink-0 transition-transform",
                    isExpanded && "rotate-90",
                  )}
                />
              ) : (
                <span className="size-4 shrink-0" />
              )}
              <span className="truncate">{node.label}</span>
            </div>
            {hasChildren &&
              isExpanded &&
              renderNodes(node.children!, level + 1, node.id, false)}
          </li>
        );
      })}
    </ul>
  );

  return renderNodes(data, 1, null, true);
}
