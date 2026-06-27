import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "../components/AdminShell";
import { supabase } from "../lib/supabaseClient";

export const Route = createFileRoute("/admin/team")({
  component: () => (
    <AdminShell>
      <Team />
    </AdminShell>
  ),
});

const EMPTY = { id: "", name: "", role: "", phone: "", photo_url: "", display_order: 0 };

function Team() {
  const [rows, setRows] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);

  const load = async () => {
    const { data } = await supabase.from("team_members").select("*").order("display_order", { ascending: true });
    setRows(data ?? []);
  };
  useEffect(() => { load(); }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const { id, ...payload } = editing;
    if (id) await supabase.from("team_members").update(payload).eq("id", id);
    else await supabase.from("team_members").insert(payload);
    setEditing(null);
    load();
  };
  const del = async (id: string) => {
    if (!confirm("Delete team member?")) return;
    await supabase.from("team_members").delete().eq("id", id);
    load();
  };

  const upload = async (file: File) => {
    const path = `team/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("property-photos").upload(path, file);
    if (error) { alert(error.message); return; }
    const { data } = supabase.storage.from("property-photos").getPublicUrl(path);
    setEditing((p: any) => ({ ...p, photo_url: data.publicUrl }));
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-white">Team</h1>
        <button onClick={() => setEditing({ ...EMPTY })} className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-navy">+ Add Member</button>
      </div>
      <div className="glass mt-5 overflow-x-auto rounded-xl">
        <table className="w-full text-left text-sm">
          <thead className="text-grey"><tr className="border-b border-border"><th className="p-3">Name</th><th className="p-3">Role</th><th className="p-3">Phone</th><th className="p-3">Order</th><th className="p-3">Actions</th></tr></thead>
          <tbody>
            {rows.length === 0 ? <tr><td colSpan={5} className="p-5 text-center text-grey">No team members yet.</td></tr> :
              rows.map((r) => (
                <tr key={r.id} className="border-b border-border text-white">
                  <td className="p-3">{r.name}</td><td className="p-3">{r.role}</td><td className="p-3">{r.phone}</td><td className="p-3">{r.display_order}</td>
                  <td className="p-3 whitespace-nowrap">
                    <button onClick={() => setEditing(r)} className="text-emerald hover:underline">Edit</button>
                    <button onClick={() => del(r.id)} className="ml-3 text-red-400 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/90 p-4" onClick={() => setEditing(null)}>
          <form onSubmit={save} className="glass w-full max-w-md space-y-3 rounded-2xl p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-display text-xl font-bold text-white">{editing.id ? "Edit" : "Add"} Member</h2>
            <input required placeholder="Name" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full rounded-lg border border-border bg-navy px-4 py-2.5 text-sm text-white placeholder:text-grey" />
            <input required placeholder="Role" value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })} className="w-full rounded-lg border border-border bg-navy px-4 py-2.5 text-sm text-white placeholder:text-grey" />
            <input placeholder="Phone" value={editing.phone ?? ""} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} className="w-full rounded-lg border border-border bg-navy px-4 py-2.5 text-sm text-white placeholder:text-grey" />
            <input type="number" placeholder="Display order" value={editing.display_order ?? 0} onChange={(e) => setEditing({ ...editing, display_order: Number(e.target.value) })} className="w-full rounded-lg border border-border bg-navy px-4 py-2.5 text-sm text-white placeholder:text-grey" />
            <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} className="w-full text-sm text-grey" />
            {editing.photo_url && <img src={editing.photo_url} alt="" className="h-16 w-16 rounded-full object-cover" />}
            <div className="flex gap-3 pt-2">
              <button type="submit" className="flex-1 rounded-lg bg-emerald py-2.5 font-semibold text-white">Save</button>
              <button type="button" onClick={() => setEditing(null)} className="flex-1 rounded-lg border border-border py-2.5 text-grey">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
