import { supabase } from './supabase';
import { jobsData } from '../data/jobsData';
import { JobItem } from '../types';

export function mapDbRowToJobItem(row: any): JobItem {
  return {
    id: String(row.id || row.slug),
    slug: row.slug || '',
    title: row.title || '',
    marketCode: (row.market_code || row.marketCode || 'ENGLISH') as any,
    market: row.market || '',
    language: row.language || '',
    employmentType: row.employment_type || row.employmentType || 'Remote',
    department: row.department || 'Business Development',
    roleType: row.role_type || row.roleType || 'Market Growth / Sales',
    experience: row.experience || 'Communication Proficiency',
    aboutRole: row.about_role || row.aboutRole || '',
    whatYouWillDo: Array.isArray(row.what_you_will_do)
      ? row.what_you_will_do
      : Array.isArray(row.whatYouWillDo)
      ? row.whatYouWillDo
      : typeof row.what_you_will_do === 'string'
      ? JSON.parse(row.what_you_will_do)
      : [],
    whatWeAreLookingFor: Array.isArray(row.what_we_are_looking_for)
      ? row.what_we_are_looking_for
      : Array.isArray(row.whatWeAreLookingFor)
      ? row.whatWeAreLookingFor
      : typeof row.what_we_are_looking_for === 'string'
      ? JSON.parse(row.what_we_are_looking_for)
      : [],
    niceToHave: Array.isArray(row.nice_to_have)
      ? row.nice_to_have
      : Array.isArray(row.niceToHave)
      ? row.niceToHave
      : typeof row.nice_to_have === 'string'
      ? JSON.parse(row.nice_to_have)
      : [],
    compensation: typeof row.compensation === 'object' && row.compensation
      ? row.compensation
      : typeof row.compensation === 'string'
      ? (function() {
          try { return JSON.parse(row.compensation); } catch { return undefined; }
        })()
      : {
          model: '[Competitive Base Retainer + Performance Tiers]',
          commission: '[Uncapped Commission Per Closed Contract]',
          bonus: '[Quarterly Market Growth Milestone Bonus]',
          workArrangement: '100% Remote / Flexible Schedule'
        }
  };
}

export async function fetchJobs(): Promise<JobItem[]> {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('is_open', true);

    if (error || !data || data.length === 0) {
      if (error) console.warn('Supabase fetchJobs warning/error:', error.message);
      // Fallback query without filter if is_open column is not present or if table is unpopulated
      const fallback = await supabase.from('jobs').select('*');
      if (!fallback.error && fallback.data && fallback.data.length > 0) {
        return fallback.data.filter((r) => r.is_open !== false).map(mapDbRowToJobItem);
      }
      return jobsData;
    }
    return data.map(mapDbRowToJobItem);
  } catch (err) {
    console.warn('fetchJobs error, falling back to static jobsData:', err);
    return jobsData;
  }
}

export async function fetchJobBySlug(slug: string): Promise<JobItem | null> {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error || !data) {
      return jobsData.find((j) => j.slug === slug) || null;
    }
    return mapDbRowToJobItem(data);
  } catch (err) {
    return jobsData.find((j) => j.slug === slug) || null;
  }
}
