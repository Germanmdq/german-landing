-- A single user can legitimately have more than one active push endpoint
-- (for example after reinstalling the PWA, using another browser, or another device).
-- Keep push_subscriptions as a registry of active devices, not a single-device slot.

DROP TRIGGER IF EXISTS trg_single_active_push_subscription ON public.push_subscriptions;
DROP FUNCTION IF EXISTS public.enforce_single_active_push_subscription();
DROP INDEX IF EXISTS public.push_subscriptions_one_active_per_user;
