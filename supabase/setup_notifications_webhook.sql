-- ==============================================================================
-- MG.IO ADMIN EMAIL NOTIFICATIONS SETUP (SUPABASE WEBHOOKS & TRIGGER)
-- ==============================================================================
-- Target Admin Email: malik.businessweb@gmail.com
-- Admin Contact Phone: +91 92282 0685
-- Edge Function Endpoint: https://foxfqdbzpasmlhvhgupc.supabase.co/functions/v1/send-admin-notification
-- ==============================================================================

-- OPTION 1: SUPABASE DASHBOARD WEBHOOKS SETUP (RECOMMENDED)
-- ------------------------------------------------------------------------------
-- 1. Go to Supabase Dashboard -> Database -> Webhooks -> "Create Webhook"
-- 
-- Webhook 1: Contact Submissions
--   - Name: notify_contact_submissions
--   - Table: public.contact_submissions
--   - Events: INSERT
--   - Type: Supabase Edge Function
--   - Edge Function: send-admin-notification
--   - HTTP Method: POST
--
-- Webhook 2: Job Applications
--   - Name: notify_job_applications
--   - Table: public.job_applications
--   - Events: INSERT
--   - Type: Supabase Edge Function
--   - Edge Function: send-admin-notification
--   - HTTP Method: POST


-- OPTION 2: SQL TRIGGER VIA pg_net (ALTERNATIVE AUTOMATION)
-- ------------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS pg_net;

CREATE OR REPLACE FUNCTION public.handle_admin_notification_webhook()
RETURNS TRIGGER AS $$
DECLARE
  payload json;
BEGIN
  payload := json_build_object(
    'type', TG_OP,
    'table', TG_TABLE_NAME,
    'schema', TG_TABLE_SCHEMA,
    'record', row_to_json(NEW),
    'old_record', NULL
  );

  PERFORM net.http_post(
    url := 'https://foxfqdbzpasmlhvhgupc.supabase.co/functions/v1/send-admin-notification',
    headers := jsonb_build_object('Content-Type', 'application/json'),
    body := payload::jsonb
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for contact_submissions
DROP TRIGGER IF EXISTS trigger_notify_contact_submissions ON public.contact_submissions;
CREATE TRIGGER trigger_notify_contact_submissions
  AFTER INSERT ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_admin_notification_webhook();

-- Trigger for job_applications
DROP TRIGGER IF EXISTS trigger_notify_job_applications ON public.job_applications;
CREATE TRIGGER trigger_notify_job_applications
  AFTER INSERT ON public.job_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_admin_notification_webhook();
