import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultNotFoundComponent: () => (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>404 - Page Not Found</p>
      </div>
    ),
  });

  return router;
}
