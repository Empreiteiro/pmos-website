"use client";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const METHOD_CLASS: Record<Method, string> = {
  GET: "method-get",
  POST: "method-post",
  PUT: "method-put",
  PATCH: "method-patch",
  DELETE: "method-delete",
};

export function MethodBadge({ method }: { method: Method }) {
  return (
    <span
      className={`method-badge ${METHOD_CLASS[method]}`}
      aria-label={`HTTP ${method}`}
    >
      {method}
    </span>
  );
}

export function EndpointRow({
  endpoint,
}: {
  endpoint: {
    method: Method;
    path: string;
    purpose: string;
    flags?: Array<"SSE" | "PUBLIC">;
  };
}) {
  return (
    <div className="endpoint-row">
      <div className="endpoint-row__head">
        <div className="flex flex-wrap items-center gap-1.5">
          <MethodBadge method={endpoint.method} />
        </div>
        <code className="endpoint-row__path mono">{endpoint.path}</code>
        <div className="endpoint-row__flags">
          {endpoint.flags?.includes("SSE") && (
            <span className="flag flag-sse">SSE</span>
          )}
          {endpoint.flags?.includes("PUBLIC") && (
            <span className="flag flag-public">PUBLIC</span>
          )}
        </div>
      </div>
      <p className="endpoint-row__purpose">{endpoint.purpose}</p>
    </div>
  );
}
