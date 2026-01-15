import { Suspense } from "react";
import { Await, useLoaderData } from "react-router";

function sleep(ms: number) {
  return new Promise(res => setTimeout(res, ms));
}

async function getInvoice(id: string) {
  await sleep(3000); // simulate slow API
  return {
    id,
    customer: "Santa Monica",
    total: "$10,800"
  };
}

export async function loader({ params }: any) {
  return {
    invoice: getInvoice(params.id)
  };
}

export default function InvoiceDetail() {
  const { invoice } = useLoaderData<typeof loader>();

  return (
    <>
      <h3 className="text-lg font-semibold mb-2">
        Invoice Details
      </h3>

      <Suspense
        fallback={
          <div className="animate-pulse text-neutral-400">
            Loading invoice…
          </div>
        }
      >
        <Await resolve={invoice}>
          {(data) => (
            <>
              <p className="text-sm text-neutral-300">
                Customer ID: {data.id} 
              </p>
              <p className="text-sm text-neutral-300">
                Customer: {data.customer} 
              </p>
              <pre className="mt-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 p-5 text-sm text-indigo-300 font-mono">
{`import("/root.js")
fetch("/user.json")`}
              </pre>
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
}
