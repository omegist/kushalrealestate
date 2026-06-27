import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "../components/AdminShell";
import { supabase } from "../lib/supabaseClient";

export const Route = createFileRoute("/admin/properties")({
  component: () => (
    <AdminShell>
      <ManageProperties />
    </AdminShell>
  ),
});

const TYPES = ["Residential", "Commercial", "Plot"];
const CATEGORIES = ["Sale", "Rent", "New Construction", "Resale"];
const STATUSES = ["Active", "Sold", "Rented"];

const EMPTY: any = {
  title: "", type: "Residential", category: "Sale", location: "", area_buildup: "", area_carpet: "",
  floor: "", total_floors: "", construction_age: "", price: "", price_negotiable: false, description: "",
  features: "", contact_name: "Anil", contact_phone: "9029847968", office_phone: "9326313320",
  status: "Active", is_featured: false, photos: [],
};

function ManageProperties() {
  const [rows, setRows] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("properties").select("*").order("created_at", { ascending: false });
    setRows(data ?? []);
  };
  useEffect(() => { load(); }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const { id, created_at, ...payload } = editing;
    if (id) await supabase.from("properties").update(payload).eq("id", id);
    else await supabase.from("properties").insert(payload);
    setEditing(null);
    load();
  };

  const del = async (id: string) => {
    if (!confirm("Delete this property?")) return;
    await supabase.from("properties").delete().eq("id", id);
    load();
  };

  const toggleFeatured = async (r: any) => {
    await supabase.from("properties").update({ is_featured: !r.is_featured }).eq("id", r.id);
    load();
  };

  const uploadPhotos = async (files: FileList) => {
    setUploading(true);
    const urls: string[] = [...(editing.photos ?? [])];
    for (const file of Array.from(files)) {
      const path = `properties/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from("property-photos").upload(path, file);
      if (!error) {
        const { data } = supabase.storage.from("property-photos").getPublicUrl(path);
        urls.push(data.publicUrl);
      } else {
        alert(error.message);
      }
    }
    setEditing((p: any) => ({ ...p, photos: urls }));
    setUploading(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-white">Properties</h1>
        <button onClick={() => setEditing({ ...EMPTY })} className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-navy">+ Add New Property</button>
      </div>

      <div className="glass mt-5 overflow-x-auto rounded-xl">
        <table className="w-full text-left text-sm">
          <thead className="text-grey"><tr className="border-b border-border"><th className="p-3">Photo</th><th className="p-3">Title</th><th className="p-3">Type</th><th className="p-3">Price</th><th className="p-3">Status</th><th className="p-3">Actions</th></tr></thead>
          <tbody>
            {rows.length === 0 ? <tr><td colSpan={6} className="p-5 text-center text-grey">No properties yet. Add your first listing.</td></tr> :
              rows.map((r) => (
                <tr key={r.id} className="border-b border-border text-white">
                  <td className="p-3">{r.photos?.[0] ? <img src={r.photos[0]} alt="" className="h-10 w-14 rounded object-cover" /> : <div className="flex h-10 w-14 items-center justify-center rounded bg-card">🏢</div>}</td>
                  <td className="p-3 max-w-[220px] truncate">{r.title}{r.is_featured && <span className="ml-1 text-gold">★</span>}</td>
                  <td className="p-3">{r.type}</td>
                  <td className="p-3 text-gold">{r.price}</td>
                  <td className="p-3">{r.status}</td>
                  <td className="p-3 whitespace-nowrap">
                    <button onClick={() => setEditing(r)} className="text-emerald hover:underline">Edit</button>
                    <button onClick={() => toggleFeatured(r)} className="ml-3 text-gold hover:underline">{r.is_featured ? "Unfeature" : "Feature"}</button>
                    <button onClick={() => del(r.id)} className="ml-3 text-red-400 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-navy/90 p-4" onClick={() => setEditing(null)}>
          <form onSubmit={save} className="glass my-8 w-full max-w-2xl space-y-3 rounded-2xl p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-display text-xl font-bold text-white">{editing.id ? "Edit" : "Add"} Property</h2>
            <input required placeholder="Title *" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className={inp} />
            <div className="grid gap-3 sm:grid-cols-2">
              <select value={editing.type} onChange={(e) => setEditing({ ...editing, type: e.target.value })} className={inp}>{TYPES.map((t) => <option key={t}>{t}</option>)}</select>
              <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className={inp}>{CATEGORIES.map((t) => <option key={t}>{t}</option>)}</select>
            </div>
            <input required placeholder="Location *" value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })} className={inp} />
            <div className="grid gap-3 sm:grid-cols-2">
              <input placeholder="Area Buildup" value={editing.area_buildup ?? ""} onChange={(e) => setEditing({ ...editing, area_buildup: e.target.value })} className={inp} />
              <input placeholder="Area Carpet" value={editing.area_carpet ?? ""} onChange={(e) => setEditing({ ...editing, area_carpet: e.target.value })} className={inp} />
              <input placeholder="Floor" value={editing.floor ?? ""} onChange={(e) => setEditing({ ...editing, floor: e.target.value })} className={inp} />
              <input placeholder="Total Floors" value={editing.total_floors ?? ""} onChange={(e) => setEditing({ ...editing, total_floors: e.target.value })} className={inp} />
              <input placeholder="Construction Age" value={editing.construction_age ?? ""} onChange={(e) => setEditing({ ...editing, construction_age: e.target.value })} className={inp} />
              <input required placeholder="Price *" value={editing.price} onChange={(e) => setEditing({ ...editing, price: e.target.value })} className={inp} />
            </div>
            <textarea placeholder="Description" rows={3} value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className={inp} />
            <textarea placeholder="Features (comma separated)" rows={2} value={editing.features ?? ""} onChange={(e) => setEditing({ ...editing, features: e.target.value })} className={inp} />
            <div className="grid gap-3 sm:grid-cols-3">
              <input placeholder="Contact Name" value={editing.contact_name ?? ""} onChange={(e) => setEditing({ ...editing, contact_name: e.target.value })} className={inp} />
              <input placeholder="Contact Phone" value={editing.contact_phone ?? ""} onChange={(e) => setEditing({ ...editing, contact_phone: e.target.value })} className={inp} />
              <input placeholder="Office Phone" value={editing.office_phone ?? ""} onChange={(e) => setEditing({ ...editing, office_phone: e.target.value })} className={inp} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })} className={inp}>{STATUSES.map((t) => <option key={t}>{t}</option>)}</select>
              <div className="flex items-center gap-4 text-sm text-white">
                <label className="flex items-center gap-2"><input type="checkbox" checked={!!editing.price_negotiable} onChange={(e) => setEditing({ ...editing, price_negotiable: e.target.checked })} /> Negotiable</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={!!editing.is_featured} onChange={(e) => setEditing({ ...editing, is_featured: e.target.checked })} /> Featured</label>
              </div>
            </div>
            <div>
              <input type="file" accept="image/*" multiple onChange={(e) => e.target.files && uploadPhotos(e.target.files)} className="w-full text-sm text-grey" />
              {uploading && <p className="mt-1 text-xs text-emerald">Uploading…</p>}
              {editing.photos?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {editing.photos.map((url: string, i: number) => (
                    <div key={i} className="relative">
                      <img src={url} alt="" className="h-16 w-16 rounded object-cover" />
                      <button type="button" onClick={() => setEditing({ ...editing, photos: editing.photos.filter((_: string, j: number) => j !== i) })} className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="flex-1 rounded-lg bg-emerald py-2.5 font-semibold text-white">Save Property</button>
              <button type="button" onClick={() => setEditing(null)} className="flex-1 rounded-lg border border-border py-2.5 text-grey">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

const inp = "w-full rounded-lg border border-border bg-navy px-4 py-2.5 text-sm text-white placeholder:text-grey focus:border-gold focus:outline-none";
