import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WebhookPayload {
  type: string;
  table: string;
  schema: string;
  record: Record<string, any>;
  old_record: Record<string, any> | null;
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const adminEmail = Deno.env.get("ADMIN_NOTIFICATION_EMAIL") || "malik.businessweb@gmail.com";
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_ANON_KEY");

    if (!resendApiKey) {
      console.error("RESEND_API_KEY environment variable is missing.");
      return new Response(
        JSON.stringify({ error: "Server configuration missing RESEND_API_KEY" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const payload: WebhookPayload = await req.json();
    console.log("Received database webhook payload for table:", payload.table, "type:", payload.type);

    const record = payload.record || {};
    const table = payload.table;

    // Optional Supabase client for generating signed URLs for resumes
    let supabaseClient = null;
    if (supabaseUrl && supabaseServiceKey) {
      supabaseClient = createClient(supabaseUrl, supabaseServiceKey);
    }

    let emailSubject = "";
    let emailHtml = "";
    let replyToEmail = record.email || "";

    if (table === "contact_submissions") {
      const name = record.name || record.full_name || "N/A";
      const business = record.business || record.company || "N/A";
      const email = record.email || "N/A";
      const country = record.country || "N/A";
      const service = record.service || record.service_requested || "N/A";
      const budget = record.budget || "N/A";
      const projectDetails = record.project_details || record.details || "N/A";
      const createdAt = record.created_at ? new Date(record.created_at).toUTCString() : new Date().toUTCString();

      emailSubject = `New MG.IO Contact Inquiry — ${business}`;
      emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f7f7f5; padding: 24px; color: #111111; }
            .card { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e5e5; border-radius: 12px; padding: 32px; }
            .header { border-bottom: 2px solid #00AEEF; padding-bottom: 16px; margin-bottom: 24px; }
            .title { font-size: 20px; font-weight: 800; color: #111111; margin: 0; text-transform: uppercase; tracking: 0.05em; }
            .field { margin-bottom: 16px; }
            .label { font-size: 11px; font-weight: 700; color: #777777; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 4px; }
            .value { font-size: 14px; color: #111111; line-height: 1.5; white-space: pre-wrap; }
            .button { display: inline-block; background-color: #111111; color: #ffffff; text-decoration: none; padding: 12px 24px; font-weight: 700; font-size: 12px; border-radius: 6px; margin-top: 24px; text-transform: uppercase; letter-spacing: 0.1em; }
            .footer { margin-top: 32px; font-size: 11px; color: #999999; border-top: 1px solid #eeeeee; pt: 16px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h1 class="title">MG.IO — NEW CONTACT INQUIRY</h1>
            </div>

            <div class="field">
              <span class="label">Name</span>
              <div class="value">${escapeHtml(name)}</div>
            </div>

            <div class="field">
              <span class="label">Business</span>
              <div class="value">${escapeHtml(business)}</div>
            </div>

            <div class="field">
              <span class="label">Email</span>
              <div class="value">${escapeHtml(email)}</div>
            </div>

            <div class="field">
              <span class="label">Country</span>
              <div class="value">${escapeHtml(country)}</div>
            </div>

            <div class="field">
              <span class="label">Requested Service</span>
              <div class="value">${escapeHtml(service)}</div>
            </div>

            <div class="field">
              <span class="label">Budget</span>
              <div class="value">${escapeHtml(budget)}</div>
            </div>

            <div class="field">
              <span class="label">Project Details</span>
              <div class="value">${escapeHtml(projectDetails)}</div>
            </div>

            <div class="field">
              <span class="label">Submitted At</span>
              <div class="value">${escapeHtml(createdAt)}</div>
            </div>

            <a href="mailto:${escapeHtml(email)}" class="button">Reply to ${escapeHtml(email)}</a>

            <div class="footer">
              Automated Notification from MG.IO System
            </div>
          </div>
        </body>
        </html>
      `;
    } else if (table === "job_applications") {
      const fullName = record.full_name || record.name || "N/A";
      const email = record.email || "N/A";
      const country = record.country || "N/A";
      const cityRegion = record.city_region || record.city || "N/A";
      const targetMarket = record.target_market || "N/A";
      const primaryLanguage = record.primary_language || "N/A";
      const otherLanguages = record.other_languages || "N/A";
      const salesExperience = record.sales_experience || "N/A";
      const bdExperience = record.business_development_experience || "N/A";
      const coldCalling = record.cold_calling_experience || "N/A";
      const coldEmail = record.cold_email_experience || "N/A";
      const linkedinExp = record.linkedin_experience || "N/A";
      const previousRole = record.previous_role || "N/A";
      const linkedinUrl = record.linkedin_url || "N/A";
      const portfolioUrl = record.portfolio_url || "N/A";
      const whyMgio = record.why_mgio || "N/A";
      const localBusiness = record.local_business_example || "N/A";
      const approachToBusiness = record.approach_to_business || "N/A";
      const rawResumePath = record.resume_path || "N/A";
      const createdAt = record.created_at ? new Date(record.created_at).toUTCString() : new Date().toUTCString();

      // Generate signed URL if resume path exists and Supabase client is present
      let signedResumeUrl: string | null = null;
      if (rawResumePath && rawResumePath !== "N/A" && supabaseClient) {
        try {
          // Remove bucket prefix if present
          const cleanPath = rawResumePath.replace(/^resumes\//, "");
          const { data: signedData } = await supabaseClient.storage
            .from("resumes")
            .createSignedUrl(cleanPath, 60 * 60 * 24 * 7); // Valid for 7 days
          if (signedData?.signedUrl) {
            signedResumeUrl = signedData.signedUrl;
          }
        } catch (signedErr) {
          console.warn("Could not generate signed resume URL:", signedErr);
        }
      }

      emailSubject = `New MG.IO Job Application — ${fullName}`;
      emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f7f7f5; padding: 24px; color: #111111; }
            .card { max-width: 650px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e5e5; border-radius: 12px; padding: 32px; }
            .header { border-bottom: 2px solid #00AEEF; padding-bottom: 16px; margin-bottom: 24px; }
            .title { font-size: 20px; font-weight: 800; color: #111111; margin: 0; text-transform: uppercase; tracking: 0.05em; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
            .field { margin-bottom: 16px; }
            .label { font-size: 11px; font-weight: 700; color: #777777; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 4px; }
            .value { font-size: 14px; color: #111111; line-height: 1.5; white-space: pre-wrap; }
            .button { display: inline-block; background-color: #111111; color: #ffffff; text-decoration: none; padding: 12px 24px; font-weight: 700; font-size: 12px; border-radius: 6px; margin-top: 16px; margin-right: 12px; text-transform: uppercase; letter-spacing: 0.1em; }
            .button-secondary { display: inline-block; background-color: #00AEEF; color: #ffffff; text-decoration: none; padding: 12px 24px; font-weight: 700; font-size: 12px; border-radius: 6px; margin-top: 16px; text-transform: uppercase; letter-spacing: 0.1em; }
            .footer { margin-top: 32px; font-size: 11px; color: #999999; border-top: 1px solid #eeeeee; pt: 16px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h1 class="title">MG.IO — NEW JOB APPLICATION</h1>
            </div>

            <div class="field">
              <span class="label">Candidate Name</span>
              <div class="value">${escapeHtml(fullName)}</div>
            </div>

            <div class="field">
              <span class="label">Email</span>
              <div class="value">${escapeHtml(email)}</div>
            </div>

            <div class="field">
              <span class="label">Country / Location</span>
              <div class="value">${escapeHtml(country)} — ${escapeHtml(cityRegion)}</div>
            </div>

            <div class="field">
              <span class="label">Target Market & Languages</span>
              <div class="value">${escapeHtml(targetMarket)} | Primary: ${escapeHtml(primaryLanguage)} | Other: ${escapeHtml(otherLanguages)}</div>
            </div>

            <div class="field">
              <span class="label">Experience Summary</span>
              <div class="value">
                Sales: ${escapeHtml(salesExperience)} | Business Dev: ${escapeHtml(bdExperience)}<br/>
                Cold Calling: ${escapeHtml(coldCalling)} | Cold Email: ${escapeHtml(coldEmail)} | LinkedIn: ${escapeHtml(linkedinExp)}
              </div>
            </div>

            <div class="field">
              <span class="label">Previous Role</span>
              <div class="value">${escapeHtml(previousRole)}</div>
            </div>

            ${linkedinUrl !== "N/A" ? `<div class="field"><span class="label">LinkedIn</span><div class="value"><a href="${escapeHtml(linkedinUrl)}" target="_blank">${escapeHtml(linkedinUrl)}</a></div></div>` : ""}
            ${portfolioUrl !== "N/A" ? `<div class="field"><span class="label">Portfolio</span><div class="value"><a href="${escapeHtml(portfolioUrl)}" target="_blank">${escapeHtml(portfolioUrl)}</a></div></div>` : ""}

            <div class="field">
              <span class="label">Why MG.IO?</span>
              <div class="value">${escapeHtml(whyMgio)}</div>
            </div>

            <div class="field">
              <span class="label">Local Business Example</span>
              <div class="value">${escapeHtml(localBusiness)}</div>
            </div>

            <div class="field">
              <span class="label">Approach to Business</span>
              <div class="value">${escapeHtml(approachToBusiness)}</div>
            </div>

            <div class="field">
              <span class="label">Resume Path</span>
              <div class="value">${escapeHtml(rawResumePath)}</div>
            </div>

            <div class="field">
              <span class="label">Submitted At</span>
              <div class="value">${escapeHtml(createdAt)}</div>
            </div>

            <div>
              <a href="mailto:${escapeHtml(email)}" class="button">Reply to candidate</a>
              ${signedResumeUrl ? `<a href="${escapeHtml(signedResumeUrl)}" target="_blank" class="button-secondary">View Secure Resume (7 Days)</a>` : ""}
            </div>

            <div class="footer">
              Automated Notification from MG.IO Recruitment System
            </div>
          </div>
        </body>
        </html>
      `;
    } else {
      console.log("Unhandled table:", table);
      return new Response(
        JSON.stringify({ message: "Ignored table event", table }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send email using Resend API
    console.log("Sending email to:", adminEmail, "Subject:", emailSubject);

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "MG.IO Notifications <onboarding@resend.dev>",
        to: [adminEmail],
        reply_to: replyToEmail || undefined,
        subject: emailSubject,
        html: emailHtml,
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend API error:", resendData);
      return new Response(
        JSON.stringify({ error: "Resend email delivery failed", details: resendData }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Email sent successfully! Resend ID:", resendData.id);
    return new Response(
      JSON.stringify({ success: true, emailId: resendData.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("Edge function unhandled exception:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function escapeHtml(str: string): string {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
