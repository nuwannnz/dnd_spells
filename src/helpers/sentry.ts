import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

/**
 * Initialize the Sentry error logging
 */
export const configSentry = () => {
    if(process.env.SENTRY_DSN) {
        Sentry.init({
            dsn: process.env.SENTRY_DSN,
            integrations: [new BrowserTracing()],
            tracesSampleRate: 1.0
        })
    }
}