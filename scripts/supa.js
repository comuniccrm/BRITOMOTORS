/**
 * Supabase Shared Logic - Brito Motors
 */

const SUPABASE_CONFIG = {
    URL: localStorage.getItem('supabase_url') || '',
    KEY: localStorage.getItem('supabase_key') || ''
};

let supabase = null;
if (typeof window.supabase !== 'undefined' && SUPABASE_CONFIG.URL && SUPABASE_CONFIG.KEY) {
    try {
        supabase = window.supabase.createClient(SUPABASE_CONFIG.URL, SUPABASE_CONFIG.KEY);
        console.log("Supabase Bridge Initialized 🚀");
    } catch (e) {
        console.error("Supabase init failed:", e);
    }
}

const CloudDB = {
    async fetch(table, fallbackData) {
        if (!supabase) return fallbackData;
        try {
            const { data, error } = await supabase.from(table).select('*');
            if (error) throw error;
            return data && data.length > 0 ? data : fallbackData;
        } catch (e) {
            console.warn(`Supabase fetch failed for ${table}:`, e);
            return fallbackData;
        }
    },

    async save(table, data) {
        if (!supabase) return;
        try {
            if (Array.isArray(data)) {
                // For vehicles, brands, testimonials
                const { error } = await supabase.from(table).upsert(data);
                if (error) console.error(`Cloud save error [${table}]:`, error);
            } else {
                // For settings (global object)
                const { error } = await supabase.from('settings').upsert({ id: 'global', data });
                if (error) console.error("Cloud settings save error:", error);
            }
        } catch (e) {
            console.error(`CloudDB unexpected error [${table}]:`, e);
        }
    }
};
