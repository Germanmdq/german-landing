-- A user may have historical push endpoints, but only one can be active.
WITH ranked AS (
  SELECT id, row_number() OVER (PARTITION BY user_id ORDER BY created_at DESC, id DESC) AS rn
  FROM public.push_subscriptions
  WHERE is_active = true
)
UPDATE public.push_subscriptions p
SET is_active = false
FROM ranked r
WHERE p.id = r.id AND r.rn > 1;

CREATE UNIQUE INDEX IF NOT EXISTS push_subscriptions_one_active_per_user
ON public.push_subscriptions (user_id)
WHERE is_active = true;

CREATE OR REPLACE FUNCTION public.enforce_single_active_push_subscription()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF NEW.is_active THEN
    UPDATE public.push_subscriptions
    SET is_active = false
    WHERE user_id = NEW.user_id
      AND id <> NEW.id
      AND is_active = true;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_single_active_push_subscription ON public.push_subscriptions;
CREATE TRIGGER trg_single_active_push_subscription
BEFORE INSERT OR UPDATE OF is_active ON public.push_subscriptions
FOR EACH ROW
WHEN (NEW.is_active = true)
EXECUTE FUNCTION public.enforce_single_active_push_subscription();
